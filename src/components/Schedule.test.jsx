import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Schedule from "./Schedule";

const selectableDate = new Date("2099-01-15T00:00:00Z");

vi.mock("../utils/calendar", () => {
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = ["January"];
  return {
    weekdays,
    months,
    buildMonth: () => [
      { date: new Date("2024-12-30T00:00:00Z"), inMonth: false },
      { date: selectableDate, inMonth: true },
    ],
  };
});

const baseProps = {
  monthCursor: new Date("2099-01-01T00:00:00Z"),
  setMonthCursor: vi.fn(),
  selectedDate: null,
  setSelectedDate: vi.fn(),
  currentCourseTitle: "React Fundamentals",
  onReserve: vi.fn(),
  notice: "",
  saving: false,
};

describe("Schedule component", () => {
  it("prevents reserving when no date is selected", () => {
    const props = { ...baseProps, onReserve: vi.fn() };
    render(<Schedule {...props} />);

    const button = screen.getByRole("button", { name: /reserve this date/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(props.onReserve).not.toHaveBeenCalled();
  });

  it("prevents reserving when no course is selected", () => {
    const props = {
      ...baseProps,
      currentCourseTitle: "",
      selectedDate: selectableDate,
      onReserve: vi.fn(),
    };
    render(<Schedule {...props} />);

    const button = screen.getByRole("button", { name: /reserve this date/i });
    expect(button).toBeDisabled();

    fireEvent.click(button);
    expect(props.onReserve).not.toHaveBeenCalled();
  });

  it("allows selecting available dates", () => {
    const props = { ...baseProps, setSelectedDate: vi.fn() };
    render(<Schedule {...props} />);

    fireEvent.click(screen.getByText(String(selectableDate.getUTCDate())));

    expect(props.setSelectedDate).toHaveBeenCalledWith(selectableDate);
  });

  it("enables reserve button when a date is selected", () => {
    const props = {
      ...baseProps,
      selectedDate: selectableDate,
      onReserve: vi.fn(),
    };
    render(<Schedule {...props} />);

    const button = screen.getByRole("button", { name: /reserve this date/i });
    expect(button).not.toBeDisabled();

    fireEvent.click(button);
    expect(props.onReserve).toHaveBeenCalledTimes(1);
  });
});
