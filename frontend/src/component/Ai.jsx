import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Ai() {
  let { showSearch, setShowSearch, products, addtoCart } = useContext(shopDataContext)
  let navigate = useNavigate()
  let [activeAi, setActiveAi] = useState(false)
  // let openingSound = new Audio(open) // (uncomment if you have sound imported)

  function speak(message) {
    let utterence = new SpeechSynthesisUtterance(message)
    window.speechSynthesis.speak(utterence)
  }

  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new speechRecognition()
  if (!recognition) {
    console.log("Speech recognition not supported")
  }

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.trim().toLowerCase()

    console.log("You said:", transcript)

    // --- Existing commands ---
    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("opening search")
      setShowSearch(true)
      navigate("/collection")
    }
    else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("closing search")
      setShowSearch(false)
    }
    else if (transcript.includes("collection") || transcript.includes("products")) {
      speak("opening collection page")
      navigate("/collection")
    }
    else if (transcript.includes("about")) {
      speak("opening about page")
      navigate("/about")
      setShowSearch(false)
    }
    else if (transcript.includes("home")) {
      speak("opening home page")
      navigate("/")
      setShowSearch(false)
    }
    else if (transcript.includes("cart") || transcript.includes("kaat") || transcript.includes("caat")) {
      speak("opening your cart")
      navigate("/cart")
      setShowSearch(false)
    }
    else if (transcript.includes("contact")) {
      speak("opening contact page")
      navigate("/contact")
      setShowSearch(false)
    }
    else if (transcript.includes("order") || transcript.includes("my order")) {
      speak("opening your orders page")
      navigate("/order")
      setShowSearch(false)
    }

    // --- 🛒 NEW: Add to cart command ---
    else if (transcript.includes("add") && transcript.includes("cart")) {
      // Example: "Add shoes size medium to cart"
      let words = transcript.split(" ")

      let start = words.indexOf("add")
      let end = words.indexOf("cart")
      let productWords = words.slice(start + 1, end)
      let productName = productWords.join(" ")

      // Try to detect a size (optional)
      let size = null
      if (productName.includes("small")) size = "S"
      else if (productName.includes("medium")) size = "M"
      else if (productName.includes("large")) size = "L"

      // Remove size words from name
      productName = productName.replace("size", "").replace("small", "").replace("medium", "").replace("large", "").trim()

      let foundProduct = products?.find(p =>
        p.name.toLowerCase().includes(productName)
      )

      if (foundProduct) {
        addtoCart(foundProduct.id, size || foundProduct.sizes?.[0]) // fallback to first available size
        speak(`Added ${foundProduct.name} to your cart`)
        toast.success(`${foundProduct.name} added to cart`)
      } else {
        speak("Sorry, I could not find that product")
        toast.error("Product not found")
      }
    }

    else {
      toast.error("Try Again")
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
        alt=""
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
