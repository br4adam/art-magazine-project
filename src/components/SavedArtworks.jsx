import UploadForm from "./UploadForm"
import GallerySaved from "./GallerySaved"
import { MdAdd, MdRemove } from "react-icons/md"
import { useEffect, useState } from "react"

const SavedArtworks = ({ setArtworkCount }) => {
  const [ isFormOpen, setIsFormOpen ] = useState(false)
  const [ savedArtworks, setSavedArtworks ] = useState([])
  const token = localStorage.getItem("accessToken")

  const getSavedImages = async () => {
    const response = await fetch("http://18.195.136.196:8080/api/artwork", {
      headers: {'Authorization': `Bearer ${token}`}})
    const data = await response.json()
    setSavedArtworks(data.reverse())
    setArtworkCount(data.length)
  }

  const deleteImage = async (id) => {
    if (confirm("Are you sure you want to delete this artwork?")) {
    const response = await fetch(`http://18.195.136.196:8080/api/artwork/${id}`, {
      method: "DELETE",
      headers: {'Authorization': `Bearer ${token}`}})
    getSavedImages()
    }
  }

  useEffect(() => {
    getSavedImages()
  }, [])

  return (
    <div id="saved-page">
      { isFormOpen ? <MdRemove className="add-button" onClick={() => setIsFormOpen(prev => !prev)}/>
      : <MdAdd className="add-button" onClick={() => setIsFormOpen(prev => !prev)}/> }
      <h2>Saved Artworks</h2>
      { isFormOpen && <UploadForm getSavedImages={getSavedImages}/> }
      <GallerySaved savedArtworks={savedArtworks} deleteImage={deleteImage} getSavedImages={getSavedImages} />
    </div>
  )
}

export default SavedArtworks