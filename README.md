# Places (New) Autocomplete - JavaScript Library

[![npm version](https://badge.fury.io/js/places-autocomplete-js.svg)](https://badge.fury.io/js/places-autocomplete-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and customizable vanilla JavaScript library leveraging the [Google Maps Places (New) Autocomplete API](https://developers.google.com/maps/documentation/javascript/place-autocomplete-overview). This library provides a user-friendly way to search for and retrieve detailed address information in any web application.

It handles API loading, session tokens for cost-effective usage, fetching suggestions with debouncing, keyboard navigation, highlighting matched text, and requesting place details, allowing you to focus on integrating the results into your application.

## Live Demos

Explore interactive examples of the Google Places Autocomplete JS library:

A quick, editable sandbox to experiment with the core functionality:

[![Try it on CodePen](https://img.shields.io/badge/Try%20it%20on-CodePen-blue?style=for-the-badge&logo=codepen)](https://codepen.io/alexpechkarev/pen/wBaMaMY)

See a more comprehensive live demo of the library in action:  [pacservice.pages.dev](https://pacservice.pages.dev/)


<img src="places-autocomplete-js.gif" alt="A video demonstrating the Places Autocomplete JavaScript component in action, showing address suggestions and selection.">

## Features

*   Integrates with the modern **Google Places (New) Autocomplete API**.
*   Automatically handles **session tokens** for cost management per Google's guidelines.
*   **Debounced Input:** Limits API calls while the user is typing (configurable).
*   **Suggestion Highlighting:** Automatically highlights the portion of text matching the user's input.
*   **Customizable Styling:** Easily override default styles or apply your own using CSS classes passed in options. Built with sensible defaults (Tailwind CSS utility classes by default but can be entirely replaced).
*   **Event Handling:** Provides `onResponse` and `onError` callbacks.
*   **Configurable:** Control API parameters (`requestParams`) and component behavior/appearance (`options`).
*   **Dynamic API Loading:** Loads the Google Maps API script on demand.




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
import { PlacesAutocomplete } from 'places-autocomplete-js';

document.addEventListener('DOMContentLoaded', () => {
  try {
    const autocomplete = new PlacesAutocomplete({
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
    // autocomplete.setFetchFields(['types']); // Update fields to fetch
    // autocomplete.getFetchFields(); // Get current fetch fields
    // autocomplete.setRequestParams({origin: { lat: 48.8566, lng: 2.3522 }}); // Set new request parameters
    // autocomplete.getRequestParams(); // Get current request parameters
    // autocomplete.setOptions({ placeholder: 'Search for a place...' }); // Update options
    // autocomplete.getOptions(); // Get current options

  } catch (error) {
    console.error("Failed to initialize PlacesAutocomplete:", error.message);
  }
});

</script>

...
<div id="autocomplete-container"></div>
...
```
### Configuration

The `PlacesAutocomplete` class is initialized with a configuration object.

| Parameter                | Type     | Required | Description                                                                                                |
|--------------------------|----------|----------|------------------------------------------------------------------------------------------------------------|
| `containerId`            | `string` | Yes      | The ID of the HTML element where the autocomplete widget will be rendered.                                   |
| `googleMapsApiKey`       | `string` | Yes      | Your Google Maps API Key with the Places API (New) enabled.                                                  |
| `googleMapsApiVersion`   | `string` | No       | The version of the Google Maps API to load (e.g., "weekly", "quarterly", "beta"). Defaults to "weekly".      |
| `onResponse`             | `function` | No       | Callback function triggered with selected place details. Receives a `Place` object (see Google's docs). Default logs to console. |
| `onError`                | `function` | No       | Callback function triggered when an error occurs. Receives an `Error` object or string. Default logs to console. |
| `options`                | `object` | No       | Object to customize UI behavior and appearance. See "UI & Behavior Options" below.                         |
| `requestParams`          | `object` | No       | Object to customize the parameters sent to the Google Places Autocomplete API. See "API Request Parameters" below. |
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
| `autofocus`    | `boolean`                 | `false`                                   | If `true`, automatically focuses the input field on initialization.                                                              |
| `autocomplete` | `string`                  | `'off'`                                   | Standard HTML `autocomplete` attribute for the input field.                                                                     |
| `classes`      | `object`                  | *(See default classes below)*             | Object to override default CSS classes for styling. See "Styling" section.                                                      |
| `clear_input`        | `boolean` | `true`      | If `true` (default), clears the input field after a suggestion is selected. If `false`, the input field retains the `formattedAddress` of the selected place.                                      |


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
 
### Working with Fetch Fields (`fetchFields`)
The `fetchFields` option allows you to specify which fields of place data you want to retrieve when a user selects a suggestion. This can help reduce API costs by only fetching the necessary information. See the [Place Class Data Fields](https://developers.google.com/maps/documentation/javascript/place-class-data-fields) for all available fields.
By default, the library fetches `['formattedAddress', 'addressComponents']`, but you can customize this based on your needs.

**Example `fetchFields`:**

```javascript
const autocomplete = new PlacesAutocomplete({
  // ... other config
  fetchFields: ['formattedAddress', 'addressComponents', 'displayName'] // Fetch additional fields as needed
});

// Or
autocomplete.setFetchFields({
  fetchFields: ['formattedAddress', 'addressComponents', 'displayName'] // Update fetch fields dynamically
});
```

### Retain Input Value After Selection
To keep the selected address visible in the input field after a suggestion is chosen. Set the `options.clear_input = false`.

```javascript
const autocomplete = new PlacesAutocomplete({
  // ... other config
  options: {
    clear_input: false // Retain the input value after selection
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
*   `li_div_one_p`: The `<p>` tag containing the main suggestion text.
*   `li_div_two`: Second inner div (usually contains the distance).
*   `li_div_two_p`: The `<p>` tag containing the distance text.
*   `kbd_container`: Container for the keyboard hint keys (Esc, Up, Down).
*   `kbd_escape`: The `<kbd>` tag for the 'Esc' hint.
*   `kbd_up`: The `<kbd>` tag for the 'Up Arrow' hint.
*   `kbd_down`: The `<kbd>` tag for the 'Down Arrow' hint.
*   `highlight`: The class applied to the `<span>` wrapping the matched text within suggestions. Defaults to `'font-bold'`.

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

*   **`clear()`**: Clears the input field and any visible suggestions, and refreshes the session token.
    ```javascript
    autocomplete.clear();
    ```

*   **`destroy()`**: Removes event listeners and cleans up DOM elements created by the widget. Useful when the component is no longer needed (e.g., in SPAs when a view is unmounted).
    ```javascript
    autocomplete.destroy();
    ```

*   **`setFetchFields(fields)`**: Dynamically updates the array of Place Data Fields. The provided `fields` array will be combined with the library's default fields (`formattedAddress`, `addressComponents`), ensuring uniqueness, to form the new set of fields to request. Refer to the "Fetch Fields (`fetchFields`)" section and [Place Class Data Fields](https://developers.google.com/maps/documentation/javascript/place-class-data-fields) for available fields.
    *   `fields` (Array<string>): An array of field names to fetch. These will be merged with the default fields (`formattedAddress`, `addressComponents`) and any existing fetch fields, ensuring uniqueness.
    ```javascript
    // Example: Update to fetch displayName and geometry in addition to defaults
    autocomplete.setFetchFields(['displayName', 'types']);

    // Example: Set a specific list of fields, overriding previous settings (while still including defaults)
    autocomplete.setFetchFields(['regularOpeningHours', 'websiteURI']);
    ```

*   **`getFetchFields()`**: Retrieves the current array of Place Data Fields that will be requested when a place is selected.
    ```javascript
    const currentFetchFields = autocomplete.getFetchFields();
    console.log('Current Fetch Fields:', currentFetchFields);
    // Expected output might be: ['formattedAddress', 'addressComponents', 'regularOpeningHours', 'websiteURI']
    // (depending on what was set via constructor or setFetchFields)
    ```    

*   **`setRequestParams(params)`**: Dynamically updates the parameters sent to the Google Places Autocomplete API. This allows you to change search criteria like language, region, or location bias after initialization.
    *   `params` (object): An object containing the API request parameters to update. These will be merged with existing request parameters. Refer to the "API Request Parameters (`requestParams`)" section for available options.
    ```javascript
    // Example: Change the search region and language
    autocomplete.setRequestParams({
      region: 'fr',
      language: 'fr',
      includedRegionCodes: ['fr']
    });

    // Example: Set an origin for distance calculations
    autocomplete.setRequestParams({
      origin: { lat: 48.8566, lng: 2.3522 } // Paris
    });
    ```

*   **`getRequestParams()`**: Retrieves the current API request parameters being used by the instance.
    ```javascript
    const currentRequestParams = autocomplete.getRequestParams();
    console.log('Current API Request Params:', currentRequestParams);
    ```

*   **`setOptions(options)`**: Dynamically updates the UI behavior and appearance options of the widget. This allows you to change things like the placeholder text, debounce timing, or CSS classes after initialization.
    *   `options` (object): An object containing the UI and behavior options to update. These will be merged with existing options. Refer to the "UI & Behavior Options (`options`)" section for available options.
    ```javascript
    // Example: Change the placeholder text and debounce time
    autocomplete.setOptions({
      placeholder: 'Search for a location in France...',
      debounce: 250
    });

    // Example: Update CSS classes for the input
    autocomplete.setOptions({
      classes: {
        input: 'new-custom-input-style'
      }
    });
    ```

*   **`getOptions()`**: Retrieves the current UI and behavior options being used by the instance.
    ```javascript
    const currentOptions = autocomplete.getOptions();
    console.log('Current UI Options:', currentOptions);
    ```

## Google Places API & Billing

*   This library uses the Google Maps JavaScript API (specifically the Places library). Usage is subject to Google's terms and pricing.
*   An API key enabled for the "Places API" (and "Maps JavaScript API") is required.
*   The library uses **Session Tokens** automatically to group Autocomplete requests, which can lead to significant cost savings compared to per-request billing. See [Google's Session Token Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#session-pricing).
*   Place Details requests (made when a suggestion is selected to get `displayName`, `formattedAddress`, etc.) are billed separately. The library currently fetches `displayName`, `formattedAddress`, and `addressComponents` by default. This can be expanded if needed, but be mindful of [Place Data Fields Pricing](https://developers.google.com/maps/documentation/javascript/usage-and-billing#data-pricing).

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)