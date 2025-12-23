# GlobalShot Frontend Implementation Plan

## System Overview
React-Admin based interface tailored for three distinct user roles:
1.  **Super Admin**: Manages Companies, Sites, and global settings.
2.  **Company Admin**: Manages their specific Sites, Units, and Clients.
3.  **Client**: Read-only access to their assigned Unit and 360° progress views.

## 1. Components & Resources

### A. Modular Providers
- **AuthProvider**: Already implemented (PASETO). Needs role handling to switch layouts/permissions.
- **DataProvider**: Needs to handle file uploads (multipart) differently from standard JSON REST.

### B. Resources (React-Admin)

#### 1. Companies (`/companies`)
- **List**: Name, Created At, Action Buttons.
- **Create/Edit**: Simple form.
- *Access*: Super Admin only.

#### 2. Construction Sites (`/sites`)
- **List**: Name, Address, Company (if Admin).
- **Show**: Dashboard style view showing linked Units.

#### 3. Units & Clients (`/units`)
- **List**: Name, Type (House/Flat), Assigned Client.
- **Create/Edit**: Link a User (Client) to the Unit here.

#### 4. Room & Media Manager
- **Custom View**: A specialized UI to manage a Unit's layout.
- **Upload Interface**: Drag & drop 360 images, assigning them to specific Rooms and Dates.

### C. 360° Viewer Component
- **Library**: `react-photo-sphere-viewer` or `three.js`.
- **Features**:
    - Pan/Zoom.
    - Timeline slider (to see progress over time: e.g., "Jan 1st" vs "Feb 1st").
    - Hotspots (optional future feature).

## 2. Role-Based Access Control (RBAC)
- **Super Admin**: Full access.
- **Company Admin**: Can only see/edit their own Company's Sites/Users.
    - *Implementation*: Backend filters data; Frontend hides "Companies" resource.
- **Client**:
    - **Custom Dashboard**: Does not use the standard React-Admin sidebar navigation.
    - Automatically redirected to their specific `Unit` view upon login.
    - View-only access to the 360 viewer.

## 3. Directory Structure Refactor
```
src/
  ├── components/
  │   ├── auth/          # Login, Forgot Password
  │   ├── dashboard/     # Role-specific dashboards
  │   ├── media/         # 360 Viewer, Uploaders
  │   ├── resources/     # Company, Site, Unit resources
  │   └── layout/        # Custom Menu/AppBar
  ├── providers/
  │   ├── authProvider.ts
  │   ├── dataProvider.ts
  │   └── i18nProvider.ts
  ├── types/
  └── App.tsx
```

## 4. Next Steps
1.  Clean up `App.tsx` (Remove dummy posts).
2.  Install 360 viewer library (`npm install react-photo-sphere-viewer`).
3.  Implement `CompanyList` and `CompanyCreate` (once Backend API is ready).
