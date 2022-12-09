import { useState } from "react"

const UploadForm = ({ getSavedImages }) => {
  const [ title, setTitle ] = useState("")
  const [ description, setDescription ] = useState("")
  const [ file, setFile ] = useState(null)
  const token = localStorage.getItem("accessToken")

  const uploadArtwork = async () => {
    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("tag", "")
    formData.append("file", file)
    const response = await fetch ("http://18.195.136.196:8080/api/artwork", {
      method: "POST",
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    })
    console.log(response.status)
    getSavedImages()
    setTitle("")
    setDescription("")
  }

  return (
    <section className="upload-form fade-in">
      <input type="text" placeholder="title" value={title} onChange={(e) => {setTitle(e.target.value)}} />
      <input type="text" placeholder="description" value={description} onChange={(e) => {setDescription(e.target.value)}} />
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={uploadArtwork}>Upload</button>
    </section>
  )
}

export default UploadForm