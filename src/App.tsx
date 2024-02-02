import { Navbar } from "./components/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClientProvider } from "@tanstack/react-query"
import { Outlet } from "react-router-dom";

import { queryClient } from "./services/queryClient"

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </ThemeProvider>
  )
}

export default App
