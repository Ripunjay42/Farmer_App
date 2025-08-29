import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  StyleSheet,
  Platform
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { router, useLocalSearchParams } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import MapView, { Polygon, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import CustomButton from '../../components/ui/CustomButton';

const { width, height } = Dimensions.get('window');

export default function MapViewScreen() {
  const { landData } = useLocalSearchParams();
  const [landDetails, setLandDetails] = useState(null);
  const [region, setRegion] = useState(null);
  const [locationPermission, setLocationPermission] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [mapType, setMapType] = useState('satellite');
  const [isLoading, setIsLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    initializeMap();
  }, [landData]);

  const initializeMap = async () => {
    setIsLoading(true);
    
    // Parse land data
    if (landData) {
      try {
        const parsedData = JSON.parse(landData);
        console.log('Parsed land data:', parsedData);
        setLandDetails(parsedData);
        
        // Calculate the center of the land polygon
        let centerLat = 15.3173; // Default Karnataka coordinates
        let centerLng = 75.7139;
        
        if (parsedData.geoJson?.coordinates?.[0]) {
          const coords = parsedData.geoJson.coordinates[0];
          centerLat = coords.reduce((sum, coord) => sum + coord[1], 0) / coords.length;
          centerLng = coords.reduce((sum, coord) => sum + coord[0], 0) / coords.length;
        }
        
        const defaultRegion = {
          latitude: centerLat,
          longitude: centerLng,
          latitudeDelta: 0.005, // Smaller delta for closer zoom
          longitudeDelta: 0.005,
        };
        
        setRegion(defaultRegion);
        
      } catch (error) {
        console.error('Error parsing land data:', error);
        Alert.alert('Error', 'Invalid land data provided');
        router.back();
        return;
      }
    }

    // Request location permission
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setLocationPermission(true);
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } else {
        console.log('Location permission denied');
      }
    } catch (error) {
      console.log('Location permission error:', error);
    }
    
    setIsLoading(false);
  };

  const getLandPolygonCoordinates = () => {
    if (!landDetails?.geoJson?.coordinates?.[0]) {
      // Return default polygon coordinates for demo if no GeoJSON data
      const centerLat = region?.latitude || 15.3173;
      const centerLng = region?.longitude || 75.7139;
      const offset = 0.001; // Small offset for demo polygon
      
      return [
        { latitude: centerLat - offset, longitude: centerLng - offset },
        { latitude: centerLat - offset, longitude: centerLng + offset },
        { latitude: centerLat + offset, longitude: centerLng + offset },
        { latitude: centerLat + offset, longitude: centerLng - offset },
      ];
    }

    // Convert GeoJSON coordinates to react-native-maps format
    const geoJsonCoords = landDetails.geoJson.coordinates[0];
    return geoJsonCoords.slice(0, -1).map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
  };

  const getLandCenter = () => {
    const polygonCoords = getLandPolygonCoordinates();
    const centerLat = polygonCoords.reduce((sum, coord) => sum + coord.latitude, 0) / polygonCoords.length;
    const centerLng = polygonCoords.reduce((sum, coord) => sum + coord.longitude, 0) / polygonCoords.length;
    return { latitude: centerLat, longitude: centerLng };
  };

  const handleConfirmLand = () => {
    Alert.alert(
      'Confirm Land Ownership',
      `Are you sure this land parcel (Survey No: ${landDetails?.surveyNo}) belongs to you?\n\nBy confirming, you declare that you have the legal rights to claim this land.`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Confirm Ownership',
          style: 'default',
          onPress: () => {
            Alert.alert(
              'Land Confirmed!',
              'This land parcel has been added to your claim. You can now proceed with your application.',
              [
                {
                  text: 'Continue',
                  onPress: () => router.navigate('/land/land-claiming')
                },
                {
                  text: 'Go to Home',
                  onPress: () => router.navigate('/(tabs)/home')
                }
              ]
            );
          }
        }
      ]
    );
  };

  const handleCenterOnLand = () => {
    if (landDetails && mapRef.current) {
      const landCenter = getLandCenter();
      const newRegion = {
        ...landCenter,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003,
      };
      
      setRegion(newRegion);
      mapRef.current.animateToRegion(newRegion, 1000);
    }
  };

  const handleLocateMe = async () => {
    if (!locationPermission) {
      Alert.alert(
        'Permission Required', 
        'Location permission is required to show your current location.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Grant Permission',
            onPress: async () => {
              const { status } = await Location.requestForegroundPermissionsAsync();
              if (status === 'granted') {
                setLocationPermission(true);
                handleLocateMe();
              }
            }
          }
        ]
      );
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const newLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      setUserLocation(newLocation);
      
      if (mapRef.current) {
        const newRegion = {
          ...newLocation,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        };
        setRegion(newRegion);
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to get your current location. Please try again.');
    }
  };

  const toggleMapType = () => {
    setMapType(prevType => prevType === 'satellite' ? 'standard' : 'satellite');
  };

  const fitToLandBounds = () => {
    if (landDetails && mapRef.current) {
      const coords = getLandPolygonCoordinates();
      mapRef.current.fitToCoordinates(coords, {
        edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
        animated: true,
      });
    }
  };

  if (!landDetails || !region || isLoading) {
    return (
      <View className="flex-1 bg-green-50 justify-center items-center">
        <FontAwesome name="map" size={50} color="#10b981" />
        <Text className="text-gray-500 mt-4 text-lg">Loading map data...</Text>
        <Text className="text-gray-400 mt-2">Please wait while we prepare your land boundaries</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-green-50">
      <StatusBar style="dark" />
      
      {/* Header */}
      <View className="bg-green-500 pt-12 pb-4 px-6 z-10">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="mr-4 p-2"
          >
            <FontAwesome name="arrow-left" size={24} color="white" />
          </TouchableOpacity>
          <View className="flex-1">
            <Text className="text-white text-xl font-bold">Land Boundaries</Text>
            <Text className="text-green-100 text-sm">
              Survey No: {landDetails.surveyNo} • {landDetails.area}
            </Text>
          </View>
        </View>
      </View>

      {/* Map Container */}
      <View className="flex-1 relative">
        <MapView
          ref={mapRef}
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={locationPermission}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          showsBuildings={false}
          showsTraffic={false}
          showsIndoors={false}
          mapType={mapType}
          toolbarEnabled={false}
          loadingEnabled={true}
          loadingIndicatorColor="#10b981"
          loadingBackgroundColor="#f0fdf4"
          moveOnMarkerPress={false}
          onMapReady={() => {
            console.log('Map is ready');
            // Fit to land bounds when map is ready
            setTimeout(fitToLandBounds, 1000);
          }}
        >
          {/* Land Polygon */}
          <Polygon
            coordinates={getLandPolygonCoordinates()}
            fillColor="rgba(16, 185, 129, 0.25)"
            strokeColor="rgba(16, 185, 129, 0.8)"
            strokeWidth={3}
            lineDashPattern={Platform.OS === 'ios' ? [5, 5] : undefined}
          />
          
          {/* Land Center Marker */}
          <Marker
            coordinate={getLandCenter()}
            title={`Survey No: ${landDetails.surveyNo}`}
            description={`${landDetails.village}, ${landDetails.tehsil}, ${landDetails.district}`}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View className="bg-green-500 rounded-full p-3 shadow-lg border-2 border-white">
              <FontAwesome name="map-marker" size={16} color="white" />
            </View>
          </Marker>

          {/* Corner markers for land boundaries */}
          {getLandPolygonCoordinates().map((coord, index) => (
            <Marker
              key={`corner-${index}`}
              coordinate={coord}
              anchor={{ x: 0.5, y: 0.5 }}
              tracksViewChanges={false}
            >
              <View className="bg-green-600 rounded-full w-3 h-3 border border-white" />
            </Marker>
          ))}
        </MapView>

        {/* Map Controls */}
        <View className="absolute top-4 right-4 space-y-2">
          <TouchableOpacity 
            onPress={handleCenterOnLand}
            className="bg-white rounded-full p-3 shadow-lg border border-gray-200"
          >
            <FontAwesome name="crosshairs" size={20} color="#374151" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            onPress={fitToLandBounds}
            className="bg-white rounded-full p-3 shadow-lg border border-gray-200"
          >
            <FontAwesome name="expand" size={18} color="#374151" />
          </TouchableOpacity>
          
          {locationPermission && (
            <TouchableOpacity 
              onPress={handleLocateMe}
              className="bg-white rounded-full p-3 shadow-lg border border-gray-200"
            >
              <FontAwesome name="location-arrow" size={18} color="#374151" />
            </TouchableOpacity>
          )}
        </View>

        {/* Map Type Toggle */}
        <View className="absolute top-4 left-4">
          <TouchableOpacity 
            onPress={toggleMapType}
            className="bg-white rounded-lg px-3 py-2 shadow-lg border border-gray-200"
          >
            <Text className="text-gray-700 text-xs font-semibold capitalize">
              {mapType === 'satellite' ? 'Satellite' : 'Standard'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Area Information */}
        <View className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <View className="bg-white rounded-lg px-4 py-2 shadow-lg border border-gray-200">
            <Text className="text-green-600 text-sm font-bold text-center">
              {landDetails.area}
            </Text>
          </View>
        </View>

        {/* Legend */}
        <View className="absolute bottom-24 left-4 bg-white rounded-lg p-3 shadow-lg border border-gray-200">
          <Text className="text-gray-800 font-semibold text-xs mb-2">Legend</Text>
          <View className="flex-row items-center mb-1">
            <View className="w-4 h-4 bg-green-500 rounded mr-2" style={{ opacity: 0.25 }} />
            <Text className="text-gray-600 text-xs">Land Parcel</Text>
          </View>
          <View className="flex-row items-center mb-1">
            <View className="w-4 h-2 border-green-500 border-2 mr-2" />
            <Text className="text-gray-600 text-xs">Boundaries</Text>
          </View>
          <View className="flex-row items-center mb-1">
            <View className="w-3 h-3 bg-green-600 rounded-full mr-2" />
            <Text className="text-gray-600 text-xs">Corner Points</Text>
          </View>
          {locationPermission && (
            <View className="flex-row items-center">
              <View className="w-4 h-4 bg-blue-500 rounded-full mr-2" />
              <Text className="text-gray-600 text-xs">Your Location</Text>
            </View>
          )}
        </View>
      </View>

      {/* Land Details Card */}
      <View className="bg-white px-6 py-4 border-t border-gray-200">
        <View className="flex-row items-center justify-between mb-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{landDetails.surveyNo}</Text>
            <Text className="text-sm text-gray-600">{landDetails.village}, {landDetails.tehsil}, {landDetails.district}</Text>
          </View>
          <View className="items-end">
            <Text className="text-sm font-semibold text-gray-800">{landDetails.area}</Text>
            <Text className="text-xs text-gray-600">{landDetails.landType}</Text>
          </View>
        </View>
        
        <View className="flex-row items-center mb-4">
          <FontAwesome name="user" size={14} color="#6b7280" />
          <Text className="text-sm text-gray-600 ml-2">Owner: {landDetails.ownerName}</Text>
        </View>

        <CustomButton
          title="Confirm This is My Land"
          onPress={handleConfirmLand}
          variant="primary"
          icon={<FontAwesome name="check" size={18} color="white" />}
        />
        
        <TouchableOpacity onPress={() => router.back()} className="mt-3">
          <Text className="text-gray-500 text-center">Go Back to Search</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
