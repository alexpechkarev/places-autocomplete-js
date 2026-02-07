import "./places-autocomplete.css";

/**
 * A flexible and customisable Places Autocomplete widget powered by the Google Maps Places API.
 *
 * Features:
 * - Dynamic Google Maps API loading
 * - Debounced input for optimized API requests
 * - Keyboard navigation (Arrow keys, Enter, Escape)
 * - Session token management for cost-effective API usage
 * - Customizable styling and behavior
 *
 * @author Alexander Pechkarev <alexpechkarev@gmail.com>
 * @license MIT
 */
export class PlacesAutocomplete {
  // --- Private Properties (using # or _ prefix by convention) ---
  #containerId; // Container ID where the autocomplete widget will be rendered.
  #pacEl;
  #googleMapsApiKey;
  #googleMapsApiVersion;
  #options;
  #request;
  #inputElement;
  #container;
  #ul;
  #kbdEscape;
  #kbdUp;
  #kbdDown;
  #allSuggestions = [];
  #currentSuggestion = -1;
  #onDataCallback; // For user-provided data callback
  #onErrorCallback; // For user-provided error callback
  #debouncedMakeAcRequest; // Declare without initializing here
  #defaultOptions = {
    // Default options for the autocomplete widget.
    autofocus: false, // Automatically focus the input on load.
    autocomplete: "off", // HTML autocomplete attribute for the input.
    placeholder: "Start typing your address ...", // Placeholder text for the input.
    distance: false, // Show distance in suggestions (requires origin in request).
    distance_units: "km", // Units for distance ('km' or 'miles').
    label: "", // Optional label text above the input.
    debounce: 100, // Debounce delay (ms) for API requests.
    clear_input: false, // Clear input .
    debug: false, // Enable debug mode (not implemented in this version).
    response_type: "json", // Return format: 'json' for JSON object, 'place' for Google Maps Place instance.
    show_place_type: false, // Display place type icons (mutually exclusive with distance).
  };
  #defaultClasses = {
    // CSS classes for various parts of the widget.
    section: "", // Outer section container.
    container: "pac-container", // "relative z-10 transform rounded-xl mt-4", // Main container div.
    icon_container: "pac-icon-container", //"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", // Container for the search icon.
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="pac-w-5 pac-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>', // SVG for the search icon.
    input: "pac-input", //"border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 px-4 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm", // Input field.
    kbd_container: "pac-kbd-container", //"absolute inset-y-0 right-0 flex py-1.5 pr-1.5", // Container for keyboard hints.
    kbd_escape: "pac-kbd-escape", //"inline-flex items-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-8 mr-1", // Escape key hint.
    kbd_up: "pac-kbd-up", //"inline-flex items-center justify-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-6", // Up arrow key hint.
    kbd_down: "pac-kbd-down", //"inline-flex items-center rounded border border-gray-400 px-1 font-sans text-xs text-gray-500 justify-center w-6", // Down arrow key hint.
    kbd_active: "pac-kbd-active", //"bg-indigo-500 text-white", // Class for active keyboard hint.
    ul: "pac-ul", //"absolute z-50 -mb-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100", // Suggestions list (ul).
    li: "pac-li", //"z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900 hover:bg-indigo-500 hover:text-white", // Suggestion item (li).
    li_current: "pac-li-current", //"bg-indigo-500", // Class for the currently selected suggestion item.
    li_button: "pac-li-button", //"block w-full flex justify-between", // Link element within a suggestion item.
    li_button_current: "pac-li-button-current", //"text-white", // Class for the link in the currently selected suggestion item.
    li_div_container: "pac-li-div-container", //"flex min-w-0 gap-x-4", // Container div within the suggestion link.
    li_div_p_container: "pac-li-div-p-container",
    li_div_one: "pac-li-div-one", //"min-w-0 flex-auto", // First inner div (for place name).
    li_div_one_p: "pac-li-div-one-p", //"text-sm/6", // Paragraph for the place name.
    map_icon_svg: "pac-map-icon-svg",
    map_pin_icon:
      '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    li_div_one_p_secondaryText: "pac-li-div-one-p-secondaryText",
    li_div_two: "pac-li-div-two", //"shrink-0 flex flex-col items-end min-w-16", // Second inner div (for distance).
    li_div_two_p: "pac-li-div-two-p", //"mt-1 text-xs/5", // Paragraph for the distance.
    li_div_two_p_place_type: "pac-li-div-two-p-place_type", // Container for place type display.
    li_div_two_p_place_type_icon: "pac-li-div-two-p-place_type-icon", // The place type icon element.
    li_div_two_p_place_type_label: "pac-li-div-two-p-place_type-label", // The place type label text.
    highlight: "pac-highlight", //"font-bold", // Class for highlighting matched text in suggestions.
  };
  #defaultRequestParams = {
    // Default parameters for the autocomplete request.
    input: "", // Initial input value (empty).
    // includedRegionCodes: ["GB"], // Default region codes to include in suggestions.
    // language: "en-gb",
    // region: "GB",
  };
  #fetchFields = ["formattedAddress", "addressComponents"];
  #defaultFetchFields = ["formattedAddress", "addressComponents"]; // Fields to fetch for the selected place (can be extended).
  // Itinerary category mapping
  #ITINERARY_CATEGORIES = {
    // --- TRANSPORT & AUTO ---
    car_rental: "Automotive",
    car_dealer: "Automotive",
    gas_station: "Automotive",
    electric_vehicle_charging_station: "Automotive",
    parking: "Automotive",
    airport: "Airport",
    bus_station: "Transport",
    train_station: "Train Station",
    subway_station: "Subway Station",
    taxi_stand: "Transport",
    ferry_terminal: "Transport",

    // --- DINING & NIGHTLIFE ---
    restaurant: "Food and Drink",
    cafe: "Food and Drink",
    coffee_shop: "Food and Drink",
    bar: "Food and Drink",
    pub: "Food and Drink",
    night_club: "Food and Drink",
    bakery: "Food and Drink",
    fast_food_restaurant: "Food and Drink",
    ice_cream_shop: "Food and Drink",
    pizza_restaurant: "Food and Drink",
    steak_house: "Food and Drink",
    sushi_restaurant: "Food and Drink",

    // --- LODGING ---
    hotel: "Lodging",
    hostel: "Lodging",
    motel: "Lodging",
    resort_hotel: "Lodging",
    bed_and_breakfast: "Lodging",
    campground: "Lodging",
    rv_park: "Lodging",
    lodging: "Lodging",
    cottage: "Lodging",
    inn: "Lodging",
    guest_house: "Lodging",

    // --- SIGHTSEEING & CULTURE ---
    tourist_attraction: "Sightseeing",
    museum: "Sightseeing",
    art_gallery: "Sightseeing",
    cultural_landmark: "Sightseeing",
    historical_landmark: "Sightseeing",
    monument: "Sightseeing",
    performing_arts_theater: "Sightseeing",
    aquarium: "Sightseeing",
    zoo: "Sightseeing",
    visitor_center: "Sightseeing",
    town_square: "Sightseeing",
    landmark: "Sightseeing",
    place_of_worship: "Sightseeing",

    // --- RECREATION & PARKS ---
    park: "Recreation",
    national_park: "Recreation",
    state_park: "Recreation",
    beach: "Recreation",
    hiking_area: "Recreation",
    amusement_park: "Recreation",
    water_park: "Recreation",
    botanical_garden: "Recreation",
    golf_course: "Recreation",
    gym: "Recreation",
    natural_feature: "Recreation",

    // --- SHOPPING ---
    shopping_mall: "Shopping",
    supermarket: "Shopping",
    grocery_store: "Shopping",
    clothing_store: "Shopping",
    electronics_store: "Shopping",
    souvenir_shop: "Shopping", // Simplified name
    gift_shop: "Shopping",
    duty_free_store: "Shopping",

    // --- ESSENTIAL SERVICES ---
    hospital: "Health",
    pharmacy: "Health",
    atm: "Finance",
    bank: "Finance",
    post_office: "Services",
    police: "Services",

    // --- GEOGRAPHICAL ---
    neighborhood: "Geographical",
    sublocality: "Geographical",

    // --- NAVIGATION ---
    route: "Navigation",
    street_address: "Navigation",
    intersection: "Navigation",

    // -- CITY --
    locality: "City",
    administrative_area_level_4: "City",
    country: "Country",
    administrative_area_level_1: "City",
    administrative_area_level_2: "City",
    administrative_area_level_3: "City",
    administrative_area_level_5: "City",
    sublocality_level_1: "Neighborhood",
    sublocality_level_2: "Neighborhood",
    sublocality_level_3: "Neighborhood",
    sublocality_level_4: "Neighborhood",
    sublocality_level_5: "Neighborhood",

    // --- DEFAULT ---
    default: "Default",
  };
  // Mapping of itinerary categories to SVG icons (using Lucide icons for simplicity)
  #ITINERARY_SVG_ICONS = {
    Automotive: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>`,

    Transport: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,

    "Food and Drink": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>`,

    Lodging: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>`,

    Sightseeing: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-binoculars-icon lucide-binoculars"><path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/><path d="M 22 16 L 2 16"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/></svg>`,

    Recreation: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-kayak-icon lucide-kayak"><path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"/><path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"/><path d="m6.707 6.707 10.586 10.586"/><path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"/></svg>`,

    Shopping: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,

    Health: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M14 9h-4"/><path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/></svg>`,

    Finance: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>`,

    Geographical: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 20-6-10.6c-.4-.7-1.5-.7-1.9 0L6 20"/><path d="M7 16h10"/><path d="M12 4a8 8 0 0 1 8 8v2a2 2 0 0 1-2 2h-1"/><path d="M7 16H6a2 2 0 0 1-2-2v-2a8 8 0 0 1 8-8"/></svg>`,

    Navigation: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation-icon lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>`,

    City: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>`,

    District: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot-icon lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>`,

    Airport: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-icon lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>`,

    "Subway Station": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-subway-icon lucide-subway"><path d="M12 22a10 10 0 0 0 10-10V8l-5-5H7L2 8v4a10 10 0 0 0 10 10Z"/><path d="M12 22V8"/><path d="M7 13h10"/><path d="M7 17h10"/></svg>`,

    "Train Station": `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-train-icon lucide-train"><path d="M2 10h20"/><path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Z"/><circle cx="7" cy="15" r="2"/><circle cx="17" cy="15" r="2"/></svg>`,

    Default: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="display:inline-block";  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`,
  };
  /**
   * Class constructor for PacAutocomplete.
   * Initializes the autocomplete widget with the provided configuration.
   * @param {Object} config - Configuration object for the autocomplete widget.
   * @param {string} config.containerId - ID of the container element for the widget.
   * @param {string} config.googleMapsApiKey - Google Maps API key.
   * @param {string} [config.googleMapsApiVersion] - Version of the Google Maps API to use (default: "weekly").
   * @param {Object} [config.options] - Additional options for the widget (e.g., classes, callbacks).
   * @param {Object} [config.requestParams] - Parameters for the autocomplete request (e.g., input, region).
   * @param {*} config
   */
  constructor(config) {
    if (!config || !config.containerId || !config.googleMapsApiKey) {
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey).",
      );
    }

    this.#containerId = config.containerId; // Store the configuration object
    this.#pacEl = document.getElementById(config.containerId);
    if (!this.#pacEl) {
      throw new Error(
        `PacAutocomplete: Container element with ID "${config.containerId}" not found.`,
      );
    }

    this.#googleMapsApiKey = config.googleMapsApiKey;
    this.#googleMapsApiVersion = config.googleMapsApiVersion || "weekly";

    // Merge user options with defaults
    this.#options = {
      ...this.#defaultOptions, // Default options
      ...config.options, // User-defined options override defaults
    };
    // Ensure classes are deeply merged if user provides partial classes
    if (config.options && config.options.classes) {
      this.#options.classes = {
        ...this.#defaultClasses,
        ...config.options.classes,
      };
    } else {
      this.#options.classes = this.#defaultClasses; // Use default classes if none provided
    }

    // Ensure distance and show_place_type are mutually exclusive
    if (this.#options.show_place_type && this.#options.distance) {
      this.#options.distance = false; // Disable distance when show_place_type is enabled
    }

    if (this.#options.debug) {
      console.log("___debug constructor options:");
      console.log(this.#options);
    }

    if (config.fetchFields && Array.isArray(config.fetchFields)) {
      this._setFetchFields(config.fetchFields); // Set fetch fields from user config
    }

    // Set default response and error callbacks if not provided
    this.#onDataCallback =
      config.onResponse ||
      ((place) => {
        console.info("---------Default onResponse not provided---------");
        console.info("Selected Place:", JSON.stringify(place, null, 2));
      });
    this.#onErrorCallback =
      config.onError ||
      ((error) => {
        console.error("---------Default onError not provided---------");
        console.error("PAC Error:", error);
      });

    if (config.requestParams && Object.keys(config.requestParams).length > 0) {
      this.#request = {
        ...this.#defaultRequestParams,
        ...config.requestParams,
      };
    } else {
      this.#request = { ...this.#defaultRequestParams }; // Use defaults if no requestParams provided
    }

    if (this.#options.debug) {
      console.log("___debug constructor requestParams:", this.#request);
    }

    this._initialiseDebouncedRequest(); // Initialize the debounced request function

    this._init(); // Underscore prefix for internal initialization method
  }

  // --- Private Initialization Method ---
  async _init() {
    try {
      // check if google maps api is already loaded
      if (typeof google === "undefined" || !google.maps) {
        // Load the Google Maps API dynamically
        await this._loadGoogleMapsApi({
          key: this.#googleMapsApiKey,
          v: this.#googleMapsApiVersion,
        });
      }
      this._createPACStructure();
      await this._initializeAutocomplete();
    } catch (error) {
      this.#onErrorCallback(error);
    }
  }

  /**
   * Initializes the debounced request function for fetching autocomplete suggestions.
   * This function is called on initialization and when options are updated.
   *
   * @private
   */
  _initialiseDebouncedRequest() {
    this.#debouncedMakeAcRequest = this._debounce(async () => {
      if (!this.#inputElement || !this.#inputElement.value) {
        this._reset();
        if (this.#inputElement)
          this.#inputElement.setAttribute("aria-expanded", "false");
        return;
      }

      this.#request.input = this.#inputElement.value;

      try {
        const { suggestions } =
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            this.#request,
          );

        // Display suggestions
        if (suggestions && suggestions.length > 0) {
          const suggestionElements = await Promise.all(
            this._createSuggestionElements(suggestions),
          );
          this.#ul.replaceChildren(...suggestionElements);
          this.#ul.style.display = "block";
          this.#inputElement.setAttribute("aria-expanded", "true");
        } else {
          // No suggestions found
          this._reset(); // Clear any old suggestions
          this.#inputElement.setAttribute("aria-expanded", "false");
          // Optionally display a "no results" message in the 'ul'
        }
      } catch (error) {
        this.#onErrorCallback(error);
        this._reset();
      }
    }, this.#options.debounce); // Default debounce to 100ms if not set
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(fields) {
    if (Array.isArray(fields) && fields.length > 0) {
      this.#fetchFields = [
        ...new Set([...this.#defaultFetchFields, ...fields]),
      ].filter((e) => e); // Ensure unique and non-empty fields
    }
  }

  /**
   * Creates a debounced version of a function.
   *
   * @private
   * @param {Function} func - The function to debounce
   * @param {number} wait - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  _debounce(func, wait) {
    let timeout = null;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args); // Call original function
      };
      if (timeout !== null) {
        clearTimeout(timeout); // Clear the previous timeout
      }
      timeout = setTimeout(later, wait ?? 100); // Set the new timeout
    };
  }
  /**
   * Formats a distance value from meters to the specified unit.
   *
   * @private
   * @param {number|null|undefined} distance - Distance in meters
   * @param {('km'|'miles')} units - Target unit for conversion
   * @returns {string|null} Formatted distance string or null if invalid
   */
  _formatDistance(distance, units) {
    if (
      typeof distance !== "number" ||
      !this.#options.distance ||
      this.#options.show_place_type
    ) {
      return null; // Return null if distance isn't shown, show_place_type is enabled, or invalid
    }
    let value;
    let unitLabel;
    if (units === "km") {
      value = (distance / 1000).toFixed(2);
      unitLabel = "km";
    } else {
      // Default to miles if not 'km'
      value = (distance / 1609.34).toFixed(2);
      unitLabel = "miles";
    }
    // Avoid showing ".00"
    value = value.replace(/\.00$/, "");
    return `${value} ${unitLabel}`;
  }

  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(g) {
    var h, // Promise tracking API load
      a, // Script element
      k, // Loop variable for config keys
      p = "The Google Maps JavaScript API", // Error message prefix
      c = "google", // Global namespace
      l = "importLibrary", // Loader function name
      q = "__ib__", // Internal callback name
      m = document, // Document reference
      b = window; // Window reference
    b = b[c] || (b[c] = {}); // Ensure google namespace exists
    var d = b.maps || (b.maps = {}), // Ensure google.maps namespace exists
      r = new Set(), // Set to track requested libraries
      e = new URLSearchParams(), // URL parameters for the API script
      u = () =>
        // Function to initiate API loading (if not already started)
        h ||
        // eslint-disable-next-line no-async-promise-executor
        (h = new Promise(async (f, n) => {
          // Create script element (done async to potentially wait for nonce)
          // await (a = m.createElement('script')); // Original Google code had await here, might not be needed
          a = m.createElement("script"); // Create script tag
          e.set("libraries", [...r].join(",")); // Add accumulated libraries
          // Add other parameters from the config object 'g'
          for (k in g)
            e.set(
              k.replace(/[A-Z]/g, (t) => "_" + t[0].toLowerCase()), // Convert camelCase to snake_case
              g[k],
            );
          e.set("callback", c + ".maps." + q); // Set the internal callback function name
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e; // Construct the API URL
          d[q] = f; // Assign the promise resolver to the callback name on google.maps
          // Error handling for script loading failure
          a.onerror = () =>
            (h = n(
              new Error(
                `${p} could not load. Check your API key and network connection.`,
              ),
            )); // Use onerror for load failures
          // Nonce for Content Security Policy
          a.nonce = m.querySelector("script[nonce]")?.nonce || "";
          m.head.append(a); // Append the script to the document head
        }));
    // Define or reuse the importLibrary function on google.maps
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    d[l]
      ? console.warn(p + " only loads once. Ignoring:", g) // Warn if called again
      : (d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n))); // The actual importLibrary implementation
  }

  // --- UI Creation ---
  _createPACStructure() {
    const section = document.createElement("section");
    section.className = this.#options.classes.section;

    // Main container
    this.#container = document.createElement("div");
    this.#container.className = this.#options.classes.container;
    this.#container.setAttribute("id", this.#containerId + "-div");
    section.appendChild(this.#container);

    // Icon
    const iconContainer = document.createElement("div");
    iconContainer.className = this.#options.classes.icon_container;
    this.#container.appendChild(iconContainer);
    const icon = document.createElement("div");
    icon.innerHTML = this.#options.classes.icon;
    iconContainer.appendChild(icon.firstElementChild); // Append the actual SVG element

    // Input field
    this.#inputElement = document.createElement("input");
    this.#inputElement.id = this.#containerId + "-input"; // Assign ID for label association
    this.#inputElement.type = "text";
    this.#inputElement.name = "search"; // Consider making name configurable
    this.#inputElement.placeholder = this.#options.placeholder;
    this.#inputElement.autocomplete = this.#options.autocomplete;
    this.#inputElement.className = this.#options.classes.input;
    this.#inputElement.setAttribute("role", "combobox");
    this.#inputElement.setAttribute("aria-autocomplete", "list");
    this.#inputElement.setAttribute("aria-expanded", "false"); // Will be updated dynamically
    this.#inputElement.setAttribute("aria-controls", "pacSuggestions"); // Links to the suggestions list
    this.#inputElement.setAttribute("aria-activedescendant", ""); // Will be updated dynamically

    if (this.#options.autofocus) {
      this.#inputElement.autofocus = true;
    }
    if (this.#options.label) {
      const label = document.createElement("label");
      label.htmlFor = this.#inputElement.id; // Correctly link label to input by ID
      label.textContent = this.#options.label;
      // Add label classes if needed from opts.classes
      section.prepend(label); // Append label before input or adjust structure
    }
    this.#container.appendChild(this.#inputElement);

    // Keyboard hints container
    const kbdContainer = document.createElement("div");
    kbdContainer.className = this.#options.classes.kbd_container;
    this.#kbdEscape = document.createElement("kbd");
    this.#kbdEscape.className = this.#options.classes.kbd_escape;
    this.#kbdEscape.textContent = "Esc";
    kbdContainer.appendChild(this.#kbdEscape);
    this.#kbdUp = document.createElement("kbd");
    this.#kbdUp.className = this.#options.classes.kbd_up;
    this.#kbdUp.innerHTML = "&#8593;"; // Up arrow HTML entity
    kbdContainer.appendChild(this.#kbdUp);
    this.#kbdDown = document.createElement("kbd");
    this.#kbdDown.className = this.#options.classes.kbd_down;
    this.#kbdDown.innerHTML = "&#8595;"; // Down arrow HTML entity
    kbdContainer.appendChild(this.#kbdDown);
    this.#container.appendChild(kbdContainer);

    // Suggestions list (initially hidden)
    this.#ul = document.createElement("ul");
    this.#ul.id = "pacSuggestions"; // Must match aria-controls
    this.#ul.className = this.#options.classes.ul;
    this.#ul.style.display = "none";
    this.#ul.setAttribute("role", "listbox");
    this.#ul.setAttribute("aria-labelledby", this.#inputElement.id); // Link listbox to input for accessibility
    this.#container.appendChild(this.#ul);

    this.#pacEl.appendChild(section);
    section.addEventListener("keydown", this._onKeyDown.bind(this)); // Bind 'this'
  }

  /**
   * Attaches event listeners to the input element for handling user input.
   * This includes debounced input handling, focus/blur events, and keyboard navigation.
   */
  _attachedEventListeners() {
    this.#inputElement.addEventListener("input", this.#debouncedMakeAcRequest);
    // Add focus/blur listeners if needed to manage suggestion visibility
    this.#inputElement.addEventListener("blur", () => {
      // Delay hiding suggestions to allow click events on them
      setTimeout(() => {
        if (this.#ul && !this.#ul.contains(document.activeElement)) {
          // Check if focus moved outside suggestions
          this.#ul.style.display = "none";
          this.#inputElement.setAttribute("aria-expanded", "false");
        }
      }, 200); // Adjust delay as needed
    });
    this.#inputElement.addEventListener("focus", () => {
      // Potentially show suggestions again if input has value
      if (this.#inputElement.value && this.#allSuggestions.length > 0) {
        this.#ul.style.display = "block";
        this.#inputElement.setAttribute("aria-expanded", "true");
      }
    });
  }

  _detachEventListeners() {
    // Remove event listeners, remove elements from DOM
    if (this.#inputElement) {
      this.#inputElement.removeEventListener(
        "input",
        this.#debouncedMakeAcRequest,
      );
      // remove other listeners
    }
    if (this.#pacEl && this.#container) {
      this.#pacEl.removeChild(this.#container.parentElement); // remove the whole section
    }
  }

  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      // Ensure the 'places' library is available via the dynamic loader
      // eslint-disable-next-line no-undef
      await google.maps.importLibrary("places");
      // console.log('Places library imported successfully.'); // For debugging

      // Initial token generation
      this._refreshToken();

      // Attach the debounced request function to the input element's 'input' event
      if (this.#inputElement) {
        this._attachedEventListeners();
      } else {
        this.#onErrorCallback(
          new Error("Input element not found during initialization."),
        );
      }
    } catch (error) {
      console.error("Error initializing Google Places Autocomplete:", error);
      // eslint-disable-next-line no-undef
      this.#onErrorCallback(
        new Error("Google Maps Places library not available."),
      );
    }
  }

  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(refresh = false, placeData = null) {
    this.#currentSuggestion = -1;

    /**
     * If the input element exists and clear_input is false, set its value to the formatted address
     * from placeData. Otherwise, clear the input value.
     * This allows the user to keep the input value if they selected a place,
     * but still allows clearing it if clear_input is true or placeData is not provided.
     * @type {HTMLInputElement}
     * @property {string} value - The value of the input element.
     * @property {boolean} clear_input - Whether to clear the input value after selection.
     * @property {Object} placeData - The data of the selected place, containing formattedAddress.
     */
    if (
      this.#inputElement &&
      this.#options.clear_input == false &&
      placeData &&
      placeData.formattedAddress
    ) {
      this.#inputElement.value = placeData.formattedAddress; // Set input value to formatted address
    } else if (this.#inputElement) {
      this.#inputElement.value = "";
    }

    if (this.#inputElement) {
      this.#inputElement.setAttribute("aria-expanded", "false");
      this.#inputElement.setAttribute("aria-activedescendant", ""); // Clear aria-activedescendant
      this.#inputElement.blur();
    }

    this.#allSuggestions = [];
    this.#currentSuggestion = -1;
    if (this.#ul) {
      this.#ul.innerHTML = ""; // Clear existing suggestions
      this.#ul.style.display = "none";
    }
    if (refresh) {
      this._refreshToken();
    }
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    if (!this.#ul) return;
    Array.from(this.#ul.children).forEach((li) => {
      this.#options.classes.li_current
        .split(" ")
        .forEach((cl) => li.classList.remove(cl));
      const link = li.querySelector("button");
      if (link) {
        this.#options.classes.li_button_current
          .split(" ")
          .forEach((cl) => link.classList.remove(cl));
      }
    });
  }

  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(e) {
    this._resetLiClasses(); // Reset classes on any key press within the suggestions

    if (e.key === "Escape") {
      e.preventDefault();
      // Visual feedback for key press
      this.#options.classes.kbd_active
        .split(" ")
        .forEach((cl) => this.#kbdEscape?.classList.add(cl));
      setTimeout(
        () =>
          this.#options.classes.kbd_active
            .split(" ")
            .forEach((cl) => this.#kbdEscape?.classList.remove(cl)),
        300,
      );

      this._reset(true); // Reset search input and results, refresh token
    }

    if (
      !this.#allSuggestions.length ||
      !this.#ul ||
      this.#ul.style.display === "none"
    )
      return;

    if (e.key === "ArrowDown") {
      e.preventDefault(); // Prevent cursor movement in input
      this.#currentSuggestion = Math.min(
        this.#currentSuggestion + 1,
        this.#allSuggestions.length - 1,
      );
      if (this.#currentSuggestion < 0) this.#currentSuggestion = 0; // Handle case where it was -1

      const currentLi = this.#ul.children.item(this.#currentSuggestion);
      if (currentLi) {
        const currentButton = currentLi.querySelector("button");
        this.#options.classes.li_current
          .split(" ")
          .forEach((cl) => currentLi.classList.add(cl));
        if (currentButton) {
          this.#options.classes.li_button_current
            .split(" ")
            .forEach((cl) => currentButton.classList.add(cl));
        }
        currentLi.scrollIntoView({ block: "nearest" }); // Ensure visible
        this.#inputElement.setAttribute("aria-activedescendant", currentLi.id); // Update aria-activedescendant
      }

      // Visual feedback for key press
      this.#options.classes.kbd_active
        .split(" ")
        .forEach((cl) => this.#kbdDown?.classList.add(cl));
      setTimeout(
        () =>
          this.#options.classes.kbd_active
            .split(" ")
            .forEach((cl) => this.#kbdDown?.classList.remove(cl)),
        300,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement in input
      this.#currentSuggestion = Math.max(this.#currentSuggestion - 1, 0); // Stay at 0 if already there

      const currentLi = this.#ul.children.item(this.#currentSuggestion);
      if (currentLi) {
        const currentButton = currentLi.querySelector("button");
        this.#options.classes.li_current
          .split(" ")
          .forEach((cl) => currentLi.classList.add(cl));
        if (currentButton) {
          this.#options.classes.li_button_current
            .split(" ")
            .forEach((cl) => currentButton.classList.add(cl));
        }
        currentLi.scrollIntoView({ block: "nearest" }); // Ensure visible
      }

      // Visual feedback for key press
      this.#options.classes.kbd_active
        .split(" ")
        .forEach((cl) => this.#kbdUp?.classList.add(cl));
      setTimeout(
        () =>
          this.#options.classes.kbd_active
            .split(" ")
            .forEach((cl) => this.#kbdUp?.classList.remove(cl)),
        300,
      );
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if applicable
      if (
        this.#currentSuggestion >= 0 &&
        this.#currentSuggestion < this.#allSuggestions.length
      ) {
        this._onPlaceSelected(
          this.#allSuggestions[this.#currentSuggestion].place,
        );
        // Reset is handled within onPlaceSelected via reset(true)
      }
    }
  }

  // Helper function to find a specific address component
  _getAddressComponent(response, type) {
    return (
      response.addressComponents?.find((c) => c.types.includes(type))
        ?.longText || ""
    );
  }

  /**
   * Creates a button element for a suggestion item.
   * @returns {HTMLButtonElement} The created button element.
   */
  _createButtonElement(index) {
    const button = document.createElement("button");
    button.tabIndex = index + 1;
    button.className = this.#options.classes.li_button; // block w-full flex justify-between
    return button;
  }

  /**
   * Creates a div container for suggestion item.
   * @returns {HTMLDivElement} The created div container element.
   */
  _createDivElement(className) {
    // create div elements pac-li-div-container
    const divContainer = document.createElement("div");
    if (className) {
      divContainer.className = className;
    }
    return divContainer;
  }

  /**
   * Creates an SVG element representing a map pin icon.
   * @returns {SVGSVGElement} The created SVG element.
   */
  _createMapPinIconElement() {
    const svgIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg",
    );
    svgIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
    svgIcon.setAttribute("width", "24");
    svgIcon.setAttribute("height", "24");
    svgIcon.setAttribute("viewBox", "0 0 24 24");
    svgIcon.setAttribute("fill", "none");
    svgIcon.setAttribute("stroke", "currentColor");
    svgIcon.setAttribute("stroke-width", "2");
    svgIcon.setAttribute("stroke-linecap", "round");
    svgIcon.setAttribute("stroke-linejoin", "round");
    svgIcon.setAttribute("class", this.#options.classes.map_icon_svg);
    // insert map pin icon path
    svgIcon.innerHTML = this.#options.classes.map_pin_icon;
    return svgIcon;
  }

  /**
   * Creates a paragraph (P) element with an optional class name.
   * @param {string} className
   * @returns {HTMLParagraphElement}
   */
  _createPElement(className) {
    const p = document.createElement("p");
    if (className) {
      p.className = className;
    }
    return p;
  }
  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(suggestions) {
    this.#allSuggestions = []; // Reset before populating
    // Map suggestions to LI elements
    return suggestions.map(async (suggestion, index) => {
      // Fetch place details for each suggestion
      let place = suggestion.placePrediction.toPlace();

      const li = document.createElement("li");
      li.id = `option-${index + 1}`;
      li.className = this.#options.classes.li;

      // create button element
      const button = this._createButtonElement(index);
      // Add click event listener to handle selection
      button.addEventListener("click", (e) => {
        e.preventDefault();
        this._onPlaceSelected(suggestion.placePrediction.toPlace());
      });

      // create div elements pac-li-div-container
      const divContainer = this._createDivElement(
        this.#options.classes.li_div_container,
      );

      // create li div one element - place name
      const liDivOne = this._createDivElement(this.#options.classes.li_div_one);
      const liDivTwo = this._createDivElement(this.#options.classes.li_div_two);
      // create map pin icon element
      const mapPinIcon = this._createMapPinIconElement();
      // append map pin icon to liDivOne
      liDivOne.appendChild(mapPinIcon);

      // create div p container
      const divPContainer = this._createDivElement(
        this.#options.classes.li_div_p_container,
      );
      // append div p container to liDivOne
      liDivOne.appendChild(divPContainer);

      // create p element - place name
      const pOne = this._createPElement(this.#options.classes.li_div_one_p);
      // create p element - secondary text
      const pTwo = this._createPElement(
        this.#options.classes.li_div_one_p_secondaryText,
      );
      // create p element - distance
      const pThree = this._createPElement(this.#options.classes.li_div_two_p);
      pThree.textContent = this._formatDistance(
        suggestion.placePrediction.distanceMeters,
        this.#options.distance_units ?? "km",
      );
      // append p element to div p container
      divPContainer.appendChild(pOne);
      divPContainer.appendChild(pTwo);

      // Add place type display if enabled, otherwise show distance
      if (
        this.#options.show_place_type &&
        Array.isArray(suggestion.placePrediction.types) &&
        suggestion.placePrediction.types.length > 0
      ) {
        const placeTypeContainer = this._createDivElement(
          this.#options.classes.li_div_two_p_place_type,
        );

        const placeTypeIcon = this._createPElement(
          this.#options.classes.li_div_two_p_place_type_icon,
        );

        const placeTypeLabel = this._createPElement(
          this.#options.classes.li_div_two_p_place_type_label,
        );

        // Look through the array until we find a type we actually recognize
        const matchedType = suggestion.placePrediction.types.find(
          (type) =>
            typeof type === "string" && type in this.#ITINERARY_CATEGORIES,
        );

        placeTypeLabel.textContent = matchedType
          ? this.#ITINERARY_CATEGORIES[matchedType]
          : "Default";

        placeTypeIcon.innerHTML =
          this.#ITINERARY_SVG_ICONS[placeTypeLabel.textContent] ||
          this.#ITINERARY_SVG_ICONS["Default"];

        placeTypeContainer.appendChild(placeTypeIcon);
        placeTypeContainer.appendChild(placeTypeLabel);
        liDivTwo.appendChild(placeTypeContainer);
      } else {
        liDivTwo.appendChild(pThree);
      }

      // append liDivOne to divContainer
      divContainer.appendChild(liDivOne);
      divContainer.appendChild(liDivTwo);
      // append divContainer to button
      button.appendChild(divContainer);
      // append button to li
      li.appendChild(button);

      // get prediction text
      const predictionText = suggestion.placePrediction.mainText;
      const originalText = predictionText.text;
      // Array of objects with startOffset, endOffset
      const matches = predictionText.matches;

      //Highlighting Logic
      let lastIndex = 0;

      // Sort matches just in case they aren't ordered (though they usually are)
      matches.sort((a, b) => a.startOffset - b.startOffset);

      // 1. Create the outer span
      const outerSpan = document.createElement("span");

      // 2. Create the inner span for the bold part
      const innerSpan = document.createElement("span");
      innerSpan.classList = this.#options.classes.highlight ?? "font-bold"; // Use the highlight class from options

      for (const match of matches) {
        // Append text before the current match
        outerSpan.textContent += originalText.substring(
          lastIndex,
          match.startOffset,
        );

        // Append the highlighted match segment
        if (match.startOffset > 0) {
          // check previous charter is space
          const prevChar = originalText.charAt(match.startOffset - 1);
          if (prevChar == " ") {
            innerSpan.textContent += " ";
          }
        }
        innerSpan.textContent += originalText.substring(
          match.startOffset,
          match.endOffset,
        );

        // Update the last index processed
        lastIndex = match.endOffset;
      }

      // 3. Create a text node for the remaining text
      const remainingText = document.createTextNode(
        originalText.substring(lastIndex),
      );

      // 4. Append the inner span and the text node to the outer span
      outerSpan.appendChild(innerSpan);
      outerSpan.appendChild(remainingText);

      // 5. Append the outer span to the paragraph element
      pOne.appendChild(outerSpan);

      // set secondary text if available
      const secondaryText =
        suggestion.placePrediction?.secondaryText?.text ?? "";

      if (secondaryText) {
        pTwo.textContent = secondaryText;
      }

      this.#allSuggestions.push({
        id: index + 1,
        place: place,
        mainText: suggestion.placePrediction.mainText.text,
        secondaryText: secondaryText,
        description: suggestion.placePrediction.toString(),
      });

      li.appendChild(button);
      return li;
    });
  }

  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(place) {
    let data = null;
    try {
      // Fetch necessary details for the selected place
      await place.fetchFields({
        fields: this.#fetchFields, //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      });
      // Call the user-provided callback with the place data
      // Handle response_type option
      if (this.#options.response_type === "place") {
        data = place; // Return the Place instance
        this.#onDataCallback(place);
      } else {
        // eslint-disable-next-line no-undef
        data = place.toJSON(); // Convert to plain JSON object (default)
        this.#onDataCallback(data);
      }
    } catch (error) {
      console.error("Error fetching place details:", error);
      // eslint-disable-next-line no-undef
      this.#onErrorCallback(error);
    } finally {
      // Reset the input and suggestions regardless of success/error
      this._reset(true, data); // Refresh token after selection
    }
  }

  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      // eslint-disable-next-line no-undef
      this.#request.sessionToken =
        new google.maps.places.AutocompleteSessionToken();
    } catch (error) {
      console.error("Error creating session token:", error);
      // eslint-disable-next-line no-undef
      this.#onErrorCallback(error);
    }
  }

  /**
   * Sets the fields to be fetched for the selected place.
   * This allows you to specify which details you want to retrieve
   * when a place is selected, such as displayName, formattedAddress,
   * addressComponents, etc.
   * @param {Array<string>} fields - Array of field names to fetch.
   */
  setFetchFields(fields) {
    this._setFetchFields(fields);
  }
  /**
   * Gets the current fields that will be fetched for the selected place.
   * This is useful for understanding what details will be available
   * when a place is selected, such as displayName, formattedAddress,
   * addressComponents, etc.
   * @returns {Array<string>} The current fetch fields.
   */
  getFetchFields() {
    return this.#fetchFields;
  }

  /**
   * Sets the request parameters for the Places Autocomplete instance.
   * This method allows you to update the request parameters dynamically,
   * such as the input value, region codes, language, etc.
   * It merges the provided parameters with the default request parameters,
   * allowing you to override specific values while keeping the defaults intact.
   * This is useful for updating the search criteria without needing to recreate the instance.
   * @param {*} params
   */
  setRequestParams(params) {
    if (
      typeof params === "object" &&
      !Array.isArray(params) &&
      params !== null
    ) {
      // if params.input is provided, set it to the input element
      if (params.input && typeof params.input === "string") {
        this.#inputElement.value = params.input; // Set input value if provided
      }
      // Merge provided params with default request parameters
      // This allows overriding specific request parameters while keeping defaults
      this.#request = {
        ...this.#defaultRequestParams,
        ...params,
      };
    }
  }

  /**
   * Returns the current request parameters used by the Places Autocomplete instance.
   * This includes the input value, included region codes, language, and other settings.
   * It is useful for debugging or when you need to know the current search criteria.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    return this.#request;
  }

  /**
   * Sets the options for the Places Autocomplete instance.
   * This method allows you to change the appearance and behavior of the autocomplete widget,
   * such as classes, placeholder text, debounce time, etc.
   * It merges the provided options with the default options, allowing you to override specific values
   * while keeping the defaults intact.
   * This is useful for updating the widget's configuration without needing to recreate the instance.
   * @param {*} options
   */
  setOptions(options) {
    if (
      typeof options === "object" &&
      !Array.isArray(options) &&
      options !== null
    ) {
      this._detachEventListeners(); // Detach event listeners

      // // Ensure classes are deeply merged if user provides partial classes
      const tmpClasses = options.classes || {};
      delete options.classes; // Remove classes from options to avoid overwriting

      // Merge provided options with default options
      // This allows overriding specific options while keeping defaults
      this.#options = {
        ...this.#defaultOptions,
        ...options,
      };

      // Merge classes with defaults
      // This allows overriding specific classes while keeping defaults
      if (
        tmpClasses &&
        typeof tmpClasses === "object" &&
        Object.keys(tmpClasses).length > 0
      ) {
        this.#options.classes = {
          ...this.#defaultClasses,
          ...tmpClasses,
        };
      } else {
        this.#options.classes = { ...this.#defaultClasses }; // Use defaults if no classes provided
      }

      // Ensure distance and show_place_type are mutually exclusive
      if (this.#options.show_place_type && this.#options.distance) {
        this.#options.distance = false; // Disable distance when show_place_type is enabled
      }

      this._initialiseDebouncedRequest(); // Reinitialize the debounced request function
      this._createPACStructure(); // Recreate the structure with new options
      // Reattach the input event listener to the input element
      // This is necessary to ensure the new input element is ready for events
      if (this.#inputElement) {
        this._attachedEventListeners();
      } // Reinitialize the autocomplete functionality
    }
  }

  /**
   * Gets the current options used by the Places Autocomplete instance.
   * @returns {Object} The current options.
   */
  getOptions() {
    /**
     * Returns the current options used by the Places Autocomplete instance.
     * This includes classes, placeholder text, debounce time, and other settings.
     * It is useful for debugging or when you need to know the current configuration of the widget.
     * @returns {Object} The current options.
     */
    return this.#options;
  }

  /**
   * Sets the input value by reverse geocoding coordinates.
   * Performs reverse geocoding to convert lat/lng to a place, then triggers onResponse.
   * Requires the Geocoding API to be enabled in your Google Cloud Console project.
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @returns {Promise<void>}
   */
  async setInputValue(latitude, longitude) {
    try {
      // Import the geocoding library
      const { Geocoder } = await google.maps.importLibrary("geocoding");
      const geocoder = new Geocoder();

      // Perform reverse geocoding
      const response = await geocoder.geocode({
        location: { lat: latitude, lng: longitude },
      });

      if (response.results && response.results.length > 0) {
        const placeId = response.results[0].place_id;
        const place = new google.maps.places.Place({ id: placeId });

        // Fetch the configured fields
        await place.fetchFields({ fields: this.#fetchFields });

        // Update input field if clear_input is false
        if (!this.#options.clear_input && place.formattedAddress) {
          this.#inputElement.value = place.formattedAddress;
        }

        // Trigger the callback with appropriate response type
        if (this.#options.response_type === "place") {
          this.#onDataCallback(place);
        } else {
          this.#onDataCallback(place.toJSON());
        }
      } else {
        throw new Error("No results found for the provided coordinates");
      }
    } catch (error) {
      console.error("Error in setInputValue:", error);
      this.#onErrorCallback(error);
    }
  }

  /**
   * Clears the autocomplete input field and suggestions list.
   * This method resets the state of the autocomplete widget,
   * allowing the user to start a new search without any previous input or suggestions.
   * It also refreshes the Google Places session token to ensure a new session.
   * @returns {void}
   */
  clear() {
    this._reset(true);
  }

  /**
   * Sets focus on the autocomplete input field.
   * This method allows programmatic control of the input focus,
   * useful for improving user experience and accessibility.
   * @returns {void}
   */
  focus() {
    if (this.#inputElement) {
      this.#inputElement.focus();
    }
  }

  /**
   * Destroys the PacAutocomplete instance.
   * Removes event listeners, clears the DOM, and nullifies properties.
   * This method should be called when the autocomplete widget is no longer needed.
   * It ensures that all resources are cleaned up to prevent memory leaks.
   * @returns {void}
   */
  destroy() {
    // Remove event listeners, remove elements from DOM
    this._detachEventListeners(); // Detach event listeners
    // Nullify properties
    this.#containerId = null;
    this.#pacEl = null;
    this.#googleMapsApiKey = null;
    this.#googleMapsApiVersion = null;
    this.#options = null;
    this.#request = null;
    this.#inputElement = null;
    this.#container = null;
    this.#ul = null;
    this.#kbdEscape = null;
    this.#kbdUp = null;
    this.#kbdDown = null;
    this.#allSuggestions = null;
    this.#currentSuggestion = -1;
    this.#onDataCallback = null;
    this.#onErrorCallback = null;
    this.#debouncedMakeAcRequest = null;
  }
}
