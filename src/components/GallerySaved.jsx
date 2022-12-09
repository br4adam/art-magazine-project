import GallerySavedItem from "./GallerySavedItem"
import { useState } from "react"

const GallerySaved = ({ savedArtworks, deleteImage, getSavedImages }) => {
  const [ searchTags, setSearchTags ] = useState("")
  let filteredArtworks = []

  searchTags === "" 
    ? filteredArtworks = savedArtworks 
    : filteredArtworks = savedArtworks.filter(artwork => {if (artwork.tag !== null ) return artwork.tag.includes(searchTags)})

  return (
    <section className="saved">
      <input type="text" placeholder="Search by tags" value={searchTags} onChange={e => setSearchTags(e.target.value)} />
      <div className="saved-container">
      { savedArtworks && filteredArtworks.map((artwork) => 
        <GallerySavedItem key={artwork.id} artwork={artwork} deleteImage={deleteImage} getSavedImages={getSavedImages}/>) }
      </div>
    </section>
  )
}

export default GallerySaved