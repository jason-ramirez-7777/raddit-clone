import React from "react";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/providers/AuthProvider";
import { TRPCReactProvider } from "@/trpc/react";
import "@/styles/globals.css";

export const metadata = {
  title: "Create T3 App",
  description: "Generated by create-t3-app",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <ClerkProvider>
            <ClerkLoading>
              <div className="flex justify-center items-center w-full h-screen">
                Loading...
              </div>
            </ClerkLoading>

            <ClerkLoaded>
              <AuthProvider>
                {children}
              </AuthProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html >
  );
}
