import { useData } from '../context/DataContext'

export default function AttendanceSummary() {
  const { meetings, usersData: users, attendanceByMeeting } = useData()

  const summaryByType = ['Cell', 'Chapel'].map((type) => {
    const typeMeetings = meetings.filter((m) => (m.type ?? 'Cell') === type)
    let totalMembers = 0
    let totalPresent = 0
    let totalAbsent = 0

    typeMeetings.forEach((meeting) => {
      const roster =
        meeting.attendees.length > 0
          ? meeting.attendees
          : users.filter((u) => u.cell === meeting.cell).map((u) => u.name)
      const statuses = attendanceByMeeting[meeting.id] ?? {}

      totalMembers += roster.length
      roster.forEach((name) => {
        const memberName = typeof name === 'string' ? name : name.name
        const status = statuses[memberName] ?? 'unmarked'
        if (status === 'present') totalPresent += 1
        if (status === 'absent') totalAbsent += 1
      })
    })

    const marked = totalPresent + totalAbsent
    const rate = marked > 0 ? (totalPresent / marked) * 100 : 0

    return { type, meetings: typeMeetings.length, totalMembers, totalPresent, totalAbsent, rate }
  })

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Report intelligence</p>
          <h1 className="page-title">Attendance Summary</h1>
          <p className="page-subtitle">Reports / Attendance Summary</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {summaryByType.map((item) => (
          <div key={item.type} className="rounded-3xl border border-slate-200/80 bg-white/75 p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-slate-900">{item.type} Attendance</h2>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Meetings</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{item.meetings}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Total Members</p>
                <p className="mt-1 text-2xl font-semibold text-slate-900">{item.totalMembers}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-emerald-700">Present</p>
                <p className="mt-1 text-2xl font-semibold text-emerald-900">{item.totalPresent}</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-rose-700">Absent</p>
                <p className="mt-1 text-2xl font-semibold text-rose-900">{item.totalAbsent}</p>
              </div>
            </div>
            <div className="mt-4 rounded-2xl bg-cyan-50 px-4 py-3">
              <p className="text-xs uppercase tracking-[0.2em] text-cyan-700">Attendance Rate</p>
              <p className="mt-1 text-3xl font-semibold text-cyan-900">{item.rate.toFixed(1)}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
