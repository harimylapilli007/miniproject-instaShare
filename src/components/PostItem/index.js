import {BsHeart} from 'react-icons/bs'
import {BiShareAlt} from 'react-icons/bi'
import {FaRegComment} from 'react-icons/fa'
import {FcLike} from 'react-icons/fc'

import {Link} from 'react-router-dom'
import SearchContext from '../../Context/SearchContext'

import './index.css'

const PostItem = props => (
  <SearchContext.Consumer>
    {value => {
      const {onChangeLikeIcon, onChangeUnLikeIcon} = value
      const {item} = props
      const {
        userId,
        postId,
        userName,
        profilePic,
        postDetails,
        likesCount,
        comments,
        createdAt,
        likeStatus,
      } = item

      const likeIcon = () => {
        onChangeLikeIcon(postId)
      }

      const unLikeIcon = () => {
        onChangeUnLikeIcon(postId)
      }

      return (
        <div className="post-item">
          <div className="pic-name">
            <div className="image-circle">
              <img
                src={profilePic}
                alt="post author profile"
                className="profile-pic"
              />
            </div>
            <Link to={`/users/${userId}`} className="link">
              <p className="username-profile">{userName}</p>
            </Link>
          </div>
          <img
            src={postDetails.imageUrl}
            alt="post"
            className="post-image-main"
          />
          <div className="components-container">
            <div className="button-container">
              {likeStatus ? (
                <button
                  className="button-reacts"
                  type="button"
                  onClick={unLikeIcon}
                  testid="unLikeIcon"
                >
                  <FcLike className="react-image" />
                </button>
              ) : (
                <button
                  className="button-reacts"
                  type="button"
                  onClick={likeIcon}
                  testid="likeIcon"
                >
                  <BsHeart className="react-image" />
                </button>
              )}
              <button className="button-reacts" type="button">
                <FaRegComment className="react-image" />
              </button>
              <button className="button-reacts" type="button">
                <BiShareAlt className="react-image" />
              </button>
            </div>
            <p className="likes">{likesCount} likes</p>
            <p className="caption">{postDetails.caption}</p>
            <ul className="comment-container">
              {comments.map(each => (
                <li className="comment" key={each.userId}>
                  <p className="com-nt">
                    <span className="comment-name"> {each.userName}</span>
                    {each.comment}
                  </p>
                </li>
              ))}
            </ul>
            <p className="time">{createdAt}</p>
          </div>
        </div>
      )
    }}
  </SearchContext.Consumer>
)

export default PostItem
