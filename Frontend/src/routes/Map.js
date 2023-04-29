import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RouteByMap } from "../components/Map/SearchByMap";

function seededBadRandom(seed) {
    var x = Math.sin(seed) * 10000;
    return x - Math.floor(x);
}

function useCenterDetails(centerId) {
    const [centerDetails, setCenterDetails] = useState(null)
    useEffect(() => {
        fetch(`/center-info/${centerId}`).then((response) => {
            response.json().then(setCenterDetails)
                .catch(err => console.error(err))
        }).catch(err => console.error(err))
    }, [centerId])
    if (centerDetails)
        return { centerCoords: [centerDetails.latitude, centerDetails.longitude], centerName: centerDetails.address }
    else
        return null
}

export const MapPage = () => {
    let { centerId } = useParams()
    const centerDetails = useCenterDetails(centerId)
    if (centerDetails)
        return <RouteByMap centerName={centerDetails.centerName} centerLatLong={centerDetails.centerCoords}></RouteByMap>
    else
        return <div>LOADING</div>
}