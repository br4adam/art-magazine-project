import { BounceLoader } from 'react-spinners'

const HomeLoader = () => {
  return (
    <div id="home-loader">
      <BounceLoader 
        color={"#6e2aff"}
        size={60}
      />
    </div>
  )
}

export default HomeLoader