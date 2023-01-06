import {Link} from 'react-router-dom'
import {Component} from 'react'
import Slider from 'react-slick'
import Cookies from 'js-cookie'

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

class StoriesSlider extends Component {
  state = {
    profileList: [],
  }

  componentDidMount() {
    this.getStories()
  }

  getStories = async () => {
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
      })
    }
  }

  renderSlider = () => {
    const {profileList} = this.state
    return (
      <Slider {...settings}>
        {profileList.map(eachProfile => {
          const {userId, storyUrl, userName} = eachProfile
          return (
            <li className="slick-item" key={userId}>
              <img className="logo-img" src={storyUrl} alt="profile logo" />
              <Link to={`/users/${userId}`} className="link">
                <p className="username">{userName}</p>
              </Link>
            </li>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default StoriesSlider
