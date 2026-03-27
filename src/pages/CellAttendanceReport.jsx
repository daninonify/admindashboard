import { useEffect, useState } from 'react'
import { useData } from '../context/DataContext'

export default function CellAttendanceReport() {
  const { meetings, usersData: users, attendanceByMeeting } = useData()

  const cellMeetings = meetings.filter((meeting) => (meeting.type ?? 'Cell') === 'Cell')
  const [query, setQuery] = useState('')
  const [cellFilter, setCellFilter] = useState('all')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [selectedMeetingId, setSelectedMeetingId] = useState(null)

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

  const allReportRows = cellMeetings.map((meeting) => {
    const roster = getMeetingRoster(meeting)
    const statuses = attendanceByMeeting[meeting.id] ?? {}

    const present = roster.reduce(
      (count, member) => count + ((statuses[member.name] ?? 'unmarked') === 'present' ? 1 : 0),
      0
    )
    const absent = roster.reduce(
      (count, member) => count + ((statuses[member.name] ?? 'unmarked') === 'absent' ? 1 : 0),
      0
    )
    const unmarked = Math.max(roster.length - present - absent, 0)
    const marked = present + absent
    const attendanceRate = marked > 0 ? (present / marked) * 100 : 0

    return {
      ...meeting,
      roster,
      total: roster.length,
      present,
      absent,
      unmarked,
      marked,
      attendanceRate,
    }
  })

  const filteredRows = allReportRows
    .filter((row) => {
      if (normalizedQuery === '') {
        return true
      }

      return (
        row.title.toLowerCase().includes(normalizedQuery) ||
        row.cell.toLowerCase().includes(normalizedQuery)
      )
    })
    .filter((row) => (cellFilter === 'all' ? true : row.cell === cellFilter))
    .filter((row) => (fromDate ? row.date >= fromDate : true))
    .filter((row) => (toDate ? row.date <= toDate : true))
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  useEffect(() => {
    if (filteredRows.length === 0) {
      setSelectedMeetingId(null)
      return
    }

    if (!filteredRows.some((row) => row.id === selectedMeetingId)) {
      setSelectedMeetingId(filteredRows[0].id)
    }
  }, [filteredRows, selectedMeetingId])

  const uniqueCells = [...new Set(cellMeetings.map((meeting) => meeting.cell))].sort()
  const selectedRow = filteredRows.find((row) => row.id === selectedMeetingId) ?? null
  const selectedStatuses = selectedRow ? attendanceByMeeting[selectedRow.id] ?? {} : {}

  const totals = filteredRows.reduce(
    (acc, row) => {
      acc.meetings += 1
      acc.total += row.total
      acc.marked += row.marked
      acc.present += row.present
      acc.absent += row.absent
      return acc
    },
    { meetings: 0, total: 0, marked: 0, present: 0, absent: 0 }
  )

  const overallRate = totals.marked > 0 ? (totals.present / totals.marked) * 100 : 0

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Cell Attendance Report</h1>
          <p className="page-subtitle">Reports / Cell Attendance Report</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
        <div className="rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Meetings</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.meetings}</p>
        </div>
        <div className="rounded-2xl border border-slate-200/80 bg-white/75 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Attendees</p>
          <p className="mt-2 text-2xl font-semibold text-slate-900">{totals.total}</p>
        </div>
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Present</p>
          <p className="mt-2 text-2xl font-semibold text-emerald-900">{totals.present}</p>
        </div>
        <div className="rounded-2xl border border-rose-200/80 bg-rose-50/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Absent</p>
          <p className="mt-2 text-2xl font-semibold text-rose-900">{totals.absent}</p>
        </div>
        <div className="rounded-2xl border border-cyan-200/80 bg-cyan-50/80 px-4 py-3">
          <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Attendance Rate</p>
          <p className="mt-2 text-2xl font-semibold text-cyan-900">{overallRate.toFixed(1)}%</p>
        </div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <div className="grid gap-3 lg:grid-cols-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by meeting title or cell..."
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

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="premium-input"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="premium-input"
          />
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">Meeting</th>
              <th className="px-4 py-3">Cell Group</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Present</th>
              <th className="px-4 py-3">Absent</th>
              <th className="px-4 py-3">Unmarked</th>
              <th className="px-4 py-3">Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {filteredRows.map((row) => {
              const isSelected = row.id === selectedMeetingId

              return (
                <tr
                  key={row.id}
                  className={`cursor-pointer ${isSelected ? 'bg-cyan-50/70' : 'hover:bg-slate-50/80'}`}
                  onClick={() => setSelectedMeetingId(row.id)}
                >
                  <td className="px-4 py-3 font-medium text-slate-800">{row.title}</td>
                  <td className="px-4 py-3 text-slate-600">{row.cell}</td>
                  <td className="px-4 py-3 text-slate-600">{new Date(row.date).toLocaleDateString()}</td>
                  <td className="px-4 py-3 text-slate-600">{row.total}</td>
                  <td className="px-4 py-3 text-emerald-700">{row.present}</td>
                  <td className="px-4 py-3 text-rose-700">{row.absent}</td>
                  <td className="px-4 py-3 text-slate-600">{row.unmarked}</td>
                  <td className="px-4 py-3 text-cyan-700 font-semibold">{row.attendanceRate.toFixed(1)}%</td>
                </tr>
              )
            })}
            {filteredRows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-8 text-center text-sm text-slate-400">
                  No report records match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedRow && (
        <div className="rounded-3xl border border-slate-200/80 bg-white/80 p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">{selectedRow.title}</p>
              <p className="mt-1 text-xs text-slate-500">{selectedRow.cell} · {new Date(selectedRow.date).toLocaleDateString()}</p>
            </div>
            <span className="rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-700">
              Detail View
            </span>
          </div>

          <div className="mt-4 table-shell overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Matric</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100/80">
                {selectedRow.roster.map((member) => {
                  const status = selectedStatuses[member.name] ?? 'unmarked'

                  return (
                    <tr key={member.key}>
                      <td className="px-4 py-3 font-medium text-slate-800">{member.name}</td>
                      <td className="px-4 py-3 text-slate-600">{member.matric}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            status === 'present'
                              ? 'bg-emerald-100 text-emerald-700'
                              : status === 'absent'
                                ? 'bg-rose-100 text-rose-700'
                                : 'bg-slate-100 text-slate-600'
                          }`}
                        >
                          {status === 'present' ? 'Present' : status === 'absent' ? 'Absent' : 'Unmarked'}
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
