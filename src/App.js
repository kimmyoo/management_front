import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login';
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'

import ProgramList from './features/programs/ProgramList';
import AddProgram from './features/programs/AddProgram';

import InstructorList from './features/instructors/InstructorList';
import AddInstructor from './features/instructors/AddInstructor';
import EditInstructor from './features/instructors/EditInstructor';
import AddInstructorLicense from './features/instructors/AddInstructorLicense';
import ScheduleClass from './features/instructors/ScheduleClass';

import AllProgramList from './features/classes/AllProgramList';
import ClassDetail from './features/classes/ClassDetail';
import ClassesOfSameProg from './features/classes/ClassesOfSameProg';


import RecentStudents from './features/students/RecentStudents';
import StudentDetail from './features/students/StudentDetail';


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
            <Route path="add" element={<AddInstructor />} />
            <Route path="edit" element={<EditInstructor />} />
            <Route path="add-license" element={<AddInstructorLicense />} />
            <Route path="schedule" element={<ScheduleClass />} />
          </Route>

          <Route path="classes" >
            <Route index element={<AllProgramList />}/>
            <Route path=":licID/:clssID" element={<ClassDetail />} />
            <Route path="in/program/:programID" element={<ClassesOfSameProg/> } />
            {/* <Route path="classdetail/:classcode/enroll" element={<EnrollToClass />} /> */}
          </Route>

          <Route path="students">
            <Route index element={<RecentStudents />} />
            <Route path="detail/:stdtID" element={<StudentDetail />} />
            {/* <Route path="Edit/:stdtID" element={<EditStudent />} /> */}
          </Route>

        </Route>{/* End Dash */}
      </Route>
    </Routes>
  );
}

export default App;