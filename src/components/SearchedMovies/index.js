import './index.css'

import {useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'
import {useLocation} from 'react-router-dom'

import MovieItem from '../MovieItem'

const SearchedMovies = () => {
  const [status, setStatus] = useState({apiStatus: 'inProgress', data: []})

  const location = useLocation()
  const {userInput} = location.state
  console.log(userInput)

  useEffect(() => {
    const getResults = async () => {
      const apiKey = '644df05906144665622bf73e6c284588'
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${userInput}&page=1`,
      )
      const result = await response.json()
      const arr = result.results
      const updatedData = arr.map(obj => ({
        id: obj.id,
        title: obj.title,
        posterImg: obj.poster_path,
        rating: obj.vote_average.toFixed(1),
      }))

      setStatus({apiStatus: 'success', data: updatedData})
    }
    getResults()
  }, [])

  const moviesList = status.data

  if (status === 'inProgress') {
    return (
      <div className="loader-container">
        <Loader type="ThreeDots" color="orange" height="50" width="50" />
      </div>
    )
  }
  return (
    <div className="movies-container">
      <h1 className="heading">Searched Movies</h1>
      <div className="popular-movies-container">
        <ul className="list-container">
          {moviesList.map(obj => (
            <MovieItem key={obj.id} details={obj} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default SearchedMovies
