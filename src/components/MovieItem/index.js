import './index.css'

import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'

const MovieItem = ({details}) => {
  const {id, title, posterImg, rating} = details
  const baseUrl = 'http://image.tmdb.org/t/p/'
  const posterSize = 'original'
  const imgUrl = `${baseUrl}${posterSize}${posterImg}`

  return (
    <li className="movie-item">
      <img src={imgUrl} className="poster" alt="poster" />
      <div className="details-container">
        <h1 className="title">{title}</h1>
        <div className="rating-con">
          <FaStar className="star" />
          <span className="rating">{rating}</span>
        </div>
        <Link to={`/${id}`} className="link">
          <button type="button" className="view-btn">
            View Details
          </button>
        </Link>
      </div>
    </li>
  )
}

export default MovieItem
