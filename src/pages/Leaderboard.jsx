import React, { useEffect, useState } from "react";

const Leaderboard = () => {
  const [topMemes, setTopMemes] = useState([]);

  useEffect(() => {
    // Fetch meme stats from localStorage
    const memeStats = JSON.parse(localStorage.getItem("memeStats")) || {};

    // Convert object into array [{ name, likes, dislikes, url }]
    const memeArray = Object.entries(memeStats).map(([name, data]) => ({
      name,
      url: data.url,
      likes: data.likes || 0,
      dislikes: data.dislikes || 0,
    }));

    // Sort memes by likes (descending) and get top 10
    const sortedMemes = memeArray.sort((a, b) => b.likes - a.likes).slice(0, 10);

    setTopMemes(sortedMemes);
  }, []);

  return (
    <div className="w-full dark:bg-slate-800">

    <div className="max-w-3xl mx-auto p-6 dark:bg-slate-700">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">🏆 Top 10 Memes</h1>

      {topMemes.length === 0 ? (
        <p className="text-center text-gray-500">No memes found.</p>
    ) : (
        <div className="grid grid-cols-1 gap-6">
          {topMemes.map((meme, index) => (
              <div
              key={meme.name}
              className="border border-gray-300 rounded-lg overflow-hidden shadow-md p-4 flex items-center justify-between bg-white dark:bg-gray-800"
              >
              <span className="text-2xl font-bold text-gray-700 dark:text-gray-300">#{index + 1}</span>
              <div className="flex items-center flex-1 mx-4 ">
                <img
                  src={meme.url}
                  alt={meme.name}
                  className="w-28 h-28 md:w-40 md:h-40 object-cover rounded-lg shadow-md"
                />
                <p className="text-sm sm:text-2xl md:text-3xl ml-3 md:mx-15 font-semibold text-gray-800 dark:text-gray-200 text-center">
                  {meme.name.replace(/-/g, " ")}
                </p>
              </div>
              <p className="text-sm sm:text-2xl md:text-3xl text-green-600 font-semibold ">❤️ {meme.likes}</p>
            </div>
          ))}
        </div>
      )}
    </div>
      </div>
  );
};

export default Leaderboard;
