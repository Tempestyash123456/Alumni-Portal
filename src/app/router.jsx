import { Routes, Route } from "react-router-dom";
import HomePage from "@/features/home/HomePage";
import Login from "@/features/auth/pages/Login";
import Register from "@/features/auth/pages/Register";
import AlumniDashboard from "@/features/dashboard/AlumniDashboard";
import AdminDashboard from "@/features/admin/pages/AdminDashboard";
import RoleProtectedRoute from "@/components/auth/RoleProtectedRoute";
import DocumentRequest from "@/features/services/pages/DocumentRequest";
import CareerSupport from "@/features/services/pages/CareerSupport";
import LibraryAccess from "@/features/services/pages/LibraryAccess";
import GatePass from "@/features/services/pages/GatePass";
import DigitalCard from "@/features/services/pages/DigitalCard";
import LinkedInCallback from "@/features/auth/pages/LinkedInCallback";
import { ROLES } from "@/lib/constants";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<AlumniDashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        path="/dashboard"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <AlumniDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/admin"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ADMIN]}>
            <AdminDashboard />
          </RoleProtectedRoute>
        }
      />

      <Route
        path="/services/document-request"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <DocumentRequest />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/services/career-support"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <CareerSupport />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/services/library-access"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <LibraryAccess />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/services/gate-pass"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <GatePass />
          </RoleProtectedRoute>
        }
      />
      <Route
        path="/services/digital-card"
        element={
          <RoleProtectedRoute allowedRoles={[ROLES.ALUMNI]}>
            <DigitalCard />
          </RoleProtectedRoute>
        }
      />
      <Route path="/auth/linkedin/callback" element={<LinkedInCallback />} />
    </Routes>
  );
}
