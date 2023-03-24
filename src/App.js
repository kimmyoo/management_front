import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import ProgramList from './features/programs/ProgramList';
import AllProgramList from './features/archieves/AllProgramList';
import AddProgram from './features/programs/AddProgram';
import InstructorList from './features/instructors/InstructorList';


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        
        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Welcome />} />

          <Route path="programs">
            <Route index element={<ProgramList />} />
            <Route path="add" element={<AddProgram />} />
          </Route>

          <Route path="instructors">
            <Route index element={<InstructorList />} />
            {/* <Route path="add" element={<AddProgram />} /> */}
          </Route>

          <Route path="archives" element={<AllProgramList />} />
        </Route>{/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;