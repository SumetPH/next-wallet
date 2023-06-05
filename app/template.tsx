"use client";

import React from "react";
import { useDrawerStore } from "@/store/useDrawerStore";
import DrawerComp from "@/components/Drawer";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

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
      <Provider store={store}>
        <QueryClientProvider client={client}>
          {children}
          <DrawerComp />
        </QueryClientProvider>
      </Provider>
    </>
  );
}
