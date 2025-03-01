import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const TemplateViewer = () => {
  const location = useLocation();
  const templateId = location.state;
  const [templateData, setTemplateData] = useState(null);
  const [commentString, setCommentString] = useState("");

  const [templateWebData, setTemplateWebData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchTemplate();
  }, [templateId]);

  const getTemplateLocalInfo = () => {
    const info = localStorage.getItem("memeStats");
    if (info) {
      const parsedInfo = JSON.parse(info);
      return parsedInfo[templateId] || { likes: 0, dislikes: 0, comments: [] };
    }
    return { likes: 0, dislikes: 0, comments: [] };
  };

  const fetchTemplate = async () => {
    try {
      const response = await fetch(
        `https://api.memegen.link/templates/${templateId}`
      );
      const json = await response.json();
      console.log("Response from template:", json);
      setTemplateWebData(json);
      const localInfo = getTemplateLocalInfo();
      const templateInfo = {
        id: templateId,
        name: json.name,
        url: json.example.url,
        likes: localInfo.likes,
        dislikes: localInfo.dislikes,
        comments: localInfo.comments,
      };

      setTemplateData(templateInfo);
    } catch (e) {
      console.error("Error fetching template:", e);
      alert("Error fetching data");
    }
  };

  const handleLikes = () => {
    const localMemeData = localStorage.getItem("memeStats") || "{}";
    const localData = JSON.parse(localMemeData);
    // Ensure the templateId exists in local storage
    if (!localData[templateId]) {
      localData[templateId] = { likes: 0, dislikes: 0, comments: [] };
    }
    localData[templateId].likes++;

    // Save updated data to local storage
    localStorage.setItem("memeStats", JSON.stringify(localData));

    // Update state to reflect the change
    setTemplateData((prev) => ({
      ...prev,
      likes: localData[templateId].likes,
    }));
  };
  const handleDislikes = () => {
    const localMemeData = localStorage.getItem("memeStats") || "{}";
    const localData = JSON.parse(localMemeData);
    // Ensure the templateId exists in local storage
    if (!localData[templateId]) {
      localData[templateId] = { likes: 0, dislikes: 0, comments: [] };
    }
    localData[templateId].dislikes++;

    // Save updated data to local storage
    localStorage.setItem("memeStats", JSON.stringify(localData));

    // Update state to reflect the change
    setTemplateData((prev) => ({
      ...prev,
      dislikes: localData[templateId].dislikes,
    }));
  };

  const handleComment = (id, comment) => {
    if (!comment.trim()) return; // Prevent empty comments

    const localMemeData = localStorage.getItem("memeStats") || "{}";
    const localData = JSON.parse(localMemeData);

    // Ensure the templateId exists in local storage
    if (!localData[id]) {
      localData[id] = { likes: 0, dislikes: 0, comments: [] };
    }

    localData[id].comments.push(comment);

    // Save updated data to local storage
    localStorage.setItem("memeStats", JSON.stringify(localData));

    // Update state to reflect the change
    setTemplateData((prev) => ({
      ...prev,
      comments: [...prev.comments, comment],
    }));

    setCommentString(""); // Clear input after adding comment
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-violet-300">
      {templateData ? (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg w-full">
          <h2 className="text-3xl font-bold text-center">
            {templateData.name}
          </h2>
          <img
            src={templateData.url}
            alt={templateData.name}
            className="mx-auto mt-4 rounded-lg shadow-md w-full"
          />
          <div className="m-2 h-15 flex justify-between items-center">
            <div className="">
              <button className="text-3xl text-green-500 cursor-pointer" onClick={handleLikes}>
                👍{templateData.likes}
              </button>
              <button
                className="text-3xl text-red-500 cursor-pointer ml-3"
                onClick={handleDislikes}
              >
                👎{templateData.dislikes}
              </button>
            </div>
            <button 
            className="bg-green-500 hover:bg-green-600 cursor-pointer rounded-md p-2 text-white text-2xl transition-all hover:scale-110"
            onClick={() => navigate("/create-meme", {state : templateWebData})}
            >Use Template</button>
          </div>

          {/* Comment Input Section */}
          <div className="mt-6">
            <div className="flex">
              <input
                className="flex-1 border border-gray-300 p-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                value={commentString}
                placeholder="Add a comment..."
                onChange={(event) => setCommentString(event.target.value)}
              />
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-all"
                onClick={() => handleComment(templateId, commentString)}
              >
                Add
              </button>
            </div>
          </div>

          {/* Comment Section */}
          <h3 className="mt-6 text-xl font-semibold">Comments:</h3>
          <ul className="mt-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
            {templateData.comments.length > 0 ? (
              templateData.comments.map((comment, index) => (
                <li
                  key={index}
                  className="py-2 border-b last:border-none text-gray-700"
                >
                  🗨 {comment}
                </li>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </ul>
        </div>
      ) : (
        <p className="text-lg text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default TemplateViewer;
