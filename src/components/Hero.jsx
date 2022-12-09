import heroimg from '../assets/hero.png'

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-left">
        <h1>Warhol Art <span className="gradient-text">Magazine</span></h1>
        <p><i>“Everything has its beauty, but not everyone sees it.”</i> - Andy Warhol <br/> Discover art you love from our online gallery. Search and save your favorite artworks.</p>
        <a href="#gallery">Browse artworks</a>
      </div>
      <div className="hero-img-container">
        <img src={heroimg}/>
      </div>
    </section>
  )
}

export default Hero