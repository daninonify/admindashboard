import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import DashboardLayout from './components/dashboard/DashboardLayout'
import Dashboard from './pages/Dashboard'
import Users from './pages/Users'
import Meetings from './pages/Meetings'
import CellAttendance from './pages/CellAttendance'
import ChapelAttendance from './pages/ChapelAttendance'
import FaithArenaAttendance from './pages/FaithArenaAttendance'
import DefaultersCell from './pages/DefaultersCell'
import DefaultersChapel from './pages/DefaultersChapel'
import DefaultersFaithArena from './pages/DefaultersFaithArena'
import AttendanceSummary from './pages/AttendanceSummary'
import CellAttendanceReport from './pages/CellAttendanceReport'
import CellGroupReport from './pages/CellGroupReport'
import ChapelAttendanceReport from './pages/ChapelAttendanceReport'
import Export from './pages/Export'
import Settings from './pages/Settings'

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />

          <Route path="/dashboard" element={
            <DashboardLayout>
              <Dashboard />
            </DashboardLayout>
          } />

          <Route path="/users" element={
            <DashboardLayout>
              <Users />
            </DashboardLayout>
          } />

          <Route path="/meetings" element={
            <DashboardLayout>
              <Meetings />
            </DashboardLayout>
          } />

          <Route path="/attendance/cell" element={
            <DashboardLayout>
              <CellAttendance />
            </DashboardLayout>
          } />

          <Route path="/attendance/chapel" element={
            <DashboardLayout>
              <ChapelAttendance />
            </DashboardLayout>
          } />

          <Route path="/attendance/faith-arena" element={
            <DashboardLayout>
              <FaithArenaAttendance />
            </DashboardLayout>
          } />

          <Route path="/reports/defaulters-cell" element={
            <DashboardLayout>
              <DefaultersCell />
            </DashboardLayout>
          } />

          <Route path="/reports/defaulters-chapel" element={
            <DashboardLayout>
              <DefaultersChapel />
            </DashboardLayout>
          } />

          <Route path="/reports/defaulters-faith-arena" element={
            <DashboardLayout>
              <DefaultersFaithArena />
            </DashboardLayout>
          } />

          <Route path="/reports/attendance-summary" element={
            <DashboardLayout>
              <AttendanceSummary />
            </DashboardLayout>
          } />

          <Route path="/reports/cell-attendance" element={
            <DashboardLayout>
              <CellAttendanceReport />
            </DashboardLayout>
          } />

          <Route path="/reports/cell-group" element={
            <DashboardLayout>
              <CellGroupReport />
            </DashboardLayout>
          } />

          <Route path="/reports/chapel-attendance" element={
            <DashboardLayout>
              <ChapelAttendanceReport />
            </DashboardLayout>
          } />

          <Route path="/reports/export" element={
            <DashboardLayout>
              <Export />
            </DashboardLayout>
          } />

          <Route path="/settings" element={
            <DashboardLayout>
              <Settings />
            </DashboardLayout>
          } />

          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
