import { Outlet } from 'react-router-dom';
import Navbar from '../Header';
import Footer from '../Footer';

const Layout = () => {
    return (
        <>
        <Navbar />
        <main>
            <Outlet />
        </main>
        <Footer />
        </>
    );
    };

export default Layout;