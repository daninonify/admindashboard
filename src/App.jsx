import { useEffect, useState } from 'react'
import './App.css'

const navItems = [
  {
    label: 'Dashboard',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M3 13h8V3H3v10Zm0 8h8v-6H3v6Zm10 0h8V11h-8v10Zm0-18v6h8V3h-8Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 12c2.761 0 5-2.239 5-5S14.761 2 12 2 7 4.239 7 7s2.239 5 5 5Zm0 2c-3.866 0-7 3.134-7 7v1h14v-1c0-3.866-3.134-7-7-7Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Attendance',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M7 2v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7Zm0 6h10v12H7V8Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: [
      { label: 'Cell' },
      { label: 'Chapel' },
      { label: 'Faith Arena Chapel' },
    ],
  },
  {
    label: 'Meetings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M9 11a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm9-9H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2Zm-5 9a2 2 0 1 1 0-4 2 2 0 0 1 0 4Zm5 5h-3v3h-2v-3h-3v-2h3v-3h2v3h3v2Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
  {
    label: 'Reports',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M6 2h12a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm2 4v2h8V6H8Zm0 4v2h5v-2H8Zm0 4v2h8v-2H8Z"
          fill="currentColor"
        />
      </svg>
    ),
    children: [
      { label: 'Defaulters List(Cell)' },
      { label: 'Defaulters List(Chapel)' },
      { label: 'Defaulters List(Faith Arena Chapel)' },
      { label: 'Attendance Summary' },
      { label: 'Cell Attendance Report' },
      { label: 'Cell Group Report' },
      { label: 'Chapel Attendance Report' },
      { label: 'Export' },
    ],
  },
  {
    label: 'Settings',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm7.657 4.5a1 1 0 0 0 .825-1.324l-1.142-3.456a1 1 0 0 0-.793-.686l-3.854-.562a1 1 0 0 0-.767-.767l-3.456-1.142a1 1 0 0 0-1.324.825L7.5 8.343a1 1 0 0 0 .256.928l2.231 2.231a1 1 0 0 0 0 1.414l-2.231 2.231a1 1 0 0 0-.256.928l1.142 3.456a1 1 0 0 0 .825.687l3.456 1.142a1 1 0 0 0 .768-.767l.562-3.854a1 1 0 0 0 .686-.793l1.142-3.456Z"
          fill="currentColor"
        />
      </svg>
    ),
  },
]

const seedUsers = [
  { id: 1, name: 'IRABOR, OMOYE', gender: 'Female', matric: 'SMS/ACC/230341', cell: 'Shabach Mondays 7PM - 8PM, Cell 2' },
  { id: 2, name: 'OJERAHI, PROSPER', gender: 'Female', matric: 'SMS/ACC/230020', cell: 'Shabach Mondays 7PM - 8PM, Cell 2' },
  { id: 3, name: 'Chibuike, Amarachi', gender: 'Female', matric: 'SMS/SOC/240103', cell: 'Shabach Mondays 7PM - 8PM, Cell 4' },
  { id: 4, name: 'Ibrahim, Divine', gender: 'Female', matric: 'SMS/MAC/241329', cell: 'Cedar Sundays 4PM - 5PM, Cell 1' },
  { id: 5, name: 'OJEATA, SONIA', gender: 'Female', matric: 'SMS/MAC/240282', cell: 'Agape Mondays 6PM - 7PM, Cell 1' },
  { id: 6, name: 'ALBERT, WEMI', gender: 'Female', matric: 'SMS/SOC/241188', cell: 'Agape Mondays 6PM - 7PM, Cell 4' },
  { id: 7, name: 'CHRIS, ISEOSA', gender: 'Female', matric: 'SMS/MAC/240955', cell: 'Agape Mondays 6PM - 7PM, Cell 2' },
  { id: 8, name: 'OTUYA, GIFT', gender: 'Female', matric: 'SMS/MAC/240039', cell: 'Agape Mondays 6PM - 7PM, Cell 2' },
  { id: 9, name: 'Nafami, Tamaralayefa', gender: 'Female', matric: 'SMS/BUS/241544', cell: 'Shabach Mondays 7PM - 8PM, Cell 3' },
  { id: 10, name: 'Akpan, Blessing', gender: 'Female', matric: 'SMS/MAC/240240', cell: 'Agape Mondays 6PM - 7PM, Cell 4' },
  { id: 11, name: 'BODOR, ORITSETSEUNDEDE', gender: 'Female', matric: 'SMS/ACC/230825', cell: 'Cedar Sundays 4PM - 5PM, Cell 3' },
  { id: 12, name: 'OGBEBOR, AISOSA', gender: 'Female', matric: 'SMS/SOC/241216', cell: 'Agape Mondays 6PM - 7PM, Cell 4' },
  { id: 13, name: 'AYOMIKE-JEMEGBE, ORITSEGBUBEMI', gender: 'Female', matric: 'SMS/MAC/241498', cell: 'Agape Mondays 6PM - 7PM, Cell 2' },
  { id: 14, name: 'IGBADIWEI, PEREWARE', gender: 'Female', matric: 'SMS/MAC/230141', cell: 'Cedar Sundays 4PM - 5PM, Cell 3' },
  { id: 15, name: 'IKEM, PEARL', gender: 'Female', matric: 'SMS/ECO/241557', cell: 'Shabach Mondays 7PM - 8PM, Cell 1' },
]

