import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Card from "./Card";

const mockProduct = {
  id: 1,
  name: "Test Product",
  type: "FIXED",
  bestRate: 2.5,
};

describe("Card component", () => {
  it("renders product details correctly", () => {
    render(<Card product={mockProduct} />);

    expect(screen.getByText("FIXED")).toBeInTheDocument();
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("2.5%")).toBeInTheDocument();
  });

  it("renders 'Best fixed' when isBestRate is true", () => {
    render(<Card product={mockProduct} isBestRate />);

    expect(screen.getByText("Best fixed")).toBeInTheDocument();
  });

  it("does not render 'Best fixed' when isBestRate is false", () => {
    render(<Card product={mockProduct} isBestRate={false} />);

    expect(screen.queryByText("Best fixed")).not.toBeInTheDocument();
  });

  it("calls onClick when button is clicked", () => {
    const handleClick = jest.fn();

    render(<Card product={mockProduct} onClick={handleClick} />);

    fireEvent.click(screen.getByRole("button"));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("shows loading spinner and text when loading and selected", () => {
    render(
      <Card
        product={mockProduct}
        isLoading={true}
        selectedProduct={1}
      />
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("disables button when loading but not selected product", () => {
    render(
      <Card
        product={mockProduct}
        isLoading={true}
        selectedProduct={999}
      />
    );

    expect(screen.getByRole("button")).toBeDisabled();
  });

  it("enables button when loading and selected product matches", () => {
    render(
      <Card
        product={mockProduct}
        isLoading={true}
        selectedProduct={1}
      />
    );

    expect(screen.getByRole("button")).not.toBeDisabled();
  });

  it("shows 'Select this product' when not loading", () => {
    render(<Card product={mockProduct} isLoading={false} />);

    expect(screen.getByText("Select this product")).toBeInTheDocument();
  });

  it("applies custom className", () => {
    const { container } = render(
      <Card product={mockProduct} className="custom-class" />
    );

    expect(container.firstChild).toHaveClass("custom-class");
  });

  it("handles undefined product gracefully", () => {
    render(<Card product={undefined} />);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});