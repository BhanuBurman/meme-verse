import React, { useState, useEffect } from "react";
import { FaRegComment } from "react-icons/fa";
import { IoFilterOutline } from "react-icons/io5"; 
import { useNavigate } from "react-router-dom";

const MemeExplorer = () => {
  const [data, setData] = useState([]);
  const [searchString, setSearchString] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isAnimated, setIsAnimated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const memesPerPage = 20;

  const [activeFilter, setActiveFilter] = useState("All"); // Default active is "All"

  const filters = ["All", "Trending", "New", "Classic", "Animated"];

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [isAnimated]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.memegen.link/templates?filter=${searchString}&animated=${isAnimated}`
      , );
      const json = await response.json();

      // Retrieve stored likes/dislikes data from localStorage
      const storedData = JSON.parse(localStorage.getItem("memeStats")) || {};

      // Add likes and dislikes to each meme object
      const updatedData = json.map((meme) => ({
        ...meme, // Keep original properties
        likes: storedData[meme.id]?.likes || 0, // If exists, use stored value, else 0
        dislikes: storedData[meme.id]?.dislikes || 0,
        comments: storedData[meme.id]?.comments || [],
      }));

      // Store updated data back in localStorage
      const updatedStats = updatedData.reduce((acc, meme) => {
        acc[meme.id] = {
          likes: meme.likes,
          dislikes: meme.dislikes,
          comments: meme.comments,
        };
        return acc;
      }, {});

      localStorage.setItem("memeStats", JSON.stringify(updatedStats));

      setData(updatedData);
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleFilter = (filter) => {
    setActiveFilter(filter);
    setIsAnimated(filter === "Animated");
    setCurrentPage(1);
  };

  const handleLike = (id) => {
    const updatedMemes = data.map((meme) => {
      if (meme.id === id) {
        return { ...meme, likes: meme.likes + 1 };
      }
      return meme;
    });

    setData(updatedMemes);
    updateLocalStorage(updatedMemes);
  };

  const handleDislike = (id) => {
    const updatedMemes = data.map((meme) => {
      if (meme.id === id) {
        return { ...meme, dislikes: meme.dislikes + 1 };
      }
      return meme;
    });

    setData(updatedMemes);
    updateLocalStorage(updatedMemes);
  };

  // Helper function to update localStorage
  const updateLocalStorage = (memes) => {
    const updatedStats = memes.reduce((acc, meme) => {
      acc[meme.id] = { likes: meme.likes, dislikes: meme.dislikes };
      return acc;
    }, {});

    localStorage.setItem("memeStats", JSON.stringify(updatedStats));
  };

  // Pagination Logic
  const indexOfLastMeme = currentPage * memesPerPage;
  const indexOfFirstMeme = indexOfLastMeme - memesPerPage;
  const currentMemes = data.slice(indexOfFirstMeme, indexOfLastMeme);

  const totalPages = Math.ceil(data.length / memesPerPage);

  return (
    <div className="container flex flex-col justify-center min-h-screen h-fit w-full items-center p-6">
      <p className="text-4xl font-bold text-center mt-6">
        Smarter Creativity and Faster Designs
      </p>
      <p className="text-xl text-center mb-4 text-gray-600">
        Create memes instantly with our vast collection of templates.
      </p>

      {/* Search Bar */}
      <div className="flex">
        <input
          className="rounded-l-md border-2 w-60 md:w-96 p-2 text-base md:text-lg outline-none focus:border-blue-500"
          type="text"
          placeholder="Search by typing some word..."
          onChange={(event) => setSearchString(event.target.value)}
        />
        <button
          className=" md:px-4 bg-blue-700 text-white rounded-r-md hover:bg-blue-800 cursor-pointer flex items-center justify-center min-w-[65px] disabled:bg-blue-400"
          onClick={fetchData}
          disabled={loading} // Disable button while loading
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            "Search"
          )}
        </button>
      </div>

      {/* Filters */}
      <div className="filters h-10 md:h-14 w-full flex justify-center mt-4 ">
        <p className="hidden md:flex justify-center items-center text-sm md:text-base lg:text-2xl shadow-md md:w-60 p-2 bg-gray-200 border-r border-r-gray-400 rounded-tl-lg rounded-bl-lg text-black">
          -- Choose Filter --
        </p>
        <div className="hidden md:flex group p-2 justify-evenly bg-gray-200 rounded-br-lg rounded-tr-lg w-3/4 shadow-md">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`p-2 rounded-md w-24 cursor-pointer transition-colors duration-300
                        ${
                          activeFilter === filter
                            ? "bg-blue-500 text-white shadow-md"
                            : "bg-gray-400 text-white hover:bg-gray-500"
                        }
                        `}
              onClick={() => handleFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="md:hidden flex justify-center items-center text-2xl">
          Choose Filter: 
        <button
        onClick={() => setShowFilters(!showFilters)}
        className="md:hidden ml-4 flex items-center gap-2 text-base bg-gray-200 px-4 py-2 rounded-md shadow-md border-2 border-gray-400"
        >
        <IoFilterOutline className="text-lg" />
        {activeFilter}
      </button>
          </div>
        {showFilters && (
        <div className="md:hidden z-10 absolute md:relative mt-2 flex flex-col w-3/4 bg-gray-200 shadow-md rounded-md">
          {filters.map((filter) => (
            <button
              key={filter}
              className={`p-2 text-center border-b border-gray-300 cursor-pointer transition-colors duration-300
                          ${
                            activeFilter === filter
                              ? "bg-blue-500 text-white"
                              : "bg-gray-400 text-white hover:bg-gray-500"
                          }
                          `}
              onClick={() => {
                handleFilter(filter);
                setShowFilters(false); // Hide list after selecting
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      )}
      </div>

      {/* Meme Grid */}
      {/* {loading?  (<div>Loading...</div>) :(

                <div className="memes w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
                {currentMemes.map((item, index) => (
                    <div key={index} className="w-46 max-w-xs mx-auto shadow-lg rounded-md bg-violet-100 overflow-hidden">
                        <img className="w-full h-58 object-cover" src={item.example.url} alt={item.name} />
                        <p className="text-center font-semibold p-2">{item.name}</p>
                    </div>
                ))}
            </div>
        )
            } */}
      <div className="memes w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 mt-6">
        {currentMemes.map((item, index) => (
          <div
            key={index}
            className="w-40 sm:w-43 md:w-56 max-w-xs mx-auto shadow-lg rounded-md bg-violet-100 overflow-hidden flex flex-col h-full cursor-pointer hover:scale-102 transition-all hover:shadow-2xl"
            onClick={() => navigate("/template-viewer", {state: item.id})}
          >
            <img
              className="w-full h-full object-cover"
              src={item.example.url}
              alt={item.name}
            />
            <p className="text-center font-semibold p-1 md:p-2 text-sm md:text-lg flex-grow">
              {item.name}
            </p>

            {/* Like & Dislike Buttons */}
            <div className="flex justify-end items-center mt-auto px-2 pb-2 gap-2">
              <button
                className="text-green-500 cursor-pointer"
                onClick={() => handleLike(item.id)}
              >
                <span className="group-hover:scale-125 transition-transform">
                  👍
                </span>{" "}
                {item.likes}
              </button>
              <button
                className="text-red-500 cursor-pointer"
                onClick={() => handleDislike(item.id)}
              >
                <span className="group-hover:scale-125 transition-transform">
                  👎
                </span>{" "}
                {item.dislikes}
              </button>
                 <FaRegComment />
                 {" "}
                 {item.comments.length}
                
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-gray-300 rounded-md">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MemeExplorer;