const chapelAttendanceRecords = [
  { id: 1, name: 'IRABOR, OMOYE', service: 'Morning Service', date: '2026-03-16' },
  { id: 2, name: 'OJERAHI, PROSPER', service: 'Morning Service', date: '2026-03-16' },
  { id: 3, name: 'CHRIS, ISEOSA', service: 'Morning Service', date: '2026-03-16' },
  { id: 4, name: 'AKPAN, BLESSING', service: 'Evening Service', date: '2026-03-16' },
  { id: 5, name: 'IKEM, PEARL', service: 'Evening Service', date: '2026-03-16' },
  { id: 6, name: 'ALBERT, WEMI', service: 'Communion Service', date: '2026-03-16' },
  { id: 7, name: 'OGBEBOR, AISOSA', service: 'Communion Service', date: '2026-03-16' },
  { id: 8, name: 'OTUYA, GIFT', service: 'Morning Service', date: '2026-03-09' },
  { id: 9, name: 'IGBADIWEI, PEREWARE', service: 'Evening Service', date: '2026-03-09' },
  { id: 10, name: 'AYOMIKE-JEMEGBE, ORITSEGBUBEMI', service: 'Communion Service', date: '2026-03-09' },
]

const seedMeetings = [
  { id: 1, type: 'Cell', title: 'Cell Leaders Meeting', cell: 'Shabach Mondays 7PM - 8PM, Cell 2', service: '', date: '2026-03-24', time: '19:00', attendees: ['IRABOR, OMOYE', 'OJERAHI, PROSPER', 'Nafami, Tamaralayefa'] },
  { id: 2, type: 'Cell', title: 'Worship Team Meeting', cell: 'Cedar Sundays 4PM - 5PM, Cell 1', service: '', date: '2026-03-23', time: '16:00', attendees: ['Ibrahim, Divine', 'BODOR, ORITSETSEUNDEDE', 'IGBADIWEI, PEREWARE'] },
  { id: 3, type: 'Cell', title: 'Agape Cell Group', cell: 'Agape Mondays 6PM - 7PM, Cell 1', service: '', date: '2026-03-24', time: '18:00', attendees: ['OJEATA, SONIA', 'ALBERT, WEMI', 'Akpan, Blessing'] },
  { id: 4, type: 'Chapel', title: 'Sunday Morning Chapel', cell: '', service: 'Morning Service', date: '2026-03-25', time: '08:00', attendees: ['IRABOR, OMOYE', 'CHRIS, ISEOSA', 'IKEM, PEARL'] },
]

const USERS_API_URL = import.meta.env.VITE_USERS_API_URL ?? '/api/users'
const MEETINGS_API_URL = import.meta.env.VITE_MEETINGS_API_URL ?? '/api/meetings'

function normalizeMeetingRecord(record, index) {
  const normalizedAttendees = Array.isArray(record?.attendees)
    ? record.attendees
        .map((attendee) => {
          if (typeof attendee === 'string') {
            return attendee.trim()
          }

          return (attendee?.name ?? attendee?.fullName ?? '').trim()
        })
        .filter((name) => name !== '')
    : []

  return {
    id: Number.isFinite(record?.id) ? record.id : index + 1,
    type: record?.type === 'Chapel' ? 'Chapel' : 'Cell',
    title: record?.title ?? 'Untitled Meeting',
    cell: record?.cell ?? '',
    service: record?.service ?? '',
    date: record?.date ?? new Date().toISOString().slice(0, 10),
    time: record?.time ?? '18:00',
    attendees: normalizedAttendees,
  }
}

