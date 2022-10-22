


import { Chart } from './components/Chart';
import { useState } from 'react';
import axios from 'axios';


function App() {

  const [text,setText] = useState('')
  const [output,setOutput] = useState('')
  const handleChange = (e) => {
    setText(e.target.value);
  }

  const handleClick = () => {
    axios.post('http://localhost:8000/',{text:text})
    .then(res => {
      setOutput(res.data);
    })
  }

    return (
      <div className= 'flex flex-col items-center min-h-screen h-1/2 py-2 gap-10'>
          <p className='text-6xl font-bold py-10'>
            Welcome to <span className='text-blue-600'>Grammarly!</span>
          </p>
          <textarea className='w-1/2 h-full border-2 border-blue-600 rounded-lg p-5' placeholder='Enter your text here...' onChange={handleChange}></textarea>
          <button className='bg-blue-600 text-white rounded-lg px-5 py-2' onClick={handleClick}>Paraphrase</button>
          <p className='text-md py-10 text-left px-5'>{output}</p>
       
      <div className="flex flex-row justify-center min-h-screen md-10 gap-10">
     
     </div>
     </div>

    )
  }
  
  export default App;
  
