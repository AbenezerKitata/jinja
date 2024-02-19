import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/utils/supabase/server";
import { LeftNavBar } from "@/components/nav-left";
import RightNavBar from "@/components/nav-right";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
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
}: {
  children: React.ReactNode;
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
          <div className="navbar flex justify-between p-4">
            <LeftNavBar />
            <RightNavBar />
          </div>
          <main className="min-h-screen flex flex-col items-center">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