function normalizeUserRecord(record, index) {
  return {
    id: Number.isFinite(record?.id) ? record.id : index + 1,
    name: record?.name ?? record?.fullName ?? 'Unknown User',
    gender: record?.gender ?? 'N/A',
    matric: record?.matric ?? record?.matricNumber ?? 'N/A',
    cell: record?.cell ?? '',
  }
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }

  return response.json()
}

function MeetingsView({ meetings, setMeetings, users }) {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    type: 'Cell',
    title: '',
    cell: '',
    service: '',
    date: '',
    time: '18:00',
    attendees: '',
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddMeeting = (e) => {
    e.preventDefault()
    const isCellMeeting = formData.type === 'Cell'
    if (!formData.title || !formData.date || (isCellMeeting && !formData.cell) || (!isCellMeeting && !formData.service)) {
      alert('Please fill in all required fields')
      return
    }

    const attendeeList = formData.attendees
      .split(',')
      .map((a) => a.trim())
      .filter((a) => a !== '')

    const newMeeting = {
      id: meetings.reduce((maxId, meeting) => Math.max(maxId, meeting.id), 0) + 1,
      type: formData.type,
      title: formData.title,
      cell: isCellMeeting ? formData.cell : '',
      service: isCellMeeting ? '' : formData.service,
      date: formData.date,
      time: formData.time,
      attendees: attendeeList,
    }

    setMeetings((prev) => [...prev, newMeeting])
    setFormData({
      type: 'Cell',
      title: '',
      cell: '',
      service: '',
      date: '',
      time: '18:00',
      attendees: '',
    })
    setShowForm(false)
  }

  const sortedMeetings = [...meetings].sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Event management</p>
          <h1 className="page-title">Meetings</h1>
          <p className="page-subtitle">Dashboard / Meetings</p>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-lg lg:flex">
          <div className="h-10 w-10 rounded-2xl bg-white/10" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">Total meetings</p>
            <p className="text-sm font-semibold">{meetings.length} scheduled</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          {showForm ? '✕ Cancel' : '+ Add Meeting'}
        </button>
      </div>

      {showForm && (
        <div className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-6">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Add New Meeting</h2>
          <form onSubmit={handleAddMeeting} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="type" className="eyebrow-label mb-2 block">
                  Meeting Type *
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="premium-input"
                  required
                >
                  <option value="Cell">Cell</option>
                  <option value="Chapel">Chapel</option>
                </select>
              </div>
              <div>
                <label htmlFor="title" className="eyebrow-label mb-2 block">
                  Meeting Title *
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Cell Leaders Meeting"
                  className="premium-input"
                  required
                />
              </div>
              {formData.type === 'Cell' ? (
                <div>
                  <label htmlFor="cell" className="eyebrow-label mb-2 block">
                    Cell Group *
                  </label>
                  <select
                    id="cell"
                    name="cell"
                    value={formData.cell}
                    onChange={handleInputChange}
                    className="premium-input"
                    required
                  >
                    <option value="">Select a cell group</option>
                    <option value="Shabach Mondays 7PM - 8PM, Cell 2">Shabach Mondays 7PM - 8PM, Cell 2</option>
                    <option value="Shabach Mondays 7PM - 8PM, Cell 1">Shabach Mondays 7PM - 8PM, Cell 1</option>
                    <option value="Shabach Mondays 7PM - 8PM, Cell 3">Shabach Mondays 7PM - 8PM, Cell 3</option>
                    <option value="Shabach Mondays 7PM - 8PM, Cell 4">Shabach Mondays 7PM - 8PM, Cell 4</option>
                    <option value="Cedar Sundays 4PM - 5PM, Cell 1">Cedar Sundays 4PM - 5PM, Cell 1</option>
                    <option value="Cedar Sundays 4PM - 5PM, Cell 3">Cedar Sundays 4PM - 5PM, Cell 3</option>
                    <option value="Agape Mondays 6PM - 7PM, Cell 1">Agape Mondays 6PM - 7PM, Cell 1</option>
                    <option value="Agape Mondays 6PM - 7PM, Cell 2">Agape Mondays 6PM - 7PM, Cell 2</option>
                    <option value="Agape Mondays 6PM - 7PM, Cell 4">Agape Mondays 6PM - 7PM, Cell 4</option>
                  </select>
                </div>
              ) : (
                <div>
                  <label htmlFor="service" className="eyebrow-label mb-2 block">
                    Chapel Service *
                  </label>
                  <input
                    id="service"
                    name="service"
                    type="text"
                    value={formData.service}
                    onChange={handleInputChange}
                    placeholder="e.g., Friday Service"
                    className="premium-input"
                    required
                  />
                </div>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="date" className="eyebrow-label mb-2 block">
                  Meeting Date *
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="premium-input"
                  required
                />
              </div>
              <div>
                <label htmlFor="time" className="eyebrow-label mb-2 block">
                  Meeting Time
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  value={formData.time}
                  onChange={handleInputChange}
                  className="premium-input"
                />
              </div>
            </div>

            <div>
              <label htmlFor="attendees" className="eyebrow-label mb-2 block">
                Attendees (comma-separated names)
              </label>
              <textarea
                id="attendees"
                name="attendees"
                value={formData.attendees}
                onChange={handleInputChange}
                placeholder="e.g., John Doe, Jane Smith, Michael Brown"
                className="premium-input resize-none"
                rows="3"
              />
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-600/15 transition hover:-translate-y-0.5 hover:bg-emerald-700"
              >
                Save Meeting
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="inline-flex items-center justify-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Meeting Title</th>
              <th className="px-4 py-3">Group / Service</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Time</th>
              <th className="px-4 py-3">Attendees</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {sortedMeetings.map((meeting) => (
              <tr key={meeting.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-600">{meeting.type ?? 'Cell'}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{meeting.title}</td>
                <td className="px-4 py-3 text-slate-600">{meeting.type === 'Chapel' ? meeting.service : meeting.cell}</td>
                <td className="px-4 py-3 text-slate-600">
                  {new Date(meeting.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric',
                  })}
                </td>
                <td className="px-4 py-3 text-slate-600">{meeting.time}</td>
                <td className="px-4 py-3 text-slate-600">
                  <span className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {meeting.attendees.length}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setMeetings((prev) => prev.filter((m) => m.id !== meeting.id))
                    }}
                    className="text-slate-400 hover:text-red-600"
                    title="Delete"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="inline h-4 w-4">
                      <path
                        d="M19 7l-1.405 16.482A2 2 0 0 1 15.649 25h-7.298a2 2 0 0 1-1.946-1.518L5 7m5 4v6m4-6v6M4 7h16M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {meetings.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-slate-400">
                  No meetings scheduled. Add one to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {meetings.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Meeting Attendance Impact on Cell Attendance</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sortedMeetings.map((meeting) => (
              <div key={meeting.id} className="rounded-3xl border border-slate-200/80 bg-slate-50/70 p-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-semibold text-slate-900">{meeting.title}</p>
                    <p className="mt-1 text-xs text-slate-500">{meeting.type === 'Chapel' ? meeting.service : meeting.cell}</p>
                  </div>
                  <div className="rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-700">
                    {new Date(meeting.date).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </div>
                </div>
                <div className="mt-4 space-y-2 rounded-2xl bg-white p-3">
                  <p className="text-xs font-semibold text-slate-600 uppercase">Attendees at this meeting</p>
                  <ul className="space-y-1 text-xs text-slate-600">
                    {meeting.attendees.slice(0, 3).map((attendee, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        {attendee}
                      </li>
                    ))}
                    {meeting.attendees.length > 3 && (
                      <li className="text-slate-500">+{meeting.attendees.length - 3} more</li>
                    )}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const performanceRows = [
  { label: 'Morning Service', attendance: '428 attendees', trend: '+8.4%' },
  { label: 'Faith Arena Chapel', attendance: '319 attendees', trend: '+5.1%' },
  { label: 'Cell Network', attendance: '760 attendees', trend: '+11.3%' },
]

function ChapelAttendanceView({ meetings, users, attendanceByMeeting, setAttendanceByMeeting, onOpenMeetings }) {
  const chapelMeetings = meetings.filter((meeting) => meeting.type === 'Chapel')
  const [selectedMeetingId, setSelectedMeetingId] = useState(chapelMeetings[0]?.id ?? null)
  const [searchQuery, setSearchQuery] = useState('')
  const [onlyUnmarked, setOnlyUnmarked] = useState(false)

  useEffect(() => {
    if (chapelMeetings.length === 0) {
      setSelectedMeetingId(null)
      return
    }

    if (!chapelMeetings.some((meeting) => meeting.id === selectedMeetingId)) {
      setSelectedMeetingId(chapelMeetings[0].id)
    }
  }, [chapelMeetings, selectedMeetingId])

  const statusConfig = {
    unmarked: { label: 'Unmarked', className: 'bg-slate-100 text-slate-600' },
    present: { label: 'Present', className: 'bg-emerald-100 text-emerald-700' },
    absent: { label: 'Absent', className: 'bg-rose-100 text-rose-700' },
  }

  const selectedMeeting = chapelMeetings.find((meeting) => meeting.id === selectedMeetingId) ?? null
  const selectedStatuses = selectedMeeting ? attendanceByMeeting[selectedMeeting.id] ?? {} : {}
  const normalizedQuery = searchQuery.trim().toLowerCase()

  const roster = selectedMeeting
    ? (selectedMeeting.attendees.length > 0
        ? selectedMeeting.attendees.map((name) => {
            const matchedUser = users.find((user) => user.name.toLowerCase() === name.toLowerCase())

            return {
              key: matchedUser ? `user-${matchedUser.id}` : `name-${name}`,
              name: matchedUser ? matchedUser.name : name,
              matric: matchedUser ? matchedUser.matric : 'N/A',
              service: selectedMeeting.service,
            }
          })
        : users.map((user) => ({
            key: `user-${user.id}`,
            name: user.name,
            matric: user.matric,
            service: selectedMeeting.service,
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

  if (chapelMeetings.length === 0) {
    return (
      <div className="space-y-6">
        <div className="page-header-card">
          <div>
            <p className="eyebrow-label">Attendance tracker</p>
            <h1 className="page-title">Chapel Attendance</h1>
            <p className="page-subtitle">Attendance / Chapel</p>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200/80 bg-white/70 p-8 text-center shadow-sm">
          <p className="text-lg font-semibold text-slate-900">No chapel meetings available yet.</p>
          <p className="mt-2 text-sm text-slate-500">Create chapel meetings first, then mark attendance from this page.</p>
          <button
            type="button"
            onClick={onOpenMeetings}
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
          <h1 className="page-title">Chapel Attendance</h1>
          <p className="page-subtitle">Attendance / Chapel</p>
        </div>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-1">
        {[...chapelMeetings]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((meeting) => {
            const isActive = selectedMeetingId === meeting.id

            return (
              <button
                key={meeting.id}
                type="button"
                onClick={() => setSelectedMeetingId(meeting.id)}
                className={`min-w-[240px] rounded-3xl border px-4 py-4 text-left transition ${
                  isActive
                    ? 'border-cyan-300 bg-cyan-50 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-200/80 bg-white/75 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {new Date(meeting.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{meeting.title}</p>
                <p className="mt-1 text-xs text-slate-500">{meeting.service}</p>
              </button>
            )
          })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Unmarked: {summary.unmarked}</div>
        <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">Present: {summary.present}</div>
        <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">Absent: {summary.absent}</div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
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
              <th className="px-4 py-3">Service</th>
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
                  <td className="px-4 py-3 text-slate-600">{member.service}</td>
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
            {visibleRoster.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-slate-400">
                  No chapel attendees match your current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function AttendanceView({ meetings, users, attendanceByMeeting, setAttendanceByMeeting, onOpenMeetings }) {
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
            onClick={onOpenMeetings}
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

      <div className="flex gap-3 overflow-x-auto pb-1">
        {[...cellMeetings]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .map((meeting) => {
            const isActive = selectedMeetingId === meeting.id

            return (
              <button
                key={meeting.id}
                type="button"
                onClick={() => setSelectedMeetingId(meeting.id)}
                className={`min-w-[240px] rounded-3xl border px-4 py-4 text-left transition ${
                  isActive
                    ? 'border-cyan-300 bg-cyan-50 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-200/80 bg-white/75 hover:border-slate-300 hover:bg-white'
                }`}
              >
                <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                  {new Date(meeting.date).toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                  })}
                </p>
                <p className="mt-2 text-sm font-semibold text-slate-900">{meeting.title}</p>
                <p className="mt-1 text-xs text-slate-500">{meeting.cell}</p>
              </button>
            )
          })}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <div className="rounded-2xl bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Unmarked: {summary.unmarked}</div>
        <div className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-semibold text-emerald-700">Present: {summary.present}</div>
        <div className="rounded-2xl bg-rose-100 px-4 py-3 text-sm font-semibold text-rose-700">Absent: {summary.absent}</div>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white/75 p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center">
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

function CellAttendanceReportView({ meetings, users, attendanceByMeeting }) {
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

function DefaultersChapelView({ meetings, users, attendanceByMeeting }) {
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

function UsersView({ users }) {
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const normalizedQuery = submitted.trim().toLowerCase()

  const filtered = users.filter(
    (u) =>
      normalizedQuery === '' ||
      u.name.toLowerCase().includes(normalizedQuery) ||
      u.matric.toLowerCase().includes(normalizedQuery) ||
      u.cell.toLowerCase().includes(normalizedQuery)
  )

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">People directory</p>
          <h1 className="page-title">2025/2026 Session</h1>
          <p className="page-subtitle">Dashboard / Users</p>
        </div>
        <div className="hidden rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-right lg:block">
          <p className="text-xs uppercase tracking-[0.24em] text-emerald-700">Roster size</p>
          <p className="mt-1 text-2xl font-semibold text-emerald-950">{users.length.toLocaleString()}</p>
        </div>
      </div>

      <p className="text-sm text-slate-500">{users.length.toLocaleString()} Registered Students</p>

      <div className="filter-shell flex flex-col gap-3 md:flex-row md:items-center">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setSubmitted(query)
              setHasSearched(true)
            }
          }}
          placeholder="Search by name, matric or cell group…"
          className="premium-input flex-1"
        />
        <button
          type="button"
          onClick={() => {
            setSubmitted(query)
            setHasSearched(true)
          }}
          className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-slate-950/15 transition hover:-translate-y-0.5 hover:bg-slate-800"
        >
          Search
        </button>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Gender</th>
              <th className="px-4 py-3">Matric Number</th>
              <th className="px-4 py-3">Cell Group</th>
              <th className="px-4 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {hasSearched && filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-500">{user.id}</td>
                <td className="cursor-pointer px-4 py-3 font-medium text-indigo-700 hover:underline">{user.name}</td>
                <td className="px-4 py-3 text-slate-600">{user.gender}</td>
                <td className="px-4 py-3 text-slate-600">{user.matric}</td>
                <td className="px-4 py-3 text-slate-600">{user.cell}</td>
                <td className="px-4 py-3 text-right">
                  <button type="button" className="text-slate-400 hover:text-indigo-600" title="Edit">
                    <svg viewBox="0 0 24 24" fill="none" className="inline h-4 w-4">
                      <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 0 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H8v-2.414a2 2 0 0 1 .586-1.414Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {!hasSearched && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">Search to view users.</td>
              </tr>
            )}
            {hasSearched && filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const stats = [
  { label: 'Registered', value: 4794 },
  { label: 'Males', value: 2128 },
  { label: 'Females', value: 2666 },
  { label: 'Cells', value: 12 },
  { label: 'Sub-Cells', value: 60 },
  { label: 'Unregistered', value: 1209 },
]

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Dashboard')
  const [openGroup, setOpenGroup] = useState('Attendance')
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [usersData, setUsersData] = useState(seedUsers)
  const [meetings, setMeetings] = useState(seedMeetings)
  const [attendanceByMeeting, setAttendanceByMeeting] = useState({})
  const [dataSourceNote, setDataSourceNote] = useState('')

  const hasPage = (label) =>
    label === 'Dashboard' ||
    label === 'Users' ||
    label === 'Cell' ||
    label === 'Meetings' ||
    label === 'Defaulters List(Cell)' ||
    label === 'Cell Attendance Report' ||
    label === 'Chapel' ||
    label === 'Chapel Attendance Report'

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

  useEffect(() => {
    let cancelled = false

    const loadDatabaseData = async () => {
      const [usersResult, meetingsResult] = await Promise.allSettled([
        fetchJson(USERS_API_URL),
        fetchJson(MEETINGS_API_URL),
      ])

      if (cancelled) {
        return
      }

      const notes = []

      if (usersResult.status === 'fulfilled' && Array.isArray(usersResult.value)) {
        setUsersData(usersResult.value.map(normalizeUserRecord))
      } else {
        notes.push('Users endpoint unavailable, using local seed users.')
      }

      if (meetingsResult.status === 'fulfilled' && Array.isArray(meetingsResult.value)) {
        setMeetings(meetingsResult.value.map(normalizeMeetingRecord))
      } else {
        notes.push('Meetings endpoint unavailable, using local seed meetings.')
      }

      setDataSourceNote(notes.join(' '))
    }

    loadDatabaseData()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <div className="dashboard-shell min-h-screen text-slate-900">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ambient-orb ambient-orb-one" />
        <div className="ambient-orb ambient-orb-two" />
        <div className="ambient-grid" />
      </div>

      <div className="relative flex min-h-screen">
        <div
          className={`fixed inset-0 z-30 bg-slate-900/50 transition-opacity md:hidden ${
            sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setSidebarOpen(false)}
        />

        <aside
          className={`sidebar-panel fixed inset-y-0 left-0 z-40 w-72 transform overflow-y-auto px-4 py-6 transition-transform md:relative md:translate-x-0 ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          }`}
        >
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/12 font-semibold text-white shadow-lg shadow-slate-950/30 ring-1 ring-white/10">
                CP
              </div>
              <div>
                <div className="font-display text-lg font-semibold text-white">Cell Portal</div>
                <div className="text-xs text-slate-300">Admin dashboard</div>
              </div>
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/10 transition hover:bg-white/15 md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="text-lg">✕</span>
            </button>
          </div>

          <nav className="mt-10 flex flex-1 flex-col gap-1 text-sm">
            {navItems.map((item) => {
              const isActive =
                activeNav === item.label ||
                (item.children?.some((child) => child.label === activeNav) ?? false)
              const isOpen = openGroup === item.label

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.children) {
                        setOpenGroup(isOpen ? null : item.label)
                      } else {
                        if (hasPage(item.label)) {
                          setActiveNav(item.label)
                        }
                        setSidebarOpen(false)
                      }
                    }}
                    className={`nav-button group flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                      isActive
                        ? 'nav-button-active text-white'
                        : 'text-slate-300 hover:text-white'
                    }`}
                  >
                    <span className={`${isActive ? 'text-white' : 'text-cyan-300'}`}>{item.icon}</span>
                    <span className="font-medium">{item.label}</span>
                    {item.children && (
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        aria-hidden="true"
                        className={`ml-auto h-4 w-4 shrink-0 ${isActive ? 'text-white/80' : 'text-slate-400'} transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`}
                      >
                        <path
                          d="M9 18l6-6-6-6"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {item.children && isOpen && (
                    <div className="mt-2 flex flex-col gap-1 px-3">
                      {item.children.map((child) => (
                        <button
                          key={child.label}
                          type="button"
                          onClick={() => {
                            if (hasPage(child.label)) {
                              setActiveNav(child.label)
                            }
                            setSidebarOpen(false)
                          }}
                          className={`nav-child-button flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                            activeNav === child.label
                              ? 'nav-child-active text-white'
                              : 'text-slate-300 hover:text-white'
                          }`}
                        >
                          <span className="ml-5">{child.label}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}

            <div className="mt-auto">
              <button className="nav-button mt-6 flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-slate-300 transition hover:text-white">
                <span className="text-cyan-300" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                    <path d="M10 4h7a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1h-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3 12h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="m9 8 4 4-4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </nav>
        </aside>

        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-white/50 bg-white/70 px-4 py-4 backdrop-blur-xl sm:px-6 lg:px-8">
            <div className="flex items-center justify-between gap-4 rounded-[28px] border border-white/60 bg-white/55 px-4 py-3 shadow-[0_24px_70px_-44px_rgba(15,23,42,0.5)] ring-1 ring-white/70">
            <div className="flex items-center gap-3">
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg shadow-slate-950/20 transition hover:-translate-y-0.5 md:hidden"
                onClick={() => setSidebarOpen(true)}
                aria-label="Open navigation"
              >
                <span className="text-lg">≡</span>
              </button>
              <div>
                <p className="eyebrow-label">Welcome back</p>
                <p className="font-display text-lg font-semibold text-slate-950">Andrew Enodolomwanyi</p>
              </div>
            </div>

            <div className="relative flex items-center gap-3">
              <button
                type="button"
                onClick={() => setProfileMenuOpen((prev) => !prev)}
                className="inline-flex items-center gap-3 rounded-2xl border border-white/60 bg-white/75 px-3 py-2 text-sm font-medium text-slate-700 shadow-lg shadow-slate-900/5 transition hover:-translate-y-0.5 hover:bg-white"
                aria-haspopup="menu"
                aria-expanded={profileMenuOpen}
              >
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 text-white shadow-lg shadow-sky-500/25">A</span>
                <span>Andrew Enodolomwanyi</span>
                <span className="text-slate-400">▾</span>
              </button>

              {profileMenuOpen && (
                <div
                  className="absolute right-0 top-14 z-30 min-w-48 rounded-2xl border border-white/70 bg-white/95 p-1.5 shadow-[0_28px_60px_-26px_rgba(15,23,42,0.55)] backdrop-blur-xl"
                  role="menu"
                >
                  <button
                    type="button"
                    className="flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 transition hover:bg-slate-100"
                    onClick={() => {
                      setProfileMenuOpen(false)
                    }}
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
            </div>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {dataSourceNote !== '' && (
              <div className="mb-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {dataSourceNote}
              </div>
            )}
            {activeNav === 'Users' ? (
              <UsersView users={usersData} />
            ) : activeNav === 'Cell' ? (
              <AttendanceView
                meetings={meetings}
                users={usersData}
                attendanceByMeeting={attendanceByMeeting}
                setAttendanceByMeeting={setAttendanceByMeeting}
                onOpenMeetings={() => setActiveNav('Meetings')}
              />
            ) : activeNav === 'Meetings' ? (
              <MeetingsView meetings={meetings} setMeetings={setMeetings} users={usersData} />
            ) : activeNav === 'Cell Attendance Report' ? (
              <CellAttendanceReportView
                meetings={meetings}
                users={usersData}
                attendanceByMeeting={attendanceByMeeting}
              />
            ) : activeNav === 'Defaulters List(Cell)' ? (
              <DefaultersChapelView
                meetings={meetings}
                users={usersData}
                attendanceByMeeting={attendanceByMeeting}
              />
            ) : activeNav === 'Chapel' || activeNav === 'Chapel Attendance Report' ? (
              <ChapelAttendanceView
                meetings={meetings}
                users={usersData}
                attendanceByMeeting={attendanceByMeeting}
                setAttendanceByMeeting={setAttendanceByMeeting}
                onOpenMeetings={() => setActiveNav('Meetings')}
              />
            ) : (
              <div className="space-y-6">
                <section className="hero-panel overflow-hidden">
                  <div className="hero-panel-glow" />
                  <div className="relative grid gap-8 xl:grid-cols-[1.5fr,0.85fr]">
                    <div>
                      <p className="eyebrow-label text-cyan-100/80">Benson Idahosa University</p>
                      <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        Academic Excellence with Godliness.
                      </h1>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        Track attendance, monitor growth signals, and manage every ministry layer from one polished control surface designed for fast decision making.
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <button className="inline-flex items-center rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/12">
                          Export weekly brief
                        </button>
                      </div>

                      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {stats.map((item) => (
                          <div
                            key={item.label}
                            className="rounded-3xl border border-white/12 bg-white/8 p-5 backdrop-blur-sm"
                          >
                            <div>
                              <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/70">
                                {item.label}
                              </p>
                              <p className="mt-3 text-4xl font-semibold tracking-tight text-white">
                                {item.value.toLocaleString()}
                              </p>
                              <p className="mt-3 text-sm text-slate-300">
                                Current ministry records aligned across cells, chapels, and service attendance.
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="rounded-[30px] border border-white/12 bg-slate-950/35 p-5 backdrop-blur-md">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="eyebrow-label text-cyan-100/70">Operational pulse</p>
                            <p className="mt-2 text-2xl font-semibold text-white">Balanced across services</p>
                          </div>
                          <div className="rounded-2xl bg-emerald-400/20 px-3 py-1 text-xs font-semibold text-emerald-200">Healthy</div>
                        </div>

                        <div className="mt-6 space-y-4">
                          {performanceRows.map((row) => (
                            <div key={row.label} className="rounded-2xl border border-white/8 bg-white/6 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-sm font-medium text-white">{row.label}</p>
                              
                                </div>
                                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">{row.attendance}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}

export default App
