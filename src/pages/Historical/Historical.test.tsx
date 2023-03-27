import { render, screen, waitFor } from "@testing-library/react";
// import user from "@testing-library/user-event";
import Historical from "./Historical";

test("renders title", () => {
    render(<Historical />);
    const title = screen.getByText(/Historical weather for/i);
    expect(title).toBeInTheDocument();
});

test("renders buttons", () => {
    render(<Historical />);
    const button_prev = screen.getByText("Prev. Day", { selector: "button" });
    expect(button_prev).toBeInTheDocument();
    const button_next = screen.getByText("Next Day", { selector: "button" });
    expect(button_next).toBeInTheDocument();
});

test("renders updated chart title after API request", async () => {
    render(<Historical />);
    await waitFor(() => {
        // note: Historical weather for {city} on {date} (2023-03-26)
        const title = screen.getByText(/on 202/i);
        expect(title).toBeInTheDocument();
    });
});
