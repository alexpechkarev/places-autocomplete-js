# Places (New) Autocomplete - JavaScript Library

[![npm version](https://badge.fury.io/js/places-autocomplete-js.svg)](https://badge.fury.io/js/places-autocomplete-js)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A flexible and customisable vanilla JavaScript library for frontend web applications, leveraging the [Google Maps Places (New) Autocomplete API](https://developers.google.com/maps/documentation/javascript/place-autocomplete-overview). This library provides a user-friendly way to search for and retrieve detailed address and location information in any web application.

It handles API loading, session tokens for cost-effective usage, fetching suggestions with debouncing, keyboard navigation, highlighting matched text, and requesting place details, allowing you to focus on integrating the results into your application.

## Live Demo

Explore interactive examples of the Google Places Autocomplete JS library:

A quick, editable sandbox to experiment with the core functionality:

[![Try it on CodePen](https://img.shields.io/badge/Try%20it%20on-CodePen-blue?style=for-the-badge&logo=codepen)](https://codepen.io/alexpechkarev/pen/wBaMaMY)

See a more comprehensive live demo of the library in action: [pacservice.pages.dev](https://pacservice.pages.dev/)

<img src="places-autocomplete-js.gif" alt="A video demonstrating the Places Autocomplete JavaScript component in action, showing address suggestions and selection.">

## Features

- **Seamless Google Places Integration:** Directly connects with the modern **Google Places (New) Autocomplete API** for accurate and up-to-date address suggestions.
- **Cost-Effective API Usage:** Automatically handles **session tokens** to optimise your Google Maps API costs per Google's guidelines.
- **Optimised User Experience:** Implements **Debounced Input** to limit API calls while the user is typing, ensuring a smooth and responsive search experience.
- **Enhanced Readability:** Provides **Suggestion Highlighting** to automatically bold the portion of text matching the user's input, making suggestions easier to scan.
- **Flexible Styling:** Offers **Customisable Styling** allowing you to easily override default styles or apply your own using CSS classes. Built with sensible defaults (Tailwind CSS utility classes by default but can be entirely replaced).
- **Robust Event Handling:** Provides `onResponse` and `onError` callbacks for comprehensive control over successful place selections and error scenarios.
- **Highly Configurable:** Allows you to control API parameters (`requestParams`) and component behavior/appearance (`options`) to fit your specific application needs.
- **Efficient API Loading:** Dynamically loads the Google Maps API script on demand, reducing initial page load times.

## Benefits

- **Accelerate Development:** Quickly integrate powerful address autocomplete functionality into your web application with minimal setup.
- **Improve User Experience:** Provide a fast, intuitive, and accurate address entry experience for your users.
- **Reduce API Costs:** Leverage automatic session token management to optimise your Google Maps API billing.
- **Maintain Brand Consistency:** Easily customise the look and feel of the autocomplete component to match your application's design system.
- **Future-Proof:** Built on the latest Google Places (New) Autocomplete API, ensuring compatibility and access to new features.

## Requirements

- **Google Maps API Key** with the Places API (New) enabled. Refer to [Use API Keys](https://developers.google.com/maps/documentation/javascript/get-api-key) for detailed instructions.

## Installation & Usage

This library can be used in two primary ways: by installing it as an npm package for use with a bundler (like Vite or Webpack), or by linking to it directly from a CDN in a static HTML file.

### 1. With a Bundler (Recommended)

This is the recommended approach for modern web applications.

**Step 1: Install the package**

```bash
npm install places-autocomplete-js
# or
yarn add places-autocomplete-js
```

**Step 2: Import and initialise the component**

In your main JavaScript or TypeScript file, import both the library and its stylesheet.

```javascript
import { PlacesAutocomplete } from 'places-autocomplete-js';
import 'places-autocomplete-js/places-autocomplete.css'; // Import the default stylesheet

document.addEventListener('DOMContentLoaded', () => {
  try {
    const autocomplete = new PlacesAutocomplete({
      containerId: 'autocomplete-container',
      googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
      onResponse: (placeDetails) => {
        console.log('Place Selected:', placeDetails);
        // Your code to handle the selected place...
      },
      onError: (error) => {
        console.error('Autocomplete Error:', error.message || error);
      }
    });
  } catch (error) {
    console.error("Failed to initialise PlacesAutocomplete:", error.message);
  }
});
```

Then, add the container element to your HTML:

```html
<div id="autocomplete-container"></div>
```

### 2. With a CDN Link (for Static HTML)

For quick prototyping or use in projects without a build step, you can use a CDN like jsDelivr.

**Step 1: Add the stylesheet and script to your HTML**

Add the following lines to your HTML file. The stylesheet goes in the `<head>` and the script goes at the end of the `<body>`.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Places Autocomplete Demo</title>
  
  <!-- 1. Link to the stylesheet -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/places-autocomplete-js@latest/dist/places-autocomplete-js.css">
  
</head>
<body>

  <!-- 2. Add the container for the component -->
  <div id="autocomplete-container"></div>

  <!-- 3. Link to the library's script -->
  <script type="module">
    // 4. Import the class from the script
    import { PlacesAutocomplete } from 'https://cdn.jsdelivr.net/npm/places-autocomplete-js@latest/dist/places-autocomplete.js';

    document.addEventListener('DOMContentLoaded', () => {
      try {
        const autocomplete = new PlacesAutocomplete({
          containerId: 'autocomplete-container',
          googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your key
          onResponse: (placeDetails) => {
            console.log('Place Selected:', placeDetails);
          }
        });
      } catch (error) {
        console.error("Failed to initialise PlacesAutocomplete:", error.message);
      }
    });
  </script>

</body>
</html>
```
> **Note for Production:** For stability, it's recommended to pin the CDN links to a specific version instead of using `@latest`. For example: `.../places-autocomplete-js@1.1.8/...`

### Configuration

The `PlacesAutocomplete` class is initialised with a configuration object.

| Parameter              | Type       | Required | Description                                                                                                                           |
| ---------------------- | ---------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `containerId`          | `string`   | Yes      | The ID of the HTML element where the autocomplete widget will be rendered.                                                            |
| `googleMapsApiKey`     | `string`   | Yes      | Your Google Maps API Key with the Places API (New) enabled.                                                                           |
| `googleMapsApiVersion` | `string`   | No       | The version of the Google Maps API to load (e.g., "weekly", "quarterly", "beta"). Defaults to "weekly".                               |
| `onResponse`           | `function` | No       | Callback function triggered with selected place details. Receives a `Place` object (see Google's docs). Default logs to console.      |
| `onError`              | `function` | No       | Callback function triggered when an error occurs. Receives an `Error` object or string. Default logs to console.                      |
| `options`              | `object`   | No       | Object to customise UI behavior and appearance. See "UI & Behavior Options" below.                                                    |
| `requestParams`        | `object`   | No       | Object to customise the parameters sent to the Google Places Autocomplete API. See "API Request Parameters" below.                    |
| `fetchFields`          | `array`    | No       | Array of Place Data Fields to request when a place is selected. Affects API cost. Default `['formattedAddress', 'addressComponents']` |

### UI & Behavior Options (`options`)

Passed within the main configuration object under the `options` key.

| Option           | Type              | Default                           | Description                                                                                                                                                   |
| ---------------- | ----------------- | --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `placeholder`    | `string`          | `"Start typing your address ..."` | Placeholder text for the input field.                                                                                                                         |
| `debounce`       | `number`          | `100`                             | Delay in milliseconds before triggering an API request after user stops typing. Set to `0` to disable.                                                        |
| `distance`       | `boolean`         | `true`                            | Whether to attempt to show distance in suggestions (requires `origin` in `requestParams`).                                                                    |
| `distance_units` | `'km' \| 'miles'` | `'km'`                            | Units to display distance in if `distance` is true.                                                                                                           |
| `label`          | `string`          | `""`                              | Optional label text displayed above the input field.                                                                                                          |
| `autofocus`      | `boolean`         | `false`                           | If `true`, automatically focuses the input field on initialisation.                                                                                           |
| `autocomplete`   | `string`          | `'off'`                           | Standard HTML `autocomplete` attribute for the input field.                                                                                                   |
| `classes`        | `object`          | _(See default classes below)_     | Object to override default CSS classes for styling. See "Styling" section.                                                                                    |
| `clear_input`    | `boolean`         | `true`                            | If `true` (default), clears the input field after a suggestion is selected. If `false`, the input field retains the `formattedAddress` of the selected place. |

### Styling

The component is built with flexibility in mind and can be styled in two ways. The default appearance is based on Tailwind CSS, but you are not required to use Tailwind in your project.

#### 1. Using the Pre-built CSS File (Recommended)

A standalone CSS file is included in the package and contains all necessary styles for the component to work correctly out-of-the-box.

**For bundler-based projects:**
```javascript
import 'places-autocomplete-js/style.css';
```

**For CDN usage:**
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/places-autocomplete-js@latest/dist/places-autocomplete-js.css">
```

#### 2. Custom CSS Classes (`options.classes`)

You can customise the appearance by providing your own CSS classes via the `options.classes` object. This allows you to override default styles or integrate with your own design system.

**Available Class Keys:**

| Class Key | Description |
|-----------|-------------|
| `section` | Main container section |
| `container` | Div containing the input and suggestions list |
| `label` | Label element (if `options.label` is provided) |
| `input` | Main text input element |
| `icon_container` | Container for the search icon |
| `icon` | SVG string for the search icon |
| `ul` | Suggestions list (`<ul>` element) |
| `li` | Individual suggestion item |
| `li_current` | Class for the currently highlighted suggestion |
| `li_button` | Button element within each suggestion |
| `li_button_current` | Class for the button in the highlighted suggestion |
| `li_div_container` | Container div within the button |
| `li_div_one` | First inner div (contains place name and icon) |
| `li_div_one_p` | Paragraph containing the main suggestion text |
| `li_div_two` | Second inner div (contains distance) |
| `li_div_two_p` | Paragraph containing the distance text |
| `kbd_container` | Container for keyboard hint keys |
| `kbd_escape` | Escape key hint |
| `kbd_up` | Up arrow key hint |
| `kbd_down` | Down arrow key hint |
| `kbd_active` | Class applied when a keyboard key is pressed |
| `highlight` | Class for matched text highlighting (defaults to `pac-highlight`) |

**Example:**

```javascript
const autocomplete = new PlacesAutocomplete({
  containerId: 'autocomplete-container',
  googleMapsApiKey: 'YOUR_API_KEY',
  options: {
    classes: {
      input: 'my-custom-input',
      ul: 'my-dropdown',
      li_current: 'active',
      highlight: 'text-highlight',
    },
  },
});
```

Then define these classes in your stylesheet:

```css
.my-custom-input {
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
}

.my-dropdown {
  max-height: 20rem;
  overflow-y: auto;
}

.active {
  background-color: #4f46e5;
  color: white;
}

.text-highlight {
  font-weight: 600;
  color: #4f46e5;
}
```

### API Request Parameters (`requestParams`)

Passed within the main configuration object under the `requestParams` key. These parameters are sent to the Google Places Autocomplete API. Refer to the [AutocompleteRequest documentation](https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompleteRequest) for all available options.

**Common Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `input` | `string` | Automatically handled by the library (user's typed value) |
| `language` | `string` | Language code for returned results (e.g., `"en"`, `"fr"`, `"de"`) |
| `region` | `string` | Region code as ccTLD two-character value (e.g., `"GB"`, `"US"`) |
| `includedRegionCodes` | `string[]` | Array of up to 5 CLDR region codes to restrict results |
| `locationBias` | `google.maps.places.LocationBias` | Area to bias results towards |
| `locationRestriction` | `google.maps.places.LocationRestriction` | Area to strictly restrict results to |
| `origin` | `google.maps.LatLngLiteral` | Origin point for distance calculations (requires `options.distance: true`) |
| `sessionToken` | `AutocompleteSessionToken` | Automatically managed by the library |

**Example:**

```javascript
const autocomplete = new PlacesAutocomplete({
  containerId: 'autocomplete-container',
  googleMapsApiKey: 'YOUR_API_KEY',
  requestParams: {
    language: 'en-GB',
    region: 'GB',
    includedRegionCodes: ['GB'],
    origin: { lat: 51.5074, lng: -0.1278 }, // London
  },
});
```

### Fetch Fields (`fetchFields`)

The `fetchFields` option specifies which place data fields to retrieve when a user selects a suggestion. This helps optimise API costs by only fetching necessary information.

**Default fields:** `['formattedAddress', 'addressComponents']`

See [Place Class Data Fields](https://developers.google.com/maps/documentation/javascript/place-class-data-fields) for all available fields and their billing impact.

**Example:**

```javascript
// In constructor
const autocomplete = new PlacesAutocomplete({
  containerId: 'autocomplete-container',
  googleMapsApiKey: 'YOUR_API_KEY',
  fetchFields: ['formattedAddress', 'addressComponents', 'displayName', 'types'],
});

// Or update dynamically
autocomplete.setFetchFields(['formattedAddress', 'location', 'viewport']);
```

### Retain Input Value After Selection

By default, the input field is cleared after a place is selected. To retain the selected address in the input field, set `options.clear_input` to `false`.

```javascript
const autocomplete = new PlacesAutocomplete({
  containerId: 'autocomplete-container',
  googleMapsApiKey: 'YOUR_API_KEY',
  options: {
    clear_input: false,
  },
});
```

## Public Methods

The `PlacesAutocomplete` instance provides the following methods for dynamic control:

### `clear()`

Clears the input field, removes visible suggestions, and refreshes the session token.

```javascript
autocomplete.clear();
```

### `destroy()`

Removes event listeners and cleans up DOM elements. Use this when the component is no longer needed (e.g., when unmounting a view in SPAs).

```javascript
autocomplete.destroy();
```

### `setFetchFields(fields)`

Dynamically updates the Place Data Fields to fetch on selection. The provided fields are merged with the library's default fields (`formattedAddress`, `addressComponents`).

**Parameters:**
- `fields` (`Array<string>`): Field names to fetch

```javascript
autocomplete.setFetchFields(['displayName', 'types', 'location']);
```

### `getFetchFields()`

Retrieves the current array of Place Data Fields that will be requested.

**Returns:** `Array<string>`

```javascript
const fields = autocomplete.getFetchFields();
console.log('Current fields:', fields);
// Output: ['formattedAddress', 'addressComponents', 'displayName', 'types', 'location']
```

### `setRequestParams(params)`

Dynamically updates the Google Places API request parameters. Useful for changing search criteria after initialisation.

**Parameters:**
- `params` (`object`): Request parameters to update (merged with existing parameters)

```javascript
// Change region and language
autocomplete.setRequestParams({
  region: 'FR',
  language: 'fr',
  includedRegionCodes: ['FR'],
});

// Set origin for distance calculations
autocomplete.setRequestParams({
  origin: { lat: 48.8566, lng: 2.3522 }, // Paris
});
```

### `getRequestParams()`

Retrieves the current API request parameters.

**Returns:** `object`

```javascript
const params = autocomplete.getRequestParams();
console.log('Current request params:', params);
```

### `setOptions(options)`

Dynamically updates UI behaviour and appearance options.

**Parameters:**
- `options` (`object`): Options to update (merged with existing options)

```javascript
// Update placeholder and debounce
autocomplete.setOptions({
  placeholder: 'Enter your postcode...',
  debounce: 250,
});

// Update CSS classes
autocomplete.setOptions({
  classes: {
    input: 'custom-input',
    ul: 'custom-dropdown',
  },
});
```

### `getOptions()`

Retrieves the current UI and behaviour options.

**Returns:** `object`

```javascript
const options = autocomplete.getOptions();
console.log('Current options:', options);
```

## Google Places API & Billing

This library uses the Google Maps JavaScript API (Places library). Usage is subject to Google's terms and pricing.

### Requirements

- An API key with "Places API" and "Maps JavaScript API" enabled
- Active Google Cloud billing account

### Cost Optimisation

The library automatically implements several cost-saving measures:

1. **Session Tokens**: Autocomplete requests are grouped using session tokens, significantly reducing costs compared to per-request billing. See [Session Token Pricing](https://developers.google.com/maps/documentation/places/web-service/usage-and-billing#session-pricing).

2. **Minimal Default Fields**: By default, only `formattedAddress` and `addressComponents` are fetched, minimising costs. Additional fields can be requested via `fetchFields`, but be mindful of [Place Data Fields Pricing](https://developers.google.com/maps/documentation/javascript/usage-and-billing#data-pricing).

3. **Debounced Requests**: Input is debounced by default (100ms) to reduce unnecessary API calls while typing.

## Testing

This project includes both unit tests (using Vitest) and end-to-end tests (using Playwright).

### Unit Tests

Unit tests are located in the `tests/` directory and are run using Vitest. To execute the unit tests, use the following command:

```bash
npm run test:vitest
```

### End-to-End Tests

End-to-end tests are located in the `e2e/` directory and are run using Playwright. To execute the end-to-end tests, ensure your development server is running (e.g., `npm run dev`) and then use the following command:

```bash
npm run test:e2e
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## License

[MIT](LICENSE)
