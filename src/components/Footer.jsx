import { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md"
import footera from '../assets/footer1.png'
import footerb from '../assets/footer2.png'
import footerc from '../assets/footer3.png'
import footerd from '../assets/footer4.png'

const Footer = () => {
  const [ isOpen, setIsOpen ] = useState(false)

  return (
    <footer>
    { isOpen 
      ? <MdKeyboardArrowUp onClick={() => setIsOpen(false)}/> 
      : <MdKeyboardArrowDown onClick={() => setIsOpen(true)}/>
    }
    { isOpen && <div className="fade-in">
        <div>
          <h3>Backend</h3>
          <img src={footera}/>
          <p>Bálint Péter Soma</p>
          <p>Jung Árpád</p>
          <p>Ujvári Zoli</p>
          <p>Urbán Soma</p>
          <p>Zsombok Zsolt</p>
        </div>
        <div>
          <h3>Frontend</h3>
          <img src={footerb}/>
          <p>Ácsné Sulyok Ildikó</p>
          <p>Kovács Ági</p>
          <p>Forrai Dániel</p>
          <p>Hajzer Ádám</p>
        </div>
        <div>
          <h3>Sysadmin</h3>
          <img src={footerc}/>
          <p>Papszász Irma</p>
          <p>Hegedűs Péter</p>
          <p>Király Lajos</p>
          <p>Weibl Richárd</p>
        </div>
        <div>
          <h3>Testers</h3>
          <img src={footerd}/>
          <p>Tóth Renáta Anita</p>
          <p>Sinkáné Zvara Rita</p>
          <p>Varsás-Guti Anita</p>
          <p>Miklós Marcell</p>
          <p>Zilaji Gábor</p>
        </div>
      </div>
    }
    </footer>
  )
}

export default Footer