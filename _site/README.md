# Google Places Autocomplete (New) JavaScript Library

[![npm version](https://badge.fury.io/js/places-autocomplete-js.svg)](https://badge.fury.io/js/places-autocomplete-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A lightweight, accessible, and highly customisable vanilla JavaScript library designed to seamlessly integrate the **Google Maps Places (New) Autocomplete API** into your web applications. This library simplifies the process of searching for and retrieving accurate address details, enhancing user experience with features like debounced input, keyboard navigation, and intelligent suggestion highlighting.

It efficiently manages API loading, optimises costs with automatic session token handling, and provides robust error management, allowing developers to focus on leveraging rich location data without the complexity of direct API interactions.

## Table of Contents

*   [Live Demos](#live-demos)
*   [Features](#features)
*   [Requirements](#requirements)
*   [Installation](#installation)
*   [Basic Usage](#basic-usage)
*   [Configuration](#configuration)
    *   [UI & Behavior Options (`options`)](#ui--behavior-options-options)
    *   [API Request Parameters (`requestParams`)](#api-request-parameters-requestparams)
    *   [Fetch Fields (`fetchFields`)](#fetch-fields-fetchfields)
*   [Styling (`options.classes`)](#styling-optionsclasses)
*   [Public Methods](#public-methods)
*   [Google Places API & Billing](#google-places-api--billing)
*   [Contributing](#contributing)
*   [License](#license)

## Live Demos

Explore interactive examples of the Google Places Autocomplete JS library:

A quick, editable sandbox to experiment with the core functionality:

[![Try it on CodePen](https://img.shields.io/badge/Try%20it%20on-CodePen-blue?style=for-the-badge&logo=codepen)](https://codepen.io/alexpechkarev/pen/wBaMaMY)

See a more comprehensive live demo of the library in action:  [pacservice.pages.dev](https://pacservice.pages.dev/)




## Features

*   **Seamless Google Places (New) Autocomplete API Integration:** Leverages the latest Google Maps Places (New) Autocomplete API for accurate and up-to-date address suggestions.
*   **Cost Optimisation with Session Tokens:** Automatically manages session tokens to ensure cost-effective usage in line with Google's billing guidelines.
*   **Enhanced User Experience:**
    *   **Debounced Input:** Minimises unnecessary API calls by delaying requests until the user pauses typing, improving performance and reducing costs.
    *   **Intelligent Suggestion Highlighting:** Visually emphasises matching parts of the suggestion text, making it easier for users to identify relevant results.
    *   **Keyboard Navigation:** Fully supports keyboard interaction (Arrow Up/Down, Enter, Escape) for accessible and efficient suggestion selection.
*   **Highly Customisable:**
    *   **Flexible Styling:** Easily override default Tailwind CSS utility classes or apply entirely custom CSS for seamless integration with any design system.
    *   **Configurable Behavior:** Fine-tune API parameters (`requestParams`) and UI behavior (`options`) to meet specific application requirements.
*   **Dynamic API Loading:** Loads the Google Maps JavaScript API on demand, optimising initial page load times.
*   **Robust Error Handling & Callbacks:** Provides `onResponse` and `onError` callbacks for comprehensive control over data processing and error management.




## Requirements

*   **Google Maps API Key** with the Places API (New) enabled. Refer to [Use API Keys](https://developers.google.com/maps/documentation/javascript/get-api-key) for detailed instructions.

## Installation 

```bash
npm install places-autocomplete-js
# or
yarn add places-autocomplete-js
```



## Basic Usage

To get started, include the `PlacesAutocomplete.js` script in your HTML and initialise the `PlacesAutocomplete` class. Replace `'YOUR_GOOGLE_MAPS_API_KEY'` with your actual Google Maps API Key.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Places Autocomplete Example</title>
  <!-- Optional: Add your own CSS for styling -->
  <style>
    body { font-family: sans-serif; margin: 20px; }
    #autocomplete-container { max-width: 500px; margin: 0 auto; }
    /* Add more custom styles here if needed */
  </style>
</head>
<body>

  <h1>Places Autocomplete Demo</h1>
  <div id="autocomplete-container"></div>

  <script src="./PlacesAutocomplete.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      try {
        const autocomplete = new PlacesAutocomplete({
          containerId: 'autocomplete-container',
          googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your actual key
          onResponse: (placeDetails) => {
            console.log('Place Selected:', placeDetails);
            // Example: Populate an input field with the formatted address
            // document.getElementById('address-field').value = placeDetails.formattedAddress;
            // Example: Display the place name
            // document.getElementById('place-name').textContent = placeDetails.displayName;
          },
          onError: (error) => {
            console.error('Autocomplete Error:', error.message || error);
          }
        });

        // Optional: You can interact with the instance later
        // autocomplete.clear();
        // autocomplete.destroy(); // To clean up the instance when no longer needed

      } catch (error) {
        console.error("Failed to initialise PlacesAutocomplete:", error.message);
      }
    });
  </script>

</body>
</html>
```

**Note:** For production environments, consider using a module bundler (like Webpack or Rollup) with the `npm` package for better optimisation and dependency management.
```
### Configuration

The `PlacesAutocomplete` class is initialised with a configuration object.

| Parameter                | Type     | Required | Description                                                                                                |
|--------------------------|----------|----------|------------------------------------------------------------------------------------------------------------|
| `containerId`            | `string` | Yes      | The ID of the HTML element where the autocomplete widget will be rendered.                                   |
| `googleMapsApiKey`       | `string` | Yes      | Your Google Maps API Key with the Places API (New) enabled.                                                  |
| `googleMapsApiVersion`   | `string` | No       | The version of the Google Maps API to load (e.g., "weekly", "quarterly", "beta"). Defaults to "weekly".      |
| `onResponse`             | `function` | No       | Callback function triggered with selected place details. Receives a `Place` object (converted to a plain JSON object). Default logs to console. |
| `onError`                | `function` | No       | Callback function triggered when an error occurs during API loading or place fetching. Receives an `Error` object. Default logs to console. |
| `options`                | `object` | No       | Object to customise UI behavior and appearance. See "UI & Behavior Options" below.                         |
| `requestParams`          | `object` | No       | Object to customise the parameters sent to the Google Places Autocomplete API. See "API Request Parameters" below. |
| `fetchFields`          | `array` | No       | Array of Place Data Fields to request when a place is selected. Affects API cost. Default 	`['formattedAddress', 'addressComponents']` |

### UI & Behavior Options (`options`)

Passed within the main configuration object under the `options` key.

| Option         | Type                      | Default                                   | Description                                                                                                                     |
|----------------|---------------------------|-------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------|
| `placeholder`  | `string`                  | `"Start typing your address ..."`         | Placeholder text for the input field.                                                                                           |
| `debounce`     | `number`                  | `100`                                     | Delay in milliseconds before triggering an API request after user stops typing. Set to `0` to disable.                           |
| `distance`     | `boolean`                 | `true`                                    | Whether to attempt to show distance in suggestions (requires `origin` in `requestParams`).                                      |
| `distance_units`| `'km' \| 'miles'`         | `'km'`                                    | Units to display distance in if `distance` is true.                                                                             |
| `label`        | `string`                  | `""`                                      | Optional label text displayed above the input field.                                                                            |
| `autofocus`    | `boolean`                 | `false`                                   | If `true`, automatically focuses the input field on initialisation.                                                              |
| `autocomplete` | `string`                  | `'off'`                                   | Standard HTML `autocomplete` attribute for the input field.                                                                     |
| `clear_input`  | `boolean`                 | `true`                                    | If `true`, the input field is cleared after a place is selected. If `false`, the formatted address of the selected place is retained. |
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
const autocomplete = new PlacesAutocomplete({
  // ... other config
  requestParams: {
    language: 'fr',
    region: 'ca',
    includedRegionCodes: ['ca'],
    origin: { lat: 45.5019, lng: -73.5674 } // Montreal
  }
});
```
 
### Fetch Fields (`fetchFields`)
The `fetchFields` option allows you to specify which fields of place data you want to retrieve when a user selects a suggestion. This can help reduce API costs by only fetching the necessary information.
By default, the library fetches `['formattedAddress', 'addressComponents']`, but you can customise this based on your needs.

**Example `fetchFields`:**

```javascript
const autocomplete = new PlacesAutocomplete({
  // ... other config
  fetchFields: ['formattedAddress', 'addressComponents', 'displayName'] // Fetch additional fields as needed
});
```



### Styling (`options.classes`)

You can customise the appearance of the component by providing your own CSS classes via the `options.classes` object. The library uses a default set of classes (many are Tailwind CSS utility classes but can be entirely replaced).

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
*   `li_div_one_p`: The `<p>` tag containing the main suggestion text.
*   `li_div_two`: Second inner div (usually contains the distance).
*   `li_div_two_p`: The `<p>` tag containing the distance text.
*   `kbd_container`: Container for the keyboard hint keys (Esc, Up, Down).
*   `kbd_escape`: The `<kbd>` tag for the 'Esc' hint.
*   `kbd_up`: The `<kbd>` tag for the 'Up Arrow' hint.
*   `kbd_down`: The `<kbd>` tag for the 'Down Arrow' hint.
*   `highlight`: **(New)** The class applied to the `<span>` wrapping the matched text within suggestions. Defaults to `'font-bold'`.

**Example: Overriding Classes**

```javascript
const autocomplete = new PlacesAutocomplete({
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

Instances of `PlacesAutocomplete` have the following public methods:

*   **`clear()`**: Resets the autocomplete widget by clearing the input field, hiding suggestions, and refreshing the Google Places session token. This prepares the widget for a new search interaction.
*   **`destroy()`**: Completely cleans up the `PlacesAutocomplete` instance. This involves removing all associated DOM elements, detaching event listeners, and nullifying internal references to prevent memory leaks. It's crucial to call this method when the widget is no longer needed, especially in single-page applications (SPAs) where components are dynamically mounted and unmounted.

## Google Places API & Billing

*   This library uses the Google Maps JavaScript API (specifically the Places library). Usage is subject to Google's terms and pricing.
*   An API key with both the **Places API (New)** and **Maps JavaScript API** enabled is required.
*   The library uses **Session Tokens** automatically to group Autocomplete requests, which can lead to significant cost savings compared to per-request billing. See [Google's Session Token Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#session-pricing).
*   Place Details requests (made when a suggestion is selected to get `displayName`, `formattedAddress`, etc.) are billed separately. The library currently fetches `displayName`, `formattedAddress`, and `addressComponents` by default. This can be expanded if needed, but be mindful of [Place Data Fields Pricing](https://developers.google.com/maps/documentation/javascript/usage-and-billing#data-pricing).

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)