import { PuffLoader } from 'react-spinners'

const Loader = () => {
  return (
    <div className="spinner">
      <PuffLoader 
        color={"#6e2aff"}
        size={40}
      />
    </div>
  )
}

export default Loader