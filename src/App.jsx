import { Routes, Route } from 'react-router-dom';
import CreateCourse from './pages/CreateCourse';
import CreateInstance from './pages/CreateInstance';
import CoursesList from './pages/CoursesList';
import CourseDetail from './pages/CourseDetail';
import InstancesList from './pages/InstancesList';
import InstanceDetail from './pages/InstanceDetail';

function App() {


  return (
    <Routes>
    <Route path="/" element={<CreateCourse />} />
    <Route path="/courses" element={<CoursesList />} />
    <Route path="/courses/create" element={<CreateCourse />} />
    <Route path="/courses/:id" element={<CourseDetail />} />
    <Route path="/instances" element={<InstancesList />} />
    <Route path="/instances/create" element={<CreateInstance />} />
    <Route path="/instances/:year/:semester/:id" element={<InstanceDetail />} />
  </Routes>
    
  )
}

export default App
