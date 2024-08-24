// src/pages/CreateInstance.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createInstance, getCourses } from '../api/api';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const CreateInstance = () => {
  const [instanceData, setInstanceData] = useState({
    year: '',
    semester: '',
    course: '',
  });
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        setCourses(response.data);
        setCoursesLoading(false);
      } catch (err) {
        setError('Failed to fetch courses.');
        setCoursesLoading(false);
      }
    };
    fetchCourses();
  }, []);

  const handleChange = (e) => {
    setInstanceData({ ...instanceData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createInstance(instanceData);
      setLoading(false);
      navigate('/instances');
    } catch (err) {
      setError('Failed to create instance. Please try again.');
      setLoading(false);
    }
  };

  if (coursesLoading) return <LoadingSpinner />;

  return (
    <Layout>
      <h2 className="text-2xl font-bold mb-4">Create Course Instance</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
        <div>
          <label className="block text-gray-700">Year</label>
          <input
            type="number"
            name="year"
            value={instanceData.year}
            onChange={handleChange}
            required
            min="2000"
            max="2100"
            className="w-full mt-1 p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Semester</label>
          <select
            name="semester"
            value={instanceData.semester}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Select Semester</option>
            <option value="1">Spring</option>
            <option value="2">Summer</option>
            <option value="3">Fall</option>
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Course</label>
          <select
            name="course"
            value={instanceData.course}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border rounded"
          >
            <option value="">Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {loading ? 'Creating...' : 'Create Instance'}
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default CreateInstance;
