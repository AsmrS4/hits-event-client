import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '@pages/Auth/LoginPage';
import Header from '@components/Header';
import '@styles/index.css';
import PrivateRouter from './PrivateRoute';
import HomePage from '../pages/Home/HomePage';
import { ToastContainer } from 'react-toastify';
import { CompanyPage } from '../pages/Company';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<PrivateRouter />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/companies' element={<CompanyPage />} />
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
