"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar";
import Header from "../Header";

import Loader from "@/app/components/common/Loader"
import { Veterinary } from "@/app/interface";
import { useVeterinaryStore } from "@/store";

interface Props {
  children: React.ReactNode;
  veterinary: Veterinary[]
}

export default function DefaultLayout({
  children, veterinary
}: Props) {

  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { setVeterinary } = useVeterinaryStore(state => state);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
    setVeterinary(veterinary);
  }, []);

  return (
    <>
      {loading ? <Loader /> :
        <div className="flex h-screen overflow-hidden">
          <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <main>
              <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                {children}
              </div>
            </main>
          </div>
        </div>
      }
    </>
  );
}
