import React, { useContext, useState } from 'react'
import ai from "../assets/ai.png"
import { shopDataContext } from '../context/ShopContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

function Ai() {
  const { showSearch, setShowSearch, products, addtoCart } = useContext(shopDataContext)
  const navigate = useNavigate()
  const [activeAi, setActiveAi] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null)
  const [waitingForConfirmation, setWaitingForConfirmation] = useState(false)

  // --- Speak ---
  const speak = (msg) => {
    const utter = new SpeechSynthesisUtterance(msg)
    utter.rate = 1
    utter.pitch = 1
    window.speechSynthesis.speak(utter)
  }

  // --- Speech recognition ---
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
  const recognition = new SpeechRecognition()

  recognition.onresult = (e) => {
    const transcript = e.results[0][0].transcript.toLowerCase().trim()
    console.log("Heard:", transcript)

    // ✅ If AI is waiting for "yes" or "no"
    if (waitingForConfirmation && pendingProduct) {
      if (transcript.includes("yes")) {
        addtoCart(pendingProduct.id || pendingProduct._id, pendingProduct.sizes?.[0])
        speak(`Added ${pendingProduct.name} to your cart`)
        toast.success(`${pendingProduct.name} added to cart`)
        setWaitingForConfirmation(false)
        setPendingProduct(null)
      } else if (transcript.includes("no")) {
        speak("Okay, I won't add it.")
        setWaitingForConfirmation(false)
        setPendingProduct(null)
      } else {
        speak("Please say yes or no.")
      }
      return
    }

    // ✅ ADD TO CART command
    if (transcript.includes("add") && transcript.includes("cart")) {
      const words = transcript.split(" ")
      const start = words.indexOf("add")
      const end = words.indexOf("cart")
      const productName = words.slice(start + 1, end).join(" ").trim()

      // Find closest match (by name similarity)
      const foundProduct = findClosestProduct(productName, products)

      if (foundProduct) {
        const price = foundProduct.price ? `It costs ₹${foundProduct.price}.` : ""
        const desc = foundProduct.description
          ? foundProduct.description.slice(0, 60) + "..."
          : "No detailed description available."
        speak(`I found ${foundProduct.name}. ${desc} ${price} Should I add it to your cart?`)
        setPendingProduct(foundProduct)
        setWaitingForConfirmation(true)
      } else {
        speak("Sorry, I couldn't find that product.")
      }
    }

    // ✅ NAVIGATION COMMANDS
    else if (transcript.includes("open cart")) {
      speak("Opening your cart")
      navigate("/cart")
    } else if (transcript.includes("collection")) {
      speak("Opening collection page")
      navigate("/collection")
    } else if (transcript.includes("home")) {
      speak("Going home")
      navigate("/")
    } else if (transcript.includes("about")) {
      speak("Opening about page")
      navigate("/about")
    } else if (transcript.includes("contact")) {
      speak("Opening contact page")
      navigate("/contact")
    } else if (transcript.includes("order")) {
      speak("Opening orders page")
      navigate("/order")
    } else if (transcript.includes("search open")) {
      speak("Opening search")
      setShowSearch(true)
    } else if (transcript.includes("search close")) {
      speak("Closing search")
      setShowSearch(false)
    } else {
      speak("Sorry, I didn't get that.")
    }
  }

  recognition.onend = () => setActiveAi(false)

  // --- Find closest product name match ---
  function findClosestProduct(spokenName, products) {
    if (!spokenName || products.length === 0) return null
    let minDistance = Infinity
    let bestMatch = null

    for (const product of products) {
      const distance = levenshtein(spokenName, product.name.toLowerCase())
      if (distance < minDistance) {
        minDistance = distance
        bestMatch = product
      }
    }
    // if name similarity > threshold
    return minDistance <= 5 ? bestMatch : null
  }

  // --- Levenshtein distance (string similarity) ---
  function levenshtein(a, b) {
    const matrix = Array(a.length + 1)
      .fill(null)
      .map(() => Array(b.length + 1).fill(0))

    for (let i = 0; i <= a.length; i++) matrix[i][0] = i
    for (let j = 0; j <= b.length; j++) matrix[0][j] = j

    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1
        matrix[i][j] = Math.min(
          matrix[i - 1][j] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j - 1] + cost
        )
      }
    }
    return matrix[a.length][b.length]
  }

  return (
    <div
      className='fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]'
      onClick={() => {
        recognition.start()
        setActiveAi(true)
        speak("I'm listening")
      }}
    >
      <img
        src={ai}
        alt="AI Assistant"
        className={`w-[100px] cursor-pointer transition-transform ${
          activeAi ? "scale-125" : "scale-100"
        }`}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)"
        }}
      />
    </div>
  )
}

export default Ai
