"use client";

import React from "react";
import { useDrawerStore } from "@/store/useDrawerStore";
import DrawerComp from "@/components/Drawer";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: React.ReactNode;
};

const client = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

export default function Template({ children }: Props) {
  return (
    <>
      <QueryClientProvider client={client}>
        {children}
        <DrawerComp />
      </QueryClientProvider>
    </>
  );
}
