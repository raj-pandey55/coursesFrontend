import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCourse } from '../api/api';
import Layout from '../components/Layout';

const CreateCourse = () => {
  const [courseData, setCourseData] = useState({
    title: '',
    course_code: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCourseData({ ...courseData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createCourse(courseData);
      setLoading(false);
      navigate('/courses');
    } catch (err) {
      setError('Failed to create course. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Create New Course</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-gray-700">Course Name</label>
          <input
            type="text"
            name="title"
            value={courseData.title}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={courseData.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          ></textarea>
        </div>
        <div>
          <label className="block text-gray-700">Course Code</label>
          <input
            type="text"
            name="course_code"
            value={courseData.code}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Creating...' : 'Create Course'}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateCourse;
