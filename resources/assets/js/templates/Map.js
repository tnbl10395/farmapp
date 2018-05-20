import React from "react"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";

export const MapWithAMarker = withScriptjs(withGoogleMap(props => {
    var lat = 0;
    var long = 0;
    props.array.map(element => {
        lat += Number(element.latitude);
        long += Number(element.longitude);
    });
    lat = lat/props.array.length;
    long = long/props.array.length; 
    return <GoogleMap
        defaultZoom={14}
        defaultCenter={{ lat: lat, lng: long }}
    >
        {
            props.array.map((element, index) => {
                let isDisplayed = true;
                return <Marker key={index}
                    position={{ lat: Number(element.latitude), lng: Number(element.longitude) }}
                    onClick={() => {
                        props.getDetailInformationDevice(element.deviceId);
                        isDisplayed = false;
                    }}>
                        {
                            isDisplayed 
                                ?<InfoWindow>
                                    <div>
                                        <div><span style={{fontWeight: 'bold'}}>Device name: </span>{element.name}</div>
                                        <div><span style={{fontWeight: 'bold'}}>Plant name: </span>{element.namePlant}</div>
                                    </div>
                                </InfoWindow>
                                : null
                        }
                    </Marker>       
            })
        }
    </GoogleMap>
}));
    