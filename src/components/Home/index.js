import Header from '../Header'
import StoriesSlider from '../StoriesSlider'
import PostList from '../PostList'
import SearchResults from '../SearchResults'
import SearchContext from '../../Context/SearchContext'
import './index.css'

const Home = () => (
  <SearchContext.Consumer>
    {value => {
      const {searchInput, searchPostView} = value
      return (
        <>
          <Header />
          <div className="bg-color">
            {searchPostView ? (
              <SearchResults input={searchInput} />
            ) : (
              <>
                <StoriesSlider />
                <PostList />
              </>
            )}
          </div>
        </>
      )
    }}
  </SearchContext.Consumer>
)

export default Home
