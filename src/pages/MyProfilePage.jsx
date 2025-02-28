import React, { useEffect, useState } from "react";

const MyProfilePage = () => {
  const [memes, setMemes] = useState([]);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("my-memes")) || [];
    setMemes(storedMemes);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">My Profile</h1>
      <p className="text-lg text-gray-700">Welcome to your profile page.</p>
      <h2 className="text-2xl font-semibold text-gray-900 mt-6">Your Created Memes</h2>

      {memes.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
          {memes.map((meme, index) => (
            <div key={index} className="border rounded-lg shadow-md p-2">
              <img
                src={meme}
                alt={`Meme ${index + 1}`}
                className="w-full h-auto rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 mt-4">No memes created yet.</p>
      )}
    </div>
  );
};

export default MyProfilePage;
