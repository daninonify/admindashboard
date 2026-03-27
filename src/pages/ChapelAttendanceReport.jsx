import { useData } from '../context/DataContext'

export default function ChapelAttendanceReport() {
  const { meetings, usersData: users, attendanceByMeeting } = useData()

  const chapelMeetings = meetings.filter((m) => m.type === 'Chapel')

  const reportRows = chapelMeetings
    .map((meeting) => {
      const roster =
        meeting.attendees.length > 0
          ? meeting.attendees.map((name) => {
              const matched = users.find((u) => u.name.toLowerCase() === name.toLowerCase())
              return { name: matched ? matched.name : name, matric: matched ? matched.matric : 'N/A' }
            })
          : users.map((u) => ({ name: u.name, matric: u.matric }))

      const statuses = attendanceByMeeting[meeting.id] ?? {}
      const present = roster.filter((m) => (statuses[m.name] ?? 'unmarked') === 'present').length
      const absent = roster.filter((m) => (statuses[m.name] ?? 'unmarked') === 'absent').length
      const marked = present + absent
      const rate = marked > 0 ? (present / marked) * 100 : 0

      return { ...meeting, total: roster.length, present, absent, unmarked: roster.length - marked, rate }
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Chapel Attendance Report</h1>
          <p className="page-subtitle">Reports / Chapel Attendance Report</p>
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">Meeting</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Present</th>
              <th className="px-4 py-3">Absent</th>
              <th className="px-4 py-3">Unmarked</th>
              <th className="px-4 py-3">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {reportRows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-800">{row.title}</td>
                <td className="px-4 py-3 text-slate-600">{row.service}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-3 text-slate-600">{row.total}</td>
                <td className="px-4 py-3 text-emerald-700">{row.present}</td>
                <td className="px-4 py-3 text-rose-700">{row.absent}</td>
                <td className="px-4 py-3 text-slate-600">{row.unmarked}</td>
                <td className="px-4 py-3 font-semibold text-cyan-700">{row.rate.toFixed(1)}%</td>
              </tr>
            ))}
            {reportRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-400">No chapel attendance data yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
