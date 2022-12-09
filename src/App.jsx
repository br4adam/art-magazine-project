import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import HomeLoader from './components/HomeLoader'
import Search from './components/Search'
import Artwork from './components/Artwork'
import Artworks from './components/Artworks'
import SavedArtworks from './components/SavedArtworks'

const App = () => {
  const [ artworks, setArtworks ] = useState(null)
  const [ page, setPage ] = useState(1)
  const [ searchValue, setSearchValue ] = useState("")
  const [ searchResult, setSearchResult ]= useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ loaded, setLoaded ] = useState(false)
  const [ isLoggedIn, setIsLoggedIn ] = useState(false)
  const [ artworkCount, setArtworkCount ] = useState(0)

  useEffect(() => {
    let timer = setTimeout(() => setLoaded(true), 2000)
    return () => {clearTimeout(timer)}
  }, [])

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      try { 
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=16`)
        const data = await response.json()
        setArtworks(data.data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (token) setIsLoggedIn(true)
  }, [])

  const loadMoreGalleryPage = () => {
    setPage(prev => prev + 1)
    setIsLoading(true)
    const fetchMoreData = async () => {
      try {
        const response = await fetch(`https://api.artic.edu/api/v1/artworks?page=${page}&limit=16`)
        const data = await response.json()
        setArtworks([...artworks, ...data.data])
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchMoreData()
  }
  
  return (
    <div className="container">
      { !loaded ? <HomeLoader /> : (
      <Navbar searchValue={searchValue} setSearchValue={setSearchValue} setSearchResult={setSearchResult} setIsLoading={setIsLoading} isLoading={isLoading} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} artworkCount={artworkCount} />)}
      <Routes>
        <Route path="*" element={<Home artworks={artworks} loadMoreGalleryPage={loadMoreGalleryPage} isLoading={isLoading} />} />
        <Route path="/search" element={<Search searchValue={searchValue} searchResult={searchResult} isLoading={isLoading} />} />
        <Route path="/artworks" element={<Artworks artworks={artworks} loadMoreGalleryPage={loadMoreGalleryPage} isLoading={isLoading} />} />
        <Route path="/artworks/:id" element={<Artwork setIsLoading={setIsLoading} isLoading={isLoading} />} />
        <Route path="/saved" element={<SavedArtworks setArtworkCount={setArtworkCount} />} />
      </Routes>
    </div>
  )
}

export default App