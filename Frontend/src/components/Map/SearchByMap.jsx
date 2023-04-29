import { MapContainer } from 'react-leaflet/MapContainer'
import { TileLayer } from 'react-leaflet/TileLayer'
import { Marker, Popup, useMap, useMapEvents } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import './SearchByMap.css'

import L from 'leaflet';
import "leaflet-routing-machine";
import icon from 'leaflet/dist/images/marker-icon.png';
import donationIcon from '../../images/blood.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { useEffect } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useRef } from 'react'
const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
const donationCenterIcon = L.icon({ iconUrl: donationIcon, iconSize: [75, 75] })
L.Marker.prototype.options.icon = DefaultIcon;


export function useUserLocation() {
    const [location, setLocation] = useState(null)
    useEffect(() => {
        let watchId = null
        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (position) => setLocation(position.coords),
                (error) => {
                    switch (error.code) {
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.")
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.")
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.")
                            break;
                        case error.UNKNOWN_ERROR:
                            console.log("An unknown error occurred.")
                            break;
                        default:
                            console.log("Even more unknown error occured.")
                            break;
                    }
                    setLocation(null);
                });
        } else {
            console.log("Geolocation is not supported by browser!");
            setLocation(null);
        }
        return () => {
            if (watchId) {
                navigator.geolocation.clearWatch(watchId)
            }
        }
    }, [])
    return location
}

const getNearbyCenters = async (coords) => {
    let response = await fetch(`/nearby-centers/${coords[0]}/${coords[1]}`)
    return response.json()
}

const defaultCoords = [24.065015083595664, 78.06087703506316]
const getCoords = (location) => location != null ? [location.latitude, location.longitude] : defaultCoords

const MapDetails = ({ userCoords, centerDetails, zoom, routing }) => {
    const map = useMap()
    map.setView(userCoords, zoom)

    return <>
        <Marker position={userCoords}>
            <Popup>
                Your Location
            </Popup>
        </Marker>
        {centerDetails.map((val, idx) =>
            <Marker position={val.centerCoords} key={idx} icon={donationCenterIcon}>
                <Popup>
                    {val.centerPopup != null ? val.centerPopup : <></>}
                </Popup>
            </Marker>
        )}
    </>
}

export const SearchByMap = () => {
    const location = useUserLocation()
    const userCoords = getCoords(location)
    const [nearbyCenters, setNearbyCenters] = useState([])
    const mapZoom = location != null ? 800 : 4
    let nearbyCenterDetails = nearbyCenters.map((center) => {
        return {
            centerCoords: [center.latitude, center.longitude],
            centerPopup: <>
                {center.address}<br />
                {center.Pincode}<br />
                {center.District}<br />
                {center.StateName}<br />
                <a target='_blank' rel="noreferrer noopener" href={`/map/${center.id}`}>Route</a>
            </>
        }
    })
    useEffect(() => {
        if (location != null) {
            getNearbyCenters(userCoords).then((val) => setNearbyCenters(val))
        }
        else {
            setNearbyCenters([])
        }
    }, [location])
    return (
        <MapContainer center={userCoords} zoom={mapZoom} scrollWheelZoom={true}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapDetails userCoords={userCoords} centerDetails={nearbyCenterDetails} zoom={mapZoom}></MapDetails>
        </MapContainer>
    )
}

const RoutingMapDetails = ({ userCoords, centerDetails, routing }) => {
    const map = useMap()
    const [routingControl, setRoutingControl] = useState(null)
    useEffect(() => {
        if (routing != null) {
            if (routingControl != null) {
                routingControl.spliceWaypoints(0, 2, routing.start, routing.end)
            }
            else {
                let cntrl = L.Routing.control({
                    waypoints: [
                        routing.start,
                        routing.end
                    ],
                    createMarker: function (i, waypoint, n) {
                        let marker = L.marker(waypoint.latLng, {
                            draggable: false,
                            bounceOnAdd: false,
                            icon: i == 1 ? donationCenterIcon : DefaultIcon
                        })
                        if (waypoint.name)
                            marker = marker.bindTooltip(waypoint.name, { permanent: true });
                        return marker;
                    }
                })
                cntrl.addTo(map);
                setRoutingControl(cntrl)
            }
        }
    }, [routing])
    return
    <>
    </>
}

export const RouteByMap = ({ centerLatLong, centerName }) => {
    const location = useUserLocation()
    const userCoords = getCoords(location)
    let varia = {
        centerCoords: centerLatLong,
        centerPopup: <div>HELLO THANKS FOR CLICKING</div>
    }
    const [route, setRoute] = useState(null)
    const [width, setWidth] = useState(350)
    const [height, setheight] = useState(350)
    useEffect(
        () => {
            setWidth(window.innerWidth)
            setheight(window.innerHeight)
            window.addEventListener("resize", () => {
                setWidth(window.innerWidth)
                setheight(window.innerHeight)
            })
        }, [])

    useEffect(
        () => {
            setRoute({ start: L.Routing.waypoint(L.latLng(userCoords[0], userCoords[1]), "You"), end: L.Routing.waypoint(L.latLng(centerLatLong[0], centerLatLong[1]), centerName) })
        }, [centerLatLong, location]
    )

    if (location == null || route == null) {
        return <div>USER LOCATION NOT AVAILABLE</div>
    }
    else {
        return (
            <MapContainer center={userCoords} scrollWheelZoom={true} style={{ height: height, width: width }}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoutingMapDetails userCoords={userCoords} centerDetails={[varia]} routing={route}></RoutingMapDetails>
            </MapContainer>
        )
    }

}