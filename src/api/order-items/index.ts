import { CartItem } from "@/assets/types";
import { supabase } from "@/src/lib/supabase";
import { useMutation } from "@tanstack/react-query";

export const useInsertOrderItems = () => {
  return useMutation({
    async mutationFn({
      items,
      order_id,
    }: {
      items: CartItem[];
      order_id: number;
    }) {
      const { error } = await supabase
        .from("order_items")
        .insert(
          items.map((item) => ({
            size: item.size,
            quantity: item.quantity,
            order_id: order_id,
            product_id: item.product_id,
          }))
        )
        .select();

      if (error) {
        throw error;
      }
    },
    onError(error) {
      console.log(error);
    },
  });
};
