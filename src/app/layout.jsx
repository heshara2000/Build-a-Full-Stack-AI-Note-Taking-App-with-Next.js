import Header from "../../components/Header";
import "../../styles/globals.css";
import { ThemeProvider } from "./providers/ThemeProvider";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/AppSidebar"

export const metadata = {
  title: "Goat Notes",
  description: "A note-taking app for goats",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <SidebarProvider>
            <AppSidebar />
            <div className="flex min-h-screen w-full flex-col">
              <Header />
              <main className="flex flex-1 flex-col px-4 pt-10 xl:px-8">
                {children}
              </main>
            </div>

          </SidebarProvider>

            

            <Toaster position="top-right" richColors />

        </ThemeProvider>
      </body>
    </html>
  );
}
