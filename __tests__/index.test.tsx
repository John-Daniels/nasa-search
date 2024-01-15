/**
 * @jest-environment jsdom
 */
import Home from "@/components/home";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";

describe("Home", () => {
  it('renders search results after searching for "john"', async () => {
    render(<Home />);

    // Find the input field
    const searchInput = screen.getByPlaceholderText("Search the universe...");

    // Simulate typing "john" in the search input
    fireEvent.change(searchInput, { target: { value: "john" } });

    // Find and click the submit button
    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    // Wait for the search results to be rendered
    await waitFor(() => {
      // Check if at least 4 items are rendered in the results
      const searchResults = screen.getAllByClassName("media-card"); // Adjust class name accordingly
      expect(searchResults.length).toBeGreaterThanOrEqual(4);
    });
  });
});
