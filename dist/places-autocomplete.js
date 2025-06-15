var J = Object.defineProperty;
var B = (c) => {
  throw TypeError(c);
};
var U = (c, t, s) => t in c ? J(c, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : c[t] = s;
var H = (c, t, s) => U(c, typeof t != "symbol" ? t + "" : t, s), V = (c, t, s) => t.has(c) || B("Cannot " + s);
var e = (c, t, s) => (V(c, t, "read from private field"), s ? s.call(c) : t.get(c)), h = (c, t, s) => t.has(c) ? B("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(c) : t.set(c, s), o = (c, t, s, i) => (V(c, t, "write to private field"), i ? i.call(c, s) : t.set(c, s), s);
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
var M, C, R, j, n, f, a, p, l, x, w, k, _, u, z, y, G, q, O, D, K;
class Q {
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
    h(this, C);
    h(this, R);
    h(this, j);
    h(this, n);
    h(this, f);
    h(this, a);
    h(this, p);
    h(this, l);
    h(this, x);
    h(this, w);
    h(this, k);
    h(this, _, []);
    h(this, u, -1);
    h(this, z);
    // For user-provided data callback
    h(this, y);
    // For user-provided error callback
    H(this, "_debouncedMakeAcRequest");
    // Declare without initializing here
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
      clear_input: !0,
      // Clear input button (not implemented in this version).
      debug: !1
      // Enable debug mode (not implemented in this version).
    });
    h(this, q, {
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
    h(this, D, ["formattedAddress", "addressComponents"]);
    h(this, K, ["formattedAddress", "addressComponents"]);
    if (!t || !t.containerId || !t.googleMapsApiKey)
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    if (o(this, M, t.containerId), o(this, C, document.getElementById(t.containerId)), !e(this, C))
      throw new Error(
        `PacAutocomplete: Container element with ID "${t.containerId}" not found.`
      );
    o(this, R, t.googleMapsApiKey), o(this, j, t.googleMapsApiVersion || "weekly"), o(this, n, {
      ...e(this, G),
      // Default options
      ...t.options
      // User-defined options override defaults
    }), t.options && t.options.classes ? e(this, n).classes = {
      ...e(this, q),
      ...t.options.classes
    } : e(this, n).classes = e(this, q), e(this, n).debug && (console.log("___debug constructor options:"), console.log(e(this, n))), t.fetchFields && Array.isArray(t.fetchFields) && this._setFetchFields(t.fetchFields), o(this, z, t.onResponse || ((s) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(s, null, 2));
    })), o(this, y, t.onError || ((s) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", s);
    })), t.requestParams && Object.keys(t.requestParams).length > 0 ? o(this, f, {
      ...e(this, O),
      ...t.requestParams
    }) : o(this, f, { ...e(this, O) }), e(this, n).debug && console.log("___debug constructor requestParams:", e(this, f)), this._initialiseDebouncedRequest(), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: e(this, R),
        v: e(this, j)
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (t) {
      e(this, y).call(this, t);
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
      if (!e(this, a) || !e(this, a).value) {
        this._reset(), e(this, a) && e(this, a).setAttribute("aria-expanded", "false");
        return;
      }
      e(this, f).input = e(this, a).value;
      try {
        const { suggestions: t } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            e(this, f)
          )
        );
        t && t.length > 0 ? (e(this, l).replaceChildren(
          ...this._createSuggestionElements(t)
        ), e(this, l).style.display = "block", e(this, a).setAttribute("aria-expanded", "true")) : (this._reset(), e(this, a).setAttribute("aria-expanded", "false"));
      } catch (t) {
        e(this, y).call(this, t), this._reset();
      }
    }, e(this, n).debounce);
  }
  /**
   * Sets the fields to fetch for the selected place.
   * @param {Array<string>} fields - The fields to fetch.
   */
  _setFetchFields(t) {
    Array.isArray(t) && t.length > 0 && o(this, D, [
      .../* @__PURE__ */ new Set([...e(this, K), ...t])
    ].filter((s) => s));
  }
  /**
   * Creates a debounced version of a function.
   * The debounced function delays invoking `func` until after `wait` milliseconds have
   * elapsed since the last time the debounced function was invoked.
   * @param {Function} func - The function to debounce.
   * @param {number} wait - The number of milliseconds to delay.
   * @returns {Function} The new debounced function.
   */
  _debounce(t, s) {
    e(this, n).debug && console.log("___debug debounce function called with wait:", s);
    let i = null;
    return function(...d) {
      const b = () => {
        i = null, t(...d);
      };
      i !== null && clearTimeout(i), i = setTimeout(b, s ?? 100);
    };
  }
  /**
   * Formats a distance in meters into kilometers or miles.
   * @param {number | null | undefined} distance - Distance in meters.
   * @param {'km' | 'miles'} units - The desired output units.
   * @returns {string | null} Formatted distance string (e.g., "1.23 km") or null if input is invalid.
   */
  _formatDistance(t, s) {
    if (typeof t != "number" || !e(this, n).distance)
      return null;
    let i, r;
    return s === "km" ? (i = (t / 1e3).toFixed(2), r = "km") : (i = (t / 1609.34).toFixed(2), r = "miles"), i = i.replace(/\.00$/, ""), `${i} ${r}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(t) {
    var s, i, r, d = "The Google Maps JavaScript API", b = "google", F = "importLibrary", L = "__ib__", T = document, v = window;
    v = v[b] || (v[b] = {});
    var E = v.maps || (v.maps = {}), P = /* @__PURE__ */ new Set(), I = new URLSearchParams(), N = () => (
      // Function to initiate API loading (if not already started)
      s || // eslint-disable-next-line no-async-promise-executor
      (s = new Promise(async (A, m) => {
        var S;
        i = T.createElement("script"), I.set("libraries", [...P].join(","));
        for (r in t)
          I.set(
            r.replace(/[A-Z]/g, (g) => "_" + g[0].toLowerCase()),
            // Convert camelCase to snake_case
            t[r]
          );
        I.set("callback", b + ".maps." + L), i.src = `https://maps.${b}apis.com/maps/api/js?` + I, E[L] = A, i.onerror = () => s = m(Error(d + " could not load.")), i.nonce = ((S = T.querySelector("script[nonce]")) == null ? void 0 : S.nonce) || "", T.head.append(i);
      }))
    );
    E[F] ? console.warn(d + " only loads once. Ignoring:", t) : E[F] = (A, ...m) => P.add(A) && N().then(() => E[F](A, ...m));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const t = document.createElement("section");
    e(this, n).classes.section.split(" ").forEach((d) => d && t.classList.add(d)), o(this, p, document.createElement("div")), e(this, p).className = e(this, n).classes.container, e(this, p).setAttribute("id", e(this, M) + "-div"), t.appendChild(e(this, p));
    const s = document.createElement("div");
    s.className = e(this, n).classes.icon_container, e(this, p).appendChild(s);
    const i = document.createElement("div");
    if (i.innerHTML = e(this, n).classes.icon, s.appendChild(i.firstElementChild), o(this, a, document.createElement("input")), e(this, a).id = e(this, M) + "-input", e(this, a).type = "text", e(this, a).name = "search", e(this, a).placeholder = e(this, n).placeholder, e(this, a).autocomplete = e(this, n).autocomplete, e(this, a).className = e(this, n).classes.input, e(this, a).setAttribute("role", "combobox"), e(this, a).setAttribute("aria-autocomplete", "list"), e(this, a).setAttribute("aria-expanded", "false"), e(this, a).setAttribute("aria-controls", "pacSuggestions"), e(this, n).autofocus && (e(this, a).autofocus = !0), e(this, n).label) {
      const d = document.createElement("label");
      d.htmlFor = e(this, M) + "-labelInput", d.textContent = e(this, n).label, e(this, p).appendChild(d);
    }
    e(this, p).appendChild(e(this, a));
    const r = document.createElement("div");
    r.className = e(this, n).classes.kbd_container, o(this, x, document.createElement("kbd")), e(this, x).className = e(this, n).classes.kbd_escape, e(this, x).textContent = "Esc", r.appendChild(e(this, x)), o(this, w, document.createElement("kbd")), e(this, w).className = e(this, n).classes.kbd_up, e(this, w).innerHTML = "&#8593;", r.appendChild(e(this, w)), o(this, k, document.createElement("kbd")), e(this, k).className = e(this, n).classes.kbd_down, e(this, k).innerHTML = "&#8595;", r.appendChild(e(this, k)), e(this, p).appendChild(r), o(this, l, document.createElement("ul")), e(this, l).id = "pacSuggestions", e(this, l).className = e(this, n).classes.ul, e(this, l).style.display = "none", e(this, l).setAttribute("role", "listbox"), e(this, p).appendChild(e(this, l)), e(this, C).appendChild(t), t.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Attaches event listeners to the input element for handling user input.
   * This includes debounced input handling, focus/blur events, and keyboard navigation.
   */
  _attachedEventListeners() {
    e(this, a).addEventListener(
      "input",
      this._debouncedMakeAcRequest.bind(this)
    ), e(this, a).addEventListener("blur", () => {
      setTimeout(() => {
        e(this, l) && !e(this, l).contains(document.activeElement) && (e(this, l).style.display = "none", e(this, a).setAttribute("aria-expanded", "false"));
      }, 200);
    }), e(this, a).addEventListener("focus", () => {
      e(this, a).value && e(this, _).length > 0 && (e(this, l).style.display = "block", e(this, a).setAttribute("aria-expanded", "true"));
    });
  }
  _detachEventListeners() {
    e(this, a) && e(this, a).removeEventListener(
      "input",
      this._debouncedMakeAcRequest
    ), e(this, C) && e(this, p) && e(this, C).removeChild(e(this, p).parentElement);
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), e(this, a) ? this._attachedEventListeners() : e(this, y).call(this, new Error("Input element not found during initialization."));
    } catch (t) {
      console.error("Error initializing Google Places Autocomplete:", t), e(this, y).call(this, new Error("Google Maps Places library not available."));
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(t = !1, s = null) {
    o(this, u, -1), e(this, a) && e(this, n).clear_input == !1 && s && s.formattedAddress ? e(this, a).value = s.formattedAddress : e(this, a) && (e(this, a).value = ""), e(this, a) && (e(this, a).setAttribute("aria-expanded", "false"), e(this, a).blur()), o(this, _, []), o(this, u, -1), e(this, l) && (e(this, l).innerHTML = "", e(this, l).style.display = "none"), t && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    e(this, l) && Array.from(e(this, l).children).forEach((t) => {
      e(this, n).classes.li_current.split(" ").forEach((i) => t.classList.remove(i));
      const s = t.querySelector("a");
      s && e(this, n).classes.li_a_current.split(" ").forEach((i) => s.classList.remove(i));
    });
  }
  /**
   * Handles keyboard events (ArrowDown, ArrowUp, Enter, Escape) for navigating
   * and selecting suggestions or closing the list.
   * @param {KeyboardEvent} e - The keyboard event object.
   */
  _onKeyDown(t) {
    if (this._resetLiClasses(), t.key === "Escape" && (t.preventDefault(), e(this, n).classes.kbd_active.split(" ").forEach((s) => {
      var i;
      return (i = e(this, x)) == null ? void 0 : i.classList.add(s);
    }), setTimeout(
      () => e(this, n).classes.kbd_active.split(" ").forEach((s) => {
        var i;
        return (i = e(this, x)) == null ? void 0 : i.classList.remove(s);
      }),
      300
    ), this._reset(!0)), !(!e(this, _).length || !e(this, l) || e(this, l).style.display === "none"))
      if (t.key === "ArrowDown") {
        t.preventDefault(), o(this, u, Math.min(
          e(this, u) + 1,
          e(this, _).length - 1
        )), e(this, u) < 0 && o(this, u, 0);
        const s = e(this, l).children.item(e(this, u));
        if (s) {
          const i = s.querySelector("a");
          e(this, n).classes.li_current.split(" ").forEach((r) => s.classList.add(r)), i && e(this, n).classes.li_a_current.split(" ").forEach((r) => i.classList.add(r)), s.scrollIntoView({ block: "nearest" });
        }
        e(this, n).classes.kbd_active.split(" ").forEach((i) => {
          var r;
          return (r = e(this, k)) == null ? void 0 : r.classList.add(i);
        }), setTimeout(
          () => e(this, n).classes.kbd_active.split(" ").forEach((i) => {
            var r;
            return (r = e(this, k)) == null ? void 0 : r.classList.remove(i);
          }),
          300
        );
      } else if (t.key === "ArrowUp") {
        t.preventDefault(), o(this, u, Math.max(e(this, u) - 1, 0));
        const s = e(this, l).children.item(e(this, u));
        if (s) {
          const i = s.querySelector("a");
          e(this, n).classes.li_current.split(" ").forEach((r) => s.classList.add(r)), i && e(this, n).classes.li_a_current.split(" ").forEach((r) => i.classList.add(r)), s.scrollIntoView({ block: "nearest" });
        }
        e(this, n).classes.kbd_active.split(" ").forEach((i) => {
          var r;
          return (r = e(this, w)) == null ? void 0 : r.classList.add(i);
        }), setTimeout(
          () => e(this, n).classes.kbd_active.split(" ").forEach((i) => {
            var r;
            return (r = e(this, w)) == null ? void 0 : r.classList.remove(i);
          }),
          300
        );
      } else t.key === "Enter" && (t.preventDefault(), e(this, u) >= 0 && e(this, u) < e(this, _).length && this._onPlaceSelected(
        e(this, _)[e(this, u)].place
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
    return o(this, _, []), t.map((s, i) => {
      e(this, _).push({
        id: i + 1,
        description: s.placePrediction.toString(),
        place: s.placePrediction.toPlace()
      });
      const r = document.createElement("div");
      r.className = e(this, n).classes.li_div_container;
      const d = document.createElement("div");
      d.className = e(this, n).classes.li_div_one, r.appendChild(d);
      const b = document.createElement("p");
      b.className = e(this, n).classes.li_div_one_p;
      const F = s.placePrediction.text, L = F.text, T = F.matches;
      let v = 0;
      T.sort((g, $) => g.startOffset - $.startOffset);
      const E = document.createElement("span"), P = document.createElement("span");
      P.classList = e(this, n).classes.highlight ?? "font-bold";
      for (const g of T)
        E.textContent += L.substring(
          v,
          g.startOffset
        ), g.startOffset > 0 && L.charAt(g.startOffset - 1) == " " && (P.textContent += " "), P.textContent += L.substring(
          g.startOffset,
          g.endOffset
        ), v = g.endOffset;
      const I = document.createTextNode(
        L.substring(v)
      );
      E.appendChild(P), E.appendChild(I), b.appendChild(E), d.appendChild(b), r.appendChild(d);
      const N = document.createElement("div");
      N.className = e(this, n).classes.li_div_two, r.appendChild(N);
      const A = document.createElement("p");
      A.className = e(this, n).classes.li_div_two_p, A.textContent = this._formatDistance(
        s.placePrediction.distanceMeters,
        e(this, n).distance_units ?? "km"
      ), N.appendChild(A);
      const m = document.createElement("a");
      m.href = "javascript:void(0)", m.tabIndex = i + 1, m.className = e(this, n).classes.li_a, m.addEventListener("click", () => {
        this._onPlaceSelected(s.placePrediction.toPlace());
      }), m.appendChild(r), m.appendChild(N);
      const S = document.createElement("li");
      return S.id = `option-${i + 1}`, S.className = e(this, n).classes.li, S.appendChild(m), S;
    });
  }
  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(t) {
    let s = null;
    try {
      await t.fetchFields({
        fields: e(this, D)
        //["displayName", "formattedAddress", "addressComponents"], // Add more fields as needed
      }), s = t.toJSON(), e(this, z).call(this, s);
    } catch (i) {
      console.error("Error fetching place details:", i), e(this, y).call(this, i);
    } finally {
      this._reset(!0, s);
    }
  }
  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      e(this, f).sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (t) {
      console.error("Error creating session token:", t), e(this, y).call(this, t);
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
    return e(this, D);
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
    typeof t == "object" && !Array.isArray(t) && t !== null && (t.input && typeof t.input == "string" && (e(this, a).value = t.input), o(this, f, {
      ...e(this, O),
      ...t
    }));
  }
  /**
   * Returns the current request parameters used by the Places Autocomplete instance.
   * This includes the input value, included region codes, language, and other settings.
   * It is useful for debugging or when you need to know the current search criteria.
   * @returns {Object} The current request parameters.
   */
  getRequestParams() {
    return e(this, f);
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
      const s = t.classes || {};
      delete t.classes, o(this, n, {
        ...e(this, G),
        ...t
      }), s && typeof s == "object" && Object.keys(s).length > 0 ? e(this, n).classes = {
        ...e(this, q),
        ...s
      } : e(this, n).classes = { ...e(this, q) }, this._initialiseDebouncedRequest(), this._createPACStructure(), e(this, a) && this._attachedEventListeners();
    }
  }
  /**
   * Gets the current options used by the Places Autocomplete instance.
   * @returns {Object} The current options.
   */
  getOptions() {
    return e(this, n);
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
    this._detachEventListeners();
    for (const t in this)
      Object.hasOwn(this, t) && (this[t] = null);
    console.log("PacAutocomplete instance destroyed.");
  }
}
M = new WeakMap(), C = new WeakMap(), R = new WeakMap(), j = new WeakMap(), n = new WeakMap(), f = new WeakMap(), a = new WeakMap(), p = new WeakMap(), l = new WeakMap(), x = new WeakMap(), w = new WeakMap(), k = new WeakMap(), _ = new WeakMap(), u = new WeakMap(), z = new WeakMap(), y = new WeakMap(), G = new WeakMap(), q = new WeakMap(), O = new WeakMap(), D = new WeakMap(), K = new WeakMap();
export {
  Q as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
