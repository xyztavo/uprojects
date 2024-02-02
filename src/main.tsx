import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repos } from './pages/Repos.tsx';
import { Repo } from './pages/Repo.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Repos />} />
          <Route path="repos/*" element={<Repo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
