import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        CoursesApp
      </Link>
      <div className="flex space-x-4">
        <NavLink to="/courses" className="hover:underline">
          Courses
        </NavLink>
        <NavLink to="/instances" className="hover:underline">
          Instances
        </NavLink>
      </div>
    </div>
  </nav>
);

export default Navbar;
