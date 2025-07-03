import { render, screen, waitFor } from "@testing-library/react";
import { mockCityPlanned } from "../../../test/mocks/mockCities";
import { CityItem } from "./CityItem";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as citiesSlice from "../citiesSlice";
import userEvent from "@testing-library/user-event";
import { createTestStore } from "../../../test/mocks/testStore";

const renderCityItem = () => {
  render(
    <Provider store={createTestStore()}>
      <BrowserRouter>
        <CityItem city={mockCityPlanned} />
      </BrowserRouter>
    </Provider>
  );
};

describe("CityItem component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    renderCityItem();
  });

  it("renders elements correctly", () => {
    const link = screen.getByRole("link");
    const cityName = screen.getByRole("heading", {
      name: mockCityPlanned.cityName,
    });
    const countryFlag = screen.getByAltText(mockCityPlanned.countryCode);
    const date = screen.getByTestId("date");
    const deleteButton = screen.getByTitle("Remove city");

    expect(cityName).toBeInTheDocument();
    expect(countryFlag).toBeInTheDocument();
    expect(date).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      "href",
      `/app/cities/${mockCityPlanned.id}?lat=${mockCityPlanned.position.lat}&lng=${mockCityPlanned.position.lng}`
    );
  });

  it("applies correct styles for current city", () => {
    const link = screen.getByRole("link");
    expect(link).toHaveClass("border-2 border-green-400");
  });

  it("dispatches deleteCity action on button click", async () => {
    const user = userEvent.setup();
    const deleteCitySpy = vi.spyOn(citiesSlice, "deleteCity");
    const deleteButton = screen.getByTitle("Remove city");

    await user.click(deleteButton);

    expect(deleteCitySpy).toHaveBeenCalledWith({
      userId: "12345",
      cityId: mockCityPlanned.id,
    });

    await waitFor(() => {
      expect(deleteCitySpy).toHaveBeenCalledTimes(1);
    });
  });
});
