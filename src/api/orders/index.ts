import { Order, OrderStatus } from "@/assets/types";
import { supabase } from "@/src/lib/supabase";
import { useAuth } from "@/src/providers/AuthProvider";
import { useQuery } from "@tanstack/react-query";

export const useMyOrders = () => {
  const { session } = useAuth();

  return useQuery<Order[]>({
    queryKey: ["orders", { userId: session?.user?.id }],
    queryFn: async () => {
      if (!session?.user) return [];

      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// ADMIN ORDER REQ
export const useOrderList = ({ archived }: { archived: boolean }) => {
  const statuses: OrderStatus[] = archived
    ? ["DELIVERED"]
    : ["New", "Cooking", "Delivering"];

  return useQuery<Order[]>({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .in("status", statuses)
        .order("created_at", { ascending: false });
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

export const useOrderDetails = (id: number) => {
  return useQuery<Order>({
    queryKey: ['order', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('id', id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
