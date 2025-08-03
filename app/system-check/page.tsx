import SystemChecker from "../components/system-checker"

export default function SystemCheckPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Health Check</h1>
        <p className="text-muted-foreground">Comprehensive testing of all system components from frontend to backend</p>
      </div>

      <SystemChecker />
    </div>
  )
}
