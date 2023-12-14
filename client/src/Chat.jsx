import React from 'react'

const Chat = ({socket, name, room}) => {
  return (
    <div>
      <div>
        <h1 className='text-2xl bg-black text-white'>Live chat</h1>
      </div>
      <div>
        
      </div>
      <div className='flex'>
        <input type="text" placeholder='Send a message'/>
        <button className='bg-teal-500 text-white'>Send</button>
      </div>
    </div>
  )
}

export default Chat
