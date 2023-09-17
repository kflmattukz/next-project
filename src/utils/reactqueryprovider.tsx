"use client";

import React from "react";
import {
  QueryClientProvider,
  QueryClient,
  MutationCache,
  QueryCache,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactQueryStreamedHydration } from "@tanstack/react-query-next-experimental";

function ReactQueryProviders({ children }: React.PropsWithChildren) {
  const [client] = React.useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 60 * 1000, // 1m
          retry: false,
        },
      },
      mutationCache: new MutationCache({
        onError: (err) => {
          console.log(err);
        },
      }),
      queryCache: new QueryCache({
        onError: (err) => {
          console.log(err);
        },
      }),
    })
  );

  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {process.env.NODE_ENV === "development" ? (
        <ReactQueryDevtools initialIsOpen={false} />
      ) : (
        ""
      )}
    </QueryClientProvider>
  );
}

export default ReactQueryProviders;
