import { ThemeProvider } from "@/components/client-component-theme-provider";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import Nav from "@/components/nav/page";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Abenezer Apps",
  description: "Some crazy description over here",
};

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
          <Nav />
          <main className="min-h-screen p-4 flex justify-center w-full">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
