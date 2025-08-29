import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  Alert,
  Dimensions,
  StyleSheet
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

  useEffect(() => {
    initializeMap();
  }, [landData]);

  const initializeMap = async () => {
    // Parse land data
    if (landData) {
      try {
        const parsedData = JSON.parse(landData);
        setLandDetails(parsedData);
        
        // Set default region based on land coordinates or use default Karnataka coordinates
        const defaultRegion = {
          latitude: parsedData.geoJson?.coordinates?.[0]?.[0]?.[1] || 15.3173,
          longitude: parsedData.geoJson?.coordinates?.[0]?.[0]?.[0] || 75.7139,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
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
        const location = await Location.getCurrentPositionAsync({});
        setUserLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      }
    } catch (error) {
      console.log('Location permission denied or error:', error);
    }
  };

  const getLandPolygonCoordinates = () => {
    if (!landDetails?.geoJson?.coordinates) {
      // Return default polygon coordinates for demo
      const centerLat = region?.latitude || 15.3173;
      const centerLng = region?.longitude || 75.7139;
      const offset = 0.002; // Small offset for demo polygon
      
      return [
        { latitude: centerLat - offset, longitude: centerLng - offset },
        { latitude: centerLat - offset, longitude: centerLng + offset },
        { latitude: centerLat + offset, longitude: centerLng + offset },
        { latitude: centerLat + offset, longitude: centerLng - offset },
      ];
    }

    // Convert GeoJSON coordinates to react-native-maps format
    return landDetails.geoJson.coordinates[0].map(coord => ({
      latitude: coord[1],
      longitude: coord[0],
    }));
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
    if (landDetails) {
      const polygonCoords = getLandPolygonCoordinates();
      const centerLat = polygonCoords.reduce((sum, coord) => sum + coord.latitude, 0) / polygonCoords.length;
      const centerLng = polygonCoords.reduce((sum, coord) => sum + coord.longitude, 0) / polygonCoords.length;
      
      setRegion({
        latitude: centerLat,
        longitude: centerLng,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  };

  const handleLocateMe = async () => {
    if (!locationPermission) {
      Alert.alert('Permission Required', 'Location permission is required to show your current location.');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    } catch (error) {
      Alert.alert('Error', 'Unable to get your current location.');
    }
  };

  if (!landDetails || !region) {
    return (
      <View className="flex-1 bg-green-50 justify-center items-center">
        <Text className="text-gray-500">Loading map data...</Text>
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
          style={StyleSheet.absoluteFillObject}
          provider={PROVIDER_GOOGLE}
          region={region}
          onRegionChange={setRegion}
          showsUserLocation={locationPermission}
          showsMyLocationButton={false}
          showsCompass={true}
          showsScale={true}
          mapType="satellite"
        >
          {/* Land Polygon */}
          <Polygon
            coordinates={getLandPolygonCoordinates()}
            fillColor="rgba(16, 185, 129, 0.3)"
            strokeColor="rgba(16, 185, 129, 1)"
            strokeWidth={3}
          />
          
          {/* Land Center Marker */}
          <Marker
            coordinate={getLandPolygonCoordinates().reduce((center, coord, _, array) => ({
              latitude: center.latitude + coord.latitude / array.length,
              longitude: center.longitude + coord.longitude / array.length,
            }), { latitude: 0, longitude: 0 })}
            title={`Survey No: ${landDetails.surveyNo}`}
            description={`${landDetails.village}, ${landDetails.tehsil}`}
          >
            <View className="bg-green-500 rounded-full p-2">
              <FontAwesome name="map-marker" size={20} color="white" />
            </View>
          </Marker>
        </MapView>

        {/* Map Controls */}
        <View className="absolute top-4 right-4 space-y-2">
          <TouchableOpacity 
            onPress={handleCenterOnLand}
            className="bg-white rounded-full p-3 shadow-lg"
          >
            <FontAwesome name="crosshairs" size={20} color="#374151" />
          </TouchableOpacity>
          
          {locationPermission && (
            <TouchableOpacity 
              onPress={handleLocateMe}
              className="bg-white rounded-full p-3 shadow-lg"
            >
              <FontAwesome name="location-arrow" size={20} color="#374151" />
            </TouchableOpacity>
          )}
        </View>

        {/* Map Type Toggle */}
        <View className="absolute top-4 left-4">
          <TouchableOpacity 
            onPress={() => {
              // Toggle between satellite and standard view
              // This would need state management for map type
            }}
            className="bg-white rounded-lg p-2 shadow-lg"
          >
            <Text className="text-gray-700 text-xs font-semibold">Satellite</Text>
          </TouchableOpacity>
        </View>

        {/* Legend */}
        <View className="absolute bottom-20 left-4 bg-white rounded-lg p-3 shadow-lg">
          <Text className="text-gray-800 font-semibold text-xs mb-2">Legend</Text>
          <View className="flex-row items-center mb-1">
            <View className="w-4 h-4 bg-green-500 rounded mr-2 opacity-30" />
            <Text className="text-gray-600 text-xs">Your Land Parcel</Text>
          </View>
          <View className="flex-row items-center mb-1">
            <View className="w-4 h-2 border-green-500 border-2 mr-2" />
            <Text className="text-gray-600 text-xs">Boundary Lines</Text>
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
