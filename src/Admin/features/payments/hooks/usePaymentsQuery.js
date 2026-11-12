import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { adminApi } from "../../../services/adminApi";
import { queryKeys } from "../../../../lib/queryClient";

/**
 * Custom TanStack Query hook for paginated Payments.
 */
export function usePaymentsQuery({
  page = 1,
  pageSize = 15,
  status = "all",
  search = "",
} = {}) {
  return useQuery({
    queryKey: queryKeys.adminPayments.list({
      page,
      pageSize,
      status,
      search,
    }),
    queryFn: () =>
      adminApi.getPayments({
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
 * Mutation hooks for payment transactions status updates.
 */
export function usePaymentMutations() {
  const queryClient = useQueryClient();

  const invalidateAll = () => {
    queryClient.invalidateQueries({ queryKey: queryKeys.adminPayments.all() });
  };

  const updateStatusMutation = useMutation({
    mutationFn: ({ id, status }) => adminApi.updatePaymentStatus(id, status),
    onSuccess: invalidateAll,
  });

  return {
    updateStatusMutation,
  };
}

export default usePaymentsQuery;

