import { UserLocationContext } from '@/context/UserLocationContext';
import { GoogleMap, LoadScript, MarkerF } from '@react-google-maps/api';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Markers from './Markers';

function GoogleMapView({ businessList }) {
  const { userLocation } = useContext(UserLocationContext);
  const mapRef = useRef(null);
  const [mapSize, setMapSize] = useState({ width: '100%', height: '550px' });
  const [zoomLevel, setZoomLevel] = useState(12);

  const mapContainerStyle = mapSize;

  const mapOptions = {
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dadada"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ]
    
  };

  useEffect(() => {
    console.log('Google Maps API Key:', process.env.NEXT_PUBLIC_GOOGLE_API_KEY);
    console.log('Business List:', businessList);
  }, [businessList]);

  if (!process.env.NEXT_PUBLIC_GOOGLE_API_KEY) {
    console.error('Google Maps API key is missing');
    return <div>Error: Google Maps API key is missing</div>;
  }

  if (!userLocation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pt-[64px]">
      <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={userLocation}
          zoom={12}
          options={mapOptions}
        >
          <MarkerF
            position={userLocation}
            icon={{
              url: '/user-location.png',
              scaledSize: {
                width: 50,
                height: 50
              }
            }}
          />
          {businessList && businessList.length > 0 ? (
            businessList.map((item, index) => index <= 7 && (
              <Markers business={item} key={index} />
            ))
          ) : (
            <div>No businesses available</div>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default GoogleMapView;