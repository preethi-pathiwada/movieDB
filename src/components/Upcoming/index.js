import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'

import MovieItem from '../MovieItem'

class Upcoming extends Component {
  state = {status: 'inProgress', data: []}

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const apiKey = '644df05906144665622bf73e6c284588'
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`,
    )
    const data = await response.json()

    const arr = data.results
    const updatedData = arr.map(obj => ({
      id: obj.id,
      title: obj.title,
      posterImg: obj.poster_path,
      rating: obj.vote_average.toFixed(1),
    }))

    this.setState({status: 'success', data: updatedData})
  }

  render() {
    const {status, data} = this.state

    if (status === 'inProgress') {
      return (
        <div className="loader-container">
          <Loader type="ThreeDots" color="orange" height="50" width="50" />
        </div>
      )
    }
    return (
      <div className="movies-container">
        <h1 className="heading">Upcoming Movies</h1>
        <div className="popular-movies-container">
          <ul className="list-container">
            {data.map(obj => (
              <MovieItem key={obj.id} details={obj} />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Upcoming
