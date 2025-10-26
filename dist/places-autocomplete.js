/**
 * Initialises a Places Autocomplete widget.
 * This script dynamically loads the Google Maps JavaScript API, creates the UI elements
 * for the autocomplete input and suggestions list, handles user input with debouncing,
 * fetches suggestions, manages keyboard navigation, and calls user-defined callbacks
 * on place selection or error.
 *
 * @author Alexander Pechkarev <alexpechkarev@gmail.com>
 * @license MIT
 *
 */
class y {
  // --- Private Properties (using # or _ prefix by convention) ---
  #u;
  // Container ID where the autocomplete widget will be rendered.
  #d;
  #m;
  #f;
  #e;
  #n;
  #t;
  #a;
  #s;
  #o;
  #c;
  #h;
  #l = [];
  #i = -1;
  #_;
  // For user-provided data callback
  #r;
  // For user-provided error callback
  _debouncedMakeAcRequest;
  // Declare without initializing here
  #g = {
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
  #p = {
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
    li_a_current: "pac-li-a-current",
    //"text-white", // Class for the link in the currently selected suggestion item.
    li_div_container: "pac-li-div-container",
    //"flex min-w-0 gap-x-4", // Container div within the suggestion link.
    li_div_one: "pac-li-div-one",
    //"min-w-0 flex-auto", // First inner div (for place name).
    li_div_one_p: "pac-li-div-one-p",
    //"text-sm/6", // Paragraph for the place name.
    li_div_two: "pac-li-div-two",
    //"shrink-0 flex flex-col items-end min-w-16", // Second inner div (for distance).
    li_div_two_p: "pac-li-div-two-p",
    //"mt-1 text-xs/5", // Paragraph for the distance.
    highlight: "pac-highlight"
    //"font-bold", // Class for highlighting matched text in suggestions.
  };
  #b = {
    // Default parameters for the autocomplete request.
    input: "",
    // Initial input value (empty).
    includedRegionCodes: ["GB"],
    // Default region codes to include in suggestions.
    language: "en-gb",
    region: "GB"
  };
  #v = ["formattedAddress", "addressComponents"];
  #y = ["formattedAddress", "addressComponents"];
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
  constructor(e) {
    if (!e || !e.containerId || !e.googleMapsApiKey)
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    if (this.#u = e.containerId, this.#d = document.getElementById(e.containerId), !this.#d)
      throw new Error(
        `PacAutocomplete: Container element with ID "${e.containerId}" not found.`
      );
    this.#m = e.googleMapsApiKey, this.#f = e.googleMapsApiVersion || "weekly", this.#e = {
      ...this.#g,
      // Default options
      ...e.options
      // User-defined options override defaults
    }, e.options && e.options.classes ? this.#e.classes = {
      ...this.#p,
      ...e.options.classes
    } : this.#e.classes = this.#p, this.#e.debug && (console.log("___debug constructor options:"), console.log(this.#e)), e.fetchFields && Array.isArray(e.fetchFields) && this._setFetchFields(e.fetchFields), this.#_ = e.onResponse || ((t) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(t, null, 2));
    }), this.#r = e.onError || ((t) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", t);
    }), e.requestParams && Object.keys(e.requestParams).length > 0 ? this.#n = {
      ...this.#b,
      ...e.requestParams
    } : this.#n = { ...this.#b }, this.#e.debug && console.log("___debug constructor requestParams:", this.#n), this._initialiseDebouncedRequest(), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: this.#m,
        v: this.#f
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (e) {
      this.#r(e);
    }
  }
  /**
   * Initializes the debounced request function for fetching autocomplete suggestions.
   *
   * Debounced function to fetch autocomplete suggestions from the Google Places API.
   * Triggered by the 'input' event on the input element.
   *
   *
   */
  _initialiseDebouncedRequest() {
    this._debouncedMakeAcRequest = this._debounce(async () => {
      if (!this.#t || !this.#t.value) {
        this._reset(), this.#t && this.#t.setAttribute("aria-expanded", "false");
        return;
      }
      this.#n.input = this.#t.value;
      try {
        const { suggestions: e } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            this.#n
          )
        );
        e && e.length > 0 ? (this.#s.replaceChildren(
          ...this._createSuggestionElements(e)
        ), this.#s.style.display = "block", this.#t.setAttribute("aria-expanded", "true")) : (this._reset(), this.#t.setAttribute("aria-expanded", "false"));
      } catch (e) {
        this.#r(e), this._reset();
      }
    }, this.#e.debounce);
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(e) {
    Array.isArray(e) && e.length > 0 && (this.#v = [
      .../* @__PURE__ */ new Set([...this.#y, ...e])
    ].filter((t) => t));
  }
  /**
   * Creates a debounced version of a function.
   * The debounced function delays invoking `func` until after `wait` milliseconds have
   * elapsed since the last time the debounced function was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The number of milliseconds to delay.
   * @returns {Function} The new debounced function.
   */
  _debounce(e, t) {
    this.#e.debug && console.log("___debug debounce function called with wait:", t);
    let s = null;
    return function(...a) {
      const l = () => {
        s = null, e(...a);
      };
      s !== null && clearTimeout(s), s = setTimeout(l, t ?? 100);
    };
  }
  /**
   * Formats a distance in meters into kilometers or miles.
   * @param {number | null | undefined} distance - Distance in meters.
   * @param {'km' | 'miles'} units - The desired output units.
   * @returns {string | null} Formatted distance string (e.g., "1.23 km") or null if input is invalid.
   */
  _formatDistance(e, t) {
    if (typeof e != "number" || !this.#e.distance)
      return null;
    let s, i;
    return t === "km" ? (s = (e / 1e3).toFixed(2), i = "km") : (s = (e / 1609.34).toFixed(2), i = "miles"), s = s.replace(/\.00$/, ""), `${s} ${i}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(e) {
    var t, s, i, a = "The Google Maps JavaScript API", l = "google", p = "importLibrary", d = "__ib__", m = document, r = window;
    r = r[l] || (r[l] = {});
    var o = r.maps || (r.maps = {}), u = /* @__PURE__ */ new Set(), f = new URLSearchParams(), _ = () => (
      // Function to initiate API loading (if not already started)
      t || // eslint-disable-next-line no-async-promise-executor
      (t = new Promise(async (c, n) => {
        s = m.createElement("script"), f.set("libraries", [...u].join(","));
        for (i in e)
          f.set(
            i.replace(/[A-Z]/g, (b) => "_" + b[0].toLowerCase()),
            // Convert camelCase to snake_case
            e[i]
          );
        f.set("callback", l + ".maps." + d), s.src = `https://maps.${l}apis.com/maps/api/js?` + f, o[d] = c, s.onerror = () => t = n(
          new Error(
            `${a} could not load. Check your API key and network connection.`
          )
        ), s.nonce = m.querySelector("script[nonce]")?.nonce || "", m.head.append(s);
      }))
    );
    o[p] ? console.warn(a + " only loads once. Ignoring:", e) : o[p] = (c, ...n) => u.add(c) && _().then(() => o[p](c, ...n));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const e = document.createElement("section");
    e.className = this.#e.classes.section, this.#a = document.createElement("div"), this.#a.className = this.#e.classes.container, this.#a.setAttribute("id", this.#u + "-div"), e.appendChild(this.#a);
    const t = document.createElement("div");
    t.className = this.#e.classes.icon_container, this.#a.appendChild(t);
    const s = document.createElement("div");
    if (s.innerHTML = this.#e.classes.icon, t.appendChild(s.firstElementChild), this.#t = document.createElement("input"), this.#t.id = this.#u + "-input", this.#t.type = "text", this.#t.name = "search", this.#t.placeholder = this.#e.placeholder, this.#t.autocomplete = this.#e.autocomplete, this.#t.className = this.#e.classes.input, this.#t.setAttribute("role", "combobox"), this.#t.setAttribute("aria-autocomplete", "list"), this.#t.setAttribute("aria-expanded", "false"), this.#t.setAttribute("aria-controls", "pacSuggestions"), this.#t.setAttribute("aria-activedescendant", ""), this.#e.autofocus && (this.#t.autofocus = !0), this.#e.label) {
      const a = document.createElement("label");
      a.htmlFor = this.#t.id, a.textContent = this.#e.label, e.prepend(a);
    }
    this.#a.appendChild(this.#t);
    const i = document.createElement("div");
    i.className = this.#e.classes.kbd_container, this.#o = document.createElement("kbd"), this.#o.className = this.#e.classes.kbd_escape, this.#o.textContent = "Esc", i.appendChild(this.#o), this.#c = document.createElement("kbd"), this.#c.className = this.#e.classes.kbd_up, this.#c.innerHTML = "&#8593;", i.appendChild(this.#c), this.#h = document.createElement("kbd"), this.#h.className = this.#e.classes.kbd_down, this.#h.innerHTML = "&#8595;", i.appendChild(this.#h), this.#a.appendChild(i), this.#s = document.createElement("ul"), this.#s.id = "pacSuggestions", this.#s.className = this.#e.classes.ul, this.#s.style.display = "none", this.#s.setAttribute("role", "listbox"), this.#s.setAttribute("aria-labelledby", this.#t.id), this.#a.appendChild(this.#s), this.#d.appendChild(e), e.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Attaches event listeners to the input element for handling user input.
   * This includes debounced input handling, focus/blur events, and keyboard navigation.
   */
  _attachedEventListeners() {
    this.#t.addEventListener("input", this._debouncedMakeAcRequest), this.#t.addEventListener("blur", () => {
      setTimeout(() => {
        this.#s && !this.#s.contains(document.activeElement) && (this.#s.style.display = "none", this.#t.setAttribute("aria-expanded", "false"));
      }, 200);
    }), this.#t.addEventListener("focus", () => {
      this.#t.value && this.#l.length > 0 && (this.#s.style.display = "block", this.#t.setAttribute("aria-expanded", "true"));
    });
  }
  _detachEventListeners() {
    this.#t && this.#t.removeEventListener(
      "input",
      this._debouncedMakeAcRequest
    ), this.#d && this.#a && this.#d.removeChild(this.#a.parentElement);
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), this.#t ? this._attachedEventListeners() : this.#r(
        new Error("Input element not found during initialization.")
      );
    } catch (e) {
      console.error("Error initializing Google Places Autocomplete:", e), this.#r(
        new Error("Google Maps Places library not available.")
      );
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(e = !1, t = null) {
    this.#i = -1, this.#t && this.#e.clear_input == !1 && t && t.formattedAddress ? this.#t.value = t.formattedAddress : this.#t && (this.#t.value = ""), this.#t && (this.#t.setAttribute("aria-expanded", "false"), this.#t.setAttribute("aria-activedescendant", ""), this.#t.blur()), this.#l = [], this.#i = -1, this.#s && (this.#s.innerHTML = "", this.#s.style.display = "none"), e && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    this.#s && Array.from(this.#s.children).forEach((e) => {
      this.#e.classes.li_current.split(" ").forEach((s) => e.classList.remove(s));
      const t = e.querySelector("a");
      t && this.#e.classes.li_a_current.split(" ").forEach((s) => t.classList.remove(s));
    });
  }
  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(e) {
    if (this._resetLiClasses(), e.key === "Escape" && (e.preventDefault(), this.#e.classes.kbd_active.split(" ").forEach((t) => this.#o?.classList.add(t)), setTimeout(
      () => this.#e.classes.kbd_active.split(" ").forEach((t) => this.#o?.classList.remove(t)),
      300
    ), this._reset(!0)), !(!this.#l.length || !this.#s || this.#s.style.display === "none"))
      if (e.key === "ArrowDown") {
        e.preventDefault(), this.#i = Math.min(
          this.#i + 1,
          this.#l.length - 1
        ), this.#i < 0 && (this.#i = 0);
        const t = this.#s.children.item(this.#i);
        if (t) {
          const s = t.querySelector("a");
          this.#e.classes.li_current.split(" ").forEach((i) => t.classList.add(i)), s && this.#e.classes.li_a_current.split(" ").forEach((i) => s.classList.add(i)), t.scrollIntoView({ block: "nearest" }), this.#t.setAttribute("aria-activedescendant", t.id);
        }
        this.#e.classes.kbd_active.split(" ").forEach((s) => this.#h?.classList.add(s)), setTimeout(
          () => this.#e.classes.kbd_active.split(" ").forEach((s) => this.#h?.classList.remove(s)),
          300
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault(), this.#i = Math.max(this.#i - 1, 0);
        const t = this.#s.children.item(this.#i);
        if (t) {
          const s = t.querySelector("a");
          this.#e.classes.li_current.split(" ").forEach((i) => t.classList.add(i)), s && this.#e.classes.li_a_current.split(" ").forEach((i) => s.classList.add(i)), t.scrollIntoView({ block: "nearest" });
        }
        this.#e.classes.kbd_active.split(" ").forEach((s) => this.#c?.classList.add(s)), setTimeout(
          () => this.#e.classes.kbd_active.split(" ").forEach((s) => this.#c?.classList.remove(s)),
          300
        );
      } else e.key === "Enter" && (e.preventDefault(), this.#i >= 0 && this.#i < this.#l.length && this._onPlaceSelected(
        this.#l[this.#i].place
      ));
  }
  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(e) {
    return this.#l = [], e.map((t, s) => {
      this.#l.push({
        id: s + 1,
        description: t.placePrediction.toString(),
        place: t.placePrediction.toPlace()
      });
      const i = document.createElement("div");
      i.className = this.#e.classes.li_div_container;
      const a = document.createElement("div");
      a.className = this.#e.classes.li_div_one, i.appendChild(a);
      const l = document.createElement("p");
      l.className = this.#e.classes.li_div_one_p;
      const p = t.placePrediction.text, d = p.text, m = p.matches;
      let r = 0;
      m.sort((h, v) => h.startOffset - v.startOffset);
      const o = document.createElement("span"), u = document.createElement("span");
      u.classList = this.#e.classes.highlight ?? "font-bold";
      for (const h of m)
        o.textContent += d.substring(
          r,
          h.startOffset
        ), h.startOffset > 0 && d.charAt(h.startOffset - 1) == " " && (u.textContent += " "), u.textContent += d.substring(
          h.startOffset,
          h.endOffset
        ), r = h.endOffset;
      const f = document.createTextNode(
        d.substring(r)
      );
      o.appendChild(u), o.appendChild(f), l.appendChild(o), a.appendChild(l), i.appendChild(a);
      const _ = document.createElement("div");
      _.className = this.#e.classes.li_div_two, i.appendChild(_);
      const c = document.createElement("p");
      c.className = this.#e.classes.li_div_two_p, c.textContent = this._formatDistance(
        t.placePrediction.distanceMeters,
        this.#e.distance_units ?? "km"
      ), _.appendChild(c);
      const n = document.createElement("a");
      n.href = "javascript:void(0)", n.tabIndex = s + 1, n.className = this.#e.classes.li_a, n.addEventListener("click", () => {
        this._onPlaceSelected(t.placePrediction.toPlace());
      }), n.appendChild(i), n.appendChild(_);
      const b = document.createElement("li");
      return b.id = `option-${s + 1}`, b.className = this.#e.classes.li, b.appendChild(n), b;
    });
  }
  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(e) {
    let t = null;
    try {
      await e.fetchFields({
        fields: this.#v
        //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      }), t = e.toJSON(), this.#_(t);
    } catch (s) {
      console.error("Error fetching place details:", s), this.#r(s);
    } finally {
      this._reset(!0, t);
    }
  }
  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      this.#n.sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (e) {
      console.error("Error creating session token:", e), this.#r(e);
    }
  }
  /**
   * Sets the fields to be fetched for the selected place.
   * This allows you to specify which details you want to retrieve
   * when a place is selected, such as displayName, formattedAddress,
   * addressComponents, etc.
   * @param {Array<string>} fields - Array of field names to fetch.
   */
  setFetchFields(e) {
    this._setFetchFields(e);
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
  setRequestParams(e) {
    typeof e == "object" && !Array.isArray(e) && e !== null && (e.input && typeof e.input == "string" && (this.#t.value = e.input), this.#n = {
      ...this.#b,
      ...e
    });
  }
  /**
   * Returns the current request parameters used by the Places Autocomplete instance.
   * This includes the input value, included region codes, language, and other settings.
   * It is useful for debugging or when you need to know the current search criteria.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    return this.#n;
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
  setOptions(e) {
    if (typeof e == "object" && !Array.isArray(e) && e !== null) {
      this._detachEventListeners();
      const t = e.classes || {};
      delete e.classes, this.#e = {
        ...this.#g,
        ...e
      }, t && typeof t == "object" && Object.keys(t).length > 0 ? this.#e.classes = {
        ...this.#p,
        ...t
      } : this.#e.classes = { ...this.#p }, this._initialiseDebouncedRequest(), this._createPACStructure(), this.#t && this._attachedEventListeners();
    }
  }
  /**
   * Gets the current options used by the Places Autocomplete instance.
   * @returns {Object} The current options.
   */
  getOptions() {
    return this.#e;
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
    this._detachEventListeners(), this.#u = null, this.#d = null, this.#m = null, this.#f = null, this.#e = null, this.#n = null, this.#t = null, this.#a = null, this.#s = null, this.#o = null, this.#c = null, this.#h = null, this.#l = null, this.#i = -1, this.#_ = null, this.#r = null, this._debouncedMakeAcRequest = null, console.log("PacAutocomplete instance destroyed.");
  }
}
export {
  y as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
