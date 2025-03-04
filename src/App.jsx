import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import MemeExplorer from './pages/MemeExplorer';
import CreateMeme from './pages/CreateMeme';
import MyProfilePage from './pages/MyProfilePage';
import TemplateViewer from './pages/TemplateViewer';
import Leaderboard from './pages/Leaderboard';

function App() {
  return (
    <Router>
      <Navbar />  {/* This will be rendered on all pages */}
      <Routes>
        <Route path="/" element={
            <div className="flex flex-col items-center">
            <Dashboard />
            <MemeExplorer />
          </div>
          } />
        {/* <Route path="/meme-explorer" element={<MemeExplorer />} /> */}
        <Route path ="/create-meme" element ={<CreateMeme />}></Route>
        <Route path ="/my-profile" element ={<MyProfilePage />}></Route>
        <Route path ="/template-viewer" element ={<TemplateViewer />}></Route>
        <Route path='/leaderboard' element={<Leaderboard />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
