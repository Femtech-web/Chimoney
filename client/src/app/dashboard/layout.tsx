import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Loader from "@/components/Loader";
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
    <main>
      <Dashboard />
    </main>
  );
};

export default DashboardLayout;
