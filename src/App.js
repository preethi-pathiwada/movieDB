import './App.css'

import {Switch, Route} from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import TopRated from './components/TopRated'
import Upcoming from './components/Upcoming'
import MovieItemDetails from './components/MovieItemDetails'
import SearchedMovies from './components/SearchedMovies'

// write your code here
const App = () => (
  <>
    <Navbar />
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/top-rated' component={TopRated} />
      <Route exact path='/upcoming' component={Upcoming} />
      <Route exact path='/searched' component={SearchedMovies} />
      <Route exact path='/:id' component={MovieItemDetails} />
    </Switch>
  </>
)

export default App
