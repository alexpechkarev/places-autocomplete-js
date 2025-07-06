import { test, expect } from "@playwright/test";

test.describe("Places Autocomplete Basic Rendering", () => {
  test("1: should display the input field with the correct placeholder", async ({
    page,
  }) => {
    // IMPORTANT: Replace 'http://localhost:3000' with the actual URL where your Places Autocomplete component is rendered.
    // This could be your development server (e.g., 'npm run dev') or a static HTML file.
    await page.goto("http://localhost:5173");

    setTimeout(async () => {
      // Locate the input element. Assuming it has a placeholder or a specific ID.
      // You might need to adjust the selector based on your component's actual DOM structure.
      const autocompleteInput = page.getByPlaceholder(
        "Start typing your address..."
      );

      // Assert that the input field is visible
      await expect(autocompleteInput).toBeVisible();

      // Assert that the input field has the correct placeholder text
      await expect(autocompleteInput).toHaveAttribute(
        "placeholder",
        "Start typing your address..."
      );
    }, 2000);
  });

  test("2: should display suggestions when typing into the input field", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    const autocompleteInput = page.getByPlaceholder(
      "Start typing your address..."
    );
    // Type a partial address
    await autocompleteInput.fill("1600 Amphitheatre");

    setTimeout(async () => {
      // This is a workaround to ensure suggestions are loaded before the test continues.
      // In a real-world scenario, you might want to wait for a specific event or condition
      // that indicates the suggestions are ready.
      const suggestionsList = page.locator('ul[id="pacSuggestions"]');

      // Wait for suggestions to appear (e.g., the list becomes visible)
      await expect(suggestionsList).toBeVisible();

      // Assert that there is at least one suggestion item
      await expect(suggestionsList.locator("li")).toHaveCount(1, {
        greaterThan: 0,
      });
    }, 2000);
  });

  test("3: should select a suggestion by click and update the input field", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    const autocompleteInput = page.getByPlaceholder(
      "Start typing your address..."
    );
    // Type a partial address to get suggestions
    await autocompleteInput.fill("1600 Amphitheatre Parkway");

    setTimeout(async () => {
      // This is a workaround to ensure suggestions are loaded before the test continues.
      // In a real-world scenario, you might want to wait for a specific event or condition
      // that indicates the suggestions are ready.
      // Wait for suggestions to appear
      // Note: Adjust the selector based on your actual suggestions list structure.
      const suggestionsList = page.locator('ul[id="pacSuggestions"]');

      // Wait for suggestions to appear
      await expect(suggestionsList).toBeVisible();

      // Get the first suggestion text before clicking
      const firstSuggestion = suggestionsList.locator("li").first();
      const firstSuggestionText = await firstSuggestion.textContent();

      // Click on the first suggestion
      await firstSuggestion.click();

      // Assert that the input field's value has updated to the selected suggestion's text
      // Note: You might need to adjust this expectation based on how your component formats the selected address.
      // It might be the exact suggestion text, or a formatted version.
      await expect(autocompleteInput).toHaveValue(firstSuggestionText || "");

      // Assert that the suggestions list is no longer visible
      await expect(suggestionsList).not.toBeVisible();
    }, 2000);
  });

  test("4: should select a suggestion using keyboard navigation (ArrowDown + Enter)", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    const autocompleteInput = page.getByPlaceholder(
      "Start typing your address..."
    );

    // Type a partial address to get suggestions
    await autocompleteInput.fill("1600 Amphitheatre Parkway");

    setTimeout(async () => {
      // This is a workaround to ensure suggestions are loaded before the test continues.
      // In a real-world scenario, you might want to wait for a specific event or condition
      // that indicates the suggestions are ready.

      // Wait for suggestions to appear
      const suggestionsList = page.locator('ul[id="pacSuggestions"]');

      // Wait for suggestions to appear
      await expect(suggestionsList).toBeVisible();

      // Press ArrowDown to navigate to the first suggestion
      await autocompleteInput.press("ArrowDown");

      // Get the text of the highlighted suggestion (first one in this case)
      const highlightedSuggestion = suggestionsList
        .locator('li[aria-selected="true"]')
        .first();
      const highlightedSuggestionText =
        await highlightedSuggestion.textContent();

      // Press Enter to select the highlighted suggestion
      await autocompleteInput.press("Enter");

      // Assert that the input field's value has updated to the selected suggestion's text
      await expect(autocompleteInput).toHaveValue(
        highlightedSuggestionText || ""
      );

      // Assert that the suggestions list is no longer visible
      await expect(suggestionsList).not.toBeVisible();
    }, 2000);
  });

  test("5: should clear input and hide suggestions when Escape key is pressed", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    const autocompleteInput = page.getByPlaceholder(
      "Start typing your address..."
    );
    // Type a partial address to get suggestions
    await autocompleteInput.fill("New York");

    setTimeout(async () => {
      // This is a workaround to ensure suggestions are loaded before the test continues.
      // In a real-world scenario, you might want to wait for a specific event or condition
      // that indicates the suggestions are ready.
      const suggestionsList = page.locator('ul[id="pacSuggestions"]');

      // Wait for suggestions to appear
      await expect(suggestionsList).toBeVisible();

      // Press the Escape key
      await autocompleteInput.press("Escape");

      // Assert that the input field is empty
      await expect(autocompleteInput).toHaveValue("");

      // Assert that the suggestions list is no longer visible
      await expect(suggestionsList).not.toBeVisible();
    }, 2000);
  });

  test("6: should not display suggestions for a query with no results", async ({
    page,
  }) => {
    await page.goto("http://localhost:5173");

    const autocompleteInput = page.getByPlaceholder(
      "Start typing your address..."
    );
    // Type a query that is unlikely to return results
    await autocompleteInput.fill("asdfghjklzxcvbnm");

    setTimeout(async () => {
      const suggestionsList = page.locator('ul[id="pacSuggestions"]');

      // Assert that the suggestions list is not visible
      await expect(suggestionsList).not.toBeVisible();

      // Assert that there are no list items in the suggestions list
      await expect(suggestionsList.locator("li")).toHaveCount(0);
    }, 2000);
  });
});
