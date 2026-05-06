import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ApplicationsList from "../ApplicationsList";

const mockApplicants = [
  {
    id: 1,
    applicant: {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "1234567890",
    },
    product: {
      name: "Fixed Mortgage",
    },
  },
  {
    id: 2,
    applicant: {
      firstName: "Jane",
      lastName: "Smith",
      email: "jane@example.com",
      phone: "9876543210",
    },
    product: {
      name: "Variable Mortgage",
    },
  },
];

describe("ApplicationsList", () => {
  it("renders table headers", () => {
    render(
      <ApplicationsList
        applicants={[]}
        onEdit={jest.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Product")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(
      <ApplicationsList
        applicants={[]}
        onEdit={jest.fn()}
        isLoading={true}
      />
    );

    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders empty state when no applicants and not loading", () => {
    render(
      <ApplicationsList
        applicants={[]}
        onEdit={jest.fn()}
        isLoading={false}
      />
    );

    // tbody row still exists but no data rows
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBeGreaterThan(1); // header + empty row
  });

  it("renders applicant rows correctly", () => {
    render(
      <ApplicationsList
        applicants={mockApplicants}
        onEdit={jest.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("1234567890")).toBeInTheDocument();
    expect(screen.getByText("Fixed Mortgage")).toBeInTheDocument();

    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText("jane@example.com")).toBeInTheDocument();
    expect(screen.getByText("9876543210")).toBeInTheDocument();
    expect(screen.getByText("Variable Mortgage")).toBeInTheDocument();
  });

  it("calls onEdit when Edit button is clicked", async () => {
    const user = userEvent.setup();
    const onEdit = jest.fn();

    render(
      <ApplicationsList
        applicants={mockApplicants}
        onEdit={onEdit}
        isLoading={false}
      />
    );

    const buttons = screen.getAllByRole("button", { name: /edit/i });

    await user.click(buttons[0]);

    expect(onEdit).toHaveBeenCalledWith(mockApplicants[0]);
  });

  it("handles undefined onEdit safely", async () => {
    const user = userEvent.setup();

    render(
      <ApplicationsList
        applicants={mockApplicants}
        onEdit={undefined as any}
        isLoading={false}
      />
    );

    const button = screen.getAllByRole("button", { name: /edit/i })[0];

    await user.click(button);

    // no crash = pass
    expect(button).toBeInTheDocument();
  });
});