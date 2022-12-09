import Gallery from'./Gallery'
import Loader from './Loader'
import { useNavigate } from "react-router-dom"
import { MdArrowBackIos } from "react-icons/md"

const Search = ({ searchResult, isLoading }) => {
  const navigate = useNavigate()

  return (
    <div id="search-page">
      { isLoading 
        ? <Loader /> 
        : <>
            <MdArrowBackIos className="back-button" onClick={()=> navigate(-1)}/>
            <h2>Search results</h2>
            { searchResult && searchResult.length 
              ? <Gallery artworks={searchResult} />
              : <p className="no-result">Sorry, we couldn't find any results.</p>
            }
          </>
      }
    </div>
  )
}

export default Search