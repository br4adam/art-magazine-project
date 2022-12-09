import { Link } from 'react-router-dom'
import notfound from '../assets/notfound.png'
import { FaRegStar } from "react-icons/fa"
import { IconContext } from "react-icons"

const GalleryItem = ({ artwork }) => {
  const token = localStorage.getItem("accessToken")

  const processStatus = (response) => {
    if (response.status === 200 || response.status === 0) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(new Error('Error loading: ' + url))
    }
  }
  
  const parseBlob = (response) => {
    return response.blob()
  }
  
  const downloadFile = (url) => {
    return fetch(url)
      .then(processStatus)
      .then(parseBlob)
  }
  
  const uploadImage = (blob) => {
    const formData = new FormData()
    formData.append("title", `${artwork.title.slice(0,30)} (${artwork.id})`)
    formData.append("description", `${artwork.medium_display}.` || "No data")
    formData.append("tag", "")
    formData.append('file', blob)
    return fetch("http://18.195.136.196:8080/api/artwork", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
      .then(processStatus)
  }
  
  let url = `https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`
  
  const sendArtwork = () => {
    downloadFile(url)
      .then(uploadImage)
      .catch(function (error) {
        console.error(error.message ? error.message : error)
      })
  }

  return (
    <div className="card fade-in">
      <div className="img-container">
        <IconContext.Provider value={{ className: "fa-star" }}>
          <FaRegStar onClick={() => sendArtwork()}/>
        </IconContext.Provider>  
        <Link to={`../artworks/${artwork.id}`}>
        {artwork.image_id ? <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} /> : <img src={notfound} /> }
        </Link>
      </div>
        <p>{artwork.title.length > 30 ? `${artwork.title.slice(0,30)}...` : artwork.title}</p>
    </div>
  )
}

export default GalleryItem