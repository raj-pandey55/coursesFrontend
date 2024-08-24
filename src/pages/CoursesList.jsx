// src/pages/CoursesList.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCourses, deleteCourse } from '../api/api'; 
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { FaTrash, FaSearch } from 'react-icons/fa'; 

const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (courseToDelete) {
      try {
        await deleteCourse(courseToDelete.id);
        setCourses(courses.filter((course) => course.id !== courseToDelete.id));
        setCourseToDelete(null);
        setShowConfirm(false);
      } catch (err) {
        setError('Failed to delete course.');
      }
    }
  };

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
                <td className="py-2 px-4 border-b">{course.title}</td>
                <td className="py-2 px-4 border-b">{course.course_code}</td>
                <td className="py-2 px-4 border-b flex justify-center gap-3">
                  <Link
                    to={`/courses/${course.id}`}
                    className="text-black-500 hover:underline mr-2"
                  >
                    <FaSearch/>
                  </Link>
                  <button
                    onClick={() => {
                      setCourseToDelete(course);
                      setShowConfirm(true);
                    }}
                    className="text-black-500 hover:text-black-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this course?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </Layout>
  );
};

export default CoursesList;
