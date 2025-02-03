import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import GalleryPage from "./pages/GalleryPage";
import ServicesPage from "./pages/ServicesPage";
import { AuthProvider } from './components/AuthProvider';
import { Provider } from 'react-redux';
import store from "./store";
import './App.css'

export default function App() {
    return (
        <Provider store={store}>
            <AuthProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path='/' element={<AuthPage />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/aboutus' element={<AboutUsPage />} />
                        <Route path='/gallery' element={<GalleryPage />} />
                        <Route path='/services' element={<ServicesPage />} />
                        <Route path='*' element={<AuthPage />} />
                    </Routes>
                </BrowserRouter>
            </AuthProvider>
        </Provider>
    );
}
