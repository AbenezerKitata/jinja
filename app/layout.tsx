import { ThemeProvider } from "@/components/client-component-theme-provider";
import "./globals.css";
import { createClient } from "@/utils/supabase/server";
import { LeftNavBar } from "@/components/client-component-nav-left";
import RightNavBar from "@/components/component-nav-right";
import { Toaster } from "@/components/ui/toaster";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Abenezer Apps",
  description: "Some crazy description over here",
};

const canInitSupabaseClient = () => {
  // This function is just for the interactive tutorial.
  // Feel free to remove it once you have Supabase connected.
  try {
    createClient();
    return true;
  } catch (e) {
    return false;
  }
};

export const isSupabaseConnected = canInitSupabaseClient();

export default function RootLayout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { message?: string };
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {searchParams?.message && (
            <div className="bg-yellow-900 text-white p-4 text-center">
              {searchParams?.message}
            </div>
          )}
          <div className="navbar flex justify-between p-4">
            <LeftNavBar />
            <RightNavBar searchParams={searchParams} />
          </div>
          <main className="min-h-screen p-4 flex justify-center w-full">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
