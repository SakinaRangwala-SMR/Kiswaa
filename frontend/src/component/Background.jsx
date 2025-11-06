import React from 'react'
import back1 from "../assets/back1.png"
import back2 from "../assets/back2.jpg"
import back3 from "../assets/back3.webp"
import back4 from "../assets/back4.jpg"


function Background({heroCount}) {

    if(heroCount === 0){
        return  <img src={back2} alt="" className='w-[50%] h-[100%] absolute right-0 top-0 object-cover'/>
    }else if(heroCount === 1){
       return  <img src={back1} alt="" className='w-[50%] h-[100%] absolute right-0 top-0 object-cover'/>

    }else if(heroCount === 2){
       return  <img src={back3} alt="" className='w-[50%] h-[100%] absolute right-0 top-0 object-cover'/>

    }else if(heroCount === 3){
       return  <img src={back4} alt="" className='w-[50%] h-[100%] absolute right-0 top-0 object-cover'/>

    }

}

export default Background