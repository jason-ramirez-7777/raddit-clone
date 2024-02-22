import React from "react";
import { Loader2 } from "lucide-react";
import { ClerkLoaded, ClerkLoading, ClerkProvider } from "@clerk/nextjs";
import AuthProvider from "@/providers/AuthProvider";
import { TRPCReactProvider } from "@/trpc/react";
import "@/styles/globals.css";

// Metadata for the HTML document
export const metadata = {
  title: "Reddit Clone Test",
  description: "Developed by Anthony",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

// RootLayout component
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* TRPCReactProvider for TRPC */}
        <TRPCReactProvider>
          {/* ClerkProvider for authentication */}
          <ClerkProvider>
            {/* ClerkLoading component for displaying loader while Clerk is loading */}
            <ClerkLoading>
              <div className="flex justify-center items-center w-full h-screen">
                {/* Loader component */}
                <Loader2 size={64} className="text-primary animate-spin" />
              </div>
            </ClerkLoading>

            {/* ClerkLoaded component for rendering content after Clerk is loaded */}
            <ClerkLoaded>
              {/* AuthProvider for authentication */}
              <AuthProvider>
                {/* Render children components */}
                {children}
              </AuthProvider>
            </ClerkLoaded>
          </ClerkProvider>
        </TRPCReactProvider>
      </body>
    </html >
  );
}
