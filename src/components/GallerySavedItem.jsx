import { useEffect, useState } from "react"

const GallerySavedItem = ({ artwork, deleteImage, getSavedImages }) => {
  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ tag, setTag ] = useState("")
  const [ isEditable, setIsEditable ] = useState(false)
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    setTitle(artwork.title)
    setDescription(artwork.description)
    setTag(artwork.tag)
  }, [])

  const patchImage = async (id) => {
    const response = await fetch(`http://18.195.136.196:8080/api/artwork/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ title, description, tag })
    })
    setIsEditable(false)
    getSavedImages()
  }
  
  return (
    <div className="saved-artwork fade-in" key={artwork.id}>
      <div className="saved-img-container">
        <img src={`data:image/png;base64,${artwork.content}`} alt="img" />
      </div>
      <div className="data-container">
        <div className="data">
          <div>
            <p>Title</p>
            <input value={title} disabled={!isEditable} onChange={(e) => setTitle(e.target.value)}/>
          </div>
          <div>
            <p>Description</p>
            <input value={description} disabled={!isEditable} onChange={(e) => setDescription(e.target.value)}/>
          </div>
          { isEditable 
            ? <div>
                <input value={tag || ""} disabled={!isEditable} placeholder="Add tags" onChange={(e) => setTag(e.target.value)}/>
              </div> 
            : tag && 
              <div id="tags">
                { tag.split(",").map(tag => <span key={Math.random()}>{tag}</span>)}
              </div> 
          }
        </div>
        <div className="buttons">
          <button onClick={() => deleteImage(artwork.id)}>Delete</button>
          { !isEditable && <button onClick={() => setIsEditable(prev => !prev)}>Edit</button> }
          { isEditable && <button onClick={() => patchImage(artwork.id)}>Save</button> }
        </div>
      </div>
    </div>
  )
}

export default GallerySavedItem