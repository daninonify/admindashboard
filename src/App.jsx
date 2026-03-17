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
      { label: 'Demographics' },
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

const users = [
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

const highlightMetrics = [
  { label: 'Attendance rate', value: '92.4%', note: '+4.8% vs last week' },
  { label: 'Chapel engagement', value: '1,284', note: '86 services tracked' },
  { label: 'New registrations', value: '184', note: 'Strongest week this quarter' },
]

const activityFeed = [
  { title: 'Chapel attendance synced', detail: 'Morning service records updated 8 minutes ago.' },
  { title: 'Export queue completed', detail: 'Cell group report package is ready for download.' },
  { title: 'Follow-up attention needed', detail: '43 defaulters crossed the threshold for outreach.' },
]

const performanceRows = [
  { label: 'Morning Service', attendance: '428 attendees', trend: '+8.4%' },
  { label: 'Faith Arena Chapel', attendance: '319 attendees', trend: '+5.1%' },
  { label: 'Cell Network', attendance: '760 attendees', trend: '+11.3%' },
]

function ChapelAttendanceView() {
  const [selectedDate, setSelectedDate] = useState('2026-03-16')
  const [serviceQuery, setServiceQuery] = useState('')

  const normalizedServiceQuery = serviceQuery.trim().toLowerCase()

  const filteredAttendance = chapelAttendanceRecords.filter(
    (record) =>
      record.date === selectedDate &&
      (normalizedServiceQuery === '' ||
        record.service.toLowerCase().includes(normalizedServiceQuery))
  )

  return (
    <div className="space-y-6">
      <div className="page-header-card">
        <div>
          <p className="eyebrow-label">Attendance intelligence</p>
          <h1 className="page-title">Chapel Attendance</h1>
          <p className="page-subtitle">Reports / Chapel Attendance Report</p>
        </div>
        <div className="hidden items-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-white shadow-lg lg:flex">
          <div className="h-10 w-10 rounded-2xl bg-white/10" />
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/55">Coverage</p>
            <p className="text-sm font-semibold">Live chapel monitoring</p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.1fr,1.4fr]">
        <div className="filter-shell">
          <label htmlFor="chapel-date" className="eyebrow-label mb-2 block">
            Date
          </label>
          <input
            id="chapel-date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="premium-input"
          />
        </div>

        <div className="filter-shell">
          <label htmlFor="service-search" className="eyebrow-label mb-2 block">
            Chapel Service
          </label>
          <input
            id="service-search"
            type="text"
            value={serviceQuery}
            onChange={(e) => setServiceQuery(e.target.value)}
            placeholder="Search chapel service..."
            className="premium-input"
          />
        </div>
      </div>

      <div className="table-shell overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-left text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
              <th className="px-4 py-3">SN</th>
              <th className="px-4 py-3">Full Name</th>
              <th className="px-4 py-3">Service</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100/80">
            {filteredAttendance.map((record, index) => (
              <tr key={record.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-500">{index + 1}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{record.name}</td>
                <td className="px-4 py-3 text-slate-600">{record.service}</td>
              </tr>
            ))}
            {filteredAttendance.length === 0 && (
              <tr>
                <td colSpan={3} className="px-4 py-8 text-center text-sm text-slate-400">
                  No attendance records found for the selected date/service.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function UsersView() {
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

  const hasPage = (label) =>
    label === 'Dashboard' ||
    label === 'Users' ||
    label === 'Chapel' ||
    label === 'Chapel Attendance Report'

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

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
                <span className="text-cyan-300">⇦</span>
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
              <div className="hidden rounded-2xl border border-white/60 bg-white/60 px-4 py-2 shadow-sm lg:block">
                <p className="eyebrow-label">Live snapshot</p>
                <p className="text-sm font-semibold text-slate-800">Sunday operations steady</p>
              </div>
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
            {activeNav === 'Users' ? (
              <UsersView />
            ) : activeNav === 'Chapel' || activeNav === 'Chapel Attendance Report' ? (
              <ChapelAttendanceView />
            ) : (
              <div className="space-y-6">
                <section className="hero-panel overflow-hidden">
                  <div className="hero-panel-glow" />
                  <div className="relative grid gap-8 xl:grid-cols-[1.5fr,0.85fr]">
                    <div>
                      <p className="eyebrow-label text-cyan-100/80">Command center</p>
                      <h1 className="font-display mt-3 max-w-2xl text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                        A cleaner, sharper view of your church operations.
                      </h1>
                      <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                        Track attendance, monitor growth signals, and manage every ministry layer from one polished control surface designed for fast decision making.
                      </p>

                      <div className="mt-8 flex flex-wrap gap-3">
                        <button className="inline-flex items-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 shadow-xl shadow-slate-950/15 transition hover:-translate-y-0.5">
                          View live activity
                        </button>
                        <button className="inline-flex items-center rounded-2xl border border-white/15 bg-white/8 px-5 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/12">
                          Export weekly brief
                        </button>
                      </div>

                      <div className="mt-8 grid gap-3 sm:grid-cols-3">
                        {highlightMetrics.map((metric) => (
                          <div key={metric.label} className="rounded-3xl border border-white/12 bg-white/8 p-4 backdrop-blur-sm">
                            <p className="text-xs uppercase tracking-[0.26em] text-cyan-100/70">{metric.label}</p>
                            <p className="mt-3 text-3xl font-semibold text-white">{metric.value}</p>
                            <p className="mt-2 text-sm text-slate-300">{metric.note}</p>
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
                                  <p className="mt-1 text-sm text-slate-300">{row.attendance}</p>
                                </div>
                                <span className="rounded-full bg-cyan-400/15 px-3 py-1 text-xs font-semibold text-cyan-200">{row.trend}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {stats.map((item) => (
                    <div
                      key={item.label}
                      className="stat-card"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="eyebrow-label">
                          {item.label}
                          </p>
                          <p className="mt-4 text-4xl font-semibold tracking-tight text-slate-950">
                            {item.value.toLocaleString()}
                          </p>
                        </div>
                        <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                          Active
                        </span>
                      </div>
                      <p className="mt-6 text-sm leading-6 text-slate-500">
                        Current ministry records aligned across cells, chapels, and service attendance.
                      </p>
                    </div>
                  ))}
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.25fr,0.85fr]">
                  <div className="surface-card">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="eyebrow-label">Recent movement</p>
                        <h2 className="font-display mt-2 text-2xl font-semibold text-slate-950">Operational highlights</h2>
                      </div>
                      <div className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                        Last 24 hours
                      </div>
                    </div>

                    <div className="mt-6 space-y-4">
                      {activityFeed.map((item, index) => (
                        <div key={item.title} className="flex gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/70 p-4">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white">
                            0{index + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                            <p className="mt-1 text-sm leading-6 text-slate-500">{item.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="surface-card bg-slate-950 text-white">
                    <p className="eyebrow-label text-cyan-100/75">This week</p>
                    <h2 className="font-display mt-2 text-2xl font-semibold">Momentum snapshot</h2>
                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      Registrations and service participation are trending upward, with stronger consistency across repeat attendees.
                    </p>

                    <div className="mt-8 space-y-5">
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                          <span>Engagement score</span>
                          <span>84%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[84%] rounded-full bg-gradient-to-r from-cyan-300 via-sky-400 to-indigo-400" />
                        </div>
                      </div>
                      <div>
                        <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
                          <span>Retention signal</span>
                          <span>71%</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10">
                          <div className="h-2 w-[71%] rounded-full bg-gradient-to-r from-emerald-300 via-teal-400 to-cyan-400" />
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
