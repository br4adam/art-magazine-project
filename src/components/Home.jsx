import Hero from "./Hero"
import Gallery from "./Gallery"
import Footer from './Footer'

const Home = ({ artworks, loadMoreGalleryPage, isLoading }) => {
  return (
    <>
      <Hero />
      <h2 id="gallery">Gallery</h2>
      <Gallery 
        artworks={artworks} 
        loadMoreGalleryPage={loadMoreGalleryPage}
        isLoading={isLoading}
      />
      <Footer />
    </>
  )
}

export default Home