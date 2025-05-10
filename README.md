# Places (New) Autocomplete - JavaScript Library

[![npm version](https://badge.fury.io/js/places-autocomplete-js.svg)](https://badge.fury.io/js/places-autocomplete-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and customizable vanilla JavaScript library leveraging the [Google Maps Places (New) Autocomplete API](https://developers.google.com/maps/documentation/javascript/place-autocomplete-overview). This library provides a user-friendly way to search for and retrieve detailed address information in any web application.

It handles API loading, session tokens for cost-effective usage, fetching suggestions with debouncing, keyboard navigation, highlighting matched text, and requesting place details, allowing you to focus on integrating the results into your application.



## Places (New) Autocomplete – JavaScript Integration

Simply include a single script tag and handle the response in your JavaScript code.
[View Details](https://pacservice.pages.dev/) 


## Features

*   Integrates with the modern **Google Places (New) Autocomplete API**.
*   Automatically handles **session tokens** for cost management per Google's guidelines.
*   **Debounced Input:** Limits API calls while the user is typing (configurable).
*   **Suggestion Highlighting:** Automatically highlights the portion of text matching the user's input.
*   **Customizable Styling:** Easily override default styles or apply your own using CSS classes passed in options. Built with sensible defaults (Tailwind CSS utility classes by default but can be entirely replaced).
*   **Event Handling:** Provides `onResponse` and `onError` callbacks.
*   **Configurable:** Control API parameters (`requestParams`) and component behavior/appearance (`options`).
*   **Dynamic API Loading:** Loads the Google Maps API script on demand.



## Demo

See a live demo of the library in action: [Basic Example](https://pacservice.pages.dev/)


## Requirements

*   **Google Maps API Key** with the Places API (New) enabled. Refer to [Use API Keys](https://developers.google.com/maps/documentation/javascript/get-api-key) for detailed instructions.

## Installation 

```bash
npm install places-autocomplete-js
# or
yarn add places-autocomplete-js
```



## Basic Usage

1. Replace `'___YOUR_API_KEY___'` with your actual **Google Maps API Key**.
2. Use the `onResponse` callback to **handle the response**.

```javascript
<script>
import { PlacesAutocompleteJs } from 'places-autocomplete-js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const autocomplete = new PlacesAutocompleteJs({
      containerId: 'autocomplete-container',
      googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual key
      onResponse: (placeDetails) => {
        console.log('Place Selected:', placeDetails);
        // Example: document.getElementById('address-field').value = placeDetails.formattedAddress;
        // Example: document.getElementById('place-name').textContent = placeDetails.displayName;
      },
      onError: (error) => {
        console.error('Autocomplete Error:', error.message || error);
      }
    });

    // Optional: You can interact with the instance later
    // autocomplete.clear();
    // autocomplete.destroy(); // To clean up

  } catch (error) {
    console.error("Failed to initialize PlacesAutocompleteJs:", error.message);
  }
});

</script>

{#if placesError}
    <div class="error-message" role="alert">
        Error: {placesError}
    </div>
{/if}
...
<div id="autocomplete-container"></div>
...
```
### Configuration

The `PlacesAutocompleteJs` class is initialized with a configuration object.

| Parameter                | Type     | Required | Description                                                                                                |
|--------------------------|----------|----------|------------------------------------------------------------------------------------------------------------|
| `containerId`            | `string` | Yes      | The ID of the HTML element where the autocomplete widget will be rendered.                                   |
| `googleMapsApiKey`       | `string` | Yes      | Your Google Maps API Key with the Places API (New) enabled.                                                  |
| `googleMapsApiVersion`   | `string` | No       | The version of the Google Maps API to load (e.g., "weekly", "quarterly", "beta"). Defaults to "weekly".      |
| `onResponse`             | `function` | No       | Callback function triggered with selected place details. Receives a `Place` object (see Google's docs). Default logs to console. |
| `onError`                | `function` | No       | Callback function triggered when an error occurs. Receives an `Error` object or string. Default logs to console. |
| `options`                | `object` | No       | Object to customize UI behavior and appearance. See "UI & Behavior Options" below.                         |
| `requestParams`          | `object` | No       | Object to customize the parameters sent to the Google Places Autocomplete API. See "API Request Parameters" below. |

### UI & Behavior Options (`options`)

Passed within the main configuration object under the `options` key.

| Option         | Type                      | Default                                   | Description                                                                                                                     |
|----------------|---------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`  | `string`                  | `"Start typing your address ..."`         | Placeholder text for the input field.                                                                                           |
| `debounce`     | `number`                  | `100`                                     | Delay in milliseconds before triggering an API request after user stops typing. Set to `0` to disable.                           |
| `distance`     | `boolean`                 | `true`                                    | Whether to attempt to show distance in suggestions (requires `origin` in `requestParams`).                                      |
| `distance_units`| `'km' \| 'miles'`         | `'km'`                                    | Units to display distance in if `distance` is true.                                                                             |
| `label`        | `string`                  | `""`                                      | Optional label text displayed above the input field.                                                                            |
| `autofocus`    | `boolean`                 | `false`                                   | If `true`, automatically focuses the input field on initialization.                                                              |
| `autocomplete` | `string`                  | `'off'`                                   | Standard HTML `autocomplete` attribute for the input field.                                                                     |
| `classes`      | `object`                  | *(See default classes below)*             | Object to override default CSS classes for styling. See "Styling" section.                                                      |

### API Request Parameters (`requestParams`)

Passed within the main configuration object under the `requestParams` key. These parameters are sent to the Google Places Autocomplete API. Refer to the [AutocompleteRequest documentation](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteRequest) for all available options.

**Common `requestParams`:**

*   `input`: (string) Automatically handled by the library based on user typing.
*   `language`: (string) The language code, indicating in which language the results should be returned, if possible.
*   `region`: (string) The region code, specified as a ccTLD ("top-level domain") two-character value.
*   `includedRegionCodes`: (string[]) An array of up to 5 CLDR region codes to limit results to.
*   `locationBias`: (google.maps.places.LocationBias)
*   `locationRestriction`: (google.maps.places.LocationRestriction)
*   `origin`: (google.maps.LatLngLiteral) The origin point from which to calculate straight-line distances to predictions (if `options.distance` is true).
*   `sessionToken`: Automatically managed by this library.

**Example `requestParams`:**

```javascript
const autocomplete = new PlacesAutocompleteJs({
  // ... other config
  requestParams: {
    language: 'fr',
    region: 'ca',
    includedRegionCodes: ['ca'],
    origin: { lat: 45.5019, lng: -73.5674 } // Montreal
  }
});
```

### Styling (`options.classes`)

You can customize the appearance of the component by providing your own CSS classes via the `options.classes` object. The library uses a default set of classes (many are Tailwind CSS utility classes but can be entirely replaced).

Provide an object where keys are the component parts and values are the class strings you want to apply.

**Default Class Keys & Structure:**

*   `section`: The main container section.
*   `container`: The div containing the input and suggestions list.
*   `label`: The label element (if `options.label` is provided).
*   `input`: The main text input element.
*   `icon_container`: Container for the optional icon.
*   `icon`: SVG string for the icon.
*   `ul`: The `<ul>` element for the suggestions list.
*   `li`: Each `<li>` suggestion item.
*   `li_current`: Class added to the currently highlighted/selected `<li>` (keyboard/mouse).
*   `li_a`: The inner `<a>` or `<button>` element within each `<li>`.
*   `li_a_current`: Class added to the inner element when its `<li>` is current.
*   `li_div_container`: Container div within the `<a>`/`<button>`.
*   `li_div_one`: First inner div (usually contains the main text).
*   `li_div_one_p`: The `<p>` tag containing the main suggestion text (`@html` is used).
*   `li_div_two`: Second inner div (usually contains the distance).
*   `li_div_two_p`: The `<p>` tag containing the distance text.
*   `kbd_container`: Container for the keyboard hint keys (Esc, Up, Down).
*   `kbd_escape`: The `<kbd>` tag for the 'Esc' hint.
*   `kbd_up`: The `<kbd>` tag for the 'Up Arrow' hint.
*   `kbd_down`: The `<kbd>` tag for the 'Down Arrow' hint.
*   `highlight`: **(New)** The class applied to the `<span>` wrapping the matched text within suggestions. Defaults to `'font-bold'`.

**Example: Overriding Classes**

```javascript
const autocomplete = new PlacesAutocompleteJs({
  // ... other config
  options: {
    classes: {
      input: 'my-custom-input form-control', // Replace default input style
      ul: 'my-custom-dropdown-styles',        // Custom dropdown style
      li_current: 'my-active-suggestion',     // Custom highlight for selected item
      highlight: 'my-search-highlight'        // Custom style for matched text
    }
  }
});
```

Then, style these classes in your CSS:

```css
.my-custom-input {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.my-search-highlight {
  background-color: yellow;
  color: black;
}
/* etc. */
```

## Public Methods

Instances of `PlacesAutocompleteJs` have the following public methods:

*   **`clear()`**: Clears the input field and any visible suggestions, and refreshes the session token.
*   **`destroy()`**: Removes event listeners and cleans up DOM elements created by the widget. Useful when the component is no longer needed (e.g., in SPAs when a view is unmounted).

## Google Places API & Billing

*   This library uses the Google Maps JavaScript API (specifically the Places library). Usage is subject to Google's terms and pricing.
*   An API key enabled for the "Places API" (and "Maps JavaScript API") is required.
*   The library uses **Session Tokens** automatically to group Autocomplete requests, which can lead to significant cost savings compared to per-request billing. See [Google's Session Token Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#session-pricing).
*   Place Details requests (made when a suggestion is selected to get `displayName`, `formattedAddress`, etc.) are billed separately. The library currently fetches `displayName`, `formattedAddress`, and `addressComponents` by default. This can be expanded if needed, but be mindful of [Place Data Fields Pricing](https://developers.google.com/maps/documentation/javascript/usage-and-billing#data-pricing).

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)