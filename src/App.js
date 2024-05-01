import './App.css';
import { BrowserRouter, Routes ,Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import UserSignupPage from './pages/UserSignupPage';
import LoginPage from './pages/LoginPage';
import TopBar from './components/TopBar'
import ProfilePage from './pages/ProfilePage';
import SavedWeathers from './pages/SavedWeather';
import VerticalText from './components/VerticalText';


function App() {
  return (
    <BrowserRouter>
    <TopBar></TopBar>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<UserSignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/weathers" element={<SavedWeathers />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <VerticalText />
    </BrowserRouter>
  );
}

export default App;