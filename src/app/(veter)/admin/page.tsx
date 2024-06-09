
import ECommerce from "@/app/components/Dashboard/E-commerce";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import { Metadata } from "next";
import { auth } from "@/app/auth"
export const metadata: Metadata = {
  title:
    "Next.js E-commerce Dashboard | TailAdmin - Next.js Dashboard Template",
  description: "This is Next.js Home for TailAdmin Dashboard Template",
};

export default async function Home() {
  const session = await auth()
  return (
    <>
      <p>Welcome {session?.user?.name}!</p>
      <ECommerce />
    </>

  );
}
