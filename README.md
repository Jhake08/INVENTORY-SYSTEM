# Professional Inventory Management System

A modern, cloud-based inventory management system built with Next.js and Google Sheets integration.

## ✨ Features

- **Complete Inventory Management** - Products, stock levels, categories
- **Transaction Tracking** - Sales, purchases, adjustments
- **Financial Analytics** - Cashflow, profit/loss, reporting
- **Real-time Dashboard** - Live metrics and visualizations
- **Google Sheets Integration** - Cloud-based, collaborative database
- **Responsive Design** - Works on desktop, tablet, and mobile

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- Google Cloud account
- Google Sheets document

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone <your-repo-url>
   cd inventory-management-system
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   \`\`\`

3. **Set up Google Sheets**
   - Create a Google Sheets document
   - Add sheets: Products, Transactions, Cashflow, AuditLogs
   - Create a Google Cloud service account
   - Share your sheets with the service account email

4. **Configure environment variables**
   \`\`\`bash
   cp .env.example .env.local
   \`\`\`
   
   Add your values:
   \`\`\`
   NEXT_PUBLIC_GOOGLE_SHEETS_ID=your_spreadsheet_id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
   \`\`\`

5. **Run the development server**
   \`\`\`bash
   npm run dev
   \`\`\`

6. **Open your browser**
   Navigate to `http://localhost:3000`

## 📊 System Overview

### Core Pages
- **Dashboard** - Overview with key metrics and charts
- **Products** - Complete product catalog management
- **Transactions** - Sales, purchases, and stock adjustments
- **Reports** - Financial and inventory reporting
- **Settings** - System configuration and data export

### Key Components
- Real-time inventory tracking
- Automated low stock alerts
- Financial performance analytics
- Data export and backup
- Mobile-responsive interface

## 🔧 Configuration

### Google Sheets Setup
Your Google Sheets should have these tabs:
- **Products** - Product catalog
- **Transactions** - All transactions
- **Cashflow** - Income and expenses
- **AuditLogs** - System activity logs

### Currency Support
Supports multiple currencies: USD, EUR, GBP, JPY, CAD, AUD

## 📈 Usage

1. **Add Products** - Set up your product catalog with stock levels
2. **Record Transactions** - Log sales, purchases, and adjustments
3. **Monitor Dashboard** - Track key metrics and performance
4. **Generate Reports** - Analyze inventory and financial data
5. **Export Data** - Regular backups in JSON format

## 🛠️ Development

### Project Structure
\`\`\`
├── app/                 # Next.js app directory
├── components/          # Reusable UI components
├── lib/                 # Utilities and services
└── public/              # Static assets
\`\`\`

### Key Technologies
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Google Sheets API** - Database
- **Radix UI** - Component library

## 📝 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions, please open an issue in the repository.
