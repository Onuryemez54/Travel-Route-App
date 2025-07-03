import { render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CityTour from "../CityTour";
import { Provider } from "react-redux";
import { createServer } from "../../test/server";
import { store } from "../../app/store";
import {
  mockPlaceDetail,
  mockPlacesList,
  mockWikiInfo,
} from "../../test/mocks/cityTourMocks";
import userEvent from "@testing-library/user-event";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useParams: vi.fn(() => ({ cityName: "Istanbul" })),
  };
});

createServer([
  {
    method: "get",
    path: "https://en.wikipedia.org/api/rest_v1/page/summary/:place",
    res: (req) => {
      return mockWikiInfo(req.params.place as string);
    },
  },
  {
    method: "get",
    path: "https://api.opentripmap.com/0.1/en/places/radius",
    res: () => mockPlacesList,
  },
  {
    method: "get",
    path: "https://api.opentripmap.com/0.1/en/places/xid/:xid",
    res: () => mockPlaceDetail,
  },
]);

const renderComponent = () =>
  render(
    <MemoryRouter initialEntries={["/cities/Istanbul"]}>
      <Provider store={store}>
        <Routes>
          <Route path="/cities/:cityName" element={<CityTour />} />
        </Routes>
      </Provider>
    </MemoryRouter>
  );

describe("CityTour Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderComponent();
  });

  it("renders loading loader initially", () => {
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("renders wikiInfo ", async () => {
    const title = await screen.findByTestId("title");
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent("Istanbul");

    const description = await screen.findByText(/Istanbul largest city/i);
    expect(description).toBeInTheDocument();

    const extract = await screen.findByTestId("city-extract");
    expect(extract).toBeInTheDocument();
    expect(extract).toHaveTextContent(/a major city/i);
  });

  it("renders places list", async () => {
    const placesList = await screen.findByTestId("list");
    expect(placesList).toBeInTheDocument();

    const listItems = await within(placesList).findAllByRole("listitem");
    expect(listItems).toHaveLength(mockPlacesList.length);

    expect(listItems[0]).toHaveTextContent("Blue Mosque");
    expect(listItems[1]).toHaveTextContent("Hagia Sophia");
  });

  it("selects a place and displays its details", async () => {
    const user = userEvent.setup();

    const placesList = await screen.findByTestId("list");
    const firstPlace = within(placesList).getByText("Blue Mosque");
    expect(firstPlace).toBeInTheDocument();

    await user.click(firstPlace);

    const placeDetail = await screen.findByTestId("placeDetail");
    expect(placeDetail).toBeInTheDocument();

    const detailExtract = within(placeDetail).getByTestId("extract");
    expect(detailExtract).toBeInTheDocument();
    expect(detailExtract).toHaveTextContent(/An iconic mosque/i);
  });
});
