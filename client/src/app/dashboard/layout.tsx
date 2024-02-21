import type { Metadata } from "next";
import Dashboard from "./page";

export const metadata: Metadata = {
  title: "Chipay | Dashboard",
  description: "send and receive payments with ease",
};

const DashboardLayout = () => {
  return (
    <main>
      <Dashboard />
    </main>
  );
};

export default DashboardLayout;
