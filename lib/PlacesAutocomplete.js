/**
 * Initializes a Places Autocomplete widget.
 * This script dynamically loads the Google Maps JavaScript API, creates the UI elements
 * for the autocomplete input and suggestions list, handles user input with debouncing,
 * fetches suggestions, manages keyboard navigation, and calls user-defined callbacks
 * on place selection or error.
 *
 * @author Alexander Pechkarev <alexpechkarev@gmail.com>
 * @license MIT
 *
 */

/**
 * PacAutocomplete class
 * This class provides a Places Autocomplete widget.
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
  #defaultOptions = {
    // Default options for the autocomplete widget.
    autofocus: false, // Automatically focus the input on load.
    autocomplete: "off", // HTML autocomplete attribute for the input.
    placeholder: "Start typing your address ...", // Placeholder text for the input.
    distance: true, // Show distance in suggestions (requires origin in request).
    distance_units: "km", // Units for distance ('km' or 'miles').
    label: "", // Optional label text above the input.
    debounce: 100, // Debounce delay (ms) for API requests.
    clear_input: true, // Clear input button (not implemented in this version).
  };
  #defaultClasses = {
    // CSS classes for various parts of the widget.
    section: "", // Outer section container.
    container: "relative z-10 transform rounded-xl mt-4", // Main container div.
    icon_container:
      "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3", // Container for the search icon.
    icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>', // SVG for the search icon.
    input:
      "border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 px-4 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm", // Input field.
    kbd_container: "absolute inset-y-0 right-0 flex py-1.5 pr-1.5", // Container for keyboard hints.
    kbd_escape:
      "inline-flex items-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-8 mr-1", // Escape key hint.
    kbd_up:
      "inline-flex items-center justify-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-6", // Up arrow key hint.
    kbd_down:
      "inline-flex items-center rounded border border-gray-400 px-1 font-sans text-xs text-gray-500 justify-center w-6", // Down arrow key hint.
    kbd_active: "bg-indigo-500 text-white", // Class for active keyboard hint.
    ul: "absolute z-50 -mb-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100", // Suggestions list (ul).
    li: "z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900 hover:bg-indigo-500 hover:text-white", // Suggestion item (li).
    li_current: "bg-indigo-500", // Class for the currently selected suggestion item.
    li_a: "block w-full flex justify-between", // Link element within a suggestion item.
    li_a_current: "text-white", // Class for the link in the currently selected suggestion item.
    li_div_container: "flex min-w-0 gap-x-4", // Container div within the suggestion link.
    li_div_one: "min-w-0 flex-auto", // First inner div (for place name).
    li_div_one_p: "text-sm/6", // Paragraph for the place name.
    li_div_two: "shrink-0 flex flex-col items-end min-w-16", // Second inner div (for distance).
    li_div_two_p: "mt-1 text-xs/5", // Paragraph for the distance.
    highlight: "font-bold", // Class for highlighting matched text in suggestions.
  };
  #defaultRequestParams = {
    // Default parameters for the autocomplete request.
    input: "", // Initial input value (empty).
    includedRegionCodes: ["GB"], // Default region codes to include in suggestions.
    language: "en-gb",
    region: "GB",
  };
  #fetchFields = ["formattedAddress", "addressComponents"];
  #defaultFetchFields = ["formattedAddress", "addressComponents"]; // Fields to fetch for the selected place (can be extended).

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
    // console.log("PacAutocomplete constructor called.", config.requestParams);
    if (!config || !config.containerId || !config.googleMapsApiKey) {
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    }

    this.#containerId = config.containerId; // Store the configuration object
    this.#pacEl = document.getElementById(config.containerId);
    if (!this.#pacEl) {
      throw new Error(
        `PacAutocomplete: Container element with ID "${config.containerId}" not found.`
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
    //console.log(this.#options);

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

    //console.log(this.#request);

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
      this._createPACStructure(); // Pass this.#options
      await this._initializeAutocomplete(); // Pass this.#options
      //console.log("PacAutocomplete Initialized for container:", this.#pacEl.id);
    } catch (error) {
      this.#onErrorCallback(error);
    }
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
   * The debounced function delays invoking `func` until after `wait` milliseconds have
   * elapsed since the last time the debounced function was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The number of milliseconds to delay.
   * @returns {Function} The new debounced function.
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
   * Formats a distance in meters into kilometers or miles.
   * @param {number | null | undefined} distance - Distance in meters.
   * @param {'km' | 'miles'} units - The desired output units.
   * @returns {string | null} Formatted distance string (e.g., "1.23 km") or null if input is invalid.
   */
  _formatDistance(distance, units) {
    if (typeof distance !== "number" || !this.#options.distance) {
      return null; // Return null if distance isn't shown or invalid
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
              g[k]
            );
          e.set("callback", c + ".maps." + q); // Set the internal callback function name
          a.src = `https://maps.${c}apis.com/maps/api/js?` + e; // Construct the API URL
          d[q] = f; // Assign the promise resolver to the callback name on google.maps
          // Error handling for script loading failure
          a.onerror = () => (h = n(Error(p + " could not load."))); // Use onerror for load failures
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
    this.#options.classes.section
      .split(" ")
      .forEach((cl) => cl && section.classList.add(cl));

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

    if (this.#options.autofocus) {
      this.#inputElement.autofocus = true;
    }
    if (this.#options.label) {
      const label = document.createElement("label");
      label.htmlFor = this.#containerId + "-labelInput"; // Assuming inputElement gets this ID
      label.textContent = this.#options.label;
      // Add label classes if needed from opts.classes
      this.#container.appendChild(label); // Append label before input or adjust structure
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
    this.#container.appendChild(this.#ul);

    this.#pacEl.appendChild(section);
    section.addEventListener("keydown", this._onKeyDown.bind(this)); // Bind 'this'
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
        this.#inputElement.addEventListener(
          "input",
          this._debouncedMakeAcRequest.bind(this)
        );
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
      } else {
        this.#onErrorCallback(
          new Error("Input element not found during initialization.")
        );
      }
    } catch (error) {
      console.error("Error initializing Google Places Autocomplete:", error);
      // eslint-disable-next-line no-undef
      this.#onErrorCallback(
        new Error("Google Maps Places library not available.")
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
      const link = li.querySelector("a");
      if (link) {
        this.#options.classes.li_a_current
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
        300
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
        this.#allSuggestions.length - 1
      );
      if (this.#currentSuggestion < 0) this.#currentSuggestion = 0; // Handle case where it was -1

      const currentLi = this.#ul.children.item(this.#currentSuggestion);
      if (currentLi) {
        const currentA = currentLi.querySelector("a");
        this.#options.classes.li_current
          .split(" ")
          .forEach((cl) => currentLi.classList.add(cl));
        if (currentA) {
          this.#options.classes.li_a_current
            .split(" ")
            .forEach((cl) => currentA.classList.add(cl));
        }
        currentLi.scrollIntoView({ block: "nearest" }); // Ensure visible
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
        300
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault(); // Prevent cursor movement in input
      this.#currentSuggestion = Math.max(this.#currentSuggestion - 1, 0); // Stay at 0 if already there

      const currentLi = this.#ul.children.item(this.#currentSuggestion);
      if (currentLi) {
        const currentA = currentLi.querySelector("a");
        this.#options.classes.li_current
          .split(" ")
          .forEach((cl) => currentLi.classList.add(cl));
        if (currentA) {
          this.#options.classes.li_a_current
            .split(" ")
            .forEach((cl) => currentA.classList.add(cl));
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
        300
      );
    } else if (e.key === "Enter") {
      e.preventDefault(); // Prevent form submission if applicable
      if (
        this.#currentSuggestion >= 0 &&
        this.#currentSuggestion < this.#allSuggestions.length
      ) {
        this._onPlaceSelected(
          this.#allSuggestions[this.#currentSuggestion].place
        );
        // Reset is handled within onPlaceSelected via reset(true)
      }
    }
  }

  /**
   * Debounced function to fetch autocomplete suggestions from the Google Places API.
   * Triggered by the 'input' event on the input element.
   */
  _debouncedMakeAcRequest = this._debounce(async () => {
    if (!this.#inputElement || !this.#inputElement.value) {
      this._reset();
      if (this.#inputElement)
        this.#inputElement.setAttribute("aria-expanded", "false");
      return;
    }

    this.#request.input = this.#inputElement.value;
    //console.log("Request:", this.#request); // Debugging
    try {
      const { suggestions } =
        // eslint-disable-next-line no-undef
        await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
          this.#request
        );

      // Display suggestions
      if (suggestions && suggestions.length > 0) {
        this.#ul.replaceChildren(
          ...this._createSuggestionElements(suggestions)
        );
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
      // if (this.#inputElement)
      //   this.#inputElement.setAttribute("aria-expanded", "false");
    }
  }, this.#options?.debounce ?? 100);

  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(suggestions) {
    this.#allSuggestions = []; // Reset before populating
    return suggestions.map((suggestion, index) => {
      this.#allSuggestions.push({
        id: index + 1,
        description: suggestion.placePrediction.toString(),
        place: suggestion.placePrediction.toPlace(),
      });

      // create div elements
      const divContainer = document.createElement("div");
      divContainer.className = this.#options.classes.li_div_container; // flex min-w-0 gap-x-4
      // create inner div element - place name
      const divInner = document.createElement("div");
      divInner.className = this.#options.classes.li_div_one; // min-w-0 flex-auto
      divContainer.appendChild(divInner);
      // create p element - place name
      const p = document.createElement("p");
      p.className = this.#options.classes.li_div_one_p; // text-sm/6

      // get prediction text
      const predictionText = suggestion.placePrediction.text;
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
          match.startOffset
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
          match.endOffset
        );

        // Update the last index processed
        lastIndex = match.endOffset;
      }

      // 3. Create a text node for the remaining text
      const remainingText = document.createTextNode(
        originalText.substring(lastIndex)
      );

      // 4. Append the inner span and the text node to the outer span
      outerSpan.appendChild(innerSpan);
      outerSpan.appendChild(remainingText);

      // 5. Append the outer span to the paragraph element
      p.appendChild(outerSpan);

      divInner.appendChild(p);
      divContainer.appendChild(divInner);

      // create inner div element - distance
      const divInner2 = document.createElement("div");
      divInner2.className = this.#options.classes.li_div_two; //'shrink-0 flex flex-col items-end min-w-16';
      divContainer.appendChild(divInner2);
      // create p element - distance
      const p2 = document.createElement("p");
      p2.className = this.#options.classes.li_div_two_p; //'mt-1 text-xs/5 ';
      p2.textContent = this._formatDistance(
        suggestion.placePrediction.distanceMeters,
        this.#options.distance_units ?? "km"
      );
      divInner2.appendChild(p2);

      // // create a link element
      const a = document.createElement("a");
      a.href = "javascript:void(0)";
      a.tabIndex = index + 1;
      a.className = this.#options.classes.li_a; // block w-full flex justify-between

      a.addEventListener("click", () => {
        this._onPlaceSelected(suggestion.placePrediction.toPlace());
      });

      // ...
      // a.addEventListener("click", () => {
      //   this._fetchPlaceDetails(prediction.place_id);
      // });
      a.appendChild(divContainer);
      a.appendChild(divInner2);

      const li = document.createElement("li");
      li.id = `option-${index + 1}`;
      li.className = this.#options.classes.li;

      li.appendChild(a);
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
      // eslint-disable-next-line no-undef
      data = place.toJSON(); // Convert to plain JSON object
      this.#onDataCallback(data); // Convert to plain JSON object for the callback
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
   * Gets the current request parameters used by the Places Autocomplete instance.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    /**
     * Returns the current request parameters used by the Places Autocomplete instance.
     * This includes the input value, included region codes, language, and other settings.
     * It is useful for debugging or when you need to know the current search criteria.
     * @returns {Object} The current request parameters.
     */
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
      // Ensure classes are deeply merged if user provides partial classes
      const tmpClasses = options.classes || {};
      delete options.classes; // Remove classes from options to avoid overwriting

      // Merge provided options with default options
      // This allows overriding specific options while keeping defaults
      this.#options = {
        ...this.#defaultOptions,
        ...options,
      };

      this.#inputElement.placeholder = this.#options.placeholder; // Update placeholder text
      this.#inputElement.autocomplete = this.#options.autocomplete; // Update autocomplete attribute
      this.#inputElement.autofocus = this.#options.autofocus; // Update autofocus attribute
      this.#inputElement.debounce = this.#options.debounce; // Update debounce attribute
      this.#inputElement.clear_input = this.#options.clear_input; // Update clear_input attribute
      this.#inputElement.distance = this.#options.distance; // Update distance attribute
      this.#inputElement.distance_units = this.#options.distance_units; // Update distance units attribute
      this.#inputElement.label = this.#options.label; // Update label text

      this.#inputElement.setAttribute(
        "aria-label",
        this.#options.label || "Search for places"
      ); // Update ARIA label
      this.#inputElement.setAttribute(
        "aria-autocomplete",
        this.#options.aria_autocomplete || "list"
      ); // Update ARIA autocomplete attribute
      this.#inputElement.setAttribute(
        "aria-expanded",
        this.#options.aria_expanded || "false"
      ); // Update ARIA expanded attribute
      this.#inputElement.setAttribute(
        "aria-controls",
        this.#options.aria_controls || "pacSuggestions"
      ); // Update ARIA controls attribute
      this.#inputElement.setAttribute("role", this.#options.role || "combobox"); // Update ARIA role attribute
      this.#inputElement.setAttribute(
        "aria-required",
        this.#options.aria_required || "false"
      ); // Update ARIA required attribute
      this.#inputElement.setAttribute(
        "aria-activedescendant",
        this.#options.aria_activedescendant || ""
      ); // Update ARIA activedescendant attribute

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
      }

      // Update the classes of the container and input element
      if (this.#container && this.#options.classes?.container) {
        this.#container.className = this.#options.classes.container; // Update container class
      }
      if (this.#inputElement && this.#options.classes?.input) {
        this.#inputElement.className = this.#options.classes.input; // Update input class
      }
      // Update the classes of the suggestions list
      if (this.#ul && this.#options.classes?.ul) {
        this.#ul.className = this.#options.classes.ul; // Update suggestions list class
      }
      // Update the classes of the keyboard hints
      if (this.#kbdEscape && this.#options.classes?.kbd_escape) {
        this.#kbdEscape.className = this.#options.classes.kbd_escape; // Update Escape key hint class
      }
      if (this.#kbdUp && this.#options.classes?.kbd_up) {
        this.#kbdUp.className = this.#options.classes.kbd_up; // Update Up arrow key hint class
      }
      if (this.#kbdDown && this.#options.classes?.kbd_down) {
        this.#kbdDown.className = this.#options.classes.kbd_down; // Update Down arrow key hint class
      }
      // Update the classes of the section
      if (this.#pacEl) {
        const section = this.#pacEl.querySelector("section");

        if (section && this.#options.classes?.section) {
          this.#options.classes.section
            .split(" ")
            .forEach((cl) => cl && section.classList.add(cl));
        }
      }
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
   * Destroys the PacAutocomplete instance.
   * Removes event listeners, clears the DOM, and nullifies properties.
   * This method should be called when the autocomplete widget is no longer needed.
   * It ensures that all resources are cleaned up to prevent memory leaks.
   * @returns {void}
   */
  destroy() {
    // Remove event listeners, remove elements from DOM
    if (this.#inputElement) {
      this.#inputElement.removeEventListener(
        "input",
        this._debouncedMakeAcRequest
      );
      // remove other listeners
    }
    if (this.#pacEl && this.#container) {
      this.#pacEl.removeChild(this.#container.parentElement); // remove the whole section
    }
    // Nullify properties
    for (const prop in this) {
      if (Object.hasOwn(this, prop)) {
        this[prop] = null;
      }
    }
    console.log("PacAutocomplete instance destroyed.");
  }
}
