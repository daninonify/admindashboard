import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function DefaultersChapel() {
  const { meetings, usersData: users, attendanceByMeeting } = useData()

  const chapelMeetings = meetings.filter((meeting) => meeting.type === 'Chapel')
  const [query, setQuery] = useState('')

  const normalizedQuery = query.trim().toLowerCase()

  const absentRows = chapelMeetings
    .flatMap((meeting) => {
      const roster =
        meeting.attendees.length > 0
          ? meeting.attendees.map((name) => {
              const matchedUser = users.find((u) => u.name.toLowerCase() === name.toLowerCase())
              return {
                name: matchedUser ? matchedUser.name : name,
                matric: matchedUser ? matchedUser.matric : 'N/A',
              }
            })
          : users.map((u) => ({ name: u.name, matric: u.matric }))

      const statuses = attendanceByMeeting[meeting.id] ?? {}

      return roster
        .filter((member) => (statuses[member.name] ?? 'unmarked') === 'absent')
        .map((member) => ({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          service: meeting.service,
          date: meeting.date,
          name: member.name,
          matric: member.matric,
        }))
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const filteredRows = absentRows.filter((row) => {
    if (normalizedQuery === '') return true
    return (
      row.name.toLowerCase().includes(normalizedQuery) ||
      row.matric.toLowerCase().includes(normalizedQuery) ||
      row.meetingTitle.toLowerCase().includes(normalizedQuery)
    )
  })

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Defaulters List (Chapel)</h1>
          <p className="page-subtitle">Reports / Defaulters List(Chapel)</p>
        </div>
      </div>

      <p className="text-sm text-slate-500">{filteredRows.length.toLocaleString()} absent records</p>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by name, matric, or meeting..."
          className="premium-input w-full"
        />
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Service</th>
              <th className="px-4 py-3">Meeting</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {filteredRows.map((row, index) => (
              <tr key={`${row.meetingId}-${row.name}-${index}`} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-indigo-700">{row.name}</td>
                <td className="px-4 py-3 text-slate-600">{row.matric}</td>
                <td className="px-4 py-3 text-slate-600">{row.service}</td>
                <td className="px-4 py-3 text-slate-600">{row.meetingTitle}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">Absent</span>
                </td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">No absent records found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
