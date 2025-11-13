import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function Ai() {
  const { showSearch, setShowSearch } = useContext(shopDataContext)
  const navigate = useNavigate()
  const [activeAi, setActiveAi] = useState(false)
  const openingSound = new Audio(open)

  function speak(message) {
    const utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  if (!recognition) {
    console.log("Speech Recognition not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase()
    console.log("Voice input:", transcript)

    // 🧭 Navigation Commands
    if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("Opening home page")
      navigate("/")
      setShowSearch(false)
    } 
    else if (transcript.includes("about")) {
      speak("Opening about page")
      navigate("/about")
      setShowSearch(false)
    } 
    else if (transcript.includes("contact")) {
      speak("Opening contact page")
      navigate("/contact")
      setShowSearch(false)
    } 
    else if (transcript.includes("cart")) {
      speak("Opening your cart")
      navigate("/cart")
      setShowSearch(false)
    } 
    else if (transcript.includes("order")) {
      speak("Opening your orders page")
      navigate("/order")
      setShowSearch(false)
    } 
    else if (transcript.includes("collection") || transcript.includes("product")) {
      speak("Opening collection page")
      navigate("/collection")
      setShowSearch(false)
    } 

    // 🔍 Search Commands
    else if (transcript.startsWith("search ")) {
      const query = transcript.replace("search ", "").trim()
      if (query) {
        speak(`Searching for ${query}`)
        setShowSearch(true)
        navigate(`/collection?query=${query}`)
      } else {
        toast.error("Please say a product name to search")
      }
    }
    else if (transcript.includes("open search") && !showSearch) {
      speak("Opening search")
      setShowSearch(true)
      navigate("/collection")
    }
    else if (transcript.includes("close search") && showSearch) {
      speak("Closing search")
      setShowSearch(false)
    }
    else {
      toast.error("Sorry, I didn't understand that. Please try again.")
    }
  }

  recognition.onend = () => {
    setActiveAi(false)
  }

  return (
    <div 
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]' 
      onClick={() => {
        recognition.start()
        openingSound.play()
        setActiveAi(true)
      }}
    >
      <img 
        src={ai} 
        alt="AI Assistant" 
        className={`w-[100px] cursor-pointer ${activeAi ? 'translate-x-[10%] translate-y-[-10%] scale-125' : 'translate-x-[0] translate-y-[0] scale-100'} transition-transform`} 
        style={{
          filter: activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"
        }} 
      />
    </div>
  )
}

export default Ai
