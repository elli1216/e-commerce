import React from "react";
import OrderItem from "../../components/user/OrderItem";
import { axiosInstance } from "../../config/axios";
import { type Order } from "../../types/order";
import { useAuth } from "../../context/context";
import { formatOrderDate } from "../../utils/date";
import { PackageX } from "lucide-react";

const Order = (): React.JSX.Element => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const { user } = useAuth();

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosInstance.get<{ order: Order | Order[] }>(
          "/orders"
        );
        let orders = response.data.order;
        if (!Array.isArray(orders)) {
          orders = orders ? [orders] : [];
        }
        // Filter orders for the logged-in user
        const userOrders = user
          ? orders.filter((order) => order.userId === user.uid)
          : [];
        setOrders(userOrders);
      } catch (err) {
        console.error("Failed to fetch Orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <>
      <div className="max-w-5xl mx-auto my-8 p-3">
        <h1 className="text-4xl font-semibold w-fit">Your Order</h1>
      </div>
      {/* Render orders here */}
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-96 text-base-content/60">
          <PackageX className="w-20 h-20 mb-4 text-secondary-content" />
          <span className="text-2xl text-secondary-content">
            You have no orders yet.
          </span>
        </div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="px-3 mb-10">
            <div className="flex flex-col max-w-5xl w-full mx-auto border border-base-300">
              {/* Header */}
              <div className="flex flex-col gap-3 border-b border-base-300 p-3 sm:flex-row-reverse sm:justify-between">
                <div>
                  <span className="block font-semibold">Order ID:</span>
                  <span>{order.id}</span>
                </div>
                <div className="flex flex-row gap-5">
                  <div>
                    <span className="block font-semibold">Order Placed:</span>
                    <span>{formatOrderDate(order.date)}</span>
                  </div>
                  <div>
                    <span className="block font-semibold">Total:</span>
                    <span>₱{order.orderTotal}</span>
                  </div>
                </div>
              </div>
              {/* Item */}
              {(Array.isArray(order.items.item)
                ? order.items.item
                : [order.items.item]
              ).map((item) => (
                <OrderItem key={item.productId} {...item} />
              ))}
            </div>
          </div>
        ))
      )}
    </>
  );
};

export default Order;
