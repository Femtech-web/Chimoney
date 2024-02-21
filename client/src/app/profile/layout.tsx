import type { Metadata } from "next";
import dynamic from "next/dynamic";
import NavBar from "@/components/Navbar";
import Loader from "@/components/Loader";
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
    <main>
      <NavBar />
      <ProfilePage />
    </main>
  );
};

export default ProfileLayout;
