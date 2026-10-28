import { queryOptions } from "@tanstack/react-query";
import { fetchCard, fetchCards } from "./cards";

export const cardQueries = {
  all: () => ["cards"] as const,
  list: () =>
    queryOptions({
      queryKey: [...cardQueries.all(), "list"],
      queryFn: fetchCards,
    }),
  detail: (id: string) =>
    queryOptions({
      queryKey: [...cardQueries.all(), "detail", id],
      queryFn: () => fetchCard(id),
    }),
};
