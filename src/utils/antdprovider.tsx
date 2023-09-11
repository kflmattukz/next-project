"use client";
import { ConfigProvider } from "antd";

function AntdProviders({ children }: React.PropsWithChildren) {
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: "red",
      },
    }}
  >
    {children}
  </ConfigProvider>;
}

export default AntdProviders;
