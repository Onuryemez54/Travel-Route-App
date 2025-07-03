import { render, screen, waitFor, within } from "@testing-library/react";
import { mockFormValue } from "../../../test/mocks/mockFormValue";
import { createServer } from "../../../test/server";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Form } from "./Form";
import userEvent from "@testing-library/user-event";
import * as citiesSlice from "../citiesSlice";
import { createTestStore } from "../../../test/mocks/testStore";

vi.mock("../citiesSlice", async () => {
  const actual = await vi.importActual("../citiesSlice");
  return {
    ...actual,
    addCity: vi.fn(() => async () => Promise.resolve()),
  };
});

vi.mock("../../../utils/hooks/useUrlPosition", () => ({
  useUrlPosition: vi.fn(() => [39.91, 32.85]),
}));

createServer([
  {
    method: "get",
    path: "https://api.opencagedata.com/geocode/v1/json",
    res: () => {
      return mockFormValue;
    },
  },
]);

const renderRegister = () =>
  render(
    <Provider store={createTestStore()}>
      <BrowserRouter>
        <Form />
      </BrowserRouter>
    </Provider>
  );

describe("Form component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderRegister();
  });

  it("renders loading spinner initially", () => {
    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders form elements correctly", async () => {
    const form = await screen.findByTestId("form");
    expect(form).toBeInTheDocument();

    const cityNameInput = within(form).getByLabelText(/city name/i);
    expect(cityNameInput).toBeInTheDocument();
    expect(cityNameInput).toHaveValue("Ankara");

    expect(
      within(form).getByText(/When did you go to Ankara/i)
    ).toBeInTheDocument();

    expect(within(form).getByText(/your trip to Ankara/i)).toBeInTheDocument();

    const dateInput = screen.getByTestId("date");
    expect(dateInput).toBeInTheDocument();

    const notesInput = screen.getByLabelText(/notes/i);
    expect(notesInput).toBeInTheDocument();
    expect(notesInput).toHaveValue("");

    const categoryInputs = screen.getAllByRole("radio");
    expect(categoryInputs).toHaveLength(2);

    expect(screen.getByLabelText(/visited/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/planned/i)).toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /add city/i });
    expect(submitButton).toBeInTheDocument();
  });

  it("shows validation errors when fields are empty", async () => {
    const user = userEvent.setup();

    const form = await screen.findByTestId("form");
    const cityNameInput = within(form).getByLabelText(/city name/i);

    const submitButton = screen.getByRole("button", { name: /add city/i });

    await user.clear(cityNameInput);
    await user.click(submitButton);

    expect(screen.getByText(/City name is required/i)).toBeInTheDocument();
  });

  it("submits form with correct data", async () => {
    const MockUserId = "12345";
    const addCityMock = citiesSlice.addCity as unknown as ReturnType<
      typeof vi.fn
    >;
    const user = userEvent.setup();

    const form = await screen.findByTestId("form");

    const cityNameInput = within(form).getByLabelText(/city name/i);
    const notesInput = screen.getByLabelText(/notes/i);
    const categorySelect = screen.getByLabelText(/planned/i);

    await user.clear(cityNameInput);

    await user.type(cityNameInput, "Istanbul");
    await user.type(notesInput, "Planned for business.");
    await user.click(categorySelect);

    const submitButton = screen.getByRole("button", { name: /add city/i });
    await user.click(submitButton);

    await waitFor(() => {
      expect(addCityMock).toHaveBeenCalledWith({
        userId: MockUserId,
        newCity: {
          id: expect.any(String),
          cityName: "Istanbul",
          countryName: "Turkey",
          countryCode: "TR",
          date: expect.any(Date),
          notes: "Planned for business.",
          position: { lat: "39.91", lng: "32.85" },
          category: "planned",
        },
      });
    });
  });
});
