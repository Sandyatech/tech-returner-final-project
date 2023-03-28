import { render, screen } from "@testing-library/react";
import Health from "./Health";
import { rest } from 'msw';
import { setupServer } from 'msw/node'
import { CURRENT_URL } from "../../services/api";

const server = setupServer(
    rest.get(`${CURRENT_URL}`, (req, res, ctx) => {  
      return res(ctx.status(200));
    }));
  
  beforeAll(() => server.listen({ onUnhandledRequest: "bypass" }));;
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());

test("renders title", async () => {
    render(<Health />);
    const title = screen.getByText(/API Health Check/i);
    expect(title).toBeInTheDocument();
});

test("renders correct message when API is available (status code 200)", async () => {
    render(<Health />);
    expect(await screen.findByText(/Weather API is responding correctly/i)).toBeInTheDocument();
 });

 test("renders correct message when API is not available (status code 500)", async () => {
    server.use(
        rest.get(`${CURRENT_URL}`, (req, res, ctx) => {             
            return res(ctx.status(500));            
          }));
    render(<Health />);
    expect(await screen.findByText(/Internal server error/i)).toBeInTheDocument();
 });

 test("renders correct message when API is not available (other status code)", async () => {
    server.use(
        rest.get(`${CURRENT_URL}`, (req, res, ctx) => {             
            return res(ctx.status(400));            
          }));
    render(<Health />);
    expect(await screen.findByText(/There is a problem/i)).toBeInTheDocument();
    expect(await screen.findByText(/400/i)).toBeInTheDocument();
 });

 test("renders correct message when an error occurs", async () => {
    server.use(
        rest.get(`${CURRENT_URL}`, (req, res, ctx) => {          
            return res(ctx.status(500),ctx.json({
                error: "error"
              }));            
          }));
    render(<Health />);
    expect(await screen.findByText(/Error./i)).toBeInTheDocument();
 });
