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

function App() {

  const [countries, setCountries] = useState({})
  const [locations, setLocations] = useState([])
  useEffect(()=>{
    const loadLocations = () => {
      let countriesWithLocations = {}
        fetch('https://locations.selinatech.com/locations')
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

  console.log('==App',countries)
  return (
    <div className="App">
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
      </Router>
    <Footer/>
    </div>
  );
}

export default App;
