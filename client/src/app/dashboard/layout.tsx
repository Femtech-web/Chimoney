import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/helpers/Loader";
import { ProtectedRoute } from "@/helpers/RouteProtection";
const Dashboard = dynamic(() => import("./page"), {
  loading: () => <Loader />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Chipay | Dashboard",
  description: "send and receive payments with ease",
};

const DashboardLayout = () => {
  return (
    <ProtectedRoute>
      <main>
        <Dashboard />
      </main>
    </ProtectedRoute>
  );
};

export default DashboardLayout;
