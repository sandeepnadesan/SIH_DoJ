import React, { useState } from 'react';
import axios from 'axios';


function Widget() {
  const [click, setClick] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const toggleChat = () => {
    setClick(!click);
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, type: 'user' }]);
      setInput('');
  
      try {
        const response = await axios.post('http://localhost:5000/response', { message: input });
        const { data } = response;
        setMessages([...messages, { text: input, type: 'user' }, { text: data.message, type: 'chatbot' }]);
      } catch (error) {
        console.error('Error sending message:', error);
        setMessages([...messages, { text: input, type: 'user' }, { text: 'Error: Could not get response from server.', type: 'chatbot' }]);
      }
    }
  };

  return (
    <div>
      {/* Toggle button */}
      <button onClick={toggleChat}>
        <div className="fixed bottom-0 right-0 p-4">
          <div className="flex items-center justify-center h-16 w-16 bg-gray-700 rounded-full border border-white shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="text-white h-9 w-9"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Chat window */}
      {click && (
        <div className="fixed bottom-24 right-4 h-3/4 w-1/4 bg-black shadow-lg rounded-lg border border-gray-300 flex flex-col ">
          <h1 className=' text-center'>How can i help you !!</h1>
          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            <div className="flex flex-col space-y-2">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    msg.type === 'user'
                      ? 'bg-gray-500 text-white self-end'
                      : 'bg-gray-300 text-black self-start'
                  } break-words`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
          </div>
          <form onSubmit={handleSend} className="bg-gray-100 p-3 flex border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-2 bg-white text-gray-800 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-black"
              placeholder="Type a message..."
            />
            <button
              type="submit"
              className="ml-2 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-black transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
</svg>

            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default Widget;
