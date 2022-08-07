import { useState } from 'react';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import User from './components/User/User';

function App() {
  const[x,setx]=useState(0);
  return (
    <div>
      <Header setx={setx} x={x}/>
     <User x={x}/>
     <Footer/>
    </div>
  );
}

export default App;
