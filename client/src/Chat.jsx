import React, { useEffect, useState } from 'react'

const Chat = ({socket, name, room}) => {
    const [message, setMessage] = useState("")
    const [msgList, setMsgList] = useState([])

    const send = async() => {
        if (message!==""){
            const messageData = {
                room: room,
                author: name,
                message: message,
            }
            await socket.emit("send_message", messageData)
            setMsgList((list) => [...list, messageData])
            setMessage("")
        }
    }

    useEffect(() => {
        socket.on("recieve_message", (data) => {
            setMsgList((list) => [...list, data])
        })    
    }, [socket])

  return (
    <div className='h-1/2'>
      <div>
        <h1 className='text-2xl bg-black text-white'>Live chat</h1>
      </div>
      <div className='h-2/3'>
        {msgList.map((msgContent, index)=>{
            return (
                <div key={index}>
                    <div>
                        <p>{msgContent.author} : {msgContent.message}</p>
                    </div>
                </div>
            )
        })}
      </div>
      <div className='flex'>
        <input type="text" placeholder='Send a message' onChange={(e) => {
            setMessage(e.target.value)
        }}/>
        <button className='bg-teal-500 text-white' onClick={send}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
