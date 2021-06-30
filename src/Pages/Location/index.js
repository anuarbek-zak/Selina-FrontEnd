import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'


export default function Location({locations}){
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState({});
  console.log('====Location',locations)
  useEffect(() => {
    const loadLocation = async () => {
      try{
        const response = await fetch('https://events.selinatech.com/events/aggregated/'+id)
        const data = await response.json();
        setEvents(data)
      } catch (err) {
        console.error('Error during fetching data:', err)
      }
    }
    loadLocation()
  }, [id])

  useEffect(() => {
    setLocation(locations.find(loc => loc.id === id))
  }, [locations, id])

  console.log('data',events,location)
  return (
    <div>
      <h1>Location:</h1>
      <div>
        <h2>{location?.name}</h2>
        <h2>{location?.description}</h2>
        <h3>{location?.startDate}</h3>
        <h3>{location?.endDate}</h3>
        <h3>{location?.price}</h3>
        <h3>{location?.type}</h3>
        <h3>{location?.currencyCode}</h3>
      </div>
      <div className="">
        
      </div>
    
      
    </div>
  )
}