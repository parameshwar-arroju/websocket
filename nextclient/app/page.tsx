"use client"
import { useEffect, useState } from 'react'

function App() {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [message, setMessage] = useState<string[]>([])
  const [input, setInput] = useState("")

  useEffect(() => {
    const newSocket = new WebSocket('ws://localhost:8080');
    newSocket.onopen = () => {
      console.log('Connection established');
      newSocket.send('Hello Server!');
      setSocket(newSocket)
    }
    newSocket.onmessage = (message) => {
      setMessage(m => [...m, message.data]);
      console.log('Message received:', message.data);
    }
    return () => newSocket.close();
  }, [])

  return (
    <>
      <input type="text" onChange={(e) => setInput(e.target.value)} />
      <button onClick={() => socket?.send(input)}>send</button>
      <div className="">
        <div>Messages</div>
        <div>{message.map(m => {
          return (<div>{m}</div>)
        })}</div>
      </div>
    </>
  )
}

export default App