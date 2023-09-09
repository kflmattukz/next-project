import "./globals.css";
import { Nav } from "@/components/Nav";
import Providers from "@/utils/provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next project",
  description: "Next tailwind antd & react query",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Nav />
          {children}
        </Providers>
      </body>
    </html>
  );
}
