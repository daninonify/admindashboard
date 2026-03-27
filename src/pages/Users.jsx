import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Users() {
  const { usersData: users } = useData()
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
