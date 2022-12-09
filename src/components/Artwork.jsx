import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from "react-router-dom"
import { MdArrowBackIos } from "react-icons/md"
import { FaRegStar } from "react-icons/fa"
import { IconContext } from "react-icons"
import Loader from './Loader'
import notfound from '../assets/notfound.png'

const Artwork = ({ setIsLoading, isLoading }) => {
  const [ artwork, setArtwork ] = useState({})
  const token = localStorage.getItem("accessToken")
  const { id } = useParams()
  const navigate = useNavigate()
  useEffect(() => {
    window.scrollTo(0, 0)
    setIsLoading(true)
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks/${id}`)
        const data = await response.json()
        setArtwork(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

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
    formData.append("title", `${artwork.title.slice(0,30)}... (${artwork.id})`)
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
    <div id="artwork">
      { isLoading 
        ? <Loader /> 
        : <>
            <MdArrowBackIos className="back-button" onClick={()=> navigate(-1)}/>
            <IconContext.Provider value={{ className: "fa-star" }}>
              <FaRegStar onClick={() => sendArtwork()} />
            </IconContext.Provider> 
            <h2>{artwork.title}</h2>
            <div className="fade-in">
            { artwork.image_id 
              ? <img src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`} /> 
              : <img src={notfound} /> }
              <div className="artwork-data">
                <div>
                  <p>Artist</p>
                  <p>{artwork.artist_title || "No data"}</p>
                </div>
                <div>
                  <p>Artwork Type</p>
                  <p>{artwork.artwork_type_title || "No data"}</p>
                </div>
                <div>
                  <p>Material</p>
                  <p>{artwork.medium_display || "No data"}</p>
                </div>
                <div>
                  <p>Dimensions</p>
                  <p>{artwork.dimensions || "No data"}</p>
                </div>
                <div>
                  <p>Provenance</p>
                  <p>{artwork.provenance_text || "No data"}</p>
                </div>
                <div>
                  <p>Exhibition History</p>
                  <p>{artwork.exhibition_history || "No data"}</p>
                </div> 
              </div>
            </div>
          </> }
    </div>
  )
}

export default Artwork