const fs = require("fs")
const path = require("path")

// Script to organize files for phased GitHub upload
const phases = {
  phase1: [
    "package.json",
    "next.config.js",
    "tailwind.config.ts",
    "tsconfig.json",
    ".env.example",
    "README.md",
    "DEPLOYMENT.md",
    "app/layout.tsx",
    "app/page.tsx",
    "app/globals.css",
    "lib/types.ts",
    "lib/utils.ts",
    "lib/google-sheets.ts",
    "lib/database-manager.ts",
    "lib/supabase-service.ts",
    "app/api/products/route.ts",
    "app/api/dashboard/stats/route.ts",
    "app/api/sync/route.ts",
    "components/ui/button.tsx",
    "components/ui/card.tsx",
    "components/ui/input.tsx",
    "components/ui/table.tsx",
    "components/ui/dialog.tsx",
  ],
  phase2: [
    "app/components/sidebar.tsx",
    "app/components/dashboard-stats.tsx",
    "app/components/recent-transactions.tsx",
    "app/components/low-stock-alerts.tsx",
    "app/components/quick-actions.tsx",
    "app/components/cashflow-chart.tsx",
    "app/components/inventory-chart.tsx",
    "app/components/sales-chart.tsx",
    "components/ui/tabs.tsx",
    "components/ui/switch.tsx",
    "components/ui/alert.tsx",
    "components/ui/progress.tsx",
    "components/ui/textarea.tsx",
    "components/ui/separator.tsx",
    "components/ui/breadcrumb.tsx",
    "components/error-boundary.tsx",
  ],
  phase3: [
    "app/products/page.tsx",
    "app/products/components/products-table.tsx",
    "app/products/components/add-product-dialog.tsx",
    "app/transactions/page.tsx",
    "app/transactions/components/transactions-table.tsx",
    "app/transactions/components/add-transaction-dialog.tsx",
    "app/reports/page.tsx",
    "app/reports/components/inventory-report.tsx",
    "app/reports/components/profit-loss-report.tsx",
    "app/settings/page.tsx",
    "app/settings/components/database-status.tsx",
    "app/api/products/[id]/route.ts",
    "app/api/transactions/route.ts",
    "app/api/cashflow/route.ts",
    "app/api/alerts/low-stock/route.ts",
    "lib/api-service.ts",
    "lib/currency.ts",
    "lib/settings.ts",
  ],
  phase4: [
    "app/test/page.tsx",
    "app/test/database/page.tsx",
    "app/components/dashboard-verification.tsx",
    "app/components/component-status-monitor.tsx",
    "app/components/google-sheets-test.tsx",
    "app/api/test/google-sheets-auth/route.ts",
    "app/api/test/google-sheets-access/route.ts",
    "app/api/test/google-sheets-structure/route.ts",
    "app/api/test/database-manager/route.ts",
    "supabase/schema.sql",
    "dashboard.tsx",
    "professional-dashboard.tsx",
  ],
}

function createPhaseDirectories() {
  Object.keys(phases).forEach((phase) => {
    const phaseDir = path.join(__dirname, "..", "deployment", phase)
    if (!fs.existsSync(phaseDir)) {
      fs.mkdirSync(phaseDir, { recursive: true })
    }
  })
}

function copyFilesToPhases() {
  Object.entries(phases).forEach(([phase, files]) => {
    console.log(`\n📁 ${phase.toUpperCase()} - ${files.length} files:`)
    files.forEach((file) => {
      console.log(`  ✓ ${file}`)
    })
  })
}

console.log("🚀 Deployment Phase Organization:")
console.log("================================")
copyFilesToPhases()

console.log("\n📋 Upload Instructions:")
console.log("1. Upload Phase 1 files first (core system)")
console.log("2. Test deployment works")
console.log("3. Upload Phase 2 files (dashboard components)")
console.log("4. Upload Phase 3 files (feature pages)")
console.log("5. Upload Phase 4 files (testing & extras)")

console.log("\n💡 Tip: You can skip Phase 4 for production deployment")
