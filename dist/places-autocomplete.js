//#region constants.js
var e = {
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
	shopping_mall: "Shopping",
	supermarket: "Shopping",
	grocery_store: "Shopping",
	clothing_store: "Shopping",
	electronics_store: "Shopping",
	souvenir_shop: "Shopping",
	gift_shop: "Shopping",
	duty_free_store: "Shopping",
	hospital: "Health",
	pharmacy: "Health",
	atm: "Finance",
	bank: "Finance",
	post_office: "Services",
	police: "Services",
	neighborhood: "Geographical",
	sublocality: "Geographical",
	route: "Navigation",
	street_address: "Navigation",
	intersection: "Navigation",
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
	default: "Default"
}, t = {
	Distance: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-route-icon lucide-route\"><circle cx=\"6\" cy=\"19\" r=\"3\"/><path d=\"M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15\"/><circle cx=\"18\" cy=\"5\" r=\"3\"/></svg>",
	Automotive: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2\"/><circle cx=\"7\" cy=\"17\" r=\"2\"/><path d=\"M9 17h6\"/><circle cx=\"17\" cy=\"17\" r=\"2\"/></svg>",
	Transport: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"/></svg>",
	"Food and Drink": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2\"/><path d=\"M7 2v20\"/><path d=\"M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7\"/></svg>",
	Lodging: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M2 4v16\"/><path d=\"M2 8h18a2 2 0 0 1 2 2v10\"/><path d=\"M2 17h20\"/><path d=\"M6 8v9\"/></svg>",
	Sightseeing: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-binoculars-icon lucide-binoculars\"><path d=\"M10 10h4\"/><path d=\"M19 7V4a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3\"/><path d=\"M20 21a2 2 0 0 0 2-2v-3.851c0-1.39-2-2.962-2-4.829V8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v11a2 2 0 0 0 2 2z\"/><path d=\"M 22 16 L 2 16\"/><path d=\"M4 21a2 2 0 0 1-2-2v-3.851c0-1.39 2-2.962 2-4.829V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2z\"/><path d=\"M9 7V4a1 1 0 0 0-1-1H6a1 1 0 0 0-1 1v3\"/></svg>",
	Recreation: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-kayak-icon lucide-kayak\"><path d=\"M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z\"/><path d=\"M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61\"/><path d=\"m6.707 6.707 10.586 10.586\"/><path d=\"M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z\"/></svg>",
	Shopping: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z\"/><path d=\"M3 6h18\"/><path d=\"M16 10a4 4 0 0 1-8 0\"/></svg>",
	Health: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M12 7v4\"/><path d=\"M14 21v-3a2 2 0 0 0-4 0v3\"/><path d=\"M14 9h-4\"/><path d=\"M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2\"/><path d=\"M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16\"/></svg>",
	Finance: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect width=\"20\" height=\"14\" x=\"2\" y=\"5\" rx=\"2\"/><line x1=\"2\" y1=\"10\" x2=\"22\" y2=\"10\"/></svg>",
	Geographical: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"m20 20-6-10.6c-.4-.7-1.5-.7-1.9 0L6 20\"/><path d=\"M7 16h10\"/><path d=\"M12 4a8 8 0 0 1 8 8v2a2 2 0 0 1-2 2h-1\"/><path d=\"M7 16H6a2 2 0 0 1-2-2v-2a8 8 0 0 1 8-8\"/></svg>",
	Navigation: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-navigation-icon lucide-navigation\"><polygon points=\"3 11 22 2 13 21 11 13 3 11\"/></svg>",
	City: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-building2-icon lucide-building-2\"><path d=\"M10 12h4\"/><path d=\"M10 8h4\"/><path d=\"M14 21v-3a2 2 0 0 0-4 0v3\"/><path d=\"M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2\"/><path d=\"M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16\"/></svg>",
	District: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-land-plot-icon lucide-land-plot\"><path d=\"m12 8 6-3-6-3v10\"/><path d=\"m8 11.99-5.5 3.14a1 1 0 0 0 0 1.74l8.5 4.86a2 2 0 0 0 2 0l8.5-4.86a1 1 0 0 0 0-1.74L16 12\"/><path d=\"m6.49 12.85 11.02 6.3\"/><path d=\"M17.51 12.85 6.5 19.15\"/></svg>",
	Airport: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-plane-icon lucide-plane\"><path d=\"M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z\"/></svg>",
	"Subway Station": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-subway-icon lucide-subway\"><path d=\"M12 22a10 10 0 0 0 10-10V8l-5-5H7L2 8v4a10 10 0 0 0 10 10Z\"/><path d=\"M12 22V8\"/><path d=\"M7 13h10\"/><path d=\"M7 17h10\"/></svg>",
	"Train Station": "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\"  style=\"display:inline-block\"; viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-train-icon lucide-train\"><path d=\"M2 10h20\"/><path d=\"M2 10a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-5Z\"/><circle cx=\"7\" cy=\"15\" r=\"2\"/><circle cx=\"17\" cy=\"15\" r=\"2\"/></svg>",
	Default: "<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" style=\"display:inline-block\";  viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/></svg>"
}, n = class {
	#e;
	#t;
	#n;
	#r;
	#i;
	#a;
	#o;
	#s;
	#c;
	#l;
	#u = /* @__PURE__ */ new Map();
	#d;
	#f;
	#p;
	#m = [];
	#h = -1;
	#g;
	#_;
	#v;
	#y = {
		autofocus: !1,
		autocomplete: "off",
		placeholder: "Start typing your address ...",
		distance: !1,
		distance_units: "km",
		label: "",
		debounce: 100,
		clear_input: !1,
		debug: !1,
		response_type: "json",
		show_place_type: !1
	};
	#b = {
		section: "pac-section",
		container: "pac-container",
		icon_container: "pac-icon-container",
		icon: "<svg xmlns=\"http://www.w3.org/2000/svg\" class=\"pac-w-5 pac-h-5\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"11\" cy=\"11\" r=\"8\" /><path d=\"m21 21-4.3-4.3\" /></svg>",
		input: "pac-input",
		kbd_container: "pac-kbd-container",
		kbd_escape: "pac-kbd-escape",
		kbd_up: "pac-kbd-up",
		kbd_down: "pac-kbd-down",
		kbd_active: "pac-kbd-active",
		ul: "pac-ul",
		li: "pac-li",
		li_current: "pac-li-current",
		li_button: "pac-li-button",
		li_button_current: "pac-li-button-current",
		li_div_container: "pac-li-div-container",
		li_div_p_container: "pac-li-div-p-container",
		li_div_one: "pac-li-div-one",
		li_div_one_p: "pac-li-div-one-p",
		map_icon_svg: "pac-map-icon-svg",
		map_pin_icon: "<path d=\"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0\"/><circle cx=\"12\" cy=\"10\" r=\"3\"/>",
		li_div_one_p_secondaryText: "pac-li-div-one-p-secondaryText",
		li_div_two: "pac-li-div-two",
		li_div_two_p: "pac-li-div-two-p",
		li_div_two_p_place_type: "pac-li-div-two-p-place_type",
		li_div_two_p_place_type_item: "pac-li-div-two-p-place_type-item",
		li_div_two_p_place_type_icon: "pac-li-div-two-p-place_type-icon",
		li_div_two_p_place_type_label: "pac-li-div-two-p-place_type-label",
		highlight: "pac-highlight"
	};
	#x = {
		input: "",
		includedRegionCodes: ["GB"],
		language: "en-gb"
	};
	#S = ["formattedAddress", "addressComponents"];
	#C = ["formattedAddress", "addressComponents"];
	constructor(e) {
		if (!e || !e.containerId || !e.googleMapsApiKey) throw Error("PacAutocomplete: Missing required configuration (containerId, googleMapsApiKey).");
		if (this.#e = e.containerId, this.#t = document.getElementById(e.containerId), !this.#t) throw Error(`PacAutocomplete: Container element with ID "${e.containerId}" not found.`);
		this.#n = e.googleMapsApiKey, this.#r = e.googleMapsApiVersion || "weekly", this.#i = {
			...this.#y,
			...e.options
		}, e.options && e.options.classes ? this.#i.classes = {
			...this.#b,
			...e.options.classes
		} : this.#i.classes = this.#b, this.#i.debug && (console.log("___debug constructor options:"), console.log(this.#i)), e.fetchFields && Array.isArray(e.fetchFields) && this._setFetchFields(e.fetchFields), this.#g = e.onResponse || ((e) => {
			console.info("---------Default onResponse not provided---------"), console.info("Selected Place:", JSON.stringify(e, null, 2));
		}), this.#_ = e.onError || ((e) => {
			console.error("---------Default onError not provided---------"), console.error("PAC Error:", e);
		}), e.requestParams && Object.keys(e.requestParams).length > 0 ? this.#a = {
			...this.#x,
			...e.requestParams
		} : this.#a = { ...this.#x }, this.#i.debug && console.log("___debug constructor requestParams:", this.#a), this._initialiseDebouncedRequest(), this._init();
	}
	async _init() {
		try {
			(typeof google > "u" || !google.maps) && await this._loadGoogleMapsApi({
				key: this.#n,
				v: this.#r
			}), this._createPACStructure(), await this._initializeAutocomplete();
		} catch (e) {
			this.#_(e);
		}
	}
	_initialiseDebouncedRequest() {
		this.#v = this._debounce(async () => {
			let e = this.#o?.value;
			if (!e) {
				this._reset(), this.#o && this.#o.setAttribute("aria-expanded", "false");
				return;
			}
			if (this.#u.has(e)) {
				await this._renderSuggestions(this.#u.get(e));
				return;
			}
			this.#a.input = e;
			try {
				let { suggestions: t } = await google.maps.places.AutocompleteSuggestion.fetchAutocompleteSuggestions(this.#a);
				t && t.length > 0 ? (this.#u.set(e, t), await this._renderSuggestions(t)) : (this._reset(), this.#o.setAttribute("aria-expanded", "false"), this._announceStatus("No suggestions found."));
			} catch (e) {
				this.#_(e), this._reset();
			}
		}, this.#i.debounce);
	}
	async _renderSuggestions(e) {
		let t = await Promise.all(this._createSuggestionElements(e));
		this.#c.replaceChildren(...t), this.#c.style.display = "block", this.#o.setAttribute("aria-expanded", "true"), this._announceStatus(`${e.length} suggestions found.`);
	}
	_announceStatus(e) {
		this.#l && (this.#l.textContent = e);
	}
	_setFetchFields(e) {
		Array.isArray(e) && e.length > 0 && (this.#S = [...new Set([...this.#C, ...e])].filter((e) => e));
	}
	_debounce(e, t) {
		let n = null;
		return function(...r) {
			n !== null && clearTimeout(n), n = setTimeout(() => {
				n = null, e(...r);
			}, t ?? 100);
		};
	}
	_formatDistance(e, t) {
		if (!this.#i.distance || typeof e != "number") return null;
		let n, r;
		return t === "km" ? (n = (e / 1e3).toFixed(2), r = "km") : (n = (e / 1609.34).toFixed(2), r = "miles"), n = n.replace(/\.00$/, ""), `${n} ${r}`;
	}
	async _loadGoogleMapsApi(e) {
		var t, n, r, i = "The Google Maps JavaScript API", a = "google", o = "importLibrary", s = "__ib__", c = document, l = window;
		l = l[a] || (l[a] = {});
		var u = l.maps ||= {}, d = /* @__PURE__ */ new Set(), f = new URLSearchParams(), p = () => t ||= new Promise(async (o, l) => {
			for (r in n = c.createElement("script"), f.set("libraries", [...d].join(",")), e) f.set(r.replace(/[A-Z]/g, (e) => "_" + e[0].toLowerCase()), e[r]);
			f.set("callback", a + ".maps." + s), n.src = `https://maps.${a}apis.com/maps/api/js?` + f, u[s] = o, n.onerror = () => t = l(/* @__PURE__ */ Error(`${i} could not load. Check your API key and network connection.`)), n.nonce = c.querySelector("script[nonce]")?.nonce || "", c.head.append(n);
		});
		u[o] ? console.warn(i + " only loads once. Ignoring:", e) : u[o] = (e, ...t) => d.add(e) && p().then(() => u[o](e, ...t));
	}
	_createPACStructure() {
		let e = document.createElement("section");
		e.className = this.#i.classes.section, this.#s = document.createElement("div"), this.#s.className = this.#i.classes.container, this.#s.setAttribute("id", this.#e + "-div"), e.appendChild(this.#s), this.#l = document.createElement("div"), this.#l.setAttribute("aria-live", "polite"), this.#l.setAttribute("role", "status"), this.#l.className = "pac-sr-only", this.#s.appendChild(this.#l);
		let t = document.createElement("div");
		t.className = this.#i.classes.icon_container, this.#s.appendChild(t);
		let n = document.createElement("div");
		if (n.innerHTML = this.#i.classes.icon, t.appendChild(n.firstElementChild), this.#o = document.createElement("input"), this.#o.id = this.#e + "-input", this.#o.type = "text", this.#o.name = "search", this.#o.placeholder = this.#i.placeholder, this.#o.autocomplete = this.#i.autocomplete, this.#o.className = this.#i.classes.input, this.#o.setAttribute("role", "combobox"), this.#o.setAttribute("aria-autocomplete", "list"), this.#o.setAttribute("aria-expanded", "false"), this.#o.setAttribute("aria-controls", "pacSuggestions"), this.#o.setAttribute("aria-activedescendant", ""), this.#i.autofocus && (this.#o.autofocus = !0), this.#i.label) {
			let t = document.createElement("label");
			t.htmlFor = this.#o.id, t.textContent = this.#i.label, e.prepend(t);
		}
		this.#s.appendChild(this.#o);
		let r = document.createElement("div");
		r.className = this.#i.classes.kbd_container, this.#d = document.createElement("kbd"), this.#d.className = this.#i.classes.kbd_escape, this.#d.textContent = "Esc", r.appendChild(this.#d), this.#f = document.createElement("kbd"), this.#f.className = this.#i.classes.kbd_up, this.#f.innerHTML = "&#8593;", r.appendChild(this.#f), this.#p = document.createElement("kbd"), this.#p.className = this.#i.classes.kbd_down, this.#p.innerHTML = "&#8595;", r.appendChild(this.#p), this.#s.appendChild(r), this.#c = document.createElement("ul"), this.#c.id = "pacSuggestions", this.#c.className = this.#i.classes.ul, this.#c.style.display = "none", this.#c.setAttribute("role", "listbox"), this.#c.setAttribute("aria-labelledby", this.#o.id), this.#s.appendChild(this.#c), this.#c.addEventListener("click", (e) => {
			let t = e.target.closest("li");
			if (t && this.#c.contains(t)) {
				let e = Array.from(this.#c.children).indexOf(t);
				e !== -1 && this.#m[e] && this._onPlaceSelected(this.#m[e].place);
			}
		}), this.#t.appendChild(e), e.addEventListener("keydown", this._onKeyDown.bind(this));
	}
	_attachedEventListeners() {
		this.#o.addEventListener("input", this.#v), this.#o.addEventListener("blur", () => {
			setTimeout(() => {
				this.#c && !this.#c.contains(document.activeElement) && (this.#c.style.display = "none", this.#o.setAttribute("aria-expanded", "false"));
			}, 200);
		}), this.#o.addEventListener("focus", () => {
			this.#o.value && this.#m.length > 0 && (this.#c.style.display = "block", this.#o.setAttribute("aria-expanded", "true"));
		});
	}
	_detachEventListeners() {
		this.#o && this.#o.removeEventListener("input", this.#v), this.#t && this.#s && this.#t.removeChild(this.#s.parentElement);
	}
	async _initializeAutocomplete() {
		try {
			await google.maps.importLibrary("places"), this._refreshToken(), this.#o ? this._attachedEventListeners() : this.#_(/* @__PURE__ */ Error("Input element not found during initialization."));
		} catch (e) {
			console.error("Error initializing Google Places Autocomplete:", e), this.#_(/* @__PURE__ */ Error("Google Maps Places library not available."));
		}
	}
	_reset(e = !1, t = null) {
		this.#h = -1, this.#o && this.#i.clear_input == 0 && t && t.formattedAddress ? this.#o.value = t.formattedAddress : this.#o && (this.#o.value = ""), this.#o && (this.#o.setAttribute("aria-expanded", "false"), this.#o.setAttribute("aria-activedescendant", ""), this.#o.blur()), this.#m = [], this.#h = -1, this.#c && (this.#c.innerHTML = "", this.#c.style.display = "none"), e && this._refreshToken();
	}
	_resetLiClasses() {
		this.#c && Array.from(this.#c.children).forEach((e) => {
			this.#i.classes.li_current.split(" ").forEach((t) => e.classList.remove(t));
			let t = e.querySelector("button");
			t && this.#i.classes.li_button_current.split(" ").forEach((e) => t.classList.remove(e));
		});
	}
	_onKeyDown(e) {
		this._resetLiClasses(), e.key === "Escape" && (e.preventDefault(), this.#i.classes.kbd_active.split(" ").forEach((e) => this.#d?.classList.add(e)), setTimeout(() => this.#i.classes.kbd_active.split(" ").forEach((e) => this.#d?.classList.remove(e)), 300), this._reset(!0)), !(!this.#m.length || !this.#c || this.#c.style.display === "none") && (e.key === "ArrowDown" ? (e.preventDefault(), this.#h = Math.min(this.#h + 1, this.#m.length - 1), this._highlightSuggestion()) : e.key === "ArrowUp" ? (e.preventDefault(), this.#h = Math.max(this.#h - 1, 0), this._highlightSuggestion()) : e.key === "Home" ? (e.preventDefault(), this.#h = 0, this._highlightSuggestion()) : e.key === "End" ? (e.preventDefault(), this.#h = this.#m.length - 1, this._highlightSuggestion()) : e.key === "Enter" && (e.preventDefault(), this.#h >= 0 && this.#h < this.#m.length && this._onPlaceSelected(this.#m[this.#h].place)));
	}
	_highlightSuggestion() {
		if (this.#h < 0) return;
		let e = this.#c.children.item(this.#h);
		if (e) {
			let t = e.querySelector("button");
			this.#i.classes.li_current.split(" ").forEach((t) => e.classList.add(t)), t && this.#i.classes.li_button_current.split(" ").forEach((e) => t.classList.add(e)), e.scrollIntoView({ block: "nearest" }), this.#o.setAttribute("aria-activedescendant", e.id);
			let n = this.#h === 0 ? this.#f : this.#p;
			this.#i.classes.kbd_active.split(" ").forEach((e) => n?.classList.add(e)), setTimeout(() => this.#i.classes.kbd_active.split(" ").forEach((e) => n?.classList.remove(e)), 300);
		}
	}
	_getAddressComponent(e, t) {
		return e.addressComponents?.find((e) => e.types.includes(t))?.longText || "";
	}
	_createButtonElement(e) {
		let t = document.createElement("button");
		return t.tabIndex = e + 1, t.className = this.#i.classes.li_button, t;
	}
	_createDivElement(e) {
		let t = document.createElement("div");
		return e && (t.className = e), t;
	}
	_createMapPinIconElement() {
		let e = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		return e.setAttribute("xmlns", "http://www.w3.org/2000/svg"), e.setAttribute("width", "24"), e.setAttribute("height", "24"), e.setAttribute("viewBox", "0 0 24 24"), e.setAttribute("fill", "none"), e.setAttribute("stroke", "currentColor"), e.setAttribute("stroke-width", "2"), e.setAttribute("stroke-linecap", "round"), e.setAttribute("stroke-linejoin", "round"), e.setAttribute("class", this.#i.classes.map_icon_svg), e.innerHTML = this.#i.classes.map_pin_icon, e;
	}
	_createPElement(e) {
		let t = document.createElement("p");
		return e && (t.className = e), t;
	}
	_createSuggestionElements(e) {
		return this.#m = [], e.map(async (e, t) => {
			let n = e.placePrediction.toPlace(), r = document.createElement("li");
			r.id = `option-${t + 1}`, r.className = this.#i.classes.li, r.setAttribute("role", "option");
			let i = this._createButtonElement(t), a = this._createDivElement(this.#i.classes.li_div_container), o = this._createDivElement(this.#i.classes.li_div_one), s = this._createDivElement(this.#i.classes.li_div_two), c = this._createMapPinIconElement();
			o.appendChild(c);
			let l = this._createDivElement(this.#i.classes.li_div_p_container);
			o.appendChild(l);
			let u = this._createPElement(this.#i.classes.li_div_one_p), d = this._createPElement(this.#i.classes.li_div_one_p_secondaryText), f = e.placePrediction?.distanceMeters ?? e.distanceMeters, p = this._formatDistance(f, this.#i.distance_units ?? "km");
			l.appendChild(u), l.appendChild(d), this._renderSuggestionMeta(s, e, p), a.appendChild(o), a.appendChild(s), i.appendChild(a), r.appendChild(i), this._renderHighlightText(u, e.placePrediction.mainText);
			let m = e.placePrediction?.secondaryText?.text ?? "";
			return m && (d.textContent = m), this.#m.push({
				id: t + 1,
				place: n,
				mainText: e.placePrediction.mainText.text,
				secondaryText: m,
				description: e.placePrediction.toString()
			}), r;
		});
	}
	_renderSuggestionMeta(n, r, i) {
		if (this.#i.show_place_type || this.#i.distance) {
			let a = this._createDivElement(this.#i.classes.li_div_two_p_place_type);
			if (this.#i.show_place_type && Array.isArray(r.placePrediction?.types) && r.placePrediction.types.length > 0) {
				let n = this._createDivElement(this.#i.classes.li_div_two_p_place_type_item), i = this._createPElement(this.#i.classes.li_div_two_p_place_type_icon), o = this._createPElement(this.#i.classes.li_div_two_p_place_type_label), s = r.placePrediction.types.find((t) => typeof t == "string" && t in e);
				o.textContent = s ? e[s] : "Default", i.innerHTML = t[o.textContent] || t.Default, n.appendChild(i), n.appendChild(o), a.appendChild(n);
			}
			if (this.#i.distance) {
				let e = this._createDivElement(this.#i.classes.li_div_two_p_place_type_item), n = this._createPElement(this.#i.classes.li_div_two_p_place_type_icon);
				n.innerHTML = t.Distance;
				let r = this._createPElement(this.#i.classes.li_div_two_p);
				r.textContent = i ?? "-", e.appendChild(n), e.appendChild(r), a.appendChild(e);
			}
			a.hasChildNodes() && n.appendChild(a);
		}
	}
	_renderHighlightText(e, t) {
		let n = t.text, r = t.matches, i = 0;
		r.sort((e, t) => e.startOffset - t.startOffset);
		let a = document.createElement("span"), o = document.createElement("span");
		o.classList = this.#i.classes.highlight ?? "font-bold";
		for (let e of r) a.textContent += n.substring(i, e.startOffset), e.startOffset > 0 && n.charAt(e.startOffset - 1) === " " && (o.textContent += " "), o.textContent += n.substring(e.startOffset, e.endOffset), i = e.endOffset;
		a.appendChild(o), a.appendChild(document.createTextNode(n.substring(i))), e.appendChild(a);
	}
	async _onPlaceSelected(e) {
		let t = null;
		try {
			await e.fetchFields({ fields: this.#S }), this.#i.response_type === "place" ? (t = e, this.#g(e)) : (t = e.toJSON(), this.#g(t));
		} catch (e) {
			console.error("Error fetching place details:", e), this.#_(e);
		} finally {
			this._reset(!0, t);
		}
	}
	_refreshToken() {
		try {
			this.#a.sessionToken = new google.maps.places.AutocompleteSessionToken();
		} catch (e) {
			console.error("Error creating session token:", e), this.#_(e);
		}
	}
	setFetchFields(e) {
		this._setFetchFields(e);
	}
	getFetchFields() {
		return this.#S;
	}
	setRequestParams(e) {
		typeof e == "object" && !Array.isArray(e) && e !== null && (e.input && typeof e.input == "string" && (this.#o.value = e.input), this.#a = {
			...this.#x,
			...e
		});
	}
	getRequestParams() {
		return this.#a;
	}
	setOptions(e) {
		if (typeof e == "object" && !Array.isArray(e) && e !== null) {
			this._detachEventListeners();
			let t = e.classes || {};
			delete e.classes, this.#i = {
				...this.#y,
				...e
			}, t && typeof t == "object" && Object.keys(t).length > 0 ? this.#i.classes = {
				...this.#b,
				...t
			} : this.#i.classes = { ...this.#b }, this._initialiseDebouncedRequest(), this._createPACStructure(), this.#o && this._attachedEventListeners();
		}
	}
	getOptions() {
		return this.#i;
	}
	async setInputValue(e, t) {
		try {
			let { Geocoder: n } = await google.maps.importLibrary("geocoding"), r = await new n().geocode({ location: {
				lat: e,
				lng: t
			} });
			if (r.results && r.results.length > 0) {
				let e = r.results[0].place_id, t = new google.maps.places.Place({ id: e });
				await t.fetchFields({ fields: this.#S }), !this.#i.clear_input && t.formattedAddress && (this.#o.value = t.formattedAddress), this.#i.response_type === "place" ? this.#g(t) : this.#g(t.toJSON());
			} else throw Error("No results found for the provided coordinates");
		} catch (e) {
			console.error("Error in setInputValue:", e), this.#_(e);
		}
	}
	clear() {
		this.#u.clear(), this._reset(!0);
	}
	focus() {
		this.#o && this.#o.focus();
	}
	destroy() {
		this._detachEventListeners(), this.#e = null, this.#t = null, this.#n = null, this.#r = null, this.#i = null, this.#a = null, this.#o = null, this.#s = null, this.#c = null, this.#l = null, this.#u = null, this.#d = null, this.#f = null, this.#p = null, this.#m = null, this.#h = -1, this.#g = null, this.#_ = null, this.#v = null;
	}
};
//#endregion
export { n as PlacesAutocomplete };

//# sourceMappingURL=places-autocomplete.js.map