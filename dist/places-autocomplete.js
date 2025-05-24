var B = Object.defineProperty;
var G = (l) => {
  throw TypeError(l);
};
var H = (l, t, s) => t in l ? B(l, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : l[t] = s;
var K = (l, t, s) => H(l, typeof t != "symbol" ? t + "" : t, s), $ = (l, t, s) => t.has(l) || G("Cannot " + s);
var e = (l, t, s) => ($(l, t, "read from private field"), s ? s.call(l) : t.get(l)), h = (l, t, s) => t.has(l) ? G("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(l) : t.set(l, s), c = (l, t, s, i) => ($(l, t, "write to private field"), i ? i.call(l, s) : t.set(l, s), s);
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
var F, f, q, D, n, A, r, u, o, E, w, k, b, p, O, y, j, R;
class J {
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
    h(this, f);
    h(this, q);
    h(this, D);
    h(this, n);
    h(this, A);
    h(this, r);
    h(this, u);
    h(this, o);
    h(this, E);
    h(this, w);
    h(this, k);
    h(this, b, []);
    h(this, p, -1);
    h(this, O);
    // For user-provided data callback
    h(this, y);
    // For user-provided error callback
    h(this, j, {
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
    h(this, R, {
      // Default parameters for the autocomplete request.
      input: "",
      // Initial input value (empty).
      includedRegionCodes: ["GB"],
      // Default region codes to include in suggestions.
      language: "en-gb",
      region: "GB"
    });
    /**
     * Debounced function to fetch autocomplete suggestions from the Google Places API.
     * Triggered by the 'input' event on the input element.
     */
    K(this, "_debouncedMakeAcRequest", this._debounce(async () => {
      if (!e(this, r) || !e(this, r).value) {
        this._reset(), e(this, r) && e(this, r).setAttribute("aria-expanded", "false");
        return;
      }
      e(this, A).input = e(this, r).value;
      try {
        const { suggestions: t } = (
          // eslint-disable-next-line no-undef
          await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(
            e(this, A)
          )
        );
        t && t.length > 0 ? (e(this, o).replaceChildren(
          ...this._createSuggestionElements(t)
        ), e(this, o).style.display = "block", e(this, r).setAttribute("aria-expanded", "true")) : (this._reset(), e(this, r).setAttribute("aria-expanded", "false"));
      } catch (t) {
        e(this, y).call(this, t), this._reset(), e(this, r) && e(this, r).setAttribute("aria-expanded", "false");
      }
    }, ((F = e(this, n)) == null ? void 0 : F.debounce) ?? 100));
    if (!t || !t.containerId || !t.googleMapsApiKey)
      throw new Error(
        "PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey)."
      );
    if (c(this, f, document.getElementById(t.containerId)), !e(this, f))
      throw new Error(
        `PacAutocomplete: Container element with ID "${t.containerId}" not found.`
      );
    c(this, q, t.googleMapsApiKey), c(this, D, t.googleMapsApiVersion || "weekly"), c(this, n, {
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
      ...t.options
      // User-defined options override defaults
    }), t.options && t.options.classes ? e(this, n).classes = {
      ...e(this, j),
      ...t.options.classes
    } : e(this, n).classes = e(this, j), c(this, O, t.onResponse || ((s) => {
      console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(s, null, 2));
    })), c(this, y, t.onError || ((s) => {
      console.error("---------Default onError not provided---------"), console.error("PAC Error:", s);
    })), t.requestParams && Object.keys(t.requestParams).length > 0 ? c(this, A, {
      ...e(this, R),
      ...t.requestParams
    }) : c(this, A, { ...e(this, R) }), this._init();
  }
  // --- Private Initialization Method ---
  async _init() {
    try {
      (typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
        key: e(this, q),
        v: e(this, D)
      }), this._createPACStructure(), await this._initializeAutocomplete();
    } catch (t) {
      e(this, y).call(this, t);
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
  _debounce(t, s) {
    let i = null;
    return function(...d) {
      const _ = () => {
        i = null, t(...d);
      };
      i !== null && clearTimeout(i), i = setTimeout(_, s ?? 100);
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
    let i, a;
    return s === "km" ? (i = (t / 1e3).toFixed(2), a = "km") : (i = (t / 1609.34).toFixed(2), a = "miles"), i = i.replace(/\.00$/, ""), `${i} ${a}`;
  }
  /**
   * Dynamically loads the Google Maps JavaScript API using the importLibrary method.
   * This is the standard approach recommended by Google.
   * @see https://developers.google.com/maps/documentation/javascript/load-maps-js-api
   * @param {object} g - Configuration object for the API loader (key, v, libraries, etc.).
   */
  async _loadGoogleMapsApi(t) {
    var s, i, a, d = "The Google Maps JavaScript API", _ = "google", M = "importLibrary", L = "__ib__", T = document, v = window;
    v = v[_] || (v[_] = {});
    var x = v.maps || (v.maps = {}), S = /* @__PURE__ */ new Set(), N = new URLSearchParams(), I = () => (
      // Function to initiate API loading (if not already started)
      s || // eslint-disable-next-line no-async-promise-executor
      (s = new Promise(async (C, m) => {
        var P;
        i = T.createElement("script"), N.set("libraries", [...S].join(","));
        for (a in t)
          N.set(
            a.replace(/[A-Z]/g, (g) => "_" + g[0].toLowerCase()),
            // Convert camelCase to snake_case
            t[a]
          );
        N.set("callback", _ + ".maps." + L), i.src = `https://maps.${_}apis.com/maps/api/js?` + N, x[L] = C, i.onerror = () => s = m(Error(d + " could not load.")), i.nonce = ((P = T.querySelector("script[nonce]")) == null ? void 0 : P.nonce) || "", T.head.append(i);
      }))
    );
    x[M] ? console.warn(d + " only loads once. Ignoring:", t) : x[M] = (C, ...m) => S.add(C) && I().then(() => x[M](C, ...m));
  }
  // --- UI Creation ---
  _createPACStructure() {
    const t = document.createElement("section");
    e(this, n).classes.section.split(" ").forEach((d) => d && t.classList.add(d)), c(this, u, document.createElement("div")), e(this, u).className = e(this, n).classes.container, e(this, u).setAttribute("id", e(this, f)), t.appendChild(e(this, u));
    const s = document.createElement("div");
    s.className = e(this, n).classes.icon_container, e(this, u).appendChild(s);
    const i = document.createElement("div");
    if (i.innerHTML = e(this, n).classes.icon, s.appendChild(i.firstElementChild), c(this, r, document.createElement("input")), e(this, r).id = "input" + e(this, f), e(this, r).type = "text", e(this, r).name = "search", e(this, r).placeholder = e(this, n).placeholder, e(this, r).autocomplete = e(this, n).autocomplete, e(this, r).className = e(this, n).classes.input, e(this, r).setAttribute("role", "combobox"), e(this, r).setAttribute("aria-autocomplete", "list"), e(this, r).setAttribute("aria-expanded", "false"), e(this, r).setAttribute("aria-controls", "pacSuggestions"), e(this, n).autofocus && (e(this, r).autofocus = !0), e(this, n).label) {
      const d = document.createElement("label");
      d.htmlFor = "labelInput" + e(this, f), d.textContent = e(this, n).label, e(this, u).appendChild(d);
    }
    e(this, u).appendChild(e(this, r));
    const a = document.createElement("div");
    a.className = e(this, n).classes.kbd_container, c(this, E, document.createElement("kbd")), e(this, E).className = e(this, n).classes.kbd_escape, e(this, E).textContent = "Esc", a.appendChild(e(this, E)), c(this, w, document.createElement("kbd")), e(this, w).className = e(this, n).classes.kbd_up, e(this, w).innerHTML = "&#8593;", a.appendChild(e(this, w)), c(this, k, document.createElement("kbd")), e(this, k).className = e(this, n).classes.kbd_down, e(this, k).innerHTML = "&#8595;", a.appendChild(e(this, k)), e(this, u).appendChild(a), c(this, o, document.createElement("ul")), e(this, o).id = "pacSuggestions", e(this, o).className = e(this, n).classes.ul, e(this, o).style.display = "none", e(this, o).setAttribute("role", "listbox"), e(this, u).appendChild(e(this, o)), e(this, f).appendChild(t), t.addEventListener("keydown", this._onKeyDown.bind(this));
  }
  /**
   * Initializes the core autocomplete functionality after the API is loaded.
   * Imports necessary libraries and sets up the input event listener.
   */
  async _initializeAutocomplete() {
    try {
      await google.maps.importLibrary("places"), this._refreshToken(), e(this, r) ? (e(this, r).addEventListener(
        "input",
        this._debouncedMakeAcRequest.bind(this)
      ), e(this, r).addEventListener("blur", () => {
        setTimeout(() => {
          e(this, o) && !e(this, o).contains(document.activeElement) && (e(this, o).style.display = "none", e(this, r).setAttribute("aria-expanded", "false"));
        }, 200);
      }), e(this, r).addEventListener("focus", () => {
        e(this, r).value && e(this, b).length > 0 && (e(this, o).style.display = "block", e(this, r).setAttribute("aria-expanded", "true"));
      })) : e(this, y).call(this, new Error("Input element not found during initialization."));
    } catch (t) {
      console.error("Error initializing Google Places Autocomplete:", t), e(this, y).call(this, new Error("Google Maps Places library not available."));
    }
  }
  /**
   * Resets the autocomplete input field, clears suggestions, and optionally refreshes the session token.
   * @param {boolean} [refresh=false] - Whether to refresh the Google Places session token.
   */
  _reset(t = !1) {
    c(this, p, -1), e(this, r) && (e(this, r).value = ""), c(this, b, []), c(this, p, -1), e(this, o) && (e(this, o).innerHTML = "", e(this, o).style.display = "none"), t && this._refreshToken();
  }
  /**
   * Removes the 'current' highlighting classes from all suggestion list items (li) and their links (a).
   */
  _resetLiClasses() {
    e(this, o) && Array.from(e(this, o).children).forEach((t) => {
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
    if (!(!e(this, b).length || !e(this, o) || e(this, o).style.display === "none"))
      if (this._resetLiClasses(), t.key === "ArrowDown") {
        t.preventDefault(), c(this, p, Math.min(
          e(this, p) + 1,
          e(this, b).length - 1
        )), e(this, p) < 0 && c(this, p, 0);
        const s = e(this, o).children.item(e(this, p));
        if (s) {
          const i = s.querySelector("a");
          e(this, n).classes.li_current.split(" ").forEach((a) => s.classList.add(a)), i && e(this, n).classes.li_a_current.split(" ").forEach((a) => i.classList.add(a)), s.scrollIntoView({ block: "nearest" });
        }
        e(this, n).classes.kbd_active.split(" ").forEach((i) => {
          var a;
          return (a = e(this, k)) == null ? void 0 : a.classList.add(i);
        }), setTimeout(
          () => e(this, n).classes.kbd_active.split(" ").forEach((i) => {
            var a;
            return (a = e(this, k)) == null ? void 0 : a.classList.remove(i);
          }),
          300
        );
      } else if (t.key === "ArrowUp") {
        t.preventDefault(), c(this, p, Math.max(e(this, p) - 1, 0));
        const s = e(this, o).children.item(e(this, p));
        if (s) {
          const i = s.querySelector("a");
          e(this, n).classes.li_current.split(" ").forEach((a) => s.classList.add(a)), i && e(this, n).classes.li_a_current.split(" ").forEach((a) => i.classList.add(a)), s.scrollIntoView({ block: "nearest" });
        }
        e(this, n).classes.kbd_active.split(" ").forEach((i) => {
          var a;
          return (a = e(this, w)) == null ? void 0 : a.classList.add(i);
        }), setTimeout(
          () => e(this, n).classes.kbd_active.split(" ").forEach((i) => {
            var a;
            return (a = e(this, w)) == null ? void 0 : a.classList.remove(i);
          }),
          300
        );
      } else t.key === "Enter" ? (t.preventDefault(), e(this, p) >= 0 && e(this, p) < e(this, b).length && this._onPlaceSelected(
        e(this, b)[e(this, p)].place
      )) : t.key === "Escape" && (t.preventDefault(), e(this, n).classes.kbd_active.split(" ").forEach((s) => {
        var i;
        return (i = e(this, E)) == null ? void 0 : i.classList.add(s);
      }), setTimeout(
        () => e(this, n).classes.kbd_active.split(" ").forEach((s) => {
          var i;
          return (i = e(this, E)) == null ? void 0 : i.classList.remove(s);
        }),
        300
      ), this._reset(!0));
  }
  /**
   * Creates an array of list item (LI) elements for the suggestions dropdown.
   * Each LI contains a link (A) with the place prediction details and distance.
   * Handles highlighting the matched parts of the suggestion text.
   * @param {Array<google.maps.places.AutocompleteSuggestion>} suggestions - Array of suggestion objects from the API.
   * @returns {Array<HTMLLIElement>} An array of LI elements to be added to the suggestions UL.
   */
  _createSuggestionElements(t) {
    return c(this, b, []), t.map((s, i) => {
      e(this, b).push({
        id: i + 1,
        description: s.placePrediction.toString(),
        place: s.placePrediction.toPlace()
      });
      const a = document.createElement("div");
      a.className = e(this, n).classes.li_div_container;
      const d = document.createElement("div");
      d.className = e(this, n).classes.li_div_one, a.appendChild(d);
      const _ = document.createElement("p");
      _.className = e(this, n).classes.li_div_one_p;
      const M = s.placePrediction.text, L = M.text, T = M.matches;
      let v = 0;
      T.sort((g, z) => g.startOffset - z.startOffset);
      const x = document.createElement("span"), S = document.createElement("span");
      S.classList = e(this, n).classes.highlight ?? "font-bold";
      for (const g of T)
        x.textContent += L.substring(
          v,
          g.startOffset
        ), g.startOffset > 0 && L.charAt(g.startOffset - 1) == " " && (S.textContent += " "), S.textContent += L.substring(
          g.startOffset,
          g.endOffset
        ), v = g.endOffset;
      const N = document.createTextNode(
        L.substring(v)
      );
      x.appendChild(S), x.appendChild(N), _.appendChild(x), d.appendChild(_), a.appendChild(d);
      const I = document.createElement("div");
      I.className = e(this, n).classes.li_div_two, a.appendChild(I);
      const C = document.createElement("p");
      C.className = e(this, n).classes.li_div_two_p, C.textContent = this._formatDistance(
        s.placePrediction.distanceMeters,
        e(this, n).distance_units ?? "km"
      ), I.appendChild(C);
      const m = document.createElement("a");
      m.href = "javascript:void(0)", m.tabIndex = i + 1, m.className = e(this, n).classes.li_a, m.addEventListener("click", () => {
        this._onPlaceSelected(s.placePrediction.toPlace());
      }), m.appendChild(a), m.appendChild(I);
      const P = document.createElement("li");
      return P.id = `option-${i + 1}`, P.className = e(this, n).classes.li, P.appendChild(m), P;
    });
  }
  /**
   * Handles the selection of a place. Fetches required fields
   * (displayName, formattedAddress, addressComponents) and calls the
   * user-defined `onPacData` callback.
   * @param {google.maps.places.Place} place - The selected Place object.
   */
  async _onPlaceSelected(t) {
    try {
      await t.fetchFields({
        fields: ["displayName", "formattedAddress", "addressComponents"]
        // Add more fields as needed
      }), e(this, O).call(this, t.toJSON());
    } catch (s) {
      console.error("Error fetching place details:", s), e(this, y).call(this, s);
    } finally {
      this._reset(!0);
    }
  }
  /**
   * Creates a new Google Places Autocomplete Session Token.
   * This should be called before starting a new series of autocomplete requests.
   */
  _refreshToken() {
    try {
      e(this, A).sessionToken = new google.maps.places.AutocompleteSessionToken();
    } catch (t) {
      console.error("Error creating session token:", t), e(this, y).call(this, t);
    }
  }
  clear() {
    this._reset(!0);
  }
  destroy() {
    e(this, r) && e(this, r).removeEventListener(
      "input",
      this._debouncedMakeAcRequest
    ), e(this, f) && e(this, u) && e(this, f).removeChild(e(this, u).parentElement);
    for (const t in this)
      Object.hasOwn(this, t) && (this[t] = null);
    console.log("PacAutocomplete instance destroyed.");
  }
}
f = new WeakMap(), q = new WeakMap(), D = new WeakMap(), n = new WeakMap(), A = new WeakMap(), r = new WeakMap(), u = new WeakMap(), o = new WeakMap(), E = new WeakMap(), w = new WeakMap(), k = new WeakMap(), b = new WeakMap(), p = new WeakMap(), O = new WeakMap(), y = new WeakMap(), j = new WeakMap(), R = new WeakMap();
export {
  J as PlacesAutocomplete
};
//# sourceMappingURL=places-autocomplete.js.map
