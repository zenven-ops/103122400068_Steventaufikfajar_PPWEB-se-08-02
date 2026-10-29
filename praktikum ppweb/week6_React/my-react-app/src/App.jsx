import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import CardMahasiawa from './components/CardMahasisawa'
import Counter from './components/Counter'
import DaftarMahasiswa from "./components/DaftarMahasiswa"


function App() {
  return(
    <>
    <CardMahasiawa nama="Steven" nim="103122400068" />
    <CardMahasiawa nama="Taufik" nim="103122400067" />
    <CardMahasiawa nama="Fajar" nim="103122400066" />
    <br />
    <Counter/>
    <DaftarMahasiswa/>
    </>
    
  );
}

export default App;
