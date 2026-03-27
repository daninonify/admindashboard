import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Meetings() {
  const { meetings, setMeetings, usersData: users } = useData()
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
