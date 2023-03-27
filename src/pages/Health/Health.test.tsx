import { render, screen } from "@testing-library/react";
import Health from "./Health";
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { CURRENT_URL } from "../../services/api";

const server = setupServer(
    rest.get(`${CURRENT_URL}?q=London`, (req, res, ctx) => {  
      return res(ctx.status(200));
    }));
  
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

test("renders title", async () => {
    render(<Health />);
    const title = screen.getByText(/API Health Check/i);
    expect(title).toBeInTheDocument();
});

test("renders correct message when API is available", async () => {
    render(<Health />);
    expect(await screen.findByText(/Weather API is responding correctly/i)).toBeInTheDocument();
 });

 test("renders correct message when API is not available", async () => {
    server.use(
        rest.get(`${CURRENT_URL}?q=London`, (req, res, ctx) => {  
            return res(ctx.status(500));
          }));
    render(<Health />);
    expect(await screen.findByText(/There is a problem with Weather API at this time./i)).toBeInTheDocument();
 });
