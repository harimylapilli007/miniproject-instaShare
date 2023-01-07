import {Link} from 'react-router-dom'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 7,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

const apiStoriesStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class StoriesSlider extends Component {
  state = {
    profileList: [],
    apiStatusStories: apiStoriesStatus.initial,
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
    this.setState({apiStatusStories: apiStoriesStatus.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedDate = fetchedData.users_stories.map(eachProfile => ({
        userId: eachProfile.user_id,
        userName: eachProfile.user_name,
        storyUrl: eachProfile.story_url,
      }))
      this.setState({
        profileList: updatedDate,
        apiStatusStories: apiStoriesStatus.success,
      })
    } else {
      this.setState({apiStatusStories: apiStoriesStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
    </div>
  )

  onRetry = () => {
    this.setState(
      {apiStatusStories: apiStoriesStatus.inProgress},
      this.getStoriesDetails(),
    )
  }

  renderStoriesFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dq7imhrvo/image/upload/v1643651534/insta%20Shere%20clone/alert-triangle_hczx0o.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-head">Something went wrong. Please try again</p>
      <button className="failure-button" type="button" onClick={this.onRetry}>
        Try again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {profileList} = this.state
    return (
      <div className="main-container">
        <div className="slick-container">
          <Slider {...settings}>
            {profileList.map(eachProfile => {
              const {userId, storyUrl, userName} = eachProfile
              return (
                <li className="slick-item" key={userId}>
                  <img className="logo-img" src={storyUrl} alt="user story" />
                  <Link to={`/users/${userId}`} className="link">
                    <p className="username">{userName}</p>
                  </Link>
                </li>
              )
            })}
          </Slider>
        </div>
      </div>
    )
  }

  renderStoriesView = () => {
    const {apiStatusStories} = this.state

    switch (apiStatusStories) {
      case apiStoriesStatus.success:
        return this.renderSuccessView()
      case apiStoriesStatus.inProgress:
        return this.renderLoadingView()
      case apiStoriesStatus.failure:
        return this.renderStoriesFailureView()
      default:
        return null
    }
  }

  render() {
    return this.renderStoriesView()
  }
}

export default StoriesSlider
