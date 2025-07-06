vi.mock("../mocks/google.maps");

import { PlacesAutocomplete } from "../PlacesAutocomplete"; // Adjust path if needed

describe("PlacesAutocomplete Constructor", () => {
  let mockContainer;
  let mockAutocompleteServiceInstance; // To hold the instance of AutocompleteService
  let mockPlaceInstance; // To hold the instance of Place

  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers for all tests
    // Reset mocks before each test
    vi.clearAllMocks();

    // Create a mock for AutocompleteService instance
    mockAutocompleteServiceInstance = {
      getPlacePredictions: vi.fn(),
    };

    // Create a mock for Place instance
    mockPlaceInstance = {
      fetchFields: vi.fn(() => Promise.resolve()),
      toJSON: vi.fn(() => ({})), // Default to an empty object
    };

    // Explicitly define global.google for each test
    global.google = {
      maps: {
        places: {
          // Mock AutocompleteService as a constructor that returns our mock instance
          AutocompleteService: vi.fn(() => mockAutocompleteServiceInstance),
          PlacesServiceStatus: {
            OK: "OK",
            ZERO_RESULTS: "ZERO_RESULTS",
          },
          AutocompleteSessionToken: vi.fn(() => ({})), // Ensure this is a mock constructor
          AutocompleteSuggestion: {
            fetchAutocompleteSuggestions: vi.fn(() =>
              Promise.resolve({ suggestions: [] })
            ),
          },
          Place: vi.fn(() => mockPlaceInstance), // Mock the Place constructor
        },
        importLibrary: vi.fn(() => Promise.resolve()),
      },
    };

    // Create a mock DOM element for the container
    mockContainer = document.createElement("div");
    mockContainer.id = "test-container";
    document.body.appendChild(mockContainer);

    // Mock _loadGoogleMapsApi to prevent actual API loading
    vi.spyOn(
      PlacesAutocomplete.prototype,
      "_loadGoogleMapsApi"
    ).mockImplementation(() => Promise.resolve());

    // Do NOT mock _init or _initialiseDebouncedRequest globally. Let them run naturally.
  });

  afterEach(() => {
    // Clean up the mock DOM element
    document.body.removeChild(mockContainer);
    vi.useRealTimers(); // Restore real timers after each test
  });

  it("1: should throw an error if containerId is missing", () => {
    expect(() => {
      new PlacesAutocomplete({ googleMapsApiKey: "TEST_API_KEY" });
    }).toThrow(
      "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
    );
  });

  it("2: should throw an error if googleMapsApiKey is missing", () => {
    expect(() => {
      new PlacesAutocomplete({ containerId: "test-container" });
    }).toThrow(
      "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
    );
  });

  it("2: should throw an error if container element is not found", () => {
    // Remove the mock container to simulate it not being found
    let containerId = "non-existent-container";
    expect(() => {
      new PlacesAutocomplete({
        containerId: "non-existent-container",
        googleMapsApiKey: "TEST_API_KEY",
      });
    }).toThrow(
      `PacAutocomplete: Container element with ID "${containerId}" not found.`
    );
  });

  it("3: should initialize with default options and request parameters", async () => {
    const autocomplete = new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
    });

    await vi.runAllTimers(); // Allow _init to complete

    // Check if default options are applied
    expect(autocomplete.getOptions().autofocus).toBe(false);
    expect(autocomplete.getOptions().placeholder).toBe(
      "Start typing your address ..."
    );
    expect(autocomplete.getOptions().debounce).toBe(100);

    // Check if default request parameters are applied
    expect(autocomplete.getRequestParams().input).toBe("");
    expect(autocomplete.getRequestParams().includedRegionCodes).toEqual(["GB"]);
    expect(autocomplete.getRequestParams().language).toBe("en-gb");
  });

  it("4: should merge user-provided options and request parameters", async () => {
    const customOptions = {
      autofocus: true,
      placeholder: "Enter address here",
      debounce: 500,
      classes: { input: "my-custom-input" },
    };
    const customRequestParams = {
      language: "fr",
      region: "FR",
      includedRegionCodes: ["FR"],
    };

    const autocomplete = new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
      options: customOptions,
      requestParams: customRequestParams,
    });

    await vi.runAllTimers(); // Allow _init to complete

    // Verify options are merged
    expect(autocomplete.getOptions().autofocus).toBe(true);
    expect(autocomplete.getOptions().placeholder).toBe("Enter address here");
    expect(autocomplete.getOptions().debounce).toBe(500);
    expect(autocomplete.getOptions().classes.input).toBe("my-custom-input");
    // Ensure other default classes are still present if not overridden
    expect(autocomplete.getOptions().classes.container).toBe(
      "relative z-10 transform rounded-xl mt-4"
    );

    // Verify request parameters are merged
    expect(autocomplete.getRequestParams().language).toBe("fr");
    expect(autocomplete.getRequestParams().region).toBe("FR");
    expect(autocomplete.getRequestParams().includedRegionCodes).toEqual(["FR"]);
  });

  it("5: should call _initialiseDebouncedRequest and _init", async () => {
    const initSpy = vi.spyOn(PlacesAutocomplete.prototype, "_init");
    const initialiseDebouncedRequestSpy = vi.spyOn(
      PlacesAutocomplete.prototype,
      "_initialiseDebouncedRequest"
    );

    new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
    });

    await vi.runAllTimers(); // Allow _init to complete

    expect(initialiseDebouncedRequestSpy).toHaveBeenCalledTimes(1);
    expect(initSpy).toHaveBeenCalledTimes(1);

    initSpy.mockRestore();
    initialiseDebouncedRequestSpy.mockRestore();
  });

  it("6: should set custom fetchFields if provided", async () => {
    const customFetchFields = ["name", "geometry"];
    const autocomplete = new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
      fetchFields: customFetchFields,
    });

    await vi.runAllTimers(); // Allow _init to complete

    // Expect default fields plus custom fields, with no duplicates
    expect(autocomplete.getFetchFields()).toEqual(
      expect.arrayContaining([
        "formattedAddress",
        "addressComponents",
        "name",
        "geometry",
      ])
    );
    expect(autocomplete.getFetchFields().length).toBe(4); // Ensure no unexpected additions
  });

  it("7: should create an input element within the container", async () => {
    new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
    });

    await vi.runAllTimers(); // Allow _init to complete

    const inputElement = mockContainer.querySelector("input");
    expect(inputElement).not.toBeNull();
    expect(inputElement.placeholder).toBe("Start typing your address ..."); // Check default placeholder
  });

  it("8: should use default callbacks if onResponse and onError are not provided", async () => {
    const consoleInfoSpy = vi
      .spyOn(console, "info")
      .mockImplementation(() => {});
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    const autocomplete = new PlacesAutocomplete({
      containerId: "test-container",
      googleMapsApiKey: "TEST_API_KEY",
    });

    await vi.runAllTimers(); // Allow _init to complete

    // Now, mock the fetchAutocompleteSuggestions method
    google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions.mockImplementation(
      (request) => {
        // Simulate a successful response
        return Promise.resolve({
          suggestions: [
            {
              description: "Mock Place",
              placePrediction: {
                toPlace: () => mockPlaceInstance,
                text: { text: "Mock Place", matches: [] },
              },
            },
          ],
        });
      }
    );

    // Mock the toJSON method of the mockPlaceInstance
    mockPlaceInstance.toJSON.mockReturnValue({
      formattedAddress: "Mock Place",
    });

    const inputElement = mockContainer.querySelector("input");
    expect(inputElement).not.toBeNull(); // Ensure input element exists

    // Simulate input event
    inputElement.value = "Test query";
    inputElement.dispatchEvent(new Event("input"));

    // Advance timers to trigger the debounced request
    vi.runAllTimers();

    // Assert that fetchAutocompleteSuggestions was called
    expect(
      google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions
    ).toHaveBeenCalledTimes(1);
    expect(
      google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions
    ).toHaveBeenCalledWith(expect.objectContaining({ input: "Test query" }));

    // Simulate a place selection to trigger onResponse
    await autocomplete._onPlaceSelected(mockPlaceInstance); // Call the private method directly

    // Assert default onResponse callback behavior
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "---------Default onResponse not provided---------"
    );
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      "Selected Place:",
      JSON.stringify({ formattedAddress: "Mock Place" }, null, 2)
    );

    // Simulate an error response
    google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions.mockImplementation(
      (request) => {
        return Promise.reject(new Error("API Error"));
      }
    );

    // Clear previous console calls for the next assertion
    consoleInfoSpy.mockClear();
    consoleErrorSpy.mockClear();
    google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions.mockClear();

    inputElement.value = "Error query";
    inputElement.dispatchEvent(new Event("input"));
    vi.runAllTimers();
    await vi.runAllTimers(); // Ensure promise rejection is handled

    // Assert default onError callback behavior
    expect(
      google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions
    ).toHaveBeenCalledTimes(1); // Ensure it was called again
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "---------Default onError not provided---------"
    );
    // The actual error object might be different, so we check for a generic Error
    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "PAC Error:",
      expect.any(Error)
    );

    consoleInfoSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
});
