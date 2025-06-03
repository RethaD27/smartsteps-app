import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Dashboard from './pages/Dashboard';
import LessonPage from './pages/LessonPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/lesson/:grade/:topic" element={<LessonPage />} />
        <Route path="/solver" element={<SolverPage />} />
        <Route path="/progress" element={<ProgressPage />} />
      </Routes>
    </Router>
  );
}

export default App;
