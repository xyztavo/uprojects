import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Repos } from './pages/Repos.tsx';
import { Repo } from './pages/Repo.tsx';
import { Home } from './pages/Home.tsx';
import { PinnedRepos } from './pages/PinnedRepos.tsx';
import { FilteredRepos } from './pages/FilteredRepos.tsx';
import { ExternalUser } from './pages/ExternalUserRepo.tsx';

const githubUser = import.meta.env.VITE_GITHUB_USER

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<App />}>
          <Route path="/" element={<Home />} />
          <Route path="/:githubname" element={<ExternalUser />} />
          <Route path="repos" element={<Repos githubUser={githubUser} isBearerAuth />} />
          <Route path="pinnedrepos" element={<PinnedRepos githubUser={githubUser} />} />
          <Route path="repos/*" element={<Repo />} />
          <Route path="search" element={<FilteredRepos isBearerAuth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
