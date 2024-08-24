import React from 'react';
import Navbar from './Navbar';

const Layout = ({ children }) => (
  <div className="min-h-screen bg-gray-100">
    <Navbar />
    <main className="container mx-auto p-4">{children}</main>
  </div>
);

export default Layout;
