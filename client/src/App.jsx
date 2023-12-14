import { useState } from 'react'
import io from 'socket.io-client'
import Chat from './Chat'
import './App.css'

const socket = io.connect('http://localhost:3001')

function App() {
  const [name, setName] = useState("")
  const [room, setRoom] = useState("")
  const [chat, setChat] = useState(false)

  const joinRoom = () => {
    if (name!==""  && room!==""){
      socket.emit("join_room", room)
      setChat(true)
    }
  }

  return (
    <>
      {!chat ? (
        <div className=''>

        <h1 className='text-5xl mb-4'>Start Chatting!</h1>
        <p className='mb-4'>Enter a name of your choice, and a room number to get started!</p>
        <input type="text" placeholder='AlwaysConfused' onChange={(e) => {
          setName(e.target.value)
        }}/>
        
        <input type="text" placeholder='280' onChange={(e) => {
          setRoom(e.target.value)
        }}/>

        <button className='bg-teal-400 text-white' onClick={joinRoom}>Join a room</button>     
      </div>
      ):(
        <Chat socket={socket} name={name} room={room}/>    
      )}
    </>
  )
}

export default App
