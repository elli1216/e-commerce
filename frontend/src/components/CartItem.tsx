import React from 'react';
import DeliveryOption from './DeliveryOption';

interface CartItemProps {
  prodId: string;
}

const CartItem = ({ prodId }: CartItemProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-5 p-3 border border-base-300 md:flex-row md:gap">
      <div>
        <img src="https://picsum.photos/200" alt="Product image" />
      </div>

      <div className="flex flex-col gap-2 flex-1 min-w-fit">
        <p className="font-semibold">Product name</p>
        <p>₱500</p>
        <div className="h-7">
          <button className='btn btn-sm bg-base-100'>-</button>
          <input
            type="number"
            value="1"
            readOnly
            className="input input-sm input-ghost w-12 text-center"
          />
          <button className='btn btn-sm bg-base-100 h-full'>+</button>
        </div>
        <span className="link-info link-hover cursor-pointer w-fit">Delete</span>
      </div>

      <div className="flex flex-col gap-3 min-w-fit">
        <p className="font-semibold">Choose Delivery Option:</p>
        <DeliveryOption
          prodId={`${prodId}`}
          label="Thursday, May 5"
          subLabel="Free - Shipping"
        />
        <DeliveryOption
          prodId={`${prodId}`}
          label="Sunday, May 11"
          subLabel="₱40 - Shipping"
        />
        <DeliveryOption
          prodId={`${prodId}`}
          label="Wednesday, May 7"
          subLabel="₱80 - Shipping"
        />
      </div>
    </div>
  );
};

export default CartItem;
