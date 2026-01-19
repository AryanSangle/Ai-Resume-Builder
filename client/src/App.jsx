import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ResumeForm from './pages/ResumeForm';
import PreviewPage from './pages/PreviewPage';

function App() {
  const [generatedData, setGeneratedData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/build"
            element={<ResumeForm setGeneratedData={setGeneratedData} />}
          />
          <Route
            path="/preview"
            element={<PreviewPage generatedData={generatedData} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
