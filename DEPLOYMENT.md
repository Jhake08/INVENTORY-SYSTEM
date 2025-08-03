# Inventory Management System - Deployment Guide

## GitHub Upload Strategy (Under 100 Files)

Due to GitHub's file limit, upload the project in these phases:

### Phase 1: Core System (Essential Files - ~25 files)
\`\`\`
├── package.json
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── .env.example
├── README.md
├── DEPLOYMENT.md
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   └── api/
│       ├── products/route.ts
│       ├── transactions/route.ts
│       ├── dashboard/stats/route.ts
│       └── sync/route.ts
├── lib/
│   ├── types.ts
│   ├── utils.ts
│   ├── google-sheets.ts
│   ├── database-manager.ts
│   └── supabase-service.ts
├── components/ui/
│   ├── button.tsx
│   ├── card.tsx
│   ├── input.tsx
│   ├── table.tsx
│   └── dialog.tsx
\`\`\`

### Phase 2: Dashboard Components (~20 files)
\`\`\`
├── app/components/
│   ├── sidebar.tsx
│   ├── dashboard-stats.tsx
│   ├── recent-transactions.tsx
│   ├── low-stock-alerts.tsx
│   ├── quick-actions.tsx
│   ├── cashflow-chart.tsx
│   ├── inventory-chart.tsx
│   └── sales-chart.tsx
├── components/ui/
│   ├── tabs.tsx
│   ├── switch.tsx
│   ├── alert.tsx
│   ├── progress.tsx
│   ├── textarea.tsx
│   └── separator.tsx
\`\`\`

### Phase 3: Feature Pages (~25 files)
\`\`\`
├── app/
│   ├── products/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── products-table.tsx
│   │       └── add-product-dialog.tsx
│   ├── transactions/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── transactions-table.tsx
│   │       └── add-transaction-dialog.tsx
│   ├── reports/
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── inventory-report.tsx
│   │       └── profit-loss-report.tsx
│   └── settings/
│       ├── page.tsx
│       └── components/
│           └── database-status.tsx
\`\`\`

### Phase 4: Testing & Additional Features (~20 files)
\`\`\`
├── app/
│   ├── test/
│   │   ├── page.tsx
│   │   └── database/page.tsx
│   └── components/
│       ├── dashboard-verification.tsx
│       ├── component-status-monitor.tsx
│       └── google-sheets-test.tsx
├── app/api/
│   ├── products/[id]/route.ts
│   ├── cashflow/route.ts
│   ├── alerts/low-stock/route.ts
│   └── test/
│       ├── google-sheets-auth/route.ts
│       ├── google-sheets-access/route.ts
│       ├── google-sheets-structure/route.ts
│       └── database-manager/route.ts
\`\`\`

## Quick Setup Commands

### 1. Initialize Project
\`\`\`bash
npx create-next-app@latest inventory-system --typescript --tailwind --eslint --app
cd inventory-system
\`\`\`

### 2. Install Dependencies
\`\`\`bash
npm install @supabase/supabase-js googleapis lucide-react @radix-ui/react-dialog @radix-ui/react-tabs @radix-ui/react-switch class-variance-authority clsx tailwind-merge
\`\`\`

### 3. Environment Setup
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your credentials
\`\`\`

### 4. Database Setup
\`\`\`bash
# Run the Supabase schema
# Upload to your Supabase project dashboard
\`\`\`

## File Priority for Minimal Working Version

If you need to upload the absolute minimum for a working system:

### Critical Files Only (~15 files):
1. `package.json` - Dependencies
2. `next.config.js` - Next.js config
3. `tailwind.config.ts` - Styling
4. `app/layout.tsx` - App layout
5. `app/page.tsx` - Main dashboard
6. `app/globals.css` - Global styles
7. `lib/types.ts` - TypeScript types
8. `lib/utils.ts` - Utility functions
9. `lib/google-sheets.ts` - Google Sheets integration
10. `lib/database-manager.ts` - Database management
11. `app/api/products/route.ts` - Products API
12. `app/api/dashboard/stats/route.ts` - Dashboard API
13. `components/ui/button.tsx` - UI Button
14. `components/ui/card.tsx` - UI Card
15. `.env.example` - Environment template

This minimal setup will give you a working dashboard with Google Sheets integration.

## Deployment Steps

### Step 1: Create Repository
\`\`\`bash
git init
git add . # (only Phase 1 files first)
git commit -m "Phase 1: Core system setup"
git branch -M main
git remote add origin https://github.com/yourusername/inventory-system.git
git push -u origin main
\`\`\`

### Step 2: Add Remaining Files
\`\`\`bash
# Add Phase 2 files
git add app/components/ components/ui/tabs.tsx components/ui/switch.tsx
git commit -m "Phase 2: Dashboard components"
git push

# Add Phase 3 files
git add app/products/ app/transactions/ app/reports/ app/settings/
git commit -m "Phase 3: Feature pages"
git push

# Add Phase 4 files
git add app/test/ app/api/test/
git commit -m "Phase 4: Testing and additional features"
git push
\`\`\`

### Step 3: Deploy to Vercel
\`\`\`bash
npm install -g vercel
vercel --prod
\`\`\`

## Environment Variables for Deployment

Add these to your Vercel project settings:

\`\`\`
NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_sheets_id
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
\`\`\`

## Troubleshooting

### Common Issues:
1. **Too many files**: Upload in phases as outlined above
2. **Environment variables**: Ensure all required vars are set
3. **Google Sheets permissions**: Share sheet with service account
4. **Supabase connection**: Verify URL and keys are correct

### File Reduction Tips:
- Combine similar components into single files
- Remove test files for production deployment
- Use dynamic imports for large components
- Minimize the number of API routes initially

## Production Checklist

- [ ] Core files uploaded (Phase 1)
- [ ] Environment variables configured
- [ ] Google Sheets shared with service account
- [ ] Supabase database schema applied
- [ ] Dashboard components working (Phase 2)
- [ ] Feature pages functional (Phase 3)
- [ ] Testing suite optional (Phase 4)
- [ ] Domain configured (if custom)
- [ ] SSL certificate active
- [ ] Performance monitoring enabled

## Support

If you encounter issues:
1. Check the deployment logs in Vercel
2. Verify environment variables are set correctly
3. Test Google Sheets integration locally first
4. Ensure Supabase connection is working
5. Review the browser console for client-side errors

For additional help, refer to the test suite at `/test/database` once deployed.
\`\`\`

Now let me create a simplified file structure for easier deployment:
