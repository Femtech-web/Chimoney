import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NavBar from "@/components/Navbar";
import Loader from "@/helpers/Loader";
import { ProtectedRoute } from "@/helpers/RouteProtection";
const ProfilePage = dynamic(() => import("./page"), {
  loading: () => <Loader />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Profile | Page",
  description: "view your profile and info's",
};

const ProfileLayout = () => {
  return (
    <ProtectedRoute>
      <main>
        <NavBar />
        <ProfilePage />
      </main>
    </ProtectedRoute>
  );
};

export default ProfileLayout;
