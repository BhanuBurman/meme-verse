# Meme Maker App

## 📌 Overview
The **Meme Maker App** allows users to create memes by uploading images, adding custom captions, and generating AI-based memes. Users can also save their created memes and access them later. This website is deployed in netlify which is accessible through this link: [Meme Maker](https://ogmemeverse.netlify.app/ "Go to Meme page")

## 📹 Introductory Video


## ✨ Features
- Upload an image and add captions
- Generate memes using AI
- Save created memes to local storage
- View and delete saved memes
- Upload images to external services (Cloudinary)

## 🚀 Technologies Used
- **Vite** - Bundler
- **React.js** - Frontend framework
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Cloudinary APIs** - Image hosting
- **Memegen API** - Fetching top memes, custom memes, AI-generated memes

## 📂 Project Structure
```
Meme-Generator-App/
│-- public/
│-- src/
|   ├── assets/
|   |   ├── home_bg.jpg
│   ├── components/
│   │   ├── LoginPopup.jsx
│   │   ├── SignupPop.jsx
│   │   ├── Navbar.jsx
│   │   ├── Profile.jsx
│   ├── pages/
│   │   ├── MemeExplorer.jsx
│   │   ├── CreateMeme.jsx
│   │   ├── Dashboard.jsx
│   │   ├── MyProfilePage.jsx
│   │   ├── TemplateViewer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.jsx
│-- README.md
```

## 🛠️ Installation & Setup
### 1️⃣ Clone the Repository
```sh
git clone https://github.com/BhanuBurman/meme-verse.git
cd meme-verse
```

### 2️⃣ Install Dependencies
```sh
npm install
```

### 3️⃣ Start the Development Server
```sh
npm run dev
```

## 📜 Usage
### 1️⃣ Login/Signup
1. For the first time user need to signup.
2. After that just login with the same username and password.
3. then your profile will be visible to you you can explore your created memes here.

### 2️⃣ Creating a Meme
1. This can be done by either using own image or via templates
2. Upload an image.
3. Add **Top** and **Bottom** captions.
4. Click **Save Meme** to store it.

### 3️⃣ Generating a Meme with AI
1. Switch to **AI Meme Generation Mode**.
2. Enter a keyword or prompt.
3. Click **Generate Meme**.

### 4️⃣ Saving & Managing Memes
- Saved memes are stored in **local storage**.
- Users can delete saved memes.

### Note : all the savings are done in *Local storage* not any type of database is used here

## 🔗 API Endpoints
### ✅ **Memegen API** (For AI-generated memes)
- Endpoint: `https://api.memegen.link/images/automatic`
- Method: `POST`
- Payload:
```json
{
  "text": "Your meme text",
  "safe": true,
  "redirect": false
}
```

### ✅ **Cloudinary API** (For image uploads)
- Endpoint: `https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`
- Method: `POST`
- Payload:
```json
{
  "file": "IMAGE_FILE",
  "upload_preset": "YOUR_PRESET"
}
```

## 📝 License
This project is licensed under the **MIT License**.

---
Made with ❤️ by Bhanu Kumar Burman

