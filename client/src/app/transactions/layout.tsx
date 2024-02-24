import type { Metadata } from "next";
import dynamic from "next/dynamic";
import GoBack from "@/helpers/GoBack";
import Loader from "@/helpers/Loader";
import { ProtectedRoute } from "@/helpers/RouteProtection";
const NavBar = dynamic(() => import("@/components/Navbar"), {
  loading: () => <Loader />,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Transactions | page",
  description: "see all your transactions",
};

const TransactionsLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <ProtectedRoute>
      <main>
        <NavBar />
        <GoBack />
        {children}
      </main>
    </ProtectedRoute>
  );
};

export default TransactionsLayout;
