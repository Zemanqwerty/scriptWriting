import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from './containers/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ScriptsMenu from './containers/scriptsMenu';
import Start from './pages/start';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ScriptsMenu />
      <Routes>
        <Route path="/">
          <Route index element={<Start />} />
          <Route path="/:id" element={<Main />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
