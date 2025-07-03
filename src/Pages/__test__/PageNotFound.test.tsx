import { BrowserRouter } from "react-router-dom";
import PageNotFound from "../PageNotFound";
import { render, screen } from "@testing-library/react";

const renderComponent = () => {
  render(
    <BrowserRouter>
      <PageNotFound />
    </BrowserRouter>
  );
};

describe("PageNotFound Component", () => {
  beforeEach(() => {
    renderComponent();
  });

  it("renders correctly", () => {
    const errorCode = screen.getByText("404");
    const errorMessage = screen.getByText("Page Not Found");
    const description = screen.getByTestId("error-message");
    const link = screen.getByRole("link", { name: /go to/i });
    expect(errorCode).toBeInTheDocument();
    expect(errorMessage).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(link).toBeInTheDocument();
  });
  it("has the correct link to the homepage", () => {
    const link = screen.getByRole("link", { name: /go to/i });
    expect(link).toHaveAttribute("href", "/");
  });
});
