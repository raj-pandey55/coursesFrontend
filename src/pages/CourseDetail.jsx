// src/pages/CourseDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { getCourse, deleteCourse } from '../api/api';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';

const CourseDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourse(id);
        setCourse(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch course details.');
        setLoading(false);
      }
    };
    fetchCourse();
  }, [id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteCourse(id);
      setDeleteLoading(false);
      navigate('/courses');
    } catch (err) {
      setError('Failed to delete course.');
      setDeleteLoading(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Layout>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {course && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">{course.title}</h2>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Course
            </button>
          </div>
          <p className="mb-2">
            <span className="font-semibold">Course Code:</span> {course.course_code}
          </p>
          <p className="mb-4">
            <span className="font-semibold">Description:</span> {course.description}
          </p>
          <Link
            to="/courses"
            className="text-blue-500 hover:underline"
          >
            Back to Courses
          </Link>
        </div>
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this course?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {deleteLoading && <LoadingSpinner />}
    </Layout>
  );
};

export default CourseDetail;
