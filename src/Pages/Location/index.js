import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import Event from '../../Components/Event'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';


const renderEventsWithDatePicker = (eventsToShow, dateRange, setDateRange) => {
  return (
    <div>
      <h2> Events </h2>
      <DateTimeRangePicker
        onChange={setDateRange}
        value={dateRange}
      />
      <div className={`${styles.events} flex jc-sb`}>
        {eventsToShow.map(item => {
          return <Event key={item.id} item={item}/>
        })}
      </div>
    </div>
  )
}

const loadEvents = async (id, setEvents, setLoadingEvents, setEventsToShow) => {
  try{
    setLoadingEvents(true)
    const response = await fetch('https://events.selinatech.com/events/aggregated/'+id)
    const data = await response.json()
    setEvents(data)
    setEventsToShow(data)
    setLoadingEvents(false)
  } catch (err) {
    console.error('Error during fetching data:', err)
  }
}

export default function Location({locations}){
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [eventsToShow, setEventsToShow] = useState(events);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [location, setLocation] = useState({});
  const eventsExists = events.length > 0
  const today = new Date()
  let monthAhead = new Date();
  monthAhead.setMonth(today.getMonth()+1)
  const [dateRange, setDateRange] = useState([today, monthAhead]);
  

  useEffect(() => {
    setLocation(locations.find(loc => loc.id === id))
  }, [locations, id])

  useEffect(() => {
    if(events.length>0){
      const newEvnts = events.filter(evt =>  {
        return Date.parse(evt.startDateUTC) >= Date.parse(dateRange[0]) && Date.parse(evt.endDateUTC) <= Date.parse(dateRange[1])
      })
      setEventsToShow(newEvnts)
    }
  }, [dateRange])

  const showLoadBtn = !eventsExists && !loadingEvents;

  
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
          <div key={photo}>
            <img src={photo} alt={`Selina ${location.name}`}/>
          </div>
        ))}
      </Carousel>
      {showLoadBtn && (<button className={`${styles['glow-on-hover']}`} onClick={() => {loadEvents(id, setEvents, setLoadingEvents, setEventsToShow)}} type="button">SHOW EVENTS</button>)}
      {loadingEvents && (
        <p>Loading...</p>
      )}
      {eventsExists > 0 && renderEventsWithDatePicker(eventsToShow,dateRange,setDateRange)}
    </div>
  )
}