import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
        defaultZoom={17}
        defaultCenter={{ lat: Number(props.latitude), lng: Number(props.longitude) }}
    >
        <Marker
            position={{ lat: Number(props.latitude), lng: Number(props.longitude) }}
        />
    </GoogleMap>
));