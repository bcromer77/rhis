export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-slate-800 mx-auto mb-6"></div>
        <h2 className="text-xl font-semibold text-slate-800 mb-2">Loading RhisPrism</h2>
        <p className="text-slate-600">Preparing your regulatory intelligence dashboard...</p>
      </div>
    </div>
  )
}
