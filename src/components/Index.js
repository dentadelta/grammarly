
import axios from 'axios';
import { useEffect, useState } from 'react';

export const Index = () => {
  const [data, setData] = useState({});
  const [arrayData, setArrayData] = useState([]);
  const [dictData, setDictData] = useState({});
  const [urls, setUrls] = useState({});
  const [input, setInput] = useState('1+2');
  const [output, setOutput] = useState('');

  //run: uvicorn main:app --reload
  useEffect(() => {axios.get('http://localhost:8000/Appjs').then((res) => {
    setData(res.data.data);
    setArrayData(res.data.dataarray.page_bullet_point);
    setDictData(res.data.datadict.page_dict);
    setUrls(res.data.datadict.url);
  });}, []);

  const handleButton = () => {
    axios.post('http://localhost:8000/Appjs/Button', {input1: input}).then((res) => {
      setOutput(res.data);
  })};
 

  
  const handleTextField = (e) => {
    setInput(e.target.value);
  };

    return (
      <div className=" sm:bg-green-500 md:bg-red-500 lg:bg-yellow-500 xl:bg-pink-500">
      <div className='bg-gray-100'>
        <div className='px-8 py-12 flex flex-row gap-5'>
        <img src={urls.logoUrl} alt='logo' className='h-10 shadow' />
        <h1 className='text-3xl font-bold text-gray-800'>{data.header}</h1>
        </div>
      </div>
      <div className='px-8 py-12 max-w-md mx-auto sm:max-w-xl lg:max-w-xl'>
      <div className='px-8 py-12'>
        <p className='text-2xl text-gray-800'>{data.page_description}</p>
      </div>

      <div className='px-8 py-12'>
          <p className='text-1xl text-gray-800 underline'>{data.page_detail1}</p>
          <ul>
            {arrayData.map((item) => (
                <li className='mt-4 text-gray-600'>{item}</li>
            ))}
          </ul>
      </div>

      <div className='px-8'>
          <p className='text-1xl text-gray-800 underline'>{data.page_detail2}</p>
        <ul>
          {Object.keys(dictData).map((key) => (
            <li className='mt-4 text-gray-600'>{key}: {dictData[key]}</li>
          ))}
        </ul>
        </div>

        <p className='p-8 text-1xl underline'>Specify input because I cant write Javascript code</p>
        <div className=' px-8 flex flex-row gap-5'>
          <textarea onChange={handleTextField}>{input}</textarea>
          <button onClick={handleButton} className='inline-block px-3 py-2 rounded-lg bg-indigo-500 text-white shadow-md uppercase tracking-wider font-semibold text-sm'>Button</button>
        </div>
        <p className='p-8 text-1xl underline'>Output from Python</p>
        <p className='p-8 py-0'>{output}</p>
        </div>

      </div>

    );
  }
  

