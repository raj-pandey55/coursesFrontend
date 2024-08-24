    import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInstances } from '../api/api';
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';

const InstancesList = () => {
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInstances = async () => {
      try {
        const response = await getInstances();
        setInstances(response.data);
        setFilteredInstances(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch instances.');
        setLoading(false);
      }
    };
    fetchInstances();
  }, []);

  const handleFilter = () => {
    let filtered = instances;
    if (yearFilter) {
      filtered = filtered.filter((instance) => instance.year.toString() === yearFilter);
    }
    if (semesterFilter) {
      filtered = filtered.filter((instance) => instance.semester.toString() === semesterFilter);
    }
    setFilteredInstances(filtered);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Layout>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Course Instances</h2>
        <Link
          to="/instances/create"
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Add Instance
        </Link>
      </div>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="mb-4 flex space-x-4">
        <input
          type="number"
          placeholder="Year"
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Semesters</option>
          <option value="1">Spring</option>
          <option value="2">Summer</option>
          <option value="3">Fall</option>
        </select>
        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Filter
        </button>
      </div>
      {filteredInstances.length === 0 ? (
        <p>No instances available.</p>
      ) : (
        <table className="min-w-full bg-white shadow-md rounded">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Course</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstances.map((instance) => (
              <tr key={instance.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{instance.id}</td>
                <td className="py-2 px-4 border-b">{instance.year}</td>
                <td className="py-2 px-4 border-b">
                  {instance.semester === 1
                    ? 'Spring'
                    : instance.semester === 2
                    ? 'Summer'
                    : 'Fall'}
                </td>
                <td className="py-2 px-4 border-b">{instance.course_name}</td>

                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/instances/${instance.year}/${instance.semester}/${instance.id}`}
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

export default InstancesList;
