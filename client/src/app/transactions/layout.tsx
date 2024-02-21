import type { Metadata } from "next";
import NavBar from "@/components/Navbar";
import GoBack from "@/components/GoBack";

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
