import type { Metadata } from "next";
import dynamic from "next/dynamic";
import GoBack from "@/components/GoBack";
import Loader from "@/components/Loader";
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
    <main>
      <NavBar />
      <GoBack />
      {children}
    </main>
  );
};

export default TransactionsLayout;
