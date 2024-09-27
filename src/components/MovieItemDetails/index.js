import './index.css'

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'

class MovieItemDetails extends Component {
  constructor(props) {
    super(props)
    this.state = {status: 'inProgress', movieDataObj: {}, castArr: []}
  }

  componentDidMount() {
    this.getResults()
  }

  getResults = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiKey = '644df05906144665622bf73e6c284588'
    const url1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`
    const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en`

    const [response1, response2] = await Promise.all([fetch(url1), fetch(url2)])

    const data1 = await response1.json()
    const data2 = await response2.json()

    const updatedData1 = {
      id: data1.id,
      title: data1.title,
      posterImg: `http://image.tmdb.org/t/p/original/${data1.poster_path}`,
      rating: data1.vote_average.toFixed(1),
      overview: data1.overview,
      genres: data1.genres,
      duration: data1.runtime,
      releaseDate: data1.release_date,
    }

    const updatedData2 = data2.cast.map(obj => ({
      castId: obj.cast_id,
      name: obj.name,
      profileImg:
        obj.profile_path !== null
          ? `http://image.tmdb.org/t/p/original/${obj.profile_path}`
          : 'https://res.cloudinary.com/dh4tso4fh/image/upload/v1727429762/blank-profile-picture-973460_960_720_iwatne.webp',
      character: obj.character,
    }))

    this.setState({
      status: 'success',
      movieDataObj: updatedData1,
      castArr: updatedData2,
    })
  }

  render() {
    const {status, movieDataObj, castArr} = this.state
    const {posterImg, title, rating, overview, duration, releaseDate, genres} =
      movieDataObj
    console.log(genres)
    const time =
      Math.floor(duration / 60).toString() +
      'hr ' +
      (duration % 60).toString() +
      'min'

    // const genreStr = genres.join(', ')

    if (status === 'inProgress') {
      return (
        <div className="loader-container">
          <Loader type="ThreeDots" color="orange" height="50" width="50" />
        </div>
      )
    }
    return (
      <div className="movie-details-con">
        <div className="about-movie-con">
          <img src={posterImg} className="movie-poster" alt="movie-poster" />
          <div>
            <h1 className="title">{title}</h1>
            <div className="rating-con">
              <FaStar className="star" />
              <span className="rating">{rating}</span>
            </div>

            <h1 className="duration">
              Duration: <span className="time">{time}</span>
            </h1>
            <div className="genre-con">
              <h1 className="duration">Genres:</h1>
              <ul className="list-con">
                {genres.map(obj => (
                  <li key={obj.id} className="genre-li">
                    {obj.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div>
          <h1 className="about-heading">Overview</h1>
          <p className="about-para">{overview}</p>
        </div>
        <h1 className="about-heading">Cast</h1>
        <ul className="cast-list-container">
          {castArr.map(obj => (
            <li className="cast-item" key={obj.castId}>
              <img
                src={obj.profileImg}
                className="profile-img"
                alt="profile-pic"
              />
              <div className="cast-details">
                <p className="name">{obj.name}</p>
                <p className="character">{obj.character}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  }
}

export default MovieItemDetails
