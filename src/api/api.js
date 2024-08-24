
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api';

export const getCourses = () => axios.get(`${API_BASE_URL}/courses/`);

export const getCourse = (id) => axios.get(`${API_BASE_URL}/courses/${id}/`);

// export const createCourse = (courseData) => axios.post(`${API_BASE_URL}/courses/`, courseData);
export const createCourse = async (courseData) => {
    const response = await fetch('http://localhost:8000/api/courses/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(courseData),
    });
  
    if (!response.ok) {
      throw new Error('Failed to create course');
    }
  
    return response.json();
  };

export const deleteCourse = (id) => axios.delete(`${API_BASE_URL}/courses/${id}/`);

export const getInstances = () => axios.get(`${API_BASE_URL}/instances/`);

export const getInstance = (year, semester) => axios.get(`${API_BASE_URL}/instances/${year}/${semester}/`);

export const getInstanceInfo = (year, semester, id) => axios.get(`${API_BASE_URL}/instances/${year}/${semester}/${id}/`);

export const createInstance = (instanceData) => axios.post(`${API_BASE_URL}/instances/`, instanceData);

export const deleteInstance = (year, semester, id) => axios.delete(`${API_BASE_URL}/instances/${year}/${semester}/${id}/`);
