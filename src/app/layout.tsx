import "antd/dist/reset.css";
import "./globals.css";
import ReactQueryProviders from "@/utils/reactqueryprovider";
import AntdProviders from "@/utils/antdprovider";
import type { Metadata } from "next";
import themeConfig from "@/constant/theme";
import { UserContextProvider } from "@/context/user";

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
            <UserContextProvider>
              <div className="w-screen">{children}</div>
            </UserContextProvider>
          </AntdProviders>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
