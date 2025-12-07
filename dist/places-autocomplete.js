class w {
  // --- Private Properties (using # or _ prefix by convention) ---
  #u;
  // Container ID where the autocomplete widget will be rendered.
  #d;
  #_;
  #f;
  #t;
  #a;
  #e;
  #n;
  #s;
  #l;
  #c;
  #h;
  #r = [];
  #i = -1;
  #b;
  // For user-provided data callback
  #o;
  // For user-provided error callback
  #p;
  // Declare without initializing here
  #y = {
    // Default options for the autocomplete widget.
    autofocus: !1,
    // Automatically focus the input on load.
    autocomplete: "off",
    // HTML autocomplete attribute for the input.
    placeholder: "Start typing your address ...",
    // Placeholder text for the input.
    distance: !0,
    // Show distance in suggestions (requires origin in request).
    distance_units: "km",
    // Units for distance ('km' or 'miles').
    label: "",
    // Optional label text above the input.
    debounce: 100,
    // Debounce delay (ms) for API requests.
    clear_input: !0,
    // Clear input button (not implemented in this version).
    debug: !1
    // Enable debug mode (not implemented in this version).
  };
  #m = {
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
    li_a: "pac-li-a",
    //"block w-full flex justify-between", // Link element within a suggestion item.
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
    highlight: "pac-highlight"
    //"font-bold", // Class for highlighting matched text in suggestions.
  };
  #v = {
    // Default parameters for the autocomplete request.
    input: "",
    // Initial input value (empty).
    includedRegionCodes: ["GB"],
    // Default region codes to include in suggestions.
    language: "en-gb",
    region: "GB"
  };
  #g = ["formattedAddress", "addressComponents"];
  #E = ["formattedAddress", "addressComponents"];
  // Fields to fetch for the selected place (can be extended).
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
    this.#_ = t.googleMapsApiKey, this.#f = t.googleMapsApiVersion || "weekly", this.#t = {
      ...this.#y,
      // Default options
      ...t.options
      // User-defined options override defaults
    }, t.options && t.options.classes ? this.#t.classes = {
      ...this.#m,
      ...t.options.classes
    } : this.#t.classes = this.#m, this.#t.debug && (console.log("___debug constructor options:"), console.log(this.#t)), t.fetchFields && Array.isArray(t.fetchFields) && this._setFetchFields(t.fetchFields), this.#b = t.onResponse || ((e) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(e, null, 2));
    }), this.#o = t.onError || ((e) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", e);
    }), t.requestParams && Object.keys(t.requestParams).length > 0 ? this.#a = {
      ...this.#v,
      ...t.requestParams
    } : this.#a = { ...this.#v }, this.#t.debug && console.log("___debug constructor requestParams:", this.#a), this._initialiseDebouncedRequest(), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: this.#_,
        v: this.#f
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (t) {
      this.#o(t);
    }
  }
  /**
   * Initializes the debounced request function for fetching autocomplete suggestions.
   * This function is called on initialization and when options are updated.
   *
   * @private
   */
  _initialiseDebouncedRequest() {
    this.#p = this._debounce(async () => {
      if (!this.#e || !this.#e.value) {
        this._reset(), this.#e && this.#e.setAttribute("aria-expanded", "false");
        return;
      }
      this.#a.input = this.#e.value;
      try {
        const { suggestions: t } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            this.#a
          )
        );
        if (t && t.length > 0) {
          const e = await Promise.all(
            this._createSuggestionElements(t)
          );
          this.#s.replaceChildren(...e), this.#s.style.display = "block", this.#e.setAttribute("aria-expanded", "true");
        } else
          this._reset(), this.#e.setAttribute("aria-expanded", "false");
      } catch (t) {
        this.#o(t), this._reset();
      }
    }, this.#t.debounce);
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(t) {
    Array.isArray(t) && t.length > 0 && (this.#g = [
      .../* @__PURE__ */ new Set([...this.#E, ...t])
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
    let s = null;
    return function(...n) {
      const a = () => {
        s = null, t(...n);
      };
      s !== null && clearTimeout(s), s = setTimeout(a, e ?? 100);
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
    if (typeof t != "number" || !this.#t.distance)
      return null;
    let s, i;
    return e === "km" ? (s = (t / 1e3).toFixed(2), i = "km") : (s = (t / 1609.34).toFixed(2), i = "miles"), s = s.replace(/\.00$/, ""), `${s} ${i}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(t) {
    var e, s, i, n = "The Google Maps JavaScript API", a = "google", c = "importLibrary", p = "__ib__", m = document, h = window;
    h = h[a] || (h[a] = {});
    var r = h.maps || (h.maps = {}), _ = /* @__PURE__ */ new Set(), d = new URLSearchParams(), f = () => (
      // Function to initiate API loading (if not already started)
      e || // eslint-disable-next-line no-async-promise-executor
      (e = new Promise(async (u, o) => {
        s = m.createElement("script"), d.set("libraries", [..._].join(","));
        for (i in t)
          d.set(
            i.replace(/[A-Z]/g, (b) => "_" + b[0].toLowerCase()),
            // Convert camelCase to snake_case
            t[i]
          );
        d.set("callback", a + ".maps." + p), s.src = `https://maps.${a}apis.com/maps/api/js?` + d, r[p] = u, s.onerror = () => e = o(
          new Error(
            `${n} could not load. Check your API key and network connection.`
          )
        ), s.nonce = m.querySelector("script[nonce]")?.nonce || "", m.head.append(s);
      }))
    );
    r[c] ? console.warn(n + " only loads once. Ignoring:", t) : r[c] = (u, ...o) => _.add(u) && f().then(() => r[c](u, ...o));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const t = document.createElement("section");
    t.className = this.#t.classes.section, this.#n = document.createElement("div"), this.#n.className = this.#t.classes.container, this.#n.setAttribute("id", this.#u + "-div"), t.appendChild(this.#n);
    const e = document.createElement("div");
    e.className = this.#t.classes.icon_container, this.#n.appendChild(e);
    const s = document.createElement("div");
    if (s.innerHTML = this.#t.classes.icon, e.appendChild(s.firstElementChild), this.#e = document.createElement("input"), this.#e.id = this.#u + "-input", this.#e.type = "text", this.#e.name = "search", this.#e.placeholder = this.#t.placeholder, this.#e.autocomplete = this.#t.autocomplete, this.#e.className = this.#t.classes.input, this.#e.setAttribute("role", "combobox"), this.#e.setAttribute("aria-autocomplete", "list"), this.#e.setAttribute("aria-expanded", "false"), this.#e.setAttribute("aria-controls", "pacSuggestions"), this.#e.setAttribute("aria-activedescendant", ""), this.#t.autofocus && (this.#e.autofocus = !0), this.#t.label) {
      const n = document.createElement("label");
      n.htmlFor = this.#e.id, n.textContent = this.#t.label, t.prepend(n);
    }
    this.#n.appendChild(this.#e);
    const i = document.createElement("div");
    i.className = this.#t.classes.kbd_container, this.#l = document.createElement("kbd"), this.#l.className = this.#t.classes.kbd_escape, this.#l.textContent = "Esc", i.appendChild(this.#l), this.#c = document.createElement("kbd"), this.#c.className = this.#t.classes.kbd_up, this.#c.innerHTML = "&#8593;", i.appendChild(this.#c), this.#h = document.createElement("kbd"), this.#h.className = this.#t.classes.kbd_down, this.#h.innerHTML = "&#8595;", i.appendChild(this.#h), this.#n.appendChild(i), this.#s = document.createElement("ul"), this.#s.id = "pacSuggestions", this.#s.className = this.#t.classes.ul, this.#s.style.display = "none", this.#s.setAttribute("role", "listbox"), this.#s.setAttribute("aria-labelledby", this.#e.id), this.#n.appendChild(this.#s), this.#d.appendChild(t), t.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Attaches event listeners to the input element for handling user input.
   * This includes debounced input handling, focus/blur events, and keyboard navigation.
   */
  _attachedEventListeners() {
    this.#e.addEventListener("input", this.#p), this.#e.addEventListener("blur", () => {
      setTimeout(() => {
        this.#s && !this.#s.contains(document.activeElement) && (this.#s.style.display = "none", this.#e.setAttribute("aria-expanded", "false"));
      }, 200);
    }), this.#e.addEventListener("focus", () => {
      this.#e.value && this.#r.length > 0 && (this.#s.style.display = "block", this.#e.setAttribute("aria-expanded", "true"));
    });
  }
  _detachEventListeners() {
    this.#e && this.#e.removeEventListener(
      "input",
      this.#p
    ), this.#d && this.#n && this.#d.removeChild(this.#n.parentElement);
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), this.#e ? this._attachedEventListeners() : this.#o(
        new Error("Input element not found during initialization.")
      );
    } catch (t) {
      console.error("Error initializing Google Places Autocomplete:", t), this.#o(
        new Error("Google Maps Places library not available.")
      );
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(t = !1, e = null) {
    this.#i = -1, this.#e && this.#t.clear_input == !1 && e && e.formattedAddress ? this.#e.value = e.formattedAddress : this.#e && (this.#e.value = ""), this.#e && (this.#e.setAttribute("aria-expanded", "false"), this.#e.setAttribute("aria-activedescendant", ""), this.#e.blur()), this.#r = [], this.#i = -1, this.#s && (this.#s.innerHTML = "", this.#s.style.display = "none"), t && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    this.#s && Array.from(this.#s.children).forEach((t) => {
      this.#t.classes.li_current.split(" ").forEach((s) => t.classList.remove(s));
      const e = t.querySelector("button");
      e && this.#t.classes.li_button_current.split(" ").forEach((s) => e.classList.remove(s));
    });
  }
  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(t) {
    if (this._resetLiClasses(), t.key === "Escape" && (t.preventDefault(), this.#t.classes.kbd_active.split(" ").forEach((e) => this.#l?.classList.add(e)), setTimeout(
      () => this.#t.classes.kbd_active.split(" ").forEach((e) => this.#l?.classList.remove(e)),
      300
    ), this._reset(!0)), !(!this.#r.length || !this.#s || this.#s.style.display === "none"))
      if (t.key === "ArrowDown") {
        t.preventDefault(), this.#i = Math.min(
          this.#i + 1,
          this.#r.length - 1
        ), this.#i < 0 && (this.#i = 0);
        const e = this.#s.children.item(this.#i);
        if (e) {
          const s = e.querySelector("button");
          this.#t.classes.li_current.split(" ").forEach((i) => e.classList.add(i)), s && this.#t.classes.li_button_current.split(" ").forEach((i) => s.classList.add(i)), e.scrollIntoView({ block: "nearest" }), this.#e.setAttribute("aria-activedescendant", e.id);
        }
        this.#t.classes.kbd_active.split(" ").forEach((s) => this.#h?.classList.add(s)), setTimeout(
          () => this.#t.classes.kbd_active.split(" ").forEach((s) => this.#h?.classList.remove(s)),
          300
        );
      } else if (t.key === "ArrowUp") {
        t.preventDefault(), this.#i = Math.max(this.#i - 1, 0);
        const e = this.#s.children.item(this.#i);
        if (e) {
          const s = e.querySelector("button");
          this.#t.classes.li_current.split(" ").forEach((i) => e.classList.add(i)), s && this.#t.classes.li_button_current.split(" ").forEach((i) => s.classList.add(i)), e.scrollIntoView({ block: "nearest" });
        }
        this.#t.classes.kbd_active.split(" ").forEach((s) => this.#c?.classList.add(s)), setTimeout(
          () => this.#t.classes.kbd_active.split(" ").forEach((s) => this.#c?.classList.remove(s)),
          300
        );
      } else t.key === "Enter" && (t.preventDefault(), this.#i >= 0 && this.#i < this.#r.length && this._onPlaceSelected(
        this.#r[this.#i].place
      ));
  }
  // Helper function to find a specific address component
  _getAddressComponent(t, e) {
    return t.addressComponents?.find((s) => s.types.includes(e))?.longText || "";
  }
  // Helper function to get secondary text from address components
  _getSecondaryText(t) {
    const e = this._getAddressComponent(t, "locality"), s = this._getAddressComponent(
      t,
      "administrative_area_level_1"
    ), i = this._getAddressComponent(t, "postal_code"), n = this._getAddressComponent(t, "country");
    return [e, s, n, i].filter(Boolean).join(", ");
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
    return this.#r = [], t.map(async (e, s) => {
      let i = e.placePrediction.toPlace();
      await i.fetchFields({ fields: ["addressComponents"] });
      const n = document.createElement("li");
      n.id = `option-${s + 1}`, n.className = this.#t.classes.li;
      const a = this._createButtonElement(s);
      a.addEventListener("click", () => {
        this._onPlaceSelected(e.placePrediction.toPlace());
      });
      const c = this._createDivElement(
        this.#t.classes.li_div_container
      ), p = this._createDivElement(this.#t.classes.li_div_one), m = this._createDivElement(this.#t.classes.li_div_two), h = this._createMapPinIconElement();
      p.appendChild(h);
      const r = this._createDivElement(
        this.#t.classes.li_div_p_container
      );
      p.appendChild(r);
      const _ = this._createPElement(this.#t.classes.li_div_one_p), d = this._createPElement(
        this.#t.classes.li_div_one_p_secondaryText
      ), f = this._createPElement(this.#t.classes.li_div_two_p);
      f.textContent = this._formatDistance(
        e.placePrediction.distanceMeters,
        this.#t.distance_units ?? "km"
      ), r.appendChild(_), r.appendChild(d), m.appendChild(f), c.appendChild(p), c.appendChild(m), a.appendChild(c), n.appendChild(a);
      const u = e.placePrediction.mainText, o = u.text, b = u.matches;
      let y = 0;
      b.sort((l, A) => l.startOffset - A.startOffset);
      const v = document.createElement("span"), g = document.createElement("span");
      g.classList = this.#t.classes.highlight ?? "font-bold";
      for (const l of b)
        v.textContent += o.substring(
          y,
          l.startOffset
        ), l.startOffset > 0 && o.charAt(l.startOffset - 1) == " " && (g.textContent += " "), g.textContent += o.substring(
          l.startOffset,
          l.endOffset
        ), y = l.endOffset;
      const k = document.createTextNode(
        o.substring(y)
      );
      v.appendChild(g), v.appendChild(k), _.appendChild(v);
      const E = this._getSecondaryText(i);
      return E && (d.textContent = E), this.#r.push({
        id: s + 1,
        place: i,
        mainText: e.placePrediction.mainText.text,
        secondaryText: this._getSecondaryText(i),
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
        fields: this.#g
        //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      }), e = t.toJSON(), this.#b(e);
    } catch (s) {
      console.error("Error fetching place details:", s), this.#o(s);
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
      this.#a.sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (t) {
      console.error("Error creating session token:", t), this.#o(t);
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
    return this.#g;
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
    typeof t == "object" && !Array.isArray(t) && t !== null && (t.input && typeof t.input == "string" && (this.#e.value = t.input), this.#a = {
      ...this.#v,
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
    return this.#a;
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
        ...this.#y,
        ...t
      }, e && typeof e == "object" && Object.keys(e).length > 0 ? this.#t.classes = {
        ...this.#m,
        ...e
      } : this.#t.classes = { ...this.#m }, this._initialiseDebouncedRequest(), this._createPACStructure(), this.#e && this._attachedEventListeners();
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
   * Destroys the PacAutocomplete instance.
   * Removes event listeners, clears the DOM, and nullifies properties.
   * This method should be called when the autocomplete widget is no longer needed.
   * It ensures that all resources are cleaned up to prevent memory leaks.
   * @returns {void}
   */
  destroy() {
    this._detachEventListeners(), this.#u = null, this.#d = null, this.#_ = null, this.#f = null, this.#t = null, this.#a = null, this.#e = null, this.#n = null, this.#s = null, this.#l = null, this.#c = null, this.#h = null, this.#r = null, this.#i = -1, this.#b = null, this.#o = null, this.#p = null;
  }
}
export {
  w as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
