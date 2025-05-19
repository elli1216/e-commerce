import React from 'react';
import Select from '../components/Select';
import UserHeader from '../components/UserHeader';
import { useLocation } from 'react-router-dom';
import { IProduct } from '../types/product';
import { useAuth, useCart } from '../hooks/context';
import { axiosInstance } from '../config/axios';

const ProductDetail = (): React.JSX.Element => {
  const location = useLocation();
  const product = location.state?.product as IProduct;
  const { user } = useAuth();
  const { fetchCartItems } = useCart();
  const [quantity, setQuantity] = React.useState<number>(1);

  const handleQuantityChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setQuantity(Number(e.target.value));
    console.log(quantity)
  }

  const handleAddToCart = async (product: IProduct, quantity = 1): Promise<void> => {
    if (!user) return;

    try {
      await axiosInstance.post('/cart/add', {
        userId: user.uid,
        productId: product.id,
        price: product.productPrice,
        quantity
      });

      await fetchCartItems();
    } catch (err) {
      console.error(err);
      return;
    }
  }

  return (
    <>
      <UserHeader />
      <div className="p-4">
        {/* Product Details */}
        <section className="border border-base-300 p-2 md:flex flex-row gap-2 mx-auto max-w-5xl mb-5">
          <div>
            <img src="https://picsum.photos/400" alt="Product image" />
          </div>
          <div className="flex flex-col gap-2 md:justify-between">
            <div className="flex flex-col gap-5">
              <span className="font-semibold">{product.productName}</span>
              <span>₱{product.productPrice}</span>
              <Select quantity={quantity} onQuantityChange={handleQuantityChange} />
            </div>
            <div className="flex flex-row gap-2">
              <button onClick={() => handleAddToCart(product)} className="btn btn-secondary">Add to cart</button>
              <button className="btn btn-primary">Buy now</button>
            </div>
          </div>
        </section>

        {/* Product Specification */}
        <section className="border border-base-300 p-6 mx-auto max-w-5xl text-base-content bg-base-100 flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 border-b border-base-300 pb-2">Product Specification</h2>
            <ul className="space-y-2">
              <li>
                <span className="font-medium text-base-content/80">Category:</span> {product.category}
              </li>
              <li>
                <span className="font-medium text-base-content/80">Stock:</span> {product.productStock}
              </li>
              <li>
                <span className="font-medium text-base-content/80">Brand:</span> {product.productBrand}
              </li>
            </ul>
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4 border-b border-base-300 pb-2">Product Description</h2>
            <p className="text-base-content/90">{product.productDescription}</p>
          </div>
        </section>
      </div >
    </>
  );
};

export default ProductDetail;
