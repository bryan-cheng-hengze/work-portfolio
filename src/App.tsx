import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from "./components/Layout"
import { ScrollToTop } from "./components/ScrollToTop"
import HomePage from "./pages/Home"
import { AboutPage } from "./pages/About"
import { ProjectsPage } from "./pages/Projects"
import { JourneyPage } from "./pages/Journey"
import { RoadmapPage } from "./pages/Roadmap"
import { SkillsPage } from "./pages/Skills"
import { ToolsPage } from "./pages/Tools"

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/journey" element={<JourneyPage />} />
          <Route path="/roadmap" element={<RoadmapPage />} />
          <Route path="/skills" element={<SkillsPage />} />
          <Route path="/tools" element={<ToolsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
