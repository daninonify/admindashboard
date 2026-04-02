import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useData } from '../context/DataContext'

export default function CellAttendance() {
  const { meetings, usersData: users, attendanceByMeeting, setAttendanceByMeeting } = useData()
  const navigate = useNavigate()

  const cellMeetings = meetings.filter((meeting) => (meeting.type ?? 'Cell') === 'Cell')
  const [selectedMeetingId, setSelectedMeetingId] = useState(cellMeetings[0]?.id ?? null)
  const [searchQuery, setSearchQuery] = useState('')
  const [onlyUnmarked, setOnlyUnmarked] = useState(false)

  useEffect(() => {
    if (cellMeetings.length === 0) {
      setSelectedMeetingId(null)
      return
    }

    if (!cellMeetings.some((meeting) => meeting.id === selectedMeetingId)) {
      setSelectedMeetingId(cellMeetings[0].id)
    }
  }, [cellMeetings, selectedMeetingId])

  const statusConfig = {
    unmarked: { label: 'Unmarked', className: 'bg-slate-100 text-slate-600' },
    present: { label: 'Present', className: 'bg-emerald-100 text-emerald-700' },
    absent: { label: 'Absent', className: 'bg-rose-100 text-rose-700' },
  }

  const selectedMeeting = cellMeetings.find((meeting) => meeting.id === selectedMeetingId) ?? null
  const selectedStatuses = selectedMeeting ? attendanceByMeeting[selectedMeeting.id] ?? {} : {}
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const roster = selectedMeeting
    ? (selectedMeeting.attendees.length > 0
        ? selectedMeeting.attendees.map((name) => {
            const matchedUser = users.find(
              (user) => user.name.toLowerCase() === name.toLowerCase()
            )

            return {
              key: matchedUser ? `user-${matchedUser.id}` : `name-${name}`,
              name: matchedUser ? matchedUser.name : name,
              matric: matchedUser ? matchedUser.matric : 'N/A',
              cell: matchedUser ? matchedUser.cell : selectedMeeting.cell,
            }
          })
        : users
            .filter((user) => user.cell === selectedMeeting.cell)
            .map((user) => ({
              key: `user-${user.id}`,
              name: user.name,
              matric: user.matric,
              cell: user.cell,
            })))
    : []

  const visibleRoster = roster.filter((member) => {
    const memberStatus = selectedStatuses[member.name] ?? 'unmarked'

    if (onlyUnmarked && memberStatus !== 'unmarked') {
      return false
    }

    if (normalizedQuery === '') {
      return true
    }

    return (
      member.name.toLowerCase().includes(normalizedQuery) ||
      member.matric.toLowerCase().includes(normalizedQuery)
    )
  })

  const summary = roster.reduce(
    (acc, member) => {
      const status = selectedStatuses[member.name] ?? 'unmarked'
      acc[status] += 1
      return acc
    },
    { unmarked: 0, present: 0, absent: 0 }
  )

  const setMemberStatus = (memberName, nextStatus) => {
    if (!selectedMeeting) {
      return
    }

    setAttendanceByMeeting((prev) => ({
      ...prev,
      [selectedMeeting.id]: {
        ...(prev[selectedMeeting.id] ?? {}),
        [memberName]: nextStatus,
      },
    }))
  }

  const markAllPresent = () => {
    if (!selectedMeeting) {
      return
    }

    const nextStatuses = roster.reduce((acc, member) => {
      acc[member.name] = 'present'
      return acc
    }, {})

    setAttendanceByMeeting((prev) => ({
      ...prev,
      [selectedMeeting.id]: nextStatuses,
    }))
  }

  const resetMeetingAttendance = () => {
    if (!selectedMeeting) {
      return
    }

    setAttendanceByMeeting((prev) => ({
      ...prev,
      [selectedMeeting.id]: {},
    }))
  }

  if (cellMeetings.length === 0) {
    return (
      <div className="space-y-6">
        <div className="page-header-card">
          <div>
            <p className="eyebrow-label">Attendance tracker</p>
            <h1 className="page-title">Cell Attendance</h1>
            <p className="page-subtitle">Attendance / Cell</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">No cell meetings available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Create cell meetings first, then mark attendance from this page.</p>
          <button
            type="button"
            onClick={() => navigate('/meetings')}
            className="mt-5 inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            Go to Meetings
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Attendance tracker</p>
          <h1 className="page-title">Cell Attendance</h1>
          <p className="page-subtitle">Attendance / Cell</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Unmarked: {summary.unmarked}</div>
        <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">Present: {summary.present}</div>
        <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">Absent: {summary.absent}</div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
            <select
              value={selectedMeetingId ?? ''}
              onChange={(e) => setSelectedMeetingId(Number(e.target.value))}
              className="premium-input w-full md:max-w-md"
            >
              {[...cellMeetings]
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map((meeting) => (
                  <option key={meeting.id} value={meeting.id}>
                    {meeting.title} - {meeting.cell} - {new Date(meeting.date).toLocaleDateString()}
                  </option>
                ))}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search attendee by name or matric..."
              className="premium-input w-full md:max-w-md"
            />
            <label className="inline-flex items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                checked={onlyUnmarked}
                onChange={(e) => setOnlyUnmarked(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300 text-slate-900"
              />
              Show only unmarked
            </label>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={markAllPresent}
              className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700"
            >
              Mark all present
            </button>
            <button
              type="button"
              onClick={resetMeetingAttendance}
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Matric</th>
              <th className="px-4 py-3">Cell Group</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Mark</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {visibleRoster.map((member) => {
              const memberStatus = selectedStatuses[member.name] ?? 'unmarked'

              return (
                <tr key={member.key} className="hover:bg-slate-50/80">
                  <td className="px-4 py-3 font-medium text-slate-800">{member.name}</td>
                  <td className="px-4 py-3 text-slate-600">{member.matric}</td>
                  <td className="px-4 py-3 text-slate-600">{member.cell}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusConfig[memberStatus].className}`}>
                      {statusConfig[memberStatus].label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {['present', 'absent'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setMemberStatus(member.name, status)}
                          className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                            memberStatus === status
                              ? statusConfig[status].className
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {statusConfig[status].label}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {visibleRoster.length === 0 && (
        <div className="rounded-2xl border border-slate-200/80 bg-white/70 px-4 py-8 text-center text-sm text-slate-500">
          No attendees match your current filters.
        </div>
      )}
    </div>
  )
}
