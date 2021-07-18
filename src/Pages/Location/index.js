import styles from './index.module.scss';
import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import Event from '../../Components/Event'
import { Carousel } from 'react-responsive-carousel';
import DateTimeRangePicker from '@wojtekmaj/react-datetimerange-picker';
import "react-responsive-carousel/lib/styles/carousel.min.css";

export default function Location({locations}){

  const LOADING_STATTES = {
    LOADING: "LOADING",
    LOADED: "LOADED",
    NOT_LOADED: "NOT_LOADED",
  }
  const { id } = useParams();
  const [events, setEvents] = useState([]);
  const [eventsToShow, setEventsToShow] = useState(events);
  const [loadingEventsState, setLoadingEventsState] = useState(LOADING_STATTES.NOT_LOADED);
  const [location, setLocation] = useState({});
  const eventsExists = loadingEventsState === LOADING_STATTES.LOADED && events.length > 0
  const showLoadBtn = !eventsExists && loadingEventsState === LOADING_STATTES.NOT_LOADED
  const noEvents = loadingEventsState === LOADING_STATTES.LOADED && !eventsToShow.length
  const loadingEvents = loadingEventsState === LOADING_STATTES.LOADING
  const today = new Date()
  let monthAhead = new Date();
  monthAhead.setMonth(today.getMonth()+1)
  const [dateRange, setDateRange] = useState([today, monthAhead]);
  

  useEffect(() => {
    setLocation(locations.find(loc => loc.id === id))
  }, [locations, id])

  useEffect(() => {
    if(loadingEventsState === LOADING_STATTES.LOADED) {
      loadEvents()
    }
  }, [id])

  useEffect(() => {
    if(events.length>0){
      const newEvnts = events.filter(evt =>  {
        return Date.parse(evt.startDateUTC) >= Date.parse(dateRange[0]) && Date.parse(evt.endDateUTC) <= Date.parse(dateRange[1])
      })
      setEventsToShow(newEvnts)
    }
  }, [dateRange])

  
  const renderEventsWithDatePicker = () => {
    return (
      <div>
        <DateTimeRangePicker
          onChange={setDateRange}
          value={dateRange}
          className={styles.datepicker}
        />
        <h2> Events </h2>
        <div className={`${styles.events} flex jc-sb`}>
          {eventsToShow.map(item => {
            return <Event key={item.id} item={item}/>
          })}
        </div>
      </div>
    )
  }
  
  const renderLocationInfo = () => {
    return (
      <div>
        <h1>{location.name}</h1>
        <h3>{location.description}</h3>
        <h4>{location.startDate}</h4>
        <h4>{location.endDate}</h4>
        <h4>{location.price}</h4>
        <h4>{location.type}</h4>
        <h4>{location.currencyCode}</h4>
      </div>
    )
  }
  
  const renderCarousel = () => {
    return (
      <Carousel width={'50%'} className={styles.carousel}>
      {(location?.photos || []).map(photo => (
        <div key={photo}>
          <img src={photo} alt={`Selina ${location.name}`}/>
        </div>
      ))}
    </Carousel>
    )
  }

  const loadEvents = async () => {
    try{
      setLoadingEventsState(LOADING_STATTES.LOADING)
      const response = await fetch('https://events.selinatech.com/events/aggregated/'+id)
      const data = await response.json()
      setEvents(data)
      setEventsToShow(data)
      setLoadingEventsState(LOADING_STATTES.LOADED)
    } catch (err) {
      console.error('Error during fetching data:', err)
    }
  }
  
  return (
    <div className={styles.location}>
     {location && renderLocationInfo()}
     {location && renderCarousel()}
      {showLoadBtn && (
        <button className={`${styles['glow-on-hover']}`} onClick={() => {loadEvents()}} type="button">SHOW EVENTS</button>
      )}
      {loadingEvents && (
        <p>Loading...</p>
      )}
      {noEvents && (
        <p>No events :(</p>
      )}
      {eventsExists && renderEventsWithDatePicker()}
    </div>
  )
}