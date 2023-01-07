import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class LoginPage extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    return (
      <div className="login-container">
        <img
          src="https://res.cloudinary.com/du6o8nypd/image/upload/v1672755744/OBJECTS_1_blys6a.jpg"
          alt="website login"
          className="login-logo"
        />
        <form className="card-container" onSubmit={this.submitForm}>
          <div className="card-section">
            <img
              src="https://res.cloudinary.com/du6o8nypd/image/upload/v1672759447/Group_cudvom.png"
              alt="website logo"
              className="instagram-logo"
            />
            <h1 className="heading">Insta Share</h1>

            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="input"
              value={username}
              onChange={this.onChangeUsername}
            />

            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />

            <button type="submit" className="button">
              Login
            </button>

            {showSubmitError && <p className="error-message">{errorMsg}</p>}
          </div>
        </form>
      </div>
    )
  }
}

export default LoginPage
