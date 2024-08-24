// src/pages/CoursesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses } from '../api/api';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch courses.');
        setLoading(false);
      }
    };
    fetchCourses();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Courses</h2>
        <Link
          to="/courses/create"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Course
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {courses.length === 0 ? (
        <p>No courses available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Code</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{course.id}</td>
                <td className="py-2 px-4 border-b">{course.name}</td>
                <td className="py-2 px-4 border-b">{course.code}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-blue-500 hover:underline mr-2"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export default CoursesList;
