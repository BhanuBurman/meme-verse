import React from 'react'

import HomeBG from "../assets/home_bg.jpg";

const Dashboard = () => {
  return (
    <div className="container bg-violet-200 h-120 flex">
          <div className="title flex justify-center flex-col p-8 ml-1.5">
            <h1 className='text-4xl font-bold mb-7'>Make memes and search over 1000+ images</h1>
            <button className='bg-violet-500 p-2 rounded-md text-white w-52 mt-1.5'>Make Meme</button>

          </div>
          <div className="image_section  w-4xl flex justify-center items-center "  >
            <img className="object-center h-92 rounded-md shadow-lg" src={HomeBG} alt="" />
          </div>
    </div>
  )
}

export default Dashboard
