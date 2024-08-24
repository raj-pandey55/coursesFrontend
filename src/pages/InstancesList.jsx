import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getInstances, deleteInstance } from '../api/api'; 
import Layout from '../components/Layout';
import LoadingSpinner from '../components/LoadingSpinner';
import ConfirmationModal from '../components/ConfirmationModal';
import { FaTrash, FaSearch } from 'react-icons/fa'; 


const InstancesList = () => {
  const [instances, setInstances] = useState([]);
  const [filteredInstances, setFilteredInstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [yearFilter, setYearFilter] = useState('');
  const [semesterFilter, setSemesterFilter] = useState('');
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [instanceToDelete, setInstanceToDelete] = useState(null);

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

  const handleDelete = async () => {
    if (instanceToDelete) {
      try {
        await deleteInstance(instanceToDelete.year, instanceToDelete.semester, instanceToDelete.id);
        setInstances(instances.filter((instance) => instance.id !== instanceToDelete.id));
        setFilteredInstances(filteredInstances.filter((instance) => instance.id !== instanceToDelete.id));
        setInstanceToDelete(null);
        setShowConfirm(false);
      } catch (err) {
        setError('Failed to delete instance.');
      }
    }
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
        <input
          type="text"
          placeholder="Semester"
          value={semesterFilter}
          onChange={(e) => setSemesterFilter(e.target.value)}
          className="p-2 border rounded"
        />
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
              <th className="py-2 px-4 border-b">INSTANCE ID</th>
              <th className="py-2 px-4 border-b">Year</th>
              <th className="py-2 px-4 border-b">Semester</th>
              <th className="py-2 px-4 border-b">Course ID</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInstances.map((instance) => (
              <tr key={instance.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b ">{instance.id}</td>
                <td className="py-2 px-4 border-b ">{instance.year}</td>
                <td className="py-2 px-4 border-b ">{instance.semester}</td> 
                <td className="py-2 px-4 border-b ">{instance.course}</td>
                <td className="py-2 px-4 border-b flex justify-center gap-2">
                  <Link
                    to={`/instances/${instance.year}/${instance.semester}/${instance.id}`}
                    className="text-black-500 hover:underline mr-2"
                  >
                    <FaSearch />
                  </Link>
                  <button
                    onClick={() => {
                      setInstanceToDelete(instance);
                      setShowConfirm(true);
                    }}
                    className=" text-gray-700 hover:text-black-700"
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
          message="Are you sure you want to delete this instance?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </Layout>
  );
};

export default InstancesList;
