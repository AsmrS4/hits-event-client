import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from '../pages/Auth/LoginPage';
import Header from '../components/Header';
import '@styles/index.css';
import PrivateRouter from './PrivateRoute';
import HomePage from '../pages/Home/HomePage';
import { ToastContainer } from 'react-toastify';
import { CompanyPage } from '../pages/Company';
import { BookingsPage } from '../pages/Booking';
import { GuestsPage } from '../pages/Guests';
import { RequestsPage } from '../pages/Requests';

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route element={<PrivateRouter />}>
                        <Route path='/' element={<HomePage />} />
                        <Route path='/companies' element={<CompanyPage />} />
                        <Route path='/requests' element={<RequestsPage />} />
                        <Route path='/bookings' element={<BookingsPage />} />
                        <Route path='/event/guests/:eventId' element={<GuestsPage />} />
                    </Route>
                    <Route path='/auth/sign-in' element={<LoginPage />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer limit={1} />
        </>
    );
}

export default App;
