import React from 'react';
import './App.css';
import Signup from './pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = (): React.JSX.Element => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
