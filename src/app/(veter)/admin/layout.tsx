import "jsvectormap/dist/css/jsvectormap.css";
import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import DefaultLayout from "@/app/components/Layouts/DefaultLayout";
import AuthProvider from "@/app/providers/AuthProvider";
import { NextUIProvider } from "@nextui-org/react";
import { getVeterinaryByUser } from "@/app/actions/user/user-veterinary";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {

  const session = await auth();
  if (!session) {
    redirect('/auth/login')
  }

  const veterinary = await getVeterinaryByUser();
  console.log('veterinary', veterinary);

  return (
    <NextUIProvider>
      <AuthProvider>
        <div className="dark:bg-boxdark-2 dark:text-bodydark">
          <DefaultLayout veterinary={veterinary}>
            {children}
          </DefaultLayout>
        </div>
      </AuthProvider>
    </NextUIProvider>
  );
}