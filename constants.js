export const ITINERARY_CATEGORIES = {
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

export const ITINERARY_SVG_ICONS = {
  Distance:
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" style="display:inline-block"; viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-route-icon lucide-route"><circle cx="6" cy="19" r="3"/><path d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"/><circle cx="18" cy="5" r="3"/></svg>',

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
