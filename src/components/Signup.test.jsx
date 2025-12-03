import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import Signup from "./Signup";

const firestore = vi.hoisted(() => ({
  addDoc: vi.fn(),
  collection: vi.fn(),
  onSnapshot: vi.fn(),
  serverTimestamp: vi.fn(() => ({ seconds: 123 })),
}));

const dbMock = vi.hoisted(() => ({}));

vi.mock("../lib/firebase", () => ({
  db: dbMock,
}));

vi.mock("firebase/firestore", () => firestore);

describe("Signup component", () => {
  beforeEach(() => {
    firestore.addDoc.mockReset();
    firestore.collection.mockReset();
    firestore.onSnapshot.mockReset();
    firestore.serverTimestamp.mockClear();

    firestore.collection.mockReturnValue({ path: "leads" });
    firestore.onSnapshot.mockImplementation((_col, cb) => {
      cb({ docs: [] });
      return vi.fn();
    });
  });

  it("sends lead info to Firestore when form submits", async () => {
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "Jane" } });
    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: "jane@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /notify me/i }));

    await waitFor(() => expect(firestore.addDoc).toHaveBeenCalledTimes(1));

    const [, payload] = firestore.addDoc.mock.calls[0];
    expect(payload).toMatchObject({
      name: "Jane",
      email: "jane@example.com",
      from: "landing",
    });
    expect(payload.ts).toEqual({ seconds: 123 });
  });

  it("shows an error notice when Firestore call fails", async () => {
    firestore.addDoc.mockRejectedValueOnce(new Error("Network down"));
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/email address/i), { target: { value: "bad@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /notify me/i }));

    await waitFor(() => expect(screen.getByText(/something went wrong/i)).toBeInTheDocument());
  });

  it("blocks submission when email is empty", async () => {
    render(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: "No Email" } });
    fireEvent.click(screen.getByRole("button", { name: /notify me/i }));

    await waitFor(() => expect(firestore.addDoc).not.toHaveBeenCalled());
  });
});
