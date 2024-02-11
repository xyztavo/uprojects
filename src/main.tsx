import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repos } from './pages/Repos.tsx';
import { Repo } from './pages/Repo.tsx';
import { Home } from './pages/Home.tsx';
import { PinnedRepos } from './pages/PinnedRepos.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="repos" element={<Repos />} />
          <Route path="pinnedrepos" element={<PinnedRepos />} />
          <Route path="repos/*" element={<Repo />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
