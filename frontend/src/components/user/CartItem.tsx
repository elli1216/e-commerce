import React from "react";
import DeliveryOption from "./DeliveryOption";
import type { IProduct } from "../../types/product";
import { axiosInstance } from "../../config/axios";
import { type Item } from "../../types/cart";
import { getImageUrl } from "../../utils";
import { formatArrivingDate } from "../../utils/date";

const CartItem = (props: Item): React.JSX.Element => {
  const [products, setProducts] = React.useState<IProduct[] | null>(null);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedShipping, setSelectedShipping] = React.useState<string>("0");

  const cartProduct = React.useMemo(() => {
    if (!products) return null;
    return products.find((p) => p.id === props.productId) || null;
  }, [products, props.productId]);

  const calculateArrivalDate = (daysToAdd: number): Date => {
    const date = new Date();
    date.setDate(date.getDate() + daysToAdd);
    // Set time to end of day
    date.setHours(23, 59, 59, 999);
    return date;
  };

  const getFormattedArrivalDate = (daysToAdd: number): string => {
    return formatArrivingDate(calculateArrivalDate(daysToAdd).toISOString());
  };

  const handleShippingSelect = (fee: string, days: number) => {
    setSelectedShipping(fee);
    // Update the item's arriving date when shipping option is selected
    const newDate = calculateArrivalDate(days);
    props.onShippingChange?.(props.productId, fee, newDate.toISOString());
  };

  React.useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const response = await axiosInstance.get<{ product: IProduct[] }>(
          "/products"
        );
        // Ensure products is always treated as an array
        const productData = response.data.product || [];
        const productsArray = Array.isArray(productData)
          ? productData
          : [productData];
        setProducts(productsArray);
        setError(null);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setError("Failed to load product data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Show loading state while products are being fetched
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4">
        Loading item...
      </div>
    );
  }

  // Show error state if there was a problem fetching products
  if (error) {
    return <div className="text-error p-4">{error}</div>;
  }

  // Show a fallback if the product isn't found
  if (!cartProduct) {
    return (
      <div className="flex flex-col gap-5 p-3 border border-base-300 md:flex-row md:gap">
        <div>
          <div className="w-[13rem] h-[13rem] bg-base-300 flex items-center justify-center rounded-lg">
            Product not found
          </div>
        </div>
        <div className="flex flex-col gap-2 flex-1">
          <p className="font-semibold">Unknown Product</p>
          <p>{props.subTotal}</p>
          <div className="h-7">
            <button
              onClick={() =>
                props.decreaseQuantity && props.productId
                  ? props.decreaseQuantity(props.productId)
                  : null
              }
              className="btn btn-sm bg-base-100"
            >
              -
            </button>
            <input
              type="number"
              value={props.quantity || 1}
              readOnly
              className="input input-sm input-ghost w-12 text-center"
            />
            <button
              onClick={() =>
                props.increaseQuantity && props.productId
                  ? props.increaseQuantity(props.productId)
                  : null
              }
              className="btn btn-sm bg-base-100 h-full"
            >
              +
            </button>
          </div>
          <button
            onClick={() =>
              props.onDeleteItem && props.productId
                ? props.onDeleteItem(props.productId)
                : null
            }
            className="link-info link-hover cursor-pointer w-fit"
          >
            Delete
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 p-3 border border-base-300 md:flex-row md:gap">
      <div>
        <img
          src={getImageUrl(cartProduct.productImage || "default.jpg")}
          className="w-[13rem] h-[13rem] object-cover rounded-lg"
          alt={cartProduct.productName || "Product image"}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-fit">
        <p className="font-semibold">{cartProduct.productName}</p>
        <p>{props.subTotal}</p>
        <div className="h-7">
          <button
            onClick={() =>
              props.decreaseQuantity && props.productId
                ? props.decreaseQuantity(props.productId)
                : null
            }
            className="btn btn-sm bg-base-100"
          >
            -
          </button>
          <input
            type="number"
            value={props.quantity || 1}
            readOnly
            className="input input-sm input-ghost w-12 text-center"
          />
          <button
            onClick={() =>
              props.increaseQuantity && props.productId
                ? props.increaseQuantity(props.productId)
                : null
            }
            className="btn btn-sm bg-base-100 h-full"
          >
            +
          </button>
        </div>
        <button
          onClick={() =>
            props.onDeleteItem && props.productId
              ? props.onDeleteItem(props.productId)
              : null
          }
          className="link-info link-hover cursor-pointer w-fit"
        >
          Delete
        </button>
      </div>

      <div className="flex flex-col gap-3 min-w-fit">
        <p className="font-semibold">Choose Delivery Option:</p>
        <DeliveryOption
          prodId={`${props.productId}`}
          label={getFormattedArrivalDate(7)}
          subLabel="Free - Shipping"
          shippingFee="0"
          isSelected={selectedShipping === "0"}
          onSelect={() => handleShippingSelect("0", 7)}
        />
        <DeliveryOption
          prodId={`${props.productId}`}
          label={getFormattedArrivalDate(4)}
          subLabel="₱40 - Shipping"
          shippingFee="40"
          isSelected={selectedShipping === "40"}
          onSelect={() => handleShippingSelect("40", 4)}
        />
        <DeliveryOption
          prodId={`${props.productId}`}
          label={getFormattedArrivalDate(2)}
          subLabel="₱80 - Shipping"
          shippingFee="80"
          isSelected={selectedShipping === "80"}
          onSelect={() => handleShippingSelect("80", 2)}
        />
      </div>
    </div>
  );
};

export default CartItem;
