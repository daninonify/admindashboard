import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function DefaultersCell() {
  const { meetings, usersData: users, attendanceByMeeting } = useData()

  const cellMeetings = meetings.filter((meeting) => (meeting.type ?? 'Cell') === 'Cell')
  const [query, setQuery] = useState('')
  const [cellFilter, setCellFilter] = useState('all')

  const normalizedQuery = query.trim().toLowerCase()

  const getMeetingRoster = (meeting) => {
    if (meeting.attendees.length > 0) {
      return meeting.attendees.map((name) => {
        const matchedUser = users.find((user) => user.name.toLowerCase() === name.toLowerCase())

        return {
          key: matchedUser ? `user-${matchedUser.id}` : `name-${name}`,
          name: matchedUser ? matchedUser.name : name,
          matric: matchedUser ? matchedUser.matric : 'N/A',
          cell: matchedUser ? matchedUser.cell : meeting.cell,
        }
      })
    }

    return users
      .filter((user) => user.cell === meeting.cell)
      .map((user) => ({
        key: `user-${user.id}`,
        name: user.name,
        matric: user.matric,
        cell: user.cell,
      }))
  }

  const absentRows = cellMeetings
    .flatMap((meeting) => {
      const roster = getMeetingRoster(meeting)
      const statuses = attendanceByMeeting[meeting.id] ?? {}

      return roster
        .filter((member) => (statuses[member.name] ?? 'unmarked') === 'absent')
        .map((member) => ({
          meetingId: meeting.id,
          meetingTitle: meeting.title,
          date: meeting.date,
          time: meeting.time,
          name: member.name,
          matric: member.matric,
          cell: member.cell,
        }))
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const uniqueCells = [...new Set(absentRows.map((row) => row.cell))].sort()

  const filteredRows = absentRows
    .filter((row) => {
      if (normalizedQuery === '') {
        return true
      }

      return (
        row.name.toLowerCase().includes(normalizedQuery) ||
        row.matric.toLowerCase().includes(normalizedQuery) ||
        row.meetingTitle.toLowerCase().includes(normalizedQuery)
      )
    })
    .filter((row) => (cellFilter === 'all' ? true : row.cell === cellFilter))

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Defaulters List (Cell)</h1>
          <p className="page-subtitle">Reports / Defaulters List(Cell)</p>
        </div>
      </div>

      <p className="text-sm text-slate-500">{filteredRows.length.toLocaleString()} absent records</p>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-3">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name, matric, or meeting..."
            className="premium-input"
          />

          <select
            value={cellFilter}
            onChange={(e) => setCellFilter(e.target.value)}
            className="premium-input"
          >
            <option value="all">All cell groups</option>
            {uniqueCells.map((cell) => (
              <option key={cell} value={cell}>{cell}</option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => {
              setQuery('')
              setCellFilter('all')
            }}
            className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Cell Group</th>
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
                <td className="px-4 py-3 text-slate-600">{row.cell}</td>
                <td className="px-4 py-3 text-slate-600">{row.meetingTitle}</td>
                <td className="px-4 py-3 text-slate-600">{new Date(row.date).toLocaleDateString()}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-rose-100 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    Absent
                  </span>
                </td>
              </tr>
            ))}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">
                  No absent records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
