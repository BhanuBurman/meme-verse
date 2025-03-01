import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const CreateMeme = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [createdCustomImage, setCreatedCustomImage] = useState(null);
  const [caption1, setCaption1] = useState("");
  const [caption2, setCaption2] = useState("");
  const [savedMemes, setSavedMemes] = useState([]);
  const [mode, setMode] = useState("create");
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiResponse, setAiResponse] = useState(null);

  const [isGenerating, setIsGenerating] = useState(false);


  const location = useLocation();
  useEffect(() => {
    if (location.state) {
      const data = location.state;
      console.log("Data coming from template:", data);
  
      setPreviewUrl(data.blank);
      
      // ✅ Fixed: Use array indexing instead of .getItem()
      setCaption1(data.example.text[0] || ""); 
      setCaption2(data.example.text[1] || "");
    }
  }, [location.state]);  

  const [isLoadingSave, setIsLoadingSave] = useState(false);

  useEffect(() => {
    const storedMemes = JSON.parse(localStorage.getItem("my-memes")) || [];
    setSavedMemes(storedMemes);
  }, []);

  const updateLocalStorage = (newMemeUrl) => {
    const updatedMemes = [newMemeUrl, ...savedMemes];
    setSavedMemes(updatedMemes);
    localStorage.setItem("my-memes", JSON.stringify(updatedMemes));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(file);
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  // Not Working
  const uploadImageToImgBB = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?expiration=600&key=9e580b45a1bcbaf757d5e373f9402826`,
        { method: "POST", body: formData }
      );

      const result = await response.json();
      console.log("Result : {}",result);

      if (result.success) {
        const uploadedUrl = result.data.image.url;
        updateLocalStorage(uploadedUrl); // Store the URL in localStorage
        return uploadedUrl;
      } else {
        alert("Upload Failed: " + result.error.message);
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  // Not working API
  const uploadImageToPostImages = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_session", "free");
  
    try {
      const response = await fetch("https://api.postimages.org/json", {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      console.log("Upload Result:", result);
  
      if (result.direct_link) {
        return result.direct_link; // ✅ Direct image URL
      } else {
        alert("Upload Failed");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };

  const uploadImageToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "meme-uploads"); // Replace with your Cloudinary preset
    formData.append("cloud_name", "dv5lxe8m7"); // Replace with your Cloudinary cloud name
  
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/dv5lxe8m7/image/upload`, {
        method: "POST",
        body: formData,
      });
  
      const result = await response.json();
      console.log("Upload Result:", result);
  
      if (result.secure_url) {
        return result.secure_url; // ✅ Direct image URL
      } else {
        alert("Upload Failed");
        return null;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    }
  };
  
  

  const handleGenerateMeme = async () => {
    if (!aiPrompt.trim()) {
      alert("Please type some keyword first!");
      return;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("https://api.memegen.link/images/automatic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: aiPrompt, safe: true, redirect: false }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      
      const data = await response.json();
      console.log("AI response: ",data);
      setAiResponse(data);
      // updateLocalStorage(data.url); // Save AI-generated meme in localStorage
      setIsGenerating(false);
    } catch (e) {
      console.error("Error generating meme:", e);
      alert("Error generating meme. Please try again later.");
    }
  };

  const saveCreateMemeLocally = async () => {
    if (!selectedImage) {
      alert("Please select an image first!");
      return;
    }

    setIsLoadingSave(true);

    try {
      const uploadedUrl = await uploadImageToCloudinary(selectedImage);
      if (!uploadedUrl) return;
      console.log("Uploaded image url : " + uploadedUrl);

      const response = await fetch("https://api.memegen.link/images/custom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ background: uploadedUrl, text: [caption1, caption2], redirect: false }),
      });

      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      setCreatedCustomImage(data);
      console.log(data);
      updateLocalStorage(data.url); // Save custom meme in localStorage
      setIsLoadingSave(false);
    } catch (e) {
      console.error("Error creating custom meme:", e);
      alert("Error creating custom meme. Please try again later.");
    }
  };

  const deleteMeme = (index) => {
    const updatedMemes = savedMemes.filter((_, i) => i !== index);
    setSavedMemes(updatedMemes);
    localStorage.setItem("my-memes", JSON.stringify(updatedMemes));
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen p-6 ">
      <h1 className="text-3xl font-semibold text-gray-900">Create Meme</h1>
      <p className="text-sm text-gray-500">Upload an image, add captions, and save your meme.</p>

      {/* Toggle Buttons */}
      <div className="flex gap-4 mt-4">
        <button onClick={() => setMode("create")} className={`px-4 py-2 rounded-md ${mode === "create" ? "bg-purple-500 text-white" : "bg-gray-200 text-black"}`}>
          Create
        </button>
        <button onClick={() => setMode("ai")} className={`px-4 py-2 rounded-md ${mode === "ai" ? "bg-purple-500 text-white" : "bg-gray-200 text-black"}`}>
          Generate Using AI
        </button>
      </div>

      {/* Create Meme Mode */}
      {mode === "create" && (
        <>
          <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mt-4">
            Select Image
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>

          {previewUrl && (
            <div className="flex mt-4">
              <div className="relative p-2 border border-gray-300 rounded-lg shadow-md w-[480px] h-[480px] flex items-center justify-center">
                <p className="absolute top-3 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-3xl w-90 text-center">{caption1.toUpperCase()}</p>
                <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-md" />
                <p className="absolute bottom-3 left-1/2 transform -translate-x-1/2 text-white font-extrabold text-3xl w-90 text-center">{caption2.toUpperCase()}</p>
              </div>

              <div className="flex flex-col gap-4 pl-5 py-10">
                <input type="text" placeholder="Top Caption" value={caption1} onChange={(e) => setCaption1(e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-md w-full text-lg" />
                <input type="text" placeholder="Bottom Caption" value={caption2} onChange={(e) => setCaption2(e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-md w-full text-lg" />
              </div>
            </div>
          )}

          {(selectedImage || previewUrl) && (
            <button onClick={saveCreateMemeLocally} 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
            disabled={isLoadingSave}
            >
              {isLoadingSave? "Saving..." : "Save Meme"}
            </button>
          )}
        </>
      )}

      {/* AI Meme Generation Mode */}
      {mode === "ai" && (
        <div className="mt-4 min-w-100">
          <input type="text" placeholder="Enter a prompt" value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} className="px-4 py-2 border-2 border-gray-300 rounded-md w-full text-lg" />
          <div className="">

            <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
            onClick={handleGenerateMeme}
            disabled= {isGenerating}
            >
              {isGenerating? "Generating..." : "Generate Meme"}
            </button>
            {aiResponse && (
              <span className="ml-4">Confidence : {(aiResponse.confidence*100).toFixed(2)}%</span>
            )}
            </div>
          {aiResponse && (
            <div className="flex mt-4">
              <div className="relative p-2 border border-gray-300 rounded-lg shadow-md w-[480px] h-[480px] flex items-center justify-center">
                <img src={aiResponse.url} alt="Preview" className="w-full h-full object-cover rounded-md" />

              </div>
            </div>
          )}
          {(aiResponse) && (
            <button onClick={() => updateLocalStorage(aiResponse.url)} 
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 cursor-pointer"
            disabled={isLoadingSave}
            >
              {isLoadingSave? "Saving..." : "Save Meme"}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CreateMeme;
