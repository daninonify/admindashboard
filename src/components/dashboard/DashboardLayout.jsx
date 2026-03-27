import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { navItems } from '../../lib/data'
import { useData } from '../../context/DataContext'

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const { dataSourceNote } = useData()
  const location = useLocation()
  const navigate = useNavigate()

  const currentPath = location.pathname

  useEffect(() => {
    for (const item of navItems) {
      if (item.children?.some((child) => child.path === currentPath)) {
        setOpenGroup(item.label)
        break
      }
    }
  }, [currentPath])

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? 'hidden' : ''
  }, [sidebarOpen])

  const isActivePath = (path) => currentPath === path

  const isActiveGroup = (item) => {
    if (item.path && isActivePath(item.path)) return true
    return item.children?.some((child) => isActivePath(child.path)) ?? false
  }

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
              const isActive = isActiveGroup(item)
              const isOpen = openGroup === item.label

              return (
                <div key={item.label}>
                  <button
                    type="button"
                    onClick={() => {
                      if (item.children) {
                        setOpenGroup(isOpen ? null : item.label)
                      } else if (item.path) {
                        navigate(item.path)
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
                            if (child.path) {
                              navigate(child.path)
                            }
                            setSidebarOpen(false)
                          }}
                          className={`nav-child-button flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm transition ${
                            isActivePath(child.path)
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
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
