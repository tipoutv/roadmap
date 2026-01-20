import "./globals.css";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Roadmap – Your Valorant path to rank up",
  description:
    "Roadmap analyzes your performance and builds a clear plan to help you climb faster in Valorant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  );
}
