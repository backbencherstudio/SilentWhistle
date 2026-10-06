# Silent Whistle Dashboard

A modern, responsive dashboard application built with Next.js, React, and TypeScript.

## 📁 Project Structure

```
silent/
├── app/                          # Next.js App Router directory
│   ├── dashboard/               # Dashboard-specific pages
│   │   └── page.tsx             # Dashboard page route (/dashboard)
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Home page (dashboard) route (/)
│   └── globals.css              # Global styles
│
├── components/                   # React components directory
│   ├── common/                  # Shared/common components
│   │   ├── DashboardLayout.tsx # Layout wrapper with sidebar and header
│   │   └── Sidebar.tsx         # Navigation sidebar component
│   │
│   └── dashboard/               # Dashboard page-specific components
│       ├── OverviewCards.tsx    # Key metrics overview cards
│       ├── UserGrowthChart.tsx  # User growth line chart
│       └── ShoutCategories.tsx  # Shout categories list
│
├── service/                      # Business logic services
│   └── user/                    # User-related services
│       └── user.service.ts      # User authentication service
│
├── helper/                       # Utility helpers
│   └── cookie.helper.ts         # Cookie management utility
│
├── public/                       # Static assets
│   ├── dashboard/               # Dashboard-specific assets
│   │   └── icon/               # Icon files
│   └── ...                     # Other static files
│
└── ...                          # Configuration files
```

## 🏗️ Architecture Overview

### Components Organization

#### Common Components (`components/common/`)
Shared components used across multiple pages:
- **DashboardLayout**: Provides consistent layout structure with sidebar and header
- **Sidebar**: Navigation sidebar with menu items and logout functionality

#### Page-Specific Components (`components/dashboard/`)
Components specific to the dashboard page:
- **OverviewCards**: Displays key metrics (users, posts, reports, global reach)
- **UserGrowthChart**: Line chart visualization of user growth trends
- **ShoutCategories**: List of shout/post categories with counts

### Services (`service/`)
Business logic and API interactions:
- **UserService**: Handles user authentication, logout, and token management

### Helpers (`helper/`)
Utility functions:
- **CookieHelper**: Browser cookie management utilities

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 📝 Code Style

- All components include comprehensive JSDoc comments
- TypeScript interfaces are defined for all props and data structures
- Consistent naming conventions (PascalCase for components, camelCase for functions)
- Proper separation of concerns (components, services, helpers)

## 🎨 Features

- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark Theme**: Modern dark UI with purple accent colors
- **Interactive Charts**: SVG-based data visualizations
- **Real-time Navigation**: Active route highlighting in sidebar
- **Accessibility**: ARIA labels and semantic HTML

## 📦 Dependencies

- **Next.js 16**: React framework with App Router
- **React 19**: UI library
- **TypeScript**: Type safety
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library

## 🔧 Development Guidelines

1. **Component Structure**: Each component should be in its appropriate folder
   - Common/shared components → `components/common/`
   - Page-specific components → `components/[page-name]/`

2. **Comments**: All files should include:
   - File-level JSDoc comments explaining purpose
   - Function/method comments with parameters and return types
   - Inline comments for complex logic

3. **TypeScript**: Use proper types and interfaces for all props and data

4. **Styling**: Use Tailwind CSS utility classes, maintain consistent spacing

## 📄 License

Private project - All rights reserved
