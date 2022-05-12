import {useState, useEffect} from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import Location from './Pages/Location'
import Home from './Pages/Home'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import styles from './App.module.scss'
import MetaTags from 'react-meta-tags';

function App() {

  const [countries, setCountries] = useState({})
  const [locations, setLocations] = useState([])
  useEffect(()=>{
    const loadLocations = () => {
      let countriesWithLocations = {}
        fetch('https://gw.selinatech.com/locations/api/locations')
          .then(res => res.json())
          .then(data => {
            setLocations(data);
            data.forEach((loc) => {
              const countryName = loc.location.value
              if(!countriesWithLocations[countryName]){
                countriesWithLocations[countryName] = []
              }
              countriesWithLocations[countryName].push(loc)
            })
            setCountries(countriesWithLocations)
          })
          .catch(err => {
            console.err('Error during fetching data:', err)
          })
    }
    loadLocations()
  },[])

  return (
    <div className="App">
      <MetaTags>
        <title>Selina</title>
        <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no"/>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
      </MetaTags>
      <Router>
        <Header countries={countries}/>
        <main className={styles.main}>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/location/:id">
              <Location locations={locations}/>
            </Route>
          </Switch>
        </main>
        <Footer locations={locations}/>
      </Router>
    </div>
  );
}

export default App;
