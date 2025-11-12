// Routers.tsx
import { Routes, Route } from 'react-router-dom';
import App from './App'
import Auth from './pages/Auth';
import NotFound from './pages/NotFound';
import PostPage from './pages/PostList';

function Routers() {
    return (
        <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/" element={<App />} />
            <Route path="#/auth" element={<Auth />} />
            <Route path="#/posts" element={<PostPage />} />
        </Routes>
    );
}

export default Routers;