import { AuthProvider } from "../context/AuthContext";
import "./globals.css";

export const metadata = {
  title: "Kanban App",
  description: "Reto técnico Kanban con Next.js + Tailwind",
  icons: {
    icon: "/logo.png", 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
