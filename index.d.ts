// Type definitions for places-autocomplete-js

// This interface defines the configuration object for the constructor.
export interface PlacesAutocompleteOptions {
  /** The ID of the container element where the widget will be rendered. */
  containerId: string;

  /** Your Google Maps API key. */
  googleMapsApiKey: string;

  /** Optional Google Maps JavaScript API version (for example: "weekly", "quarterly", "beta"). */
  googleMapsApiVersion?: string;

  /**
   * Callback function that is invoked when a place is successfully selected and its details are fetched.
   * @param place The selected place details.
   */
  onResponse?: (place: PlaceResult) => void;

  /**
   * Callback function that is invoked when an error occurs.
   * @param error An object containing the error message.
   */
  onError?: (error: { message: any }) => void;

  /**
   * Optional parameters for the Google Places Autocomplete API request.
   * These are merged with the defaults.
   * e.g., { includedRegionCodes: ['US'], language: 'en-US' }
   */
  requestParams?: Record<string, any>;

  /**
   * Optional settings to control the UI and behavior of the widget.
   * e.g., { placeholder: 'Search...', debounce: 200 }
   */
  options?: Record<string, any>;

  /**
   * An array of fields to fetch when a place is selected.
   * Merged with the default fields: `['formattedAddress', 'addressComponents']`.
   * See Google Maps Place data fields documentation for all available options.
   */
  fetchFields?: string[];
}

// This interface describes the structure of a single address component.
export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
}

// This interface defines the structure of the place details object returned in the onResponse callback.
export interface PlaceResult {
  /** A list of components that form the address. */
  addressComponents: AddressComponent[];
  /** The full, human-readable address for this place. */
  formattedAddress: string;
  /** Allows for any other properties that might be fetched. */
  [key: string]: any;
}

// This declares the main class of the library.
export class PlacesAutocomplete {
  /**
   * Initializes a new instance of the PlacesAutocomplete widget.
   * @param config The configuration object for the widget.
   */
  constructor(config: PlacesAutocompleteOptions);

  /**
   * Dynamically updates the parameters for the Google Places Autocomplete API request.
   * @param params An object containing the API request parameters to update.
   */
  setRequestParams(params: Record<string, any>): void;

  /**
   * Dynamically updates the UI and behavior options of the widget.
   * @param options An object containing the UI and behavior options to update.
   */
  setOptions(options: Record<string, any>): void;

  /**
   * Dynamically updates the array of Place Data Fields to request when a place is selected.
   * @param fields An array of field names to fetch.
   */
  setFetchFields(fields: string[]): void;

  /**
   * Retrieves the current array of Place Data Fields that will be requested.
   * @returns The current array of fetch fields.
   */
  getFetchFields(): string[];

  /**
   * Retrieves the current request parameters being used by the instance.
   * @returns The current API request parameters.
   */
  getRequestParams(): Record<string, any>;

  /**
   * Retrieves the current UI and behavior options being used by the instance.
   * @returns The current UI and behavior options.
   */
  getOptions(): Record<string, any>;

  /**
   * Clears the input field, removes suggestions, and refreshes the session token.
   */
  clear(): void;

  /**
   * Programmatically focuses the autocomplete input element.
   */
  focus(): void;

  /**
   * Finds and selects a place for the provided coordinates.
   * Requires Geocoding API support in your Google project.
   */
  setInputValue(latitude: number, longitude: number): Promise<void>;

  /**
   * Removes all event listeners and DOM elements created by the widget.
   * This should be called to clean up the instance when it's no longer needed.
   */
  destroy(): void;
}
