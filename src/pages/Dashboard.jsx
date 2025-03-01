import React from 'react';
import HomeBG from '../assets/home_bg.jpg';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container bg-violet-200 h-screen flex flex-col md:flex-row items-center justify-center px-8">
      <motion.div 
        className="title flex flex-col text-center md:text-left p-8"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className='text-5xl font-extrabold mb-6 text-gray-900'>
          Create the Funniest Memes Instantly!
        </h1>
        <p className='text-lg text-gray-700 mb-6'>
          Search from over <span className='font-bold text-violet-600'>1000+ templates</span>, unleash your creativity, and make the internet laugh! 😂🔥
        </p>
        <motion.button 
          className='bg-violet-500 hover:bg-violet-600 transition-all duration-300 px-6 py-3 rounded-md text-white text-lg shadow-lg'
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => navigate('create-meme')}
        >
          Make Your Meme Now 🚀
        </motion.button>
      </motion.div>
      <motion.div 
        className="image_section flex justify-center items-center mt-8 md:mt-0"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <img className="object-center h-96 rounded-xl shadow-2xl hover:scale-105 transition-transform duration-300" src={HomeBG} alt="Meme Background" />
      </motion.div>
    </div>
  );
}

export default Dashboard;
