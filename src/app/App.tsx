import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/Auth/LoginPage';
import Header from '@components/Header';
import '@styles/index.css';
import PrivateRouter from './PrivateRoute';
import HomePage from '../pages/Home/HomePage';
import { ToastContainer } from 'react-toastify';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<PrivateRouter />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/profile' element={<HomePage />} />
                        <Route path='/events' element={<HomePage />} />
                        <Route path='/companies' element={<HomePage />} />
                        <Route path='/requests' element={<HomePage />} />
                    </Route>
                    <Route path='/auth/sign-in' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer />
        </>
    );
}

export default App;
