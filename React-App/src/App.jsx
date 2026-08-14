import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Navbar from './navbar'
import Course,{course1} from './Course'
import Footer from './footer'
import html from './assets/html.png'
import css from './assets/css.png'
import js  from './assets/js.png'

function App() {
  return (
    <>
    
    <Course  name="HTML" price="$199" image={html}/>
    <Course name="CSS" price="$199"  image={css} />
  <Course name= "JS"  price="$499" image={} />
    
    </>
  );
}

export default App;
