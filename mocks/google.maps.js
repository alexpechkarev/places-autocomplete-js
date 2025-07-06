const mockAutocompleteSuggestion = {
  fetchAutocompleteSuggestions: vi.fn(() =>
    Promise.resolve({ suggestions: [] })
  ),
  toPlace: vi.fn(() => ({
    fetchFields: vi.fn(() => Promise.resolve()),
    toJSON: vi.fn(() => ({ formattedAddress: "Mock Address" })),
  })),
};

const mockPlaces = {
  AutocompleteSuggestion: mockAutocompleteSuggestion,
  AutocompleteSessionToken: vi.fn(() => ({})),
  AutocompleteService: vi.fn(() => ({
    getPlacePredictions: vi.fn(),
  })),
  PlacesServiceStatus: {
    OK: "OK",
    ZERO_RESULTS: "ZERO_RESULTS",
  },
};

const mockMaps = {
  places: mockPlaces,
  importLibrary: vi.fn(() => Promise.resolve()),
};

global.google = {
  maps: mockMaps,
};