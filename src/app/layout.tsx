import "antd/dist/reset.css";
import "./globals.css";
import { Nav } from "@/components/Nav";
import ReactQueryProviders from "@/utils/reactqueryprovider";
import AntdProviders from "@/utils/antdprovider";
import type { Metadata } from "next";
import themeConfig from "@/constant/theme";

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
        <ReactQueryProviders>
          <AntdProviders theme={themeConfig}>
            <Nav />
            {children}
          </AntdProviders>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
