import styles from './index.module.scss';
import {  Link } from "react-router-dom";

export default function Header({countries}){

  const renderCountries = (countries) => {
    return Object.keys(countries).map(countryName => {
      return (
      <li key={countryName}>
        <h3>{countryName}</h3>
        <ul>
          {renderLocations(countries[countryName])}
        </ul>
      </li>)
    })
  }

  const renderLocations = (locations) => {
    return locations.map(location => {
      return (
        <li  key={location.id}>
          <Link to={`/location/${location.id}`}>{location.name}</Link>
        </li>
      )
    })
  }

  return (
    <header className={`${styles.header} flex jc-sb ai-c`}>
      <Link to="/">
        <img src={'https://www.selina.com/static/media/selina_logo_black.b62a0982.svg'} className={styles.logo} alt="Selina" />
      </Link>
      <div className={styles.locationsDropdown}>
        Locations
        <ul className={styles.countriesList}>
          {renderCountries(countries)}
        </ul>
      </div>
  </header>
  )
}