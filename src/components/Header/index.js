import {Link, withRouter} from 'react-router-dom'
import './index.css'

import {FaSearch} from 'react-icons/fa'
import {GoThreeBars} from 'react-icons/go'
import {AiFillCloseCircle} from 'react-icons/ai'
import Cookies from 'js-cookie'
import SearchContext from '../../Context/SearchContext'

const Header = props => (
  <SearchContext.Consumer>
    {value => {
      const {
        searchInput,
        onChangeSearchInput,
        setSearchInput,
        click,
        onMoreOptionsState,
        searchBox,
        searchValue,
        closeHeaderButtonIn,
      } = value

      const ChangeSearchInput = event => {
        onChangeSearchInput(event.target.value)
      }
      const searchContainerView = () => {
        searchBox()
      }

      const onsetSearchInput = () => {
        setSearchInput()
      }

      const searchBoxContainer = () => (
        <div className="input-container">
          <input
            className="search-input"
            type="search"
            placeholder="Search Caption"
            onChange={ChangeSearchInput}
            value={searchInput}
          />
          <button className="button-s" type="button" onClick={onsetSearchInput}>
            <FaSearch className="search-icon" />
          </button>
        </div>
      )

      const closeHeaderButton = () => {
        closeHeaderButtonIn()
      }

      const onLogout = () => {
        const {history} = props
        Cookies.remove('jwt_token')
        history.replace('/login')
      }

      const onMoreOptions = () => {
        onMoreOptionsState()
      }

      const onMoreOption = () => (
        <div className="options-container">
          <ul className="header-links">
            <li className="link-tag">
              <Link to="/" className="link">
                Home
              </Link>
            </li>
            <button
              className="search-option"
              type="button"
              onClick={searchContainerView}
            >
              Search
            </button>
            <li className="link-tag">
              <Link to="/my-profile" className="link">
                Profile
              </Link>
            </li>
            <button className="logout-button" type="button" onClick={onLogout}>
              Logout
            </button>
          </ul>

          <button
            className="close-button"
            type="button"
            onClick={closeHeaderButton}
          >
            <AiFillCloseCircle className="close-button" />
          </button>
        </div>
      )

      return (
        <div className="shadow">
          <nav className="nav-header1">
            <div className="nav-section">
              <div className="icon-title">
                <Link to="/" className="link">
                  <img
                    src="https://res.cloudinary.com/du6o8nypd/image/upload/v1672759447/Group_cudvom.png"
                    alt="website logo"
                    className="instagram-logo-header"
                  />
                </Link>
                <h1 className="heading-header">Insta Share</h1>
              </div>

              <div className="home-prof">
                <div className="search-input-icon">
                  <input
                    className="search-input-desk"
                    type="search"
                    placeholder="Search Caption"
                    onChange={ChangeSearchInput}
                    value={searchInput}
                  />
                  <button
                    onClick={onsetSearchInput}
                    type="button"
                    className="icon-bg"
                  >
                    <FaSearch className="search-icon-desk" />
                  </button>
                </div>
                <ul className="home-prof">
                  <Link to="/" className="nav-link">
                    <li className="li1">Home</li>
                  </Link>
                  <Link to="/my-profile" className="nav-link">
                    <li className="li1">Profile</li>
                  </Link>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onLogout}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="medium-view">
              <button
                className="med-button"
                type="button"
                onClick={onMoreOptions}
              >
                <GoThreeBars className="more-img" />
              </button>
            </div>
          </nav>
          {click && onMoreOption()}
          {searchValue && searchBoxContainer()}
        </div>
      )
    }}
  </SearchContext.Consumer>
)
export default withRouter(Header)
