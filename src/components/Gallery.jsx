import GalleryItem from "./GalleryItem"
import Loader from "./Loader"

const Gallery = ({ artworks, loadMoreGalleryPage, isLoading }) => {
  return (
    <section className="gallery">
      <div className="gallery-container">
        { artworks && artworks.map(artwork =>
          <GalleryItem key={artwork.id} artwork={artwork} />
        )}
      </div>
      { isLoading 
        ? <Loader /> 
        : <button onClick={loadMoreGalleryPage}>Load more artworks</button>
      }
    </section>
  )
}

export default Gallery