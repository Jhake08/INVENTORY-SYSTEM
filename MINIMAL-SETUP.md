# Minimal Working Setup (15 Files Only)

For the absolute minimum working version, upload only these files:

## Core Files (15 total):

### 1. Configuration (4 files)
- `package.json` - Dependencies and scripts
- `next.config.js` - Next.js configuration  
- `tailwind.config.ts` - Tailwind CSS setup
- `.env.example` - Environment variables template

### 2. App Structure (3 files)
- `app/layout.tsx` - Root layout with sidebar
- `app/page.tsx` - Main dashboard page
- `app/globals.css` - Global styles and Tailwind

### 3. Core Logic (4 files)
- `lib/types.ts` - TypeScript interfaces
- `lib/utils.ts` - Utility functions
- `lib/google-sheets.ts` - Google Sheets integration
- `lib/database-manager.ts` - Database management

### 4. API Routes (2 files)
- `app/api/products/route.ts` - Products CRUD operations
- `app/api/dashboard/stats/route.ts` - Dashboard statistics

### 5. UI Components (2 files)
- `components/ui/button.tsx` - Button component
- `components/ui/card.tsx` - Card component

## Quick Deploy Commands:

\`\`\`bash
# 1. Create new Next.js project
npx create-next-app@latest inventory-minimal --typescript --tailwind --app

# 2. Install required dependencies
npm install @supabase/supabase-js googleapis lucide-react class-variance-authority clsx tailwind-merge

# 3. Copy the 15 essential files
# 4. Set up environment variables
# 5. Deploy to Vercel
vercel --prod
\`\`\`

## What You Get:
- ✅ Working dashboard with Google Sheets integration
- ✅ Product management (basic CRUD)
- ✅ Dashboard statistics
- ✅ Responsive design
- ✅ Error handling
- ✅ Database fallback system

## What's Missing (can add later):
- ❌ Transactions management
- ❌ Reports generation  
- ❌ Settings page
- ❌ Testing suite
- ❌ Advanced charts
- ❌ Additional UI components

This minimal setup gives you a functional inventory dashboard that you can expand upon after the initial deployment.
