export const navItems = [
  {
    label: 'Dashboard',
    path: '/dashboard',
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
    path: '/users',
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
      { label: 'Cell', path: '/attendance/cell' },
      { label: 'Chapel', path: '/attendance/chapel' },
      { label: 'Faith Arena Chapel', path: '/attendance/faith-arena' },
    ],
  },
  {
    label: 'Meetings',
    path: '/meetings',
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
      { label: 'Defaulters List(Cell)', path: '/reports/defaulters-cell' },
      { label: 'Defaulters List(Chapel)', path: '/reports/defaulters-chapel' },
      { label: 'Defaulters List(Faith Arena Chapel)', path: '/reports/defaulters-faith-arena' },
      { label: 'Attendance Summary', path: '/reports/attendance-summary' },
      { label: 'Cell Attendance Report', path: '/reports/cell-attendance' },
      { label: 'Cell Group Report', path: '/reports/cell-group' },
      { label: 'Chapel Attendance Report', path: '/reports/chapel-attendance' },
      { label: 'Export', path: '/reports/export' },
    ],
  },
  {
    label: 'Settings',
    path: '/settings',
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

export const seedUsers = [
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

export const seedMeetings = [
  { id: 1, type: 'Cell', title: 'Cell Leaders Meeting', cell: 'Shabach Mondays 7PM - 8PM, Cell 2', service: '', date: '2026-03-24', time: '19:00', attendees: ['IRABOR, OMOYE', 'OJERAHI, PROSPER', 'Nafami, Tamaralayefa'] },
  { id: 2, type: 'Cell', title: 'Worship Team Meeting', cell: 'Cedar Sundays 4PM - 5PM, Cell 1', service: '', date: '2026-03-23', time: '16:00', attendees: ['Ibrahim, Divine', 'BODOR, ORITSETSEUNDEDE', 'IGBADIWEI, PEREWARE'] },
  { id: 3, type: 'Cell', title: 'Agape Cell Group', cell: 'Agape Mondays 6PM - 7PM, Cell 1', service: '', date: '2026-03-24', time: '18:00', attendees: ['OJEATA, SONIA', 'ALBERT, WEMI', 'Akpan, Blessing'] },
  { id: 4, type: 'Chapel', title: 'Sunday Morning Chapel', cell: '', service: 'Morning Service', date: '2026-03-25', time: '08:00', attendees: ['IRABOR, OMOYE', 'CHRIS, ISEOSA', 'IKEM, PEARL'] },
]

export const stats = [
  { label: 'Registered', value: 4794 },
  { label: 'Males', value: 2128 },
  { label: 'Females', value: 2666 },
  { label: 'Cells', value: 12 },
  { label: 'Sub-Cells', value: 60 },
  { label: 'Unregistered', value: 1209 },
]

export const performanceRows = [
  { label: 'Morning Service', attendance: '428 attendees', trend: '+8.4%' },
  { label: 'Faith Arena Chapel', attendance: '319 attendees', trend: '+5.1%' },
  { label: 'Cell Network', attendance: '760 attendees', trend: '+11.3%' },
]

export const USERS_API_URL = import.meta.env.VITE_USERS_API_URL ?? '/api/users'
export const MEETINGS_API_URL = import.meta.env.VITE_MEETINGS_API_URL ?? '/api/meetings'

export function normalizeMeetingRecord(record, index) {
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

export function normalizeUserRecord(record, index) {
  return {
    id: Number.isFinite(record?.id) ? record.id : index + 1,
    name: record?.name ?? record?.fullName ?? 'Unknown User',
    gender: record?.gender ?? 'N/A',
    matric: record?.matric ?? record?.matricNumber ?? 'N/A',
    cell: record?.cell ?? '',
  }
}

export async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed (${response.status}) for ${url}`)
  }

  return response.json()
}
