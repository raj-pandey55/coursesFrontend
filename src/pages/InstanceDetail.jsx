// src/pages/InstanceDetail.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getInstanceInfo, deleteInstance } from "../api/api";
import Layout from "../components/Layout";
import LoadingSpinner from "../components/LoadingSpinner";
import ConfirmationModal from "../components/ConfirmationModal";

const InstanceDetail = () => {
  const { year, semester, id } = useParams();
  const navigate = useNavigate();

  const [instance, setInstance] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchInstance = async () => {
      try {
        const response = await getInstanceInfo(year, semester, id);
        setInstance(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch instance details.");
        setLoading(false);
      }
    };
    fetchInstance();
  }, [year, semester, id]);

  const handleDelete = async () => {
    setDeleteLoading(true);
    try {
      await deleteInstance(year, semester, id);
      setDeleteLoading(false);
      navigate("/instances");
    } catch (err) {
      setError("Failed to delete instance.");
      setDeleteLoading(false);
      setShowConfirm(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <Layout>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {instance && (
        <div>
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">CourseID - {instance.course}</h1>
              <h1 className="text-2xl font-bold">Year - {year}</h1>
              <h1 className="text-2xl font-bold">Semester - {semester}</h1>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Delete Instance
            </button>
          </div>
          <Link to="/instances" className="text-blue-500 hover:underline">
            Back to Instances
          </Link>
        </div>
      )}
      {showConfirm && (
        <ConfirmationModal
          message="Are you sure you want to delete this instance?"
          onConfirm={handleDelete}
          onCancel={() => setShowConfirm(false)}
        />
      )}
      {deleteLoading && <LoadingSpinner />}
    </Layout>
  );
};

export default InstanceDetail;
