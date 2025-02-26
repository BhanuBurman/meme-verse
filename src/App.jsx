import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Dashboard from './pages/dashboard';
import MemeExplorer from './pages/MemeExplorer';

function App() {
  return (
    <Router>
      <Navbar />  {/* This will be rendered on all pages */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/meme-explorer" element={<MemeExplorer />} /> */}
      </Routes>
      <MemeExplorer />
    </Router>
  );
}

export default App;
