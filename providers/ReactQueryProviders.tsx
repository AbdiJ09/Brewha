import {
  QueryClientProvider,
  QueryClient,
  focusManager,
} from "@tanstack/react-query";
import { useReactQueryDevTools } from "@dev-plugins/react-query";
import { AppStateStatus, Platform } from "react-native";

export default function ReactQueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  function onAppStateChange(status: AppStateStatus) {
    if (Platform.OS !== "web") {
      focusManager.setFocused(status === "active");
    }
  }
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: 2 } },
  });
  useReactQueryDevTools(queryClient);
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
