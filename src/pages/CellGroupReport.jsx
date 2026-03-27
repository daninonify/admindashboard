import { useData } from '../context/DataContext'

export default function CellGroupReport() {
  const { usersData: users, meetings, attendanceByMeeting } = useData()

  const cellGroups = [...new Set(users.map((u) => u.cell).filter(Boolean))].sort()

  const cellStats = cellGroups.map((cell) => {
    const members = users.filter((u) => u.cell === cell)
    const cellMeetings = meetings.filter((m) => (m.type ?? 'Cell') === 'Cell' && m.cell === cell)

    let totalPresent = 0
    let totalAbsent = 0

    cellMeetings.forEach((meeting) => {
      const statuses = attendanceByMeeting[meeting.id] ?? {}
      const roster =
        meeting.attendees.length > 0
          ? meeting.attendees
          : members.map((u) => u.name)

      roster.forEach((name) => {
        const status = statuses[typeof name === 'string' ? name : name.name] ?? 'unmarked'
        if (status === 'present') totalPresent += 1
        if (status === 'absent') totalAbsent += 1
      })
    })

    const marked = totalPresent + totalAbsent
    const rate = marked > 0 ? (totalPresent / marked) * 100 : 0

    return { cell, memberCount: members.length, meetingCount: cellMeetings.length, totalPresent, totalAbsent, rate }
  })

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Cell Group Report</h1>
          <p className="page-subtitle">Reports / Cell Group Report</p>
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">Cell Group</th>
              <th className="px-4 py-3">Members</th>
              <th className="px-4 py-3">Meetings</th>
              <th className="px-4 py-3">Present</th>
              <th className="px-4 py-3">Absent</th>
              <th className="px-4 py-3">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {cellStats.map((row) => (
              <tr key={row.cell} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 font-medium text-slate-800">{row.cell}</td>
                <td className="px-4 py-3 text-slate-600">{row.memberCount}</td>
                <td className="px-4 py-3 text-slate-600">{row.meetingCount}</td>
                <td className="px-4 py-3 text-emerald-700">{row.totalPresent}</td>
                <td className="px-4 py-3 text-rose-700">{row.totalAbsent}</td>
                <td className="px-4 py-3 font-semibold text-cyan-700">{row.rate.toFixed(1)}%</td>
              </tr>
            ))}
            {cellStats.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">No cell groups found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
