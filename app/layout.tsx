import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "@/components/themes/theme-provider";
import { Bounce, ToastContainer } from "react-toastify";
import { createClient } from "@/lib/supabase/server";
import UserProvider from "@/context/user-context";
import UserLayout from "@/components/layout/layout";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Dinagat Water Billing",
  description: "Dinagat Water Billing Dashboard Administration",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            {data?.user ? <UserLayout>{children}</UserLayout> : children}
          </UserProvider>

          <ToastContainer
            position="bottom-left"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
            transition={Bounce}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}
