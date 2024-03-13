// app/providers.tsx
"use client";

import { NextUIProvider } from "@nextui-org/react";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { store } from "@/app/redux/store";

/**
 * Component that provides the NextUIProvider, SessionProvider, and Redux Provider.
 * @param {Object} props - The component props.
 * @param {React.ReactNode} props.children - The children of the component.
 * @returns JSX element representing the providers.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <NextUIProvider>{children}</NextUIProvider>
      </Provider>
    </SessionProvider>
  );
}
