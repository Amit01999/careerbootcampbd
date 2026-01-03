import { Outlet } from 'react-router-dom';
import Navber1 from './Home1/Navber1';
import Footer1 from './Home1/Footer1';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <Navber1 />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer1 />
    </div>
  );
};
