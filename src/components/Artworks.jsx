import Gallery from "./Gallery"
import { useNavigate } from "react-router-dom"
import { MdArrowBackIos } from "react-icons/md"

const Artworks = ({ artworks, loadMoreGalleryPage, isLoading }) => {
  const navigate = useNavigate()

  return (
    <div id="artworks-page">
    <MdArrowBackIos className="back-button" onClick={()=> navigate(-1)}/>
    <h2>Artworks</h2>
    <Gallery artworks={artworks} loadMoreGalleryPage={loadMoreGalleryPage} isLoading={isLoading} />
    </div>
  )
}

export default Artworks