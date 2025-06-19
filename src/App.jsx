import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CollapsiblePage from './pages/CollapsiblePage';
import DataDisplayPage from './pages/DataDisplayPage';
import Navbar from './components/Navbar/Navbar';
import StringArrayTransformer from './components/StringArrayTransformer/StringArrayTransformer';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/collapsible" element={<CollapsiblePage />} />
          <Route path="/transformer" element={<StringArrayTransformer />} />
          <Route path="/data" element={<DataDisplayPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;