"use client";

import React from "react";
import { ConfigProvider, ThemeConfig } from "antd";

type Props = {
  children: React.ReactNode;
  theme?: ThemeConfig;
};

function AntdProviders({ children, theme }: Props) {
  return <ConfigProvider theme={theme}>{children}</ConfigProvider>;
}

export default AntdProviders;
