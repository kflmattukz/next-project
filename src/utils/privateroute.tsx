"use client";

import React from "react";

type Props = {
  children: JSX.Element;
};

function WithPrivateRoute({ children }: Props) {
  return (
    <div>
      <div>hello this is HOC</div>
      {children}
    </div>
  );
}

export default WithPrivateRoute;
