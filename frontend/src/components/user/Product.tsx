import React from "react";
import Select from "./Select";
import { type IProduct } from "../../types/product";
import { useNavigate } from "react-router-dom";
import { getImageUrl } from "../../utils";
interface ProductProps {
  product: IProduct;
  onAddToCart: (product: IProduct, quantity: number) => void;
}

const Product = ({ product, onAddToCart }: ProductProps): React.JSX.Element => {
  const [quantity, setQuantity] = React.useState<number>(1);
  const [showAdded, setShowAdded] = React.useState<boolean>(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    setQuantity(Number(e.target.value));
  };

  const handleAddToCart = (e: React.MouseEvent): void => {
    e.stopPropagation();
    onAddToCart(product, quantity);
    setShowAdded(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => setShowAdded(false), 2000);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleCardClick = () => {
    navigate(`/${product.id}`, { state: { product } });
  };

  return (
    <div
      onClick={handleCardClick}
      className="flex flex-col w-fit hover:bg-base-300 transition-all"
    >
      <div className="flex justify-center items-center">
        <img
          src={getImageUrl(product.productImage)}
          className="w-[17rem] h-[13rem] object-cover rounded-lg"
          alt="Product image"
        />
      </div>
      <div className="flex flex-col gap-2 p-2">
        <span>{product.productName}</span>
        <span>₱{product.productPrice}</span>
        <div
          className="flex flex-row justify-between"
          onClick={(e) => e.stopPropagation()}
        >
          <Select onQuantityChange={handleQuantityChange} quantity={quantity} />
          <div
            className={`badge badge-success bg-accent ${
              showAdded ? "opacity-100" : "opacity-0"
            } transition-opacity`}
          >
            <svg
              className="size-[1em]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <g
                fill="currentColor"
                strokeLinejoin="miter"
                strokeLinecap="butt"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
                <polyline
                  points="7 13 10 16 17 8"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="square"
                  strokeMiterlimit="10"
                  strokeWidth="2"
                />
              </g>
            </svg>
            Added
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="btn btn-sm btn-secondary self-center"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default Product;
