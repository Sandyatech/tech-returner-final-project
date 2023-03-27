import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
// import user from "@testing-library/user-event";
import Historical from "./Historical";

test("renders title", () => {
    render(<Historical />);

    const title = screen.getByText(/History Weather on/i);
    expect(title).toBeInTheDocument();
});
