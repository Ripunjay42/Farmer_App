# Google Maps Integration Setup

This app uses Google Maps to display land parcel boundaries and locations. Follow these steps to set up Google Maps integration:

## Prerequisites

1. **Google Cloud Console Account**: You need a Google Cloud Console account to create API keys.
2. **Billing Account**: Google Maps requires a billing account to be set up, though it provides free tier usage.

## Setup Instructions

### 1. Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable billing for the project

### 2. Enable Required APIs

Enable the following APIs in your Google Cloud project:

- **Maps SDK for Android** (for Android app)
- **Maps SDK for iOS** (for iOS app)
- **Geocoding API** (optional, for address search features)
- **Places API** (optional, for place search functionality)

### 3. Create API Keys

1. Go to **APIs & Services > Credentials**
2. Click **Create Credentials > API Key**
3. Create separate keys for Android and iOS platforms
4. Restrict the keys to specific APIs and applications for security

### 4. Configure API Keys in App

#### Method 1: Direct Configuration (for testing)
Edit `app.json` and replace the dummy keys:

```json
{
  "expo": {
    "android": {
      "config": {
        "googleMaps": {
          "apiKey": "YOUR_ANDROID_API_KEY_HERE"
        }
      }
    },
    "ios": {
      "config": {
        "googleMapsApiKey": "YOUR_IOS_API_KEY_HERE"
      }
    }
  }
}
```

#### Method 2: Environment Variables (recommended for production)
1. Copy `.env.example` to `.env`
2. Add your API keys to the `.env` file
3. Use expo-constants to load them dynamically

### 5. Key Restrictions (Security)

For production apps, restrict your API keys:

#### Android Key Restrictions:
- **Application restrictions**: Android apps
- **Package name**: `your.app.package.name`
- **SHA-1 certificate fingerprint**: Add your app's SHA-1

#### iOS Key Restrictions:
- **Application restrictions**: iOS apps
- **Bundle ID**: `your.app.bundle.id`

### 6. Testing the Integration

The app includes several test land parcels with coordinates around Karnataka, India:

- **Kadaganchi, Haveri** (Survey No: 123/4)
- **Bellur, Haveri** (Survey No: 456/7)
- **Honnali, Davangere** (Survey No: 789/1)

## Map Features

### Current Implementation

- **Interactive Google Maps**: Satellite and standard view toggle
- **Land Boundary Visualization**: Polygon overlays showing land parcels
- **Corner Markers**: Visual indicators for land boundary points
- **Center Markers**: Land parcel identification markers
- **User Location**: Shows user's current location (with permission)
- **Map Controls**: 
  - Center on land parcel
  - Fit to land bounds
  - Locate user
  - Map type toggle
- **Legend**: Explains map symbols and colors

### Map Navigation

Users can access the map view from:

1. **Pre-populated Land Buckets**: Click "View on Map" button in land claiming screen
2. **Manual Land Search**: After searching for land manually, view results on map

### Map Interactions

- **Zoom**: Pinch to zoom in/out
- **Pan**: Drag to move around the map
- **Marker Taps**: Tap markers to see land details
- **Confirm Ownership**: Button to confirm land ownership and add to claim

## Technical Details

### Dependencies Used

- `react-native-maps`: Core mapping functionality
- `expo-location`: GPS and location services
- `@expo/vector-icons`: Map control icons

### Coordinate System

- **Format**: GeoJSON Polygon coordinates
- **Coordinate Order**: [longitude, latitude] (standard GeoJSON format)
- **Projection**: WGS84 (EPSG:4326)

### Performance Optimizations

- Lazy loading of map components
- Optimized polygon rendering
- Efficient coordinate transformation
- Map ready callbacks for smooth initialization

## Troubleshooting

### Common Issues

1. **Map not loading**: Check API key configuration
2. **Markers not showing**: Verify coordinate format and bounds
3. **Location not working**: Ensure location permissions are granted
4. **Poor performance**: Check polygon complexity and map zoom levels

### Debug Steps

1. Check Expo CLI logs for API errors
2. Verify network connectivity
3. Test with basic map first, then add overlays
4. Check Google Cloud Console for API usage and errors

## Production Considerations

1. **API Key Security**: Never commit API keys to version control
2. **Usage Monitoring**: Monitor Google Maps API usage in Cloud Console
3. **Error Handling**: Implement fallbacks for network failures
4. **Caching**: Consider caching map tiles for offline usage
5. **Performance**: Optimize for low-end devices and slow networks

## Future Enhancements

Potential improvements for the map feature:

- **Offline Maps**: Cache map tiles for offline viewing
- **Measurement Tools**: Distance and area measurement
- **Layer Control**: Toggle different map layers
- **Custom Styling**: Branded map styling
- **Clustering**: Group nearby land parcels
- **Search Integration**: Search for places and addresses
- **Export Features**: Save map screenshots or coordinates
