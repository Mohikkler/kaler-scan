# Google Maps Integration Setup

This guide will help you set up Google Maps integration for the Contact page.

## Prerequisites

1. **Google Cloud Console Account**: You need a Google account with access to Google Cloud Console
2. **Billing Enabled**: Google Maps API requires billing to be enabled (you get $200 free credit monthly)

## Step-by-Step Setup

### 1. Create a Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for your project

### 2. Enable Required APIs

Enable the following APIs in your Google Cloud Console:

1. **Maps JavaScript API** (Required)
   - Go to "APIs & Services" > "Library"
   - Search for "Maps JavaScript API"
   - Click "Enable"

2. **Geocoding API** (Optional - for address lookup)
   - Search for "Geocoding API"
   - Click "Enable"

3. **Places API** (Optional - for place details)
   - Search for "Places API"
   - Click "Enable"

### 3. Create API Key

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key

### 4. Restrict API Key (Recommended)

1. Click on your API key to edit it
2. Under "Application restrictions", select "HTTP referrers (web sites)"
3. Add your domain(s):
   - `localhost:8080/*` (for development)
   - `yourdomain.com/*` (for production)
4. Under "API restrictions", select "Restrict key"
5. Select the APIs you enabled (Maps JavaScript API, etc.)
6. Click "Save"

### 5. Add API Key to Your Project

1. Create a `.env` file in the root of your project (if it doesn't exist)
2. Add your API key:

```env
VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
```

3. Restart your development server

### 6. Update Location Coordinates

In `src/pages/Contact.tsx`, update the coordinates to match your exact location:

```typescript
const locationCoordinates = {
  lat: 31.0815, // Replace with your exact latitude
  lng: 75.3373  // Replace with your exact longitude
};
```

To find your exact coordinates:
1. Go to Google Maps
2. Right-click on your location
3. Select the coordinates that appear
4. Copy the latitude and longitude

## Features

The Google Maps integration includes:

- **Interactive Map**: Shows your exact location
- **Custom Marker**: Branded "KSC" marker with your brand colors
- **Info Window**: Shows business details when clicked
- **Responsive Design**: Works on all screen sizes
- **Fallback**: Shows placeholder if API key is not provided

## Troubleshooting

### Map Not Loading
- Check if your API key is correct
- Verify that Maps JavaScript API is enabled
- Check browser console for errors
- Ensure billing is enabled on your Google Cloud project

### API Key Restrictions
- Make sure your domain is added to the allowed referrers
- For development, ensure `localhost:8080/*` is included
- Check that the correct APIs are selected in restrictions

### Billing Issues
- Google Maps API requires billing to be enabled
- You get $200 free credit monthly (usually sufficient for most websites)
- Check your billing dashboard for usage and costs

## Security Notes

- Never commit your API key to version control
- Always use environment variables for API keys
- Restrict your API key to specific domains and APIs
- Monitor your API usage in Google Cloud Console

## Cost Considerations

- Maps JavaScript API: $7 per 1,000 map loads
- Geocoding API: $5 per 1,000 requests
- Places API: $17 per 1,000 requests
- Free tier: $200 monthly credit

For most websites, the free tier is sufficient. 