var U = Object.defineProperty;
var B = (c) => {
  throw TypeError(c);
};
var Z = (c, t, i) => t in c ? U(c, t, { enumerable: !0, configurable: !0, writable: !0, value: i }) : c[t] = i;
var H = (c, t, i) => Z(c, typeof t != "symbol" ? t + "" : t, i), V = (c, t, i) => t.has(c) || B("Cannot " + i);
var e = (c, t, i) => (V(c, t, "read from private field"), i ? i.call(c) : t.get(c)), h = (c, t, i) => t.has(c) ? B("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(c) : t.set(c, i), l = (c, t, i, n) => (V(c, t, "write to private field"), n ? n.call(c, i) : t.set(c, i), i);
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
var J, M, A, D, R, s, C, a, u, o, y, v, x, k, p, z, L, G, T, O, j, K;
class W {
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
    // --- Private Properties (using # or _ prefix by convention) ---
    h(this, M);
    // Container ID where the autocomplete widget will be rendered.
    h(this, A);
    h(this, D);
    h(this, R);
    h(this, s);
    h(this, C);
    h(this, a);
    h(this, u);
    h(this, o);
    h(this, y);
    h(this, v);
    h(this, x);
    h(this, k, []);
    h(this, p, -1);
    h(this, z);
    // For user-provided data callback
    h(this, L);
    // For user-provided error callback
    h(this, G, {
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
      clear_input: !0
      // Clear input button (not implemented in this version).
    });
    h(this, T, {
      // CSS classes for various parts of the widget.
      section: "",
      // Outer section container.
      container: "relative z-10 transform rounded-xl mt-4",
      // Main container div.
      icon_container: "pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3",
      // Container for the search icon.
      icon: '<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>',
      // SVG for the search icon.
      input: "border-1 w-full rounded-md border-0 shadow-sm bg-gray-100 px-4 py-2.5 pl-10 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 sm:text-sm",
      // Input field.
      kbd_container: "absolute inset-y-0 right-0 flex py-1.5 pr-1.5",
      // Container for keyboard hints.
      kbd_escape: "inline-flex items-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-8 mr-1",
      // Escape key hint.
      kbd_up: "inline-flex items-center justify-center rounded border border-gray-300 px-1 font-sans text-xs text-gray-500 w-6",
      // Up arrow key hint.
      kbd_down: "inline-flex items-center rounded border border-gray-400 px-1 font-sans text-xs text-gray-500 justify-center w-6",
      // Down arrow key hint.
      kbd_active: "bg-indigo-500 text-white",
      // Class for active keyboard hint.
      ul: "absolute z-50 -mb-2 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm divide-y divide-gray-100",
      // Suggestions list (ul).
      li: "z-50 cursor-default select-none py-2 px-2 lg:px-4 text-gray-900 hover:bg-indigo-500 hover:text-white",
      // Suggestion item (li).
      li_current: "bg-indigo-500",
      // Class for the currently selected suggestion item.
      li_a: "block w-full flex justify-between",
      // Link element within a suggestion item.
      li_a_current: "text-white",
      // Class for the link in the currently selected suggestion item.
      li_div_container: "flex min-w-0 gap-x-4",
      // Container div within the suggestion link.
      li_div_one: "min-w-0 flex-auto",
      // First inner div (for place name).
      li_div_one_p: "text-sm/6",
      // Paragraph for the place name.
      li_div_two: "shrink-0 flex flex-col items-end min-w-16",
      // Second inner div (for distance).
      li_div_two_p: "mt-1 text-xs/5",
      // Paragraph for the distance.
      highlight: "font-bold"
      // Class for highlighting matched text in suggestions.
    });
    h(this, O, {
      // Default parameters for the autocomplete request.
      input: "",
      // Initial input value (empty).
      includedRegionCodes: ["GB"],
      // Default region codes to include in suggestions.
      language: "en-gb",
      region: "GB"
    });
    h(this, j, ["formattedAddress", "addressComponents"]);
    h(this, K, ["formattedAddress", "addressComponents"]);
    /**
     * Debounced function to fetch autocomplete suggestions from the Google Places API.
     * Triggered by the 'input' event on the input element.
     */
    H(this, "_debouncedMakeAcRequest", this._debounce(async () => {
      if (!e(this, a) || !e(this, a).value) {
        this._reset(), e(this, a) && e(this, a).setAttribute("aria-expanded", "false");
        return;
      }
      e(this, C).input = e(this, a).value;
      try {
        const { suggestions: t } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            e(this, C)
          )
        );
        t && t.length > 0 ? (e(this, o).replaceChildren(
          ...this._createSuggestionElements(t)
        ), e(this, o).style.display = "block", e(this, a).setAttribute("aria-expanded", "true")) : (this._reset(), e(this, a).setAttribute("aria-expanded", "false"));
      } catch (t) {
        e(this, L).call(this, t), this._reset();
      }
    }, ((J = e(this, s)) == null ? void 0 : J.debounce) ?? 100));
    if (!t || !t.containerId || !t.googleMapsApiKey)
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    if (l(this, M, t.containerId), l(this, A, document.getElementById(t.containerId)), !e(this, A))
      throw new Error(
        `PacAutocomplete: Container element with ID "${t.containerId}" not found.`
      );
    l(this, D, t.googleMapsApiKey), l(this, R, t.googleMapsApiVersion || "weekly"), l(this, s, {
      ...e(this, G),
      // Default options
      ...t.options
      // User-defined options override defaults
    }), t.options && t.options.classes ? e(this, s).classes = {
      ...e(this, T),
      ...t.options.classes
    } : e(this, s).classes = e(this, T), t.fetchFields && Array.isArray(t.fetchFields) && this._setFetchFields(t.fetchFields), l(this, z, t.onResponse || ((i) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(i, null, 2));
    })), l(this, L, t.onError || ((i) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", i);
    })), t.requestParams && Object.keys(t.requestParams).length > 0 ? l(this, C, {
      ...e(this, O),
      ...t.requestParams
    }) : l(this, C, { ...e(this, O) }), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: e(this, D),
        v: e(this, R)
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (t) {
      e(this, L).call(this, t);
    }
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(t) {
    Array.isArray(t) && t.length > 0 && l(this, j, [
      .../* @__PURE__ */ new Set([...e(this, K), ...t])
    ].filter((i) => i));
  }
  /**
   * Creates a debounced version of a function.
   * The debounced function delays invoking `func` until after `wait` milliseconds have
   * elapsed since the last time the debounced function was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The number of milliseconds to delay.
   * @returns {Function} The new debounced function.
   */
  _debounce(t, i) {
    let n = null;
    return function(...d) {
      const m = () => {
        n = null, t(...d);
      };
      n !== null && clearTimeout(n), n = setTimeout(m, i ?? 100);
    };
  }
  /**
   * Formats a distance in meters into kilometers or miles.
   * @param {number | null | undefined} distance - Distance in meters.
   * @param {'km' | 'miles'} units - The desired output units.
   * @returns {string | null} Formatted distance string (e.g., "1.23 km") or null if input is invalid.
   */
  _formatDistance(t, i) {
    if (typeof t != "number" || !e(this, s).distance)
      return null;
    let n, r;
    return i === "km" ? (n = (t / 1e3).toFixed(2), r = "km") : (n = (t / 1609.34).toFixed(2), r = "miles"), n = n.replace(/\.00$/, ""), `${n} ${r}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(t) {
    var i, n, r, d = "The Google Maps JavaScript API", m = "google", S = "importLibrary", E = "__ib__", _ = document, f = window;
    f = f[m] || (f[m] = {});
    var b = f.maps || (f.maps = {}), N = /* @__PURE__ */ new Set(), q = new URLSearchParams(), I = () => (
      // Function to initiate API loading (if not already started)
      i || // eslint-disable-next-line no-async-promise-executor
      (i = new Promise(async (P, g) => {
        var F;
        n = _.createElement("script"), q.set("libraries", [...N].join(","));
        for (r in t)
          q.set(
            r.replace(/[A-Z]/g, (w) => "_" + w[0].toLowerCase()),
            // Convert camelCase to snake_case
            t[r]
          );
        q.set("callback", m + ".maps." + E), n.src = `https://maps.${m}apis.com/maps/api/js?` + q, b[E] = P, n.onerror = () => i = g(Error(d + " could not load.")), n.nonce = ((F = _.querySelector("script[nonce]")) == null ? void 0 : F.nonce) || "", _.head.append(n);
      }))
    );
    b[S] ? console.warn(d + " only loads once. Ignoring:", t) : b[S] = (P, ...g) => N.add(P) && I().then(() => b[S](P, ...g));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const t = document.createElement("section");
    e(this, s).classes.section.split(" ").forEach((d) => d && t.classList.add(d)), l(this, u, document.createElement("div")), e(this, u).className = e(this, s).classes.container, e(this, u).setAttribute("id", e(this, M) + "-div"), t.appendChild(e(this, u));
    const i = document.createElement("div");
    i.className = e(this, s).classes.icon_container, e(this, u).appendChild(i);
    const n = document.createElement("div");
    if (n.innerHTML = e(this, s).classes.icon, i.appendChild(n.firstElementChild), l(this, a, document.createElement("input")), e(this, a).id = e(this, M) + "-input", e(this, a).type = "text", e(this, a).name = "search", e(this, a).placeholder = e(this, s).placeholder, e(this, a).autocomplete = e(this, s).autocomplete, e(this, a).className = e(this, s).classes.input, e(this, a).setAttribute("role", "combobox"), e(this, a).setAttribute("aria-autocomplete", "list"), e(this, a).setAttribute("aria-expanded", "false"), e(this, a).setAttribute("aria-controls", "pacSuggestions"), e(this, s).autofocus && (e(this, a).autofocus = !0), e(this, s).label) {
      const d = document.createElement("label");
      d.htmlFor = e(this, M) + "-labelInput", d.textContent = e(this, s).label, e(this, u).appendChild(d);
    }
    e(this, u).appendChild(e(this, a));
    const r = document.createElement("div");
    r.className = e(this, s).classes.kbd_container, l(this, y, document.createElement("kbd")), e(this, y).className = e(this, s).classes.kbd_escape, e(this, y).textContent = "Esc", r.appendChild(e(this, y)), l(this, v, document.createElement("kbd")), e(this, v).className = e(this, s).classes.kbd_up, e(this, v).innerHTML = "&#8593;", r.appendChild(e(this, v)), l(this, x, document.createElement("kbd")), e(this, x).className = e(this, s).classes.kbd_down, e(this, x).innerHTML = "&#8595;", r.appendChild(e(this, x)), e(this, u).appendChild(r), l(this, o, document.createElement("ul")), e(this, o).id = "pacSuggestions", e(this, o).className = e(this, s).classes.ul, e(this, o).style.display = "none", e(this, o).setAttribute("role", "listbox"), e(this, u).appendChild(e(this, o)), e(this, A).appendChild(t), t.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), e(this, a) ? (e(this, a).addEventListener(
        "input",
        this._debouncedMakeAcRequest.bind(this)
      ), e(this, a).addEventListener("blur", () => {
        setTimeout(() => {
          e(this, o) && !e(this, o).contains(document.activeElement) && (e(this, o).style.display = "none", e(this, a).setAttribute("aria-expanded", "false"));
        }, 200);
      }), e(this, a).addEventListener("focus", () => {
        e(this, a).value && e(this, k).length > 0 && (e(this, o).style.display = "block", e(this, a).setAttribute("aria-expanded", "true"));
      })) : e(this, L).call(this, new Error("Input element not found during initialization."));
    } catch (t) {
      console.error("Error initializing Google Places Autocomplete:", t), e(this, L).call(this, new Error("Google Maps Places library not available."));
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(t = !1, i = null) {
    l(this, p, -1), e(this, a) && e(this, s).clear_input == !1 && i && i.formattedAddress ? e(this, a).value = i.formattedAddress : e(this, a) && (e(this, a).value = ""), e(this, a) && (e(this, a).setAttribute("aria-expanded", "false"), e(this, a).blur()), l(this, k, []), l(this, p, -1), e(this, o) && (e(this, o).innerHTML = "", e(this, o).style.display = "none"), t && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    e(this, o) && Array.from(e(this, o).children).forEach((t) => {
      e(this, s).classes.li_current.split(" ").forEach((n) => t.classList.remove(n));
      const i = t.querySelector("a");
      i && e(this, s).classes.li_a_current.split(" ").forEach((n) => i.classList.remove(n));
    });
  }
  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(t) {
    if (this._resetLiClasses(), t.key === "Escape" && (t.preventDefault(), e(this, s).classes.kbd_active.split(" ").forEach((i) => {
      var n;
      return (n = e(this, y)) == null ? void 0 : n.classList.add(i);
    }), setTimeout(
      () => e(this, s).classes.kbd_active.split(" ").forEach((i) => {
        var n;
        return (n = e(this, y)) == null ? void 0 : n.classList.remove(i);
      }),
      300
    ), this._reset(!0)), !(!e(this, k).length || !e(this, o) || e(this, o).style.display === "none"))
      if (t.key === "ArrowDown") {
        t.preventDefault(), l(this, p, Math.min(
          e(this, p) + 1,
          e(this, k).length - 1
        )), e(this, p) < 0 && l(this, p, 0);
        const i = e(this, o).children.item(e(this, p));
        if (i) {
          const n = i.querySelector("a");
          e(this, s).classes.li_current.split(" ").forEach((r) => i.classList.add(r)), n && e(this, s).classes.li_a_current.split(" ").forEach((r) => n.classList.add(r)), i.scrollIntoView({ block: "nearest" });
        }
        e(this, s).classes.kbd_active.split(" ").forEach((n) => {
          var r;
          return (r = e(this, x)) == null ? void 0 : r.classList.add(n);
        }), setTimeout(
          () => e(this, s).classes.kbd_active.split(" ").forEach((n) => {
            var r;
            return (r = e(this, x)) == null ? void 0 : r.classList.remove(n);
          }),
          300
        );
      } else if (t.key === "ArrowUp") {
        t.preventDefault(), l(this, p, Math.max(e(this, p) - 1, 0));
        const i = e(this, o).children.item(e(this, p));
        if (i) {
          const n = i.querySelector("a");
          e(this, s).classes.li_current.split(" ").forEach((r) => i.classList.add(r)), n && e(this, s).classes.li_a_current.split(" ").forEach((r) => n.classList.add(r)), i.scrollIntoView({ block: "nearest" });
        }
        e(this, s).classes.kbd_active.split(" ").forEach((n) => {
          var r;
          return (r = e(this, v)) == null ? void 0 : r.classList.add(n);
        }), setTimeout(
          () => e(this, s).classes.kbd_active.split(" ").forEach((n) => {
            var r;
            return (r = e(this, v)) == null ? void 0 : r.classList.remove(n);
          }),
          300
        );
      } else t.key === "Enter" && (t.preventDefault(), e(this, p) >= 0 && e(this, p) < e(this, k).length && this._onPlaceSelected(
        e(this, k)[e(this, p)].place
      ));
  }
  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(t) {
    return l(this, k, []), t.map((i, n) => {
      e(this, k).push({
        id: n + 1,
        description: i.placePrediction.toString(),
        place: i.placePrediction.toPlace()
      });
      const r = document.createElement("div");
      r.className = e(this, s).classes.li_div_container;
      const d = document.createElement("div");
      d.className = e(this, s).classes.li_div_one, r.appendChild(d);
      const m = document.createElement("p");
      m.className = e(this, s).classes.li_div_one_p;
      const S = i.placePrediction.text, E = S.text, _ = S.matches;
      let f = 0;
      _.sort((w, $) => w.startOffset - $.startOffset);
      const b = document.createElement("span"), N = document.createElement("span");
      N.classList = e(this, s).classes.highlight ?? "font-bold";
      for (const w of _)
        b.textContent += E.substring(
          f,
          w.startOffset
        ), w.startOffset > 0 && E.charAt(w.startOffset - 1) == " " && (N.textContent += " "), N.textContent += E.substring(
          w.startOffset,
          w.endOffset
        ), f = w.endOffset;
      const q = document.createTextNode(
        E.substring(f)
      );
      b.appendChild(N), b.appendChild(q), m.appendChild(b), d.appendChild(m), r.appendChild(d);
      const I = document.createElement("div");
      I.className = e(this, s).classes.li_div_two, r.appendChild(I);
      const P = document.createElement("p");
      P.className = e(this, s).classes.li_div_two_p, P.textContent = this._formatDistance(
        i.placePrediction.distanceMeters,
        e(this, s).distance_units ?? "km"
      ), I.appendChild(P);
      const g = document.createElement("a");
      g.href = "javascript:void(0)", g.tabIndex = n + 1, g.className = e(this, s).classes.li_a, g.addEventListener("click", () => {
        this._onPlaceSelected(i.placePrediction.toPlace());
      }), g.appendChild(r), g.appendChild(I);
      const F = document.createElement("li");
      return F.id = `option-${n + 1}`, F.className = e(this, s).classes.li, F.appendChild(g), F;
    });
  }
  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(t) {
    let i = null;
    try {
      await t.fetchFields({
        fields: e(this, j)
        //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      }), i = t.toJSON(), e(this, z).call(this, i);
    } catch (n) {
      console.error("Error fetching place details:", n), e(this, L).call(this, n);
    } finally {
      this._reset(!0, i);
    }
  }
  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      e(this, C).sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (t) {
      console.error("Error creating session token:", t), e(this, L).call(this, t);
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
    return e(this, j);
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
    typeof t == "object" && !Array.isArray(t) && t !== null && (t.input && typeof t.input == "string" && (e(this, a).value = t.input), l(this, C, {
      ...e(this, O),
      ...t
    }));
  }
  /**
   * Gets the current request parameters used by the Places Autocomplete instance.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    return e(this, C);
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
    var i, n, r, d, m, S, E;
    if (typeof t == "object" && !Array.isArray(t) && t !== null) {
      const _ = t.classes || {};
      if (delete t.classes, l(this, s, {
        ...e(this, G),
        ...t
      }), e(this, a).placeholder = e(this, s).placeholder, e(this, a).autocomplete = e(this, s).autocomplete, e(this, a).autofocus = e(this, s).autofocus, e(this, a).debounce = e(this, s).debounce, e(this, a).clear_input = e(this, s).clear_input, e(this, a).distance = e(this, s).distance, e(this, a).distance_units = e(this, s).distance_units, e(this, a).label = e(this, s).label, e(this, a).setAttribute(
        "aria-label",
        e(this, s).label || "Search for places"
      ), e(this, a).setAttribute(
        "aria-autocomplete",
        e(this, s).aria_autocomplete || "list"
      ), e(this, a).setAttribute(
        "aria-expanded",
        e(this, s).aria_expanded || "false"
      ), e(this, a).setAttribute(
        "aria-controls",
        e(this, s).aria_controls || "pacSuggestions"
      ), e(this, a).setAttribute("role", e(this, s).role || "combobox"), e(this, a).setAttribute(
        "aria-required",
        e(this, s).aria_required || "false"
      ), e(this, a).setAttribute(
        "aria-activedescendant",
        e(this, s).aria_activedescendant || ""
      ), _ && typeof _ == "object" && Object.keys(_).length > 0 ? e(this, s).classes = {
        ...e(this, T),
        ..._
      } : e(this, s).classes = { ...e(this, T) }, e(this, u) && ((i = e(this, s).classes) != null && i.container) && (e(this, u).className = e(this, s).classes.container), e(this, a) && ((n = e(this, s).classes) != null && n.input) && (e(this, a).className = e(this, s).classes.input), e(this, o) && ((r = e(this, s).classes) != null && r.ul) && (e(this, o).className = e(this, s).classes.ul), e(this, y) && ((d = e(this, s).classes) != null && d.kbd_escape) && (e(this, y).className = e(this, s).classes.kbd_escape), e(this, v) && ((m = e(this, s).classes) != null && m.kbd_up) && (e(this, v).className = e(this, s).classes.kbd_up), e(this, x) && ((S = e(this, s).classes) != null && S.kbd_down) && (e(this, x).className = e(this, s).classes.kbd_down), e(this, A)) {
        const f = e(this, A).querySelector("section");
        f && ((E = e(this, s).classes) != null && E.section) && e(this, s).classes.section.split(" ").forEach((b) => b && f.classList.add(b));
      }
    }
  }
  /**
   * Gets the current options used by the Places Autocomplete instance.
   * @returns {Object} The current options.
   */
  getOptions() {
    return e(this, s);
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
    e(this, a) && e(this, a).removeEventListener(
      "input",
      this._debouncedMakeAcRequest
    ), e(this, A) && e(this, u) && e(this, A).removeChild(e(this, u).parentElement);
    for (const t in this)
      Object.hasOwn(this, t) && (this[t] = null);
    console.log("PacAutocomplete instance destroyed.");
  }
}
M = new WeakMap(), A = new WeakMap(), D = new WeakMap(), R = new WeakMap(), s = new WeakMap(), C = new WeakMap(), a = new WeakMap(), u = new WeakMap(), o = new WeakMap(), y = new WeakMap(), v = new WeakMap(), x = new WeakMap(), k = new WeakMap(), p = new WeakMap(), z = new WeakMap(), L = new WeakMap(), G = new WeakMap(), T = new WeakMap(), O = new WeakMap(), j = new WeakMap(), K = new WeakMap();
export {
  W as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
