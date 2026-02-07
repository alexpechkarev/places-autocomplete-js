class S {
  // --- Private Properties (using # or _ prefix by convention) ---
  #u;
  // Container ID where the autocomplete widget will be rendered.
  #d;
  #m;
  #w;
  #t;
  #o;
  #e;
  #n;
  #i;
  #r;
  #c;
  #h;
  #a = [];
  #s = -1;
  #p;
  // For user-provided data callback
  #l;
  // For user-provided error callback
  #_;
  // Declare without initializing here
  #f = {
    // Default options for the autocomplete widget.
    autofocus: !1,
    // Automatically focus the input on load.
    autocomplete: "off",
    // HTML autocomplete attribute for the input.
    placeholder: "Start typing your address ...",
    // Placeholder text for the input.
    distance: !1,
    // Show distance in suggestions (requires origin in request).
    distance_units: "km",
    // Units for distance ('km' or 'miles').
    label: "",
    // Optional label text above the input.
    debounce: 100,
    // Debounce delay (ms) for API requests.
    clear_input: !1,
    // Clear input .
    debug: !1,
    // Enable debug mode (not implemented in this version).
    response_type: "json",
    // Return format: 'json' for JSON object, 'place' for Google Maps Place instance.
    show_place_type: !1
    // Display place type icons (mutually exclusive with distance).
  };
  #g = {
    // CSS classes for various parts of the widget.
    section: "",
    // Outer section container.
    container: "pac-container",
    // "relative z-10 transform rounded-xl mt-4", // Main container div.
    icon_container: "pac-icon-container",
    //"pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", // Container for the search icon.
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="pac-w-5 pac-h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>',
    // SVG for the search icon.
    input: "pac-input",
    //"border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 px-4 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm", // Input field.
    kbd_container: "pac-kbd-container",
    //"absolute inset-y-0 right-0 flex py-1.5 pr-1.5", // Container for keyboard hints.
    kbd_escape: "pac-kbd-escape",
    //"inline-flex items-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-8 mr-1", // Escape key hint.
    kbd_up: "pac-kbd-up",
    //"inline-flex items-center justify-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-6", // Up arrow key hint.
    kbd_down: "pac-kbd-down",
    //"inline-flex items-center rounded border border-gray-400 px-1 font-sans text-xs text-gray-500 justify-center w-6", // Down arrow key hint.
    kbd_active: "pac-kbd-active",
    //"bg-indigo-500 text-white", // Class for active keyboard hint.
    ul: "pac-ul",
    //"absolute z-50 -mb-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100", // Suggestions list (ul).
    li: "pac-li",
    //"z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900 hover:bg-indigo-500 hover:text-white", // Suggestion item (li).
    li_current: "pac-li-current",
    //"bg-indigo-500", // Class for the currently selected suggestion item.
    li_button: "pac-li-button",
    //"block w-full flex justify-between", // Link element within a suggestion item.
    li_button_current: "pac-li-button-current",
    //"text-white", // Class for the link in the currently selected suggestion item.
    li_div_container: "pac-li-div-container",
    //"flex min-w-0 gap-x-4", // Container div within the suggestion link.
    li_div_p_container: "pac-li-div-p-container",
    li_div_one: "pac-li-div-one",
    //"min-w-0 flex-auto", // First inner div (for place name).
    li_div_one_p: "pac-li-div-one-p",
    //"text-sm/6", // Paragraph for the place name.
    map_icon_svg: "pac-map-icon-svg",
    map_pin_icon: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
    li_div_one_p_secondaryText: "pac-li-div-one-p-secondaryText",
    li_div_two: "pac-li-div-two",
    //"shrink-0 flex flex-col items-end min-w-16", // Second inner div (for distance).
    li_div_two_p: "pac-li-div-two-p",
    //"mt-1 text-xs/5", // Paragraph for the distance.
    li_div_two_p_place_type: "pac-li-div-two-p-place_type",
    // Container for place type display.
    li_div_two_p_place_type_icon: "pac-li-div-two-p-place_type-icon",
    // The place type icon element.
    li_div_two_p_place_type_label: "pac-li-div-two-p-place_type-label",
    // The place type label text.
    highlight: "pac-highlight"
    //"font-bold", // Class for highlighting matched text in suggestions.
  };
  #k = {
    // Default parameters for the autocomplete request.
    input: ""
    // Initial input value (empty).
    // includedRegionCodes: ["GB"], // Default region codes to include in suggestions.
    // language: "en-gb",
    // region: "GB",
  };
  #v = ["formattedAddress", "addressComponents"];
  #C = ["formattedAddress", "addressComponents"];
  // Fields to fetch for the selected place (can be extended).
  // Itinerary category mapping
  #y = {
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
    souvenir_shop: "Shopping",
    // Simplified name
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
    default: "Default"
  };
  // Mapping of itinerary categories to SVG icons (using Lucide icons for simplicity)
  #b = {
    Automotive: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><path d="M9 17h6"/><circle cx="17" cy="17" r="2"/></svg>',
    Transport: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    "Food and Drink": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>',
    Lodging: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 4v16"/><path d="M2 8h18a2 2 0 0 1 2 2v10"/><path d="M2 17h20"/><path d="M6 8v9"/></svg>',
    Sightseeing: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-binoculars-icon lucide-binoculars"><path d="M10 10h4"/><path d="M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3"/><path d="M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z"/><path d="M 22 16 L 2 16"/><path d="M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z"/><path d="M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3"/></svg>',
    Recreation: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-kayak-icon lucide-kayak"><path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z"/><path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61"/><path d="m6.707 6.707 10.586 10.586"/><path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z"/></svg>',
    Shopping: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>',
    Health: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7v4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M14 9h-4"/><path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2"/><path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16"/></svg>',
    Finance: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>',
    Geographical: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m20 20-6-10.6c-.4-.7-1.5-.7-1.9 0L6 20"/><path d="M7 16h10"/><path d="M12 4a8 8 0 0 1 8 8v2a2 2 0 0 1-2 2h-1"/><path d="M7 16H6a2 2 0 0 1-2-2v-2a8 8 0 0 1 8-8"/></svg>',
    Navigation: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-navigation-icon lucide-navigation"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>',
    City: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-building2-icon lucide-building-2"><path d="M10 12h4"/><path d="M10 8h4"/><path d="M14 21v-3a2 2 0 0 0-4 0v3"/><path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/></svg>',
    District: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-land-plot-icon lucide-land-plot"><path d="m12 8 6-3-6-3v10"/><path d="m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12"/><path d="m6.49 12.85 11.02 6.3"/><path d="M17.51 12.85 6.5 19.15"/></svg>',
    Airport: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-plane-icon lucide-plane"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>',
    "Subway Station": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-subway-icon lucide-subway"><path d="M12 22a10 10 0 0 0 10-10V8l-5-5H7L2 8v4a10 10 0 0 0 10 10Z"/><path d="M12 22V8"/><path d="M7 13h10"/><path d="M7 17h10"/></svg>',
    "Train Station": '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"  style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-train-icon lucide-train"><path d="M2 10h20"/><path d="M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Z"/><circle cx="7" cy="15" r="2"/><circle cx="17" cy="15" r="2"/></svg>',
    Default: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="display:inline-block";  viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>'
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
  constructor(t) {
    if (!t || !t.containerId || !t.googleMapsApiKey)
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    if (this.#u = t.containerId, this.#d = document.getElementById(t.containerId), !this.#d)
      throw new Error(
        `PacAutocomplete: Container element with ID "${t.containerId}" not found.`
      );
    this.#m = t.googleMapsApiKey, this.#w = t.googleMapsApiVersion || "weekly", this.#t = {
      ...this.#f,
      // Default options
      ...t.options
      // User-defined options override defaults
    }, t.options && t.options.classes ? this.#t.classes = {
      ...this.#g,
      ...t.options.classes
    } : this.#t.classes = this.#g, this.#t.show_place_type && this.#t.distance && (this.#t.distance = !1), this.#t.debug && (console.log("___debug constructor options:"), console.log(this.#t)), t.fetchFields && Array.isArray(t.fetchFields) && this._setFetchFields(t.fetchFields), this.#p = t.onResponse || ((e) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(e, null, 2));
    }), this.#l = t.onError || ((e) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", e);
    }), t.requestParams && Object.keys(t.requestParams).length > 0 ? this.#o = {
      ...this.#k,
      ...t.requestParams
    } : this.#o = { ...this.#k }, this.#t.debug && console.log("___debug constructor requestParams:", this.#o), this._initialiseDebouncedRequest(), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: this.#m,
        v: this.#w
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (t) {
      this.#l(t);
    }
  }
  /**
   * Initializes the debounced request function for fetching autocomplete suggestions.
   * This function is called on initialization and when options are updated.
   *
   * @private
   */
  _initialiseDebouncedRequest() {
    this.#_ = this._debounce(async () => {
      if (!this.#e || !this.#e.value) {
        this._reset(), this.#e && this.#e.setAttribute("aria-expanded", "false");
        return;
      }
      this.#o.input = this.#e.value;
      try {
        const { suggestions: t } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            this.#o
          )
        );
        if (t && t.length > 0) {
          const e = await Promise.all(
            this._createSuggestionElements(t)
          );
          this.#i.replaceChildren(...e), this.#i.style.display = "block", this.#e.setAttribute("aria-expanded", "true");
        } else
          this._reset(), this.#e.setAttribute("aria-expanded", "false");
      } catch (t) {
        this.#l(t), this._reset();
      }
    }, this.#t.debounce);
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(t) {
    Array.isArray(t) && t.length > 0 && (this.#v = [
      .../* @__PURE__ */ new Set([...this.#C, ...t])
    ].filter((e) => e));
  }
  /**
   * Creates a debounced version of a function.
   *
   * @private
   * @param {Function} func - The function to debounce
   * @param {number} wait - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  _debounce(t, e) {
    let i = null;
    return function(...n) {
      const a = () => {
        i = null, t(...n);
      };
      i !== null && clearTimeout(i), i = setTimeout(a, e ?? 100);
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
  _formatDistance(t, e) {
    if (typeof t != "number" || !this.#t.distance || this.#t.show_place_type)
      return null;
    let i, s;
    return e === "km" ? (i = (t / 1e3).toFixed(2), s = "km") : (i = (t / 1609.34).toFixed(2), s = "miles"), i = i.replace(/\.00$/, ""), `${i} ${s}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(t) {
    var e, i, s, n = "The Google Maps JavaScript API", a = "google", l = "importLibrary", _ = "__ib__", h = document, d = window;
    d = d[a] || (d[a] = {});
    var r = d.maps || (d.maps = {}), g = /* @__PURE__ */ new Set(), p = new URLSearchParams(), m = () => (
      // Function to initiate API loading (if not already started)
      e || // eslint-disable-next-line no-async-promise-executor
      (e = new Promise(async (u, c) => {
        i = h.createElement("script"), p.set("libraries", [...g].join(","));
        for (s in t)
          p.set(
            s.replace(/[A-Z]/g, (w) => "_" + w[0].toLowerCase()),
            // Convert camelCase to snake_case
            t[s]
          );
        p.set("callback", a + ".maps." + _), i.src = `https://maps.${a}apis.com/maps/api/js?` + p, r[_] = u, i.onerror = () => e = c(
          new Error(
            `${n} could not load. Check your API key and network connection.`
          )
        ), i.nonce = h.querySelector("script[nonce]")?.nonce || "", h.head.append(i);
      }))
    );
    r[l] ? console.warn(n + " only loads once. Ignoring:", t) : r[l] = (u, ...c) => g.add(u) && m().then(() => r[l](u, ...c));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const t = document.createElement("section");
    t.className = this.#t.classes.section, this.#n = document.createElement("div"), this.#n.className = this.#t.classes.container, this.#n.setAttribute("id", this.#u + "-div"), t.appendChild(this.#n);
    const e = document.createElement("div");
    e.className = this.#t.classes.icon_container, this.#n.appendChild(e);
    const i = document.createElement("div");
    if (i.innerHTML = this.#t.classes.icon, e.appendChild(i.firstElementChild), this.#e = document.createElement("input"), this.#e.id = this.#u + "-input", this.#e.type = "text", this.#e.name = "search", this.#e.placeholder = this.#t.placeholder, this.#e.autocomplete = this.#t.autocomplete, this.#e.className = this.#t.classes.input, this.#e.setAttribute("role", "combobox"), this.#e.setAttribute("aria-autocomplete", "list"), this.#e.setAttribute("aria-expanded", "false"), this.#e.setAttribute("aria-controls", "pacSuggestions"), this.#e.setAttribute("aria-activedescendant", ""), this.#t.autofocus && (this.#e.autofocus = !0), this.#t.label) {
      const n = document.createElement("label");
      n.htmlFor = this.#e.id, n.textContent = this.#t.label, t.prepend(n);
    }
    this.#n.appendChild(this.#e);
    const s = document.createElement("div");
    s.className = this.#t.classes.kbd_container, this.#r = document.createElement("kbd"), this.#r.className = this.#t.classes.kbd_escape, this.#r.textContent = "Esc", s.appendChild(this.#r), this.#c = document.createElement("kbd"), this.#c.className = this.#t.classes.kbd_up, this.#c.innerHTML = "&#8593;", s.appendChild(this.#c), this.#h = document.createElement("kbd"), this.#h.className = this.#t.classes.kbd_down, this.#h.innerHTML = "&#8595;", s.appendChild(this.#h), this.#n.appendChild(s), this.#i = document.createElement("ul"), this.#i.id = "pacSuggestions", this.#i.className = this.#t.classes.ul, this.#i.style.display = "none", this.#i.setAttribute("role", "listbox"), this.#i.setAttribute("aria-labelledby", this.#e.id), this.#n.appendChild(this.#i), this.#d.appendChild(t), t.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Attaches event listeners to the input element for handling user input.
   * This includes debounced input handling, focus/blur events, and keyboard navigation.
   */
  _attachedEventListeners() {
    this.#e.addEventListener("input", this.#_), this.#e.addEventListener("blur", () => {
      setTimeout(() => {
        this.#i && !this.#i.contains(document.activeElement) && (this.#i.style.display = "none", this.#e.setAttribute("aria-expanded", "false"));
      }, 200);
    }), this.#e.addEventListener("focus", () => {
      this.#e.value && this.#a.length > 0 && (this.#i.style.display = "block", this.#e.setAttribute("aria-expanded", "true"));
    });
  }
  _detachEventListeners() {
    this.#e && this.#e.removeEventListener(
      "input",
      this.#_
    ), this.#d && this.#n && this.#d.removeChild(this.#n.parentElement);
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), this.#e ? this._attachedEventListeners() : this.#l(
        new Error("Input element not found during initialization.")
      );
    } catch (t) {
      console.error("Error initializing Google Places Autocomplete:", t), this.#l(
        new Error("Google Maps Places library not available.")
      );
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(t = !1, e = null) {
    this.#s = -1, this.#e && this.#t.clear_input == !1 && e && e.formattedAddress ? this.#e.value = e.formattedAddress : this.#e && (this.#e.value = ""), this.#e && (this.#e.setAttribute("aria-expanded", "false"), this.#e.setAttribute("aria-activedescendant", ""), this.#e.blur()), this.#a = [], this.#s = -1, this.#i && (this.#i.innerHTML = "", this.#i.style.display = "none"), t && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    this.#i && Array.from(this.#i.children).forEach((t) => {
      this.#t.classes.li_current.split(" ").forEach((i) => t.classList.remove(i));
      const e = t.querySelector("button");
      e && this.#t.classes.li_button_current.split(" ").forEach((i) => e.classList.remove(i));
    });
  }
  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(t) {
    if (this._resetLiClasses(), t.key === "Escape" && (t.preventDefault(), this.#t.classes.kbd_active.split(" ").forEach((e) => this.#r?.classList.add(e)), setTimeout(
      () => this.#t.classes.kbd_active.split(" ").forEach((e) => this.#r?.classList.remove(e)),
      300
    ), this._reset(!0)), !(!this.#a.length || !this.#i || this.#i.style.display === "none"))
      if (t.key === "ArrowDown") {
        t.preventDefault(), this.#s = Math.min(
          this.#s + 1,
          this.#a.length - 1
        ), this.#s < 0 && (this.#s = 0);
        const e = this.#i.children.item(this.#s);
        if (e) {
          const i = e.querySelector("button");
          this.#t.classes.li_current.split(" ").forEach((s) => e.classList.add(s)), i && this.#t.classes.li_button_current.split(" ").forEach((s) => i.classList.add(s)), e.scrollIntoView({ block: "nearest" }), this.#e.setAttribute("aria-activedescendant", e.id);
        }
        this.#t.classes.kbd_active.split(" ").forEach((i) => this.#h?.classList.add(i)), setTimeout(
          () => this.#t.classes.kbd_active.split(" ").forEach((i) => this.#h?.classList.remove(i)),
          300
        );
      } else if (t.key === "ArrowUp") {
        t.preventDefault(), this.#s = Math.max(this.#s - 1, 0);
        const e = this.#i.children.item(this.#s);
        if (e) {
          const i = e.querySelector("button");
          this.#t.classes.li_current.split(" ").forEach((s) => e.classList.add(s)), i && this.#t.classes.li_button_current.split(" ").forEach((s) => i.classList.add(s)), e.scrollIntoView({ block: "nearest" });
        }
        this.#t.classes.kbd_active.split(" ").forEach((i) => this.#c?.classList.add(i)), setTimeout(
          () => this.#t.classes.kbd_active.split(" ").forEach((i) => this.#c?.classList.remove(i)),
          300
        );
      } else t.key === "Enter" && (t.preventDefault(), this.#s >= 0 && this.#s < this.#a.length && this._onPlaceSelected(
        this.#a[this.#s].place
      ));
  }
  // Helper function to find a specific address component
  _getAddressComponent(t, e) {
    return t.addressComponents?.find((i) => i.types.includes(e))?.longText || "";
  }
  /**
   * Creates a button element for a suggestion item.
   * @returns {HTMLButtonElement} The created button element.
   */
  _createButtonElement(t) {
    const e = document.createElement("button");
    return e.tabIndex = t + 1, e.className = this.#t.classes.li_button, e;
  }
  /**
   * Creates a div container for suggestion item.
   * @returns {HTMLDivElement} The created div container element.
   */
  _createDivElement(t) {
    const e = document.createElement("div");
    return t && (e.className = t), e;
  }
  /**
   * Creates an SVG element representing a map pin icon.
   * @returns {SVGSVGElement} The created SVG element.
   */
  _createMapPinIconElement() {
    const t = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    return t.setAttribute("xmlns", "http://www.w3.org/2000/svg"), t.setAttribute("width", "24"), t.setAttribute("height", "24"), t.setAttribute("viewBox", "0 0 24 24"), t.setAttribute("fill", "none"), t.setAttribute("stroke", "currentColor"), t.setAttribute("stroke-width", "2"), t.setAttribute("stroke-linecap", "round"), t.setAttribute("stroke-linejoin", "round"), t.setAttribute("class", this.#t.classes.map_icon_svg), t.innerHTML = this.#t.classes.map_pin_icon, t;
  }
  /**
   * Creates a paragraph (P) element with an optional class name.
   * @param {string} className
   * @returns {HTMLParagraphElement}
   */
  _createPElement(t) {
    const e = document.createElement("p");
    return t && (e.className = t), e;
  }
  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(t) {
    return this.#a = [], t.map(async (e, i) => {
      let s = e.placePrediction.toPlace();
      const n = document.createElement("li");
      n.id = `option-${i + 1}`, n.className = this.#t.classes.li;
      const a = this._createButtonElement(i);
      a.addEventListener("click", (o) => {
        o.preventDefault(), this._onPlaceSelected(e.placePrediction.toPlace());
      });
      const l = this._createDivElement(
        this.#t.classes.li_div_container
      ), _ = this._createDivElement(this.#t.classes.li_div_one), h = this._createDivElement(this.#t.classes.li_div_two), d = this._createMapPinIconElement();
      _.appendChild(d);
      const r = this._createDivElement(
        this.#t.classes.li_div_p_container
      );
      _.appendChild(r);
      const g = this._createPElement(this.#t.classes.li_div_one_p), p = this._createPElement(
        this.#t.classes.li_div_one_p_secondaryText
      ), m = this._createPElement(this.#t.classes.li_div_two_p);
      if (m.textContent = this._formatDistance(
        e.placePrediction.distanceMeters,
        this.#t.distance_units ?? "km"
      ), r.appendChild(g), r.appendChild(p), this.#t.show_place_type && Array.isArray(e.placePrediction.types) && e.placePrediction.types.length > 0) {
        const o = this._createDivElement(
          this.#t.classes.li_div_two_p_place_type
        ), v = this._createPElement(
          this.#t.classes.li_div_two_p_place_type_icon
        ), C = this._createPElement(
          this.#t.classes.li_div_two_p_place_type_label
        ), x = e.placePrediction.types.find(
          (E) => typeof E == "string" && E in this.#y
        );
        C.textContent = x ? this.#y[x] : "Default", v.innerHTML = this.#b[C.textContent] || this.#b.Default, o.appendChild(v), o.appendChild(C), h.appendChild(o);
      } else
        h.appendChild(m);
      l.appendChild(_), l.appendChild(h), a.appendChild(l), n.appendChild(a);
      const u = e.placePrediction.mainText, c = u.text, w = u.matches;
      let y = 0;
      w.sort((o, v) => o.startOffset - v.startOffset);
      const k = document.createElement("span"), f = document.createElement("span");
      f.classList = this.#t.classes.highlight ?? "font-bold";
      for (const o of w)
        k.textContent += c.substring(
          y,
          o.startOffset
        ), o.startOffset > 0 && c.charAt(o.startOffset - 1) == " " && (f.textContent += " "), f.textContent += c.substring(
          o.startOffset,
          o.endOffset
        ), y = o.endOffset;
      const A = document.createTextNode(
        c.substring(y)
      );
      k.appendChild(f), k.appendChild(A), g.appendChild(k);
      const b = e.placePrediction?.secondaryText?.text ?? "";
      return b && (p.textContent = b), this.#a.push({
        id: i + 1,
        place: s,
        mainText: e.placePrediction.mainText.text,
        secondaryText: b,
        description: e.placePrediction.toString()
      }), n.appendChild(a), n;
    });
  }
  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(t) {
    let e = null;
    try {
      await t.fetchFields({
        fields: this.#v
        //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      }), this.#t.response_type === "place" ? (e = t, this.#p(t)) : (e = t.toJSON(), this.#p(e));
    } catch (i) {
      console.error("Error fetching place details:", i), this.#l(i);
    } finally {
      this._reset(!0, e);
    }
  }
  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      this.#o.sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (t) {
      console.error("Error creating session token:", t), this.#l(t);
    }
  }
  /**
   * Sets the fields to be fetched for the selected place.
   * This allows you to specify which details you want to retrieve
   * when a place is selected, such as displayName, formattedAddress,
   * addressComponents, etc.
   * @param {Array<string>} fields - Array of field names to fetch.
   */
  setFetchFields(t) {
    this._setFetchFields(t);
  }
  /**
   * Gets the current fields that will be fetched for the selected place.
   * This is useful for understanding what details will be available
   * when a place is selected, such as displayName, formattedAddress,
   * addressComponents, etc.
   * @returns {Array<string>} The current fetch fields.
   */
  getFetchFields() {
    return this.#v;
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
  setRequestParams(t) {
    typeof t == "object" && !Array.isArray(t) && t !== null && (t.input && typeof t.input == "string" && (this.#e.value = t.input), this.#o = {
      ...this.#k,
      ...t
    });
  }
  /**
   * Returns the current request parameters used by the Places Autocomplete instance.
   * This includes the input value, included region codes, language, and other settings.
   * It is useful for debugging or when you need to know the current search criteria.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    return this.#o;
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
  setOptions(t) {
    if (typeof t == "object" && !Array.isArray(t) && t !== null) {
      this._detachEventListeners();
      const e = t.classes || {};
      delete t.classes, this.#t = {
        ...this.#f,
        ...t
      }, e && typeof e == "object" && Object.keys(e).length > 0 ? this.#t.classes = {
        ...this.#g,
        ...e
      } : this.#t.classes = { ...this.#g }, this.#t.show_place_type && this.#t.distance && (this.#t.distance = !1), this._initialiseDebouncedRequest(), this._createPACStructure(), this.#e && this._attachedEventListeners();
    }
  }
  /**
   * Gets the current options used by the Places Autocomplete instance.
   * @returns {Object} The current options.
   */
  getOptions() {
    return this.#t;
  }
  /**
   * Sets the input value by reverse geocoding coordinates.
   * Performs reverse geocoding to convert lat/lng to a place, then triggers onResponse.
   * Requires the Geocoding API to be enabled in your Google Cloud Console project.
   * @param {number} latitude - Latitude coordinate
   * @param {number} longitude - Longitude coordinate
   * @returns {Promise<void>}
   */
  async setInputValue(t, e) {
    try {
      const { Geocoder: i } = await google.maps.importLibrary("geocoding"), n = await new i().geocode({
        location: { lat: t, lng: e }
      });
      if (n.results && n.results.length > 0) {
        const a = n.results[0].place_id, l = new google.maps.places.Place({ id: a });
        await l.fetchFields({ fields: this.#v }), !this.#t.clear_input && l.formattedAddress && (this.#e.value = l.formattedAddress), this.#t.response_type === "place" ? this.#p(l) : this.#p(l.toJSON());
      } else
        throw new Error("No results found for the provided coordinates");
    } catch (i) {
      console.error("Error in setInputValue:", i), this.#l(i);
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
    this._reset(!0);
  }
  /**
   * Sets focus on the autocomplete input field.
   * This method allows programmatic control of the input focus,
   * useful for improving user experience and accessibility.
   * @returns {void}
   */
  focus() {
    this.#e && this.#e.focus();
  }
  /**
   * Destroys the PacAutocomplete instance.
   * Removes event listeners, clears the DOM, and nullifies properties.
   * This method should be called when the autocomplete widget is no longer needed.
   * It ensures that all resources are cleaned up to prevent memory leaks.
   * @returns {void}
   */
  destroy() {
    this._detachEventListeners(), this.#u = null, this.#d = null, this.#m = null, this.#w = null, this.#t = null, this.#o = null, this.#e = null, this.#n = null, this.#i = null, this.#r = null, this.#c = null, this.#h = null, this.#a = null, this.#s = -1, this.#p = null, this.#l = null, this.#_ = null;
  }
}
export {
  S as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
