import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props => {
    var lat = 0;
    var long = 0;
    props.array.forEach(element => {
        lat += element.latitude;
        long += element.longitude;
    });
    lat = lat/props.array.length;
    long = long/props.array.length;
    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: lat, lng: long }}
    >
        {
            props.array.map((element, index) => {
                return <Marker key={index}
                    position={{ lat: Number(element.latitude), lng: Number(element.longitude) }}
            />       
            })
        }
    </GoogleMap>
}))
    