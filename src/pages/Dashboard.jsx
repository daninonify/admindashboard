import { stats, performanceRows } from '../lib/data'

export default function Dashboard() {
  return (
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
  )
}
