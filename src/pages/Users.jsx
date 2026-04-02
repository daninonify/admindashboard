import { useState } from 'react'
import { useData } from '../context/DataContext'

export default function Users() {
  const { usersData: users, setUsersData } = useData()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [editingUserId, setEditingUserId] = useState(null)
  const [editForm, setEditForm] = useState({
    name: '',
    cell: '',
    venue: '',
    matric: '',
    approved: false,
  })
  const normalizedQuery = submitted.trim().toLowerCase()

  const cellOptions = Array.from(
    new Set(users.map((user) => user.cell).filter((cell) => cell.trim() !== ''))
  )
  const venueOptions = Array.from(
    new Set(
      cellOptions
        .map((cell) => cell.split(',')[0]?.trim() ?? '')
        .filter((venue) => venue !== '')
    )
  )

  const filtered = users.filter(
    (u) =>
      normalizedQuery === '' ||
      u.name.toLowerCase().includes(normalizedQuery) ||
      u.matric.toLowerCase().includes(normalizedQuery) ||
      u.cell.toLowerCase().includes(normalizedQuery)
  )

  const editingUser = users.find((user) => user.id === editingUserId) ?? null

  const openEditPanel = (user) => {
    setEditingUserId(user.id)
    setEditForm({
      name: user.name,
      cell: user.cell,
      venue: user.venue ?? user.cell.split(',')[0]?.trim() ?? '',
      matric: user.matric,
      approved: Boolean(user.approved),
    })
  }

  const closeEditPanel = () => {
    setEditingUserId(null)
    setEditForm({
      name: '',
      cell: '',
      venue: '',
      matric: '',
      approved: false,
    })
  }

  const saveUserChanges = () => {
    if (!editingUser) {
      return
    }

    setUsersData((currentUsers) =>
      currentUsers.map((user) =>
        user.id === editingUser.id
          ? {
              ...user,
              name: editForm.name.trim() || user.name,
              cell: editForm.cell,
              venue: editForm.venue,
              matric: editForm.matric.trim() || user.matric,
              approved: editForm.approved,
            }
          : user
      )
    )

    closeEditPanel()
  }

  return (
    <>
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
            }
          }}
          placeholder="Search by name, matric or cell group…"
          className="premium-input flex-1"
        />
        <button
          type="button"
          onClick={() => {
            setSubmitted(query)
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
            {filtered.map((user) => (
              <tr key={user.id} className="hover:bg-slate-50/80">
                <td className="px-4 py-3 text-slate-500">{user.id}</td>
                <td className="cursor-pointer px-4 py-3 font-medium text-indigo-700 hover:underline">{user.name}</td>
                <td className="px-4 py-3 text-slate-600">{user.gender}</td>
                <td className="px-4 py-3 text-slate-600">{user.matric}</td>
                <td className="px-4 py-3 text-slate-600">{user.cell}</td>
                <td className="px-4 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => openEditPanel(user)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200/80 text-slate-400 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    title="Edit"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="inline h-4 w-4">
                      <path d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 0 1 2.828 2.828L11.828 15.828a2 2 0 0 1-1.414.586H8v-2.414a2 2 0 0 1 .586-1.414Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-sm text-slate-400">No students found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>

      {editingUser && (
        <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/30 backdrop-blur-[2px]">
          <button
            type="button"
            aria-label="Close edit panel"
            className="flex-1 cursor-default"
            onClick={closeEditPanel}
          />
          <div className="relative flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.98),rgba(17,24,39,0.96))] px-6 py-7 text-white shadow-2xl shadow-slate-950/40">
            <button
              type="button"
              onClick={closeEditPanel}
              className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-400 transition hover:bg-white/10 hover:text-white"
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                <path d="M6 6 18 18M18 6 6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              </svg>
            </button>

            <div className="pr-10">
              <h2 className="font-display text-3xl font-semibold tracking-tight text-white">Update Student Record</h2>
              <p className="mt-3 text-sm text-slate-300">Make changes to your personal details.</p>
            </div>

            <div className="mt-8 space-y-5">
              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Full Name</span>
                <input
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm((current) => ({ ...current, name: e.target.value }))}
                  className="premium-input border-white/10 bg-white/10 text-white placeholder:text-slate-400"
                  placeholder="Student name"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Cell Group</span>
                <select
                  value={editForm.cell}
                  onChange={(e) => setEditForm((current) => ({ ...current, cell: e.target.value }))}
                  className="premium-input border-white/10 bg-white/10 text-white"
                >
                  {cellOptions.map((cell) => (
                    <option key={cell} value={cell} className="text-slate-950">
                      {cell}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Venue</span>
                <select
                  value={editForm.venue}
                  onChange={(e) => setEditForm((current) => ({ ...current, venue: e.target.value }))}
                  className="premium-input border-white/10 bg-white/10 text-white"
                >
                  <option value="" className="text-slate-950">-- Select Venue --</option>
                  {venueOptions.map((venue) => (
                    <option key={venue} value={venue} className="text-slate-950">
                      {venue}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block">
                <span className="mb-2 block text-xs font-semibold uppercase tracking-[0.22em] text-slate-400">Matric Number</span>
                <input
                  type="text"
                  value={editForm.matric}
                  onChange={(e) => setEditForm((current) => ({ ...current, matric: e.target.value }))}
                  className="premium-input border-white/10 bg-white/10 text-white placeholder:text-slate-400"
                  placeholder="BAS/CSC/150219"
                />
              </label>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
              <div>
                <p className="text-lg font-semibold text-white">Approve Student</p>
                <p className="mt-1 text-sm text-slate-400">Mark this student as approved.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={editForm.approved}
                onClick={() => setEditForm((current) => ({ ...current, approved: !current.approved }))}
                className={`relative inline-flex h-8 w-14 items-center rounded-full border transition ${editForm.approved ? 'border-cyan-300/50 bg-cyan-400/80' : 'border-white/10 bg-white/10'}`}
              >
                <span
                  className={`inline-block h-6 w-6 rounded-full bg-white shadow-lg transition ${editForm.approved ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>

            <div className="mt-auto flex justify-end border-t border-white/10 pt-6">
              <button
                type="button"
                onClick={saveUserChanges}
                className="inline-flex items-center justify-center rounded-2xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
