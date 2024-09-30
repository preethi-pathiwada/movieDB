import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {IoSearchOutline} from 'react-icons/io5'

class Navbar extends Component {
  constructor(props) {
    super(props)
    this.state = {input: ''}
  }

  onChangeSearchInput = event => {
    this.setState({input: event.target.value})
  }

  onClickSearch = () => {
    const {input} = this.state
    const {history} = this.props
    this.setState({input: ''})
    history.replace('/searched', {userInput: input})
  }

  render() {
    const {input} = this.state

    return (
      <div className="navbar-bg">
        <h1 className="nav-heading">MovieDB</h1>
        <div className="con">
          <div className="search-container">
            <input
              type="search"
              className="input"
              onChange={this.onChangeSearchInput}
              value={input}
            />
           
          </div>
           <button
              type="button"
              className="search-btn"
              onClick={this.onClickSearch}
            >
              Search
            </button>
          <div className="buttons-container">
            <Link to="/" className="link">
              <button type="button" className="btn">
                Popular Movies
              </button>
            </Link>
            <Link to="/top-rated" className="link">
              <button type="button" className="btn">
                Top Rated Movies
              </button>
            </Link>
            <Link to="/upcoming" className="link">
              <button type="button" className="btn">
                Upcoming Movies
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Navbar)
