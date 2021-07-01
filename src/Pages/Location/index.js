import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import Event from '../../Components/Event'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';

export default function Location({locations}){
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [location, setLocation] = useState({});
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
    <div className={styles.location}>
      <div>
        <h1>{location?.name}</h1>
        <h3>{location?.description}</h3>
        <h4>{location?.startDate}</h4>
        <h4>{location?.endDate}</h4>
        <h4>{location?.price}</h4>
        <h4>{location?.type}</h4>
        <h4>{location?.currencyCode}</h4>
      </div>
      <Carousel width={'50%'} className={styles.carousel}>
          {(location?.photos || []).map(photo => (
            <div>
              <img src={photo} alt={`Selina ${location.name}`}/>
            </div>
          ))}
      </Carousel>
      <h2> {events.length ? 'Events:' : 'No events :('}</h2>
      <div className={`${styles.events} flex jc-sb`}>
        {events.map(item => {
          return <Event key={item.id} item={item}/>
        })}
      </div>
    
      
    </div>
  )
}