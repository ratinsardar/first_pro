import {useState,useCallback,useEffect, useRef} from 'react'
import logo from './logo.svg';
import './App.css';

function App() {
  let [length,setlength] = useState(8)
  let [numberAllowed, setnumber]=useState(false)
  let [charAllowed, setCharecter]=useState(false)
  let [password,setpassword]=useState("")
  let passwordGenerator=useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numberAllowed)
    {
      str+="0123456789";
    }
    if(charAllowed)
    {
      str+="!@#$%^&*";
    }
    for(let i=1;i<length;i++)
    {
      let char=Math.floor(Math.random()*str.length+1)
      pass+=str.charAt(char)
    }
    setpassword(pass)
  },[length,numberAllowed,charAllowed,setpassword])
  
  const passwordref=useRef(null)

  const copypassword=useCallback(()=>{
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password)
  },[password])
  

  useEffect(()=>{
    passwordGenerator()
  },[length,numberAllowed,charAllowed,setpassword,passwordGenerator])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 px-3 my-8 bg-gray-200'>
      <h5 className='text-center'>password generator</h5>
        <div className='w-full rounded-lg back flex shadow '>
          <input type='text' value={password} placeholder='password' className='w-full rounded-lg text-orange-400'
          readOnly
          ref={passwordref}
          ></input>
          <button className='outline-none bg-blue-700 text-white px-3 py-0.5 rounded-lg'
          onClick={copypassword}
          
          >copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type='range' min={6} max={100} value={length} className='cursor-pointer'  onChange={(e)=>{setlength(e.target.value)}}></input>
            <label>length:{length}</label>
            <input type='checkBox'
            defaultChecked={numberAllowed}
            onChange={()=>{
              setnumber((prev)=>!prev)
            }}
            ></input>
            <label>number</label>
            <input type='checkBox'
            defaultChecked={charAllowed}
            onChange={()=>{
              setCharecter((prev)=>!prev)
            }}
            ></input>
            <label>Character</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
