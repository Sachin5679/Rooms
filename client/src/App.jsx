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
        <div className="flex flex-col items-center justify-center h-screen">
          <h1 className="text-5xl mb-4 text-teal-600">Start Chatting!</h1>
          <p className="mb-4 text-gray-600">
            Enter a name of your choice and a room number to get started!
          </p>
          <input
            type="text"
            placeholder="AlwaysConfused"
            className="mb-2 p-2 border border-teal-300 rounded"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="280"
            className="mb-2 p-2 border border-teal-300 rounded"
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          />

          <button
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
            onClick={joinRoom}
          >
            Join a room
          </button>
        </div>
      ) : (
        <Chat socket={socket} name={name} room={room} />
      )}
    </>
  );
}

export default App
