import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileCard = props => {
  const {data, my} = props

  const {profile} = data
  const {
    userId,
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    stories,
    posts,
    postsCount,
  } = profile

  const postsView = () => (
    <ul className="user-posts-container">
      {posts.map(each => (
        <li className="post-image-container" key={each.userId}>
          <img src={each.image} alt={`${my} post`} className="post-image" />
        </li>
      ))}
    </ul>
  )

  const noPostView = () => (
    <li className="no-post-container">
      <BiCamera className="no-post-image" />
      <h1 className="no-post-head">No Posts Yet</h1>
    </li>
  )

  const correctView = () => {
    if (posts.length === 0) {
      return noPostView()
    }
    return postsView()
  }

  return (
    <>
      <div className="feed-container">
        <li className="Profile-card">
          <div className="image-user-details">
            <img
              src={profilePic}
              alt={`${my} profile`}
              className="Profile-pic"
            />
            <div className="user-detail-container">
              <h1 className="profile-head">{userName}</h1>
              <div className="count">
                <li className="count-follower">
                  <span className="highlight">{postsCount}</span>Posts
                </li>
                <li className="count-follower">
                  <span className="highlight">{followersCount} </span> Followers
                </li>
                <li className="count-follower">
                  <span className="highlight">{followingCount} </span> Following
                </li>
              </div>
              <div className="bio-container">
                <p className="bio-name">{userId}</p>
                <p className="bio">{userBio}</p>
              </div>
            </div>
          </div>
          <ul className="user-stories">
            {stories.map(each => (
              <li className="story-container" key={each.userId}>
                <img
                  src={each.image}
                  alt={`${my} story`}
                  className="story-image"
                />
              </li>
            ))}
          </ul>
          <hr className="line" />
          <div className="posts-container-user">
            <div className="head-container">
              <BsGrid3X3 className="post-logo" />
              <h1 className="post-head">Posts</h1>
            </div>
            <div className="posts-view">{correctView()}</div>
          </div>
        </li>
      </div>
    </>
  )
}

export default ProfileCard
