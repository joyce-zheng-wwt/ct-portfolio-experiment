'use client'

import { useRef, useState } from 'react'

interface Message {
  role: 'ai' | 'user'
  text: string
  id: string
}

const RESPONSES = [
  "We specialize in building at the intersection of AI and creative production — tooling, interfaces, and systems that make complex work feel effortless.",
  "Our process begins with understanding the underlying problem deeply before committing to a solution. We prototype early and often.",
  "We've built everything from real-time AI pipelines to design systems powering multiple product surfaces. What aspect interests you most?",
  "Our team bridges visual design, software engineering, and applied AI — which means we can take an idea from concept to production without handoff friction.",
  "That's a great question. We'd love to explore that further — drop us a line at studio@example.com to start a conversation.",
]

export default function ChatBar() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hello — I'm the studio's AI assistant. Ask me about our work, process, capabilities, or how we might collaborate.", id: 'init' },
  ])
  const [typing, setTyping] = useState(false)
  const [input, setInput] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const msgsRef = useRef<HTMLDivElement>(null)

  function toggleChat() {
    setOpen((v) => !v)
    if (!open) setTimeout(() => inputRef.current?.focus(), 50)
  }

  function sendMessage() {
    const msg = input.trim()
    if (!msg) return
    setInput('')

    const userMsg: Message = { role: 'user', text: msg, id: Date.now().toString() }
    setMessages((prev) => [...prev, userMsg])
    setTyping(true)

    setTimeout(() => {
      setTyping(false)
      const r = RESPONSES[Math.floor(Math.random() * RESPONSES.length)]
      setMessages((prev) => [...prev, { role: 'ai', text: r, id: Date.now().toString() }])
      setTimeout(() => {
        if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight
      }, 0)
    }, 1400 + Math.random() * 600)
  }

  function handleKey(e: React.KeyboardEvent) {
    if (e.key === 'Enter') sendMessage()
  }

  return (
    <>
      {/* Chat popup */}
      <div className={`chat-popup${open ? ' open' : ''}`}>
        <div className="chat-popup-header">
          <div className="chat-popup-title">
            <div className="dot" />
            Studio AI — Ask us anything
          </div>
          <button className="chat-close" onClick={toggleChat}>Close ✕</button>
        </div>
        <div className="chat-messages" ref={msgsRef}>
          {messages.map((m) => (
            <div key={m.id} className={`msg${m.role === 'user' ? ' user' : ''}`}>
              <div className="msg-avatar">{m.role === 'user' ? 'YOU' : 'AI'}</div>
              <div className="msg-bubble">{m.text}</div>
            </div>
          ))}
          {typing && (
            <div className="msg">
              <div className="msg-avatar">AI</div>
              <div className="chat-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
        </div>
        <div className="chat-input-row">
          <input
            className="chat-input"
            ref={inputRef}
            type="text"
            placeholder="Type your question..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
          />
          <button className="chat-send" onClick={sendMessage}>Send →</button>
        </div>
      </div>

      {/* Chat bar */}
      <div className="chat-bar">
        <button className="chat-trigger" onClick={toggleChat}>
          <div className="chat-status-dot" />
          <span className="chat-placeholder">Ask anything about our work or process...</span>
          <span className="chat-label">AI ◈</span>
        </button>
        <button className="chat-icon-btn" onClick={toggleChat}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 1C4.13 1 1 3.91 1 7.5c0 1.55.57 2.97 1.51 4.08L1.5 14l2.6-.98A7.15 7.15 0 008 14c3.87 0 7-2.91 7-6.5S11.87 1 8 1z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </>
  )
}
