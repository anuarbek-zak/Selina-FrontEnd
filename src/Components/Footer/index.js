import { useEffect, useState } from 'react';
import styles from './index.module.scss';
import {
  Link
} from "react-router-dom";

export default function Footer({locations}){
  const [randomLocations, setRandomLocations] = useState([])
  useEffect(()=>{
    const shuffled = locations.sort(() => 0.5 - Math.random());
    setRandomLocations(shuffled.slice(0, 3))
  },[locations])
  return (
   <footer >
    <div className={`${styles['footer-big']} flex jc-c`}>
      {randomLocations.map( loc => {
        return (
        <div className={styles['column']}>
          <h4>
            <Link to={`/location/${loc.id}`}>{loc.name}</Link>
          </h4>
          <ul>
            <li>About</li>
            <li>Culture and traditions</li>
            <li>Tourism</li>
            <li>Leader of the Nation</li>
          </ul>
        </div>
        )
      })}
    </div>
    <div className={styles['footer-small']}>&copy; All rights reserved.</div>
   </footer>
  )
}