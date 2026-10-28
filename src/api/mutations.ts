import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFavoritesStore } from "../stores/favorites";
import { createCard, deleteCard, updateCard } from "./cards";
import { cardQueries } from "./queries";

export function useAddCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCard,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: cardQueries.all() }),
  });
}

export function useRemoveCard() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCard,
    onSuccess: (_data, id) => {
      // Hors rendu : on lit le store directement, sans hook.
      useFavoritesStore.getState().removeFavorite(id);
      return queryClient.invalidateQueries({ queryKey: cardQueries.all() });
    },
  });
}

export function useChangeQuantity() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, quantity }: { id: string; quantity: number }) =>
      updateCard(id, { quantity }),
    onMutate: async ({ id, quantity }) => {
      await queryClient.cancelQueries({ queryKey: cardQueries.all() });

      const previousList = queryClient.getQueryData(cardQueries.list().queryKey);
      const previousDetail = queryClient.getQueryData(cardQueries.detail(id).queryKey);

      queryClient.setQueryData(cardQueries.list().queryKey, (old) =>
        old?.map((card) => (card.id === id ? { ...card, quantity } : card)),
      );
      queryClient.setQueryData(cardQueries.detail(id).queryKey, (old) =>
        old && { ...old, quantity },
      );

      return { previousList, previousDetail };
    },
    onError: (_error, { id }, context) => {
      queryClient.setQueryData(cardQueries.list().queryKey, context?.previousList);
      queryClient.setQueryData(cardQueries.detail(id).queryKey, context?.previousDetail);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: cardQueries.all() }),
  });
}
