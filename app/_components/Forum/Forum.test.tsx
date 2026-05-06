import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Forum from "../Forum";
import { act } from 'react';

const mockApplicant = {
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  phone: "1234567890",
};

describe("Forum component", () => {
  it("renders all input fields", () => {
    render(<Forum onSubmit={jest.fn()} />);

    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
  });

  it("pre-fills form when applicant prop is provided", () => {
    render(<Forum onSubmit={jest.fn()} applicant={mockApplicant} />);

    expect(screen.getByDisplayValue("John")).toBeInTheDocument();
    expect(screen.getByDisplayValue("Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@example.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
  });

  it("shows validation errors when submitting empty form", async () => {
    const user = userEvent.setup();
    render(<Forum onSubmit={jest.fn()} />);

    await user.click(screen.getByRole("button", { name: /save applicant info/i }));

    expect(screen.getByText("First name is required")).toBeInTheDocument();
    expect(screen.getByText("Last name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(screen.getByText("Phone is required")).toBeInTheDocument();
  });

  it("updates input values on change", async () => {
    const user = userEvent.setup();
    render(<Forum onSubmit={jest.fn()} />);

    const firstNameInput = screen.getByRole("textbox", { name: /first name/i });

    await user.type(firstNameInput, "Alice");

    expect(firstNameInput).toHaveValue("Alice");
  });

  it("calls onSubmit with correct data when form is valid", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn().mockResolvedValue(true);

    render(<Forum onSubmit={onSubmit} />);

    await user.type(screen.getByLabelText(/First name/i), "John");
    await user.type(screen.getByLabelText(/Last name/i), "Doe");
    await user.type(screen.getByLabelText(/Email/i), "john@example.com");
    await user.type(screen.getByLabelText(/Phone/i), "1234567890");

    await act(async() => {
      await user.click(screen.getByRole("button", { name: /save applicant info/i }));
    });
    

    expect(onSubmit).toHaveBeenCalledWith({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
    });
  });

  it("does not call onSubmit if validation fails", async () => {
    const user = userEvent.setup();
    const onSubmit = jest.fn();

    render(<Forum onSubmit={onSubmit} />);

    await user.click(screen.getByRole("button"));

    expect(onSubmit).not.toHaveBeenCalled();
  });
});