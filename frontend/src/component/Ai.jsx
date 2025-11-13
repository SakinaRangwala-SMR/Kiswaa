import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Ai() {
  let { showSearch, setShowSearch, products, addtoCart } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  // let openingSound = new Audio(open) // uncomment if you have a sound file

  // --- 🔊 Speak function ---
  function speak(message) {
    let utterance = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterance)
  }

  // --- 🎙️ Setup speech recognition ---
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()
  if (!recognition) {
    console.log("Speech recognition not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase()
    console.log("You said:", transcript)

    // --- 🛒 ADD TO CART COMMAND ---
    if (transcript.includes("add") && transcript.includes("cart")) {
      // Example: "Add shoes size medium to cart"
      let words = transcript.split(" ")
      let start = words.indexOf("add")
      let end = words.indexOf("cart")
      let productWords = words.slice(start + 1, end)
      let productName = productWords.join(" ")

      // Detect size (optional)
      let size = null
      if (productName.includes("small")) size = "S"
      else if (productName.includes("medium")) size = "M"
      else if (productName.includes("large")) size = "L"

      // Clean up name
      productName = productName
        .replace("size", "")
        .replace("small", "")
        .replace("medium", "")
        .replace("large", "")
        .trim()

      let foundProduct = products?.find((p) =>
        p.name.toLowerCase().includes(productName)
      )

      if (foundProduct) {
        addtoCart(foundProduct.id || foundProduct._id, size || foundProduct.sizes?.[0])
        speak(`Added ${foundProduct.name} to your cart`)
        toast.success(`${foundProduct.name} added to cart`)
      } else {
        speak("Sorry, I could not find that product")
        toast.error("Product not found")
      }
    }

    // --- 🔍 SEARCH OPEN/CLOSE ---
    else if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("Opening search")
      setShowSearch(true)
      navigate("/collection")
    }

    else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("Closing search")
      setShowSearch(false)
    }

    // --- 🛍️ COLLECTION PAGE ---
    else if (transcript.includes("collection") || transcript.includes("products")) {
      speak("Opening collection page")
      navigate("/collection")
    }

    // --- ℹ️ ABOUT PAGE ---
    else if (transcript.includes("about")) {
      speak("Opening about page")
      navigate("/about")
      setShowSearch(false)
    }

    // --- 🏠 HOME PAGE ---
    else if (transcript.includes("home")) {
      speak("Opening home page")
      navigate("/")
      setShowSearch(false)
    }

    // --- 🛒 CART PAGE ---
    else if (
      (transcript.includes("open") || transcript.includes("my")) &&
      (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat"))
    ) {
      speak("Opening your cart")
      navigate("/cart")
      setShowSearch(false)
    }

    // --- ☎️ CONTACT PAGE ---
    else if (transcript.includes("contact")) {
      speak("Opening contact page")
      navigate("/contact")
      setShowSearch(false)
    }

    // --- 📦 ORDERS PAGE ---
    else if (
      transcript.includes("order") ||
      transcript.includes("orders") ||
      transcript.includes("my order") ||
      transcript.includes("myorders")
    ) {
      speak("Opening your orders page")
      navigate("/order")
      setShowSearch(false)
    }

    // --- ❌ NO MATCH ---
    else {
      toast.error("Try again")
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
        // openingSound.play()
        setActiveAi(true)
      }}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer ${activeAi
          ? 'translate-x-[10%] translate-y-[-10%] scale-125'
          : 'translate-x-[0] translate-y-[0] scale-100'
          } transition-transform`}
        style={{
          filter: `${activeAi ? "drop-shadow(0px 0px 30px #00d2fc)" : "drop-shadow(0px 0px 20px black)"}`
        }}
      />
    </div>
  )
}

export default Ai
