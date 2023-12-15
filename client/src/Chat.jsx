import React, { useEffect, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';

const Chat = ({ socket, name, room }) => {
  const [message, setMessage] = useState('');
  const [msgList, setMsgList] = useState([]);

  const send = async () => {
    if (message !== '') {
      const messageData = {
        room: room,
        author: name,
        message: message,
      };
      await socket.emit('send_message', messageData);
      setMsgList((list) => [...list, messageData]);
      setMessage('');
    }
  };

  useEffect(() => {
    socket.on('recieve_message', (data) => {
      setMsgList((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-800 text-white">
      <div className="bg-teal-600 p-4">
        <h1 className="text-2xl">Chat</h1>
      </div>
      <div className="h-2/3 overflow-y-auto p-4">
        <ScrollToBottom>
          {msgList.map((msgContent, index) => (
            <div key={index} className="mb-2">
              <p>
                <span className="font-bold">{msgContent.author}:</span>{' '}
                {msgContent.message}
              </p>
            </div>
          ))}
        </ScrollToBottom>
      </div>
      <div className="flex p-4">
        <input
          type="text"
          placeholder="Send a message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow p-2 border border-teal-300 rounded-l bg-gray-700 text-white"
        />
        <button
          className="bg-teal-500 text-white p-2 rounded-r"
          onClick={send}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
