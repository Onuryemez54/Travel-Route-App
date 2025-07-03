import { render, screen, within } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { VisitedCities } from "./VisitedCities";
import type { Mock } from "vitest";
import { useAppSelector } from "../../../app/hooks";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { mockCities } from "../../../test/mocks/mockCities";
import userEvent from "@testing-library/user-event";
import * as citiesSlice from "../citiesSlice";

vi.mock("../../../app/hooks", async () => {
  const actual = await vi.importActual("../../../app/hooks");
  return {
    ...actual,
    useAppSelector: vi.fn(),
  };
});

const renderVİsitedCities = () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <VisitedCities />
      </BrowserRouter>
    </Provider>
  );
};

describe("VisitedCities component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading spinner when isLoading is true", () => {
    (useAppSelector as Mock).mockReturnValue({
      cities: {
        visited: [],
        planned: [],
      },
      currentCity: null,
      isLoading: true,
      error: null,
      isFetching: false,
    });

    renderVİsitedCities();

    const spinner = screen.getByTestId("spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders visited city with empty value", async () => {
    (useAppSelector as Mock).mockReturnValue({
      cities: {
        visited: [],
        planned: [],
      },
      currentCity: null,
      isLoading: false,
      error: null,
      isFetching: false,
    });

    renderVİsitedCities();

    const spinner = screen.queryByTestId("spinner");
    expect(spinner).not.toBeInTheDocument();

    const visitedList = await screen.findByTestId("visitedList");
    expect(visitedList).toBeInTheDocument();

    expect(within(visitedList).queryByRole("listitem")).not.toBeInTheDocument();

    const message = screen.getByText("You have not visited any cities yet.");
    expect(message).toBeInTheDocument();
  });

  it("renders visited city mockReturnValue", async () => {
    (useAppSelector as Mock).mockReturnValue({
      cities: {
        visited: [...mockCities],
        planned: [],
      },
      currentCity: mockCities[0],
      isLoading: false,
      error: null,
      isFetching: false,
    });

    renderVİsitedCities();

    const visitedList = await screen.findByTestId("visitedList");
    expect(visitedList).toBeInTheDocument();
    const cityItems = within(visitedList).getAllByRole("listitem");
    expect(cityItems).toHaveLength(3);
  });

  it("dispatches deleteCity action on button click", async () => {
    (useAppSelector as Mock).mockImplementation((selectorFn) =>
      selectorFn({
        auth: {
          currentUser: {
            id: "12345",
          },
        },
        cities: {
          cities: {
            visited: [...mockCities],
            planned: [],
          },
          currentCity: mockCities[0],
          isLoading: false,
          error: null,
          isFetching: false,
        },
      })
    );

    renderVİsitedCities();

    const user = userEvent.setup();

    const visitedList = await screen.findByTestId("visitedList");
    const cityItems = within(visitedList).getAllByRole("listitem");
    const firstListItem = cityItems[0];
    const deleteButton = within(firstListItem).getByTitle("Remove city");

    const deleteCitySpy = vi.spyOn(citiesSlice, "deleteCity");

    await user.click(deleteButton);

    expect(deleteCitySpy).toHaveBeenCalledWith({
      userId: "12345",
      cityId: mockCities[2].id,
    });
    expect(deleteCitySpy).toHaveBeenCalledTimes(1);
  });
});
