import { useState , useCallback, useRef, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


function App() {
  const [length, setlength] = useState(8)
  const [numberAllowed, setnumberAllowed] = useState(false)
  const [characterAllowed, setcharacterAllowed] = useState(false)
  const [password, setPassword] = useState("")

  // password reference
  const passwordRef = useRef(null)


  const generatePassword  = useCallback(() => {
    let pass = " "
    let str = "ABCDEFGHIJKLMNOPQRESTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed)
      str += "0123456789"
    if(characterAllowed)
      str += "!@#$%^&*_-+[]{}~`"

     for (let index = 1; index <= length; index++) {
         let char = Math.floor(Math.random() * str.length + 1)

         pass += str.charAt(char)
     }
     setPassword(pass)
  }, [numberAllowed, characterAllowed, setPassword, length])


  useEffect(() => {
    generatePassword()
  }, [numberAllowed, generatePassword, characterAllowed, length])


  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])
  
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-4 my-6  text-orange-500 bg-gray-700'>
      <h1 className="text-2xl text-white text-center">password generator</h1>
        <div className='className="flex shadow rounded-lg overflow-hidden mb-4"'>
          <input type="text" 
          value={password} 
          className='outline-none w-full px-3 py-1 m-2 rounded-l' 
          placeholder="password" 
          ref = {passwordRef}
          readOnly/>
          <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex item-center gap-x-1'>
            <input type = "range" 
            min={6}
            max={100}
            value={length} 
            className='cursor-pointer' 
            onChange={(event) => {setlength(event.target.value)}}
            />
            <label>length: {length}</label>
          </div>

          <div className='flex item-center gap-x-1'>
          <input type = "checkbox" 
            defaultChecked = {numberAllowed}
            id = "numberInput"
            onChange={() => {
                setnumberAllowed((prev) => !(prev));
            }}
            />
            <label htmlFor = "numberInput">Numbers</label>
          </div>

          <div className='flex item-center gap-x-1'>
          <input type = "checkbox" 
            defaultChecked = {characterAllowed}
            id = "characterInput"
            onChange={() => {
                setcharacterAllowed((prev) => !(prev));
            }}
            />
            <label htmlFor = "characterInput">Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App
