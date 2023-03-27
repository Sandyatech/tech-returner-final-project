import { render, screen, waitFor } from "@testing-library/react";
// import user from "@testing-library/user-event";
import Historical from "./Historical";

test("renders title", () => {
    render(<Historical />);
    const title = screen.getByText(/History Weather on/i);
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
        const title = screen.getByText(/History Weather on 202/i);
        expect(title).toBeInTheDocument();
    });
});
