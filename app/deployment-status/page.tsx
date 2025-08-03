import DeploymentStatus from "../components/deployment-status"

export default function DeploymentStatusPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Deployment Status</h1>
        <p className="text-muted-foreground">Check system health and deployment readiness</p>
      </div>

      <DeploymentStatus />
    </div>
  )
}
