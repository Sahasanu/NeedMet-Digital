import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { adminApi } from "../../../services/adminApi";
import { queryKeys } from "../../../../lib/queryClient";

/**
 * Custom TanStack Query hook for paginated Purchases.
 */
export function usePurchasesQuery({
  page = 1,
  pageSize = 15,
  status = "all",
  search = "",
} = {}) {
  return useQuery({
    queryKey: queryKeys.adminPurchases.list({
      page,
      pageSize,
      status,
      search,
    }),
    queryFn: () =>
      adminApi.getPurchases({
        page,
        limit: pageSize,
        status,
        search,
      }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000, // 1m freshness
    gcTime: 10 * 60 * 1000, // 10m in memory
  });
}

/**
 * Mutation hooks for purchases lifecycle updates.
 */
export function usePurchaseMutations() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.adminPurchases.all() });
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status, targetCollection }) =>
      adminApi.updatePurchaseStatus(id, status, targetCollection),
    onSuccess: invalidateAll,
  });

  return {
    updateStatusMutation,
  };
}

export default usePurchasesQuery;

