import React from 'react';
import UserHeader from '../components/UserHeader';
import { useLocation, Link } from 'react-router-dom';
import { type Item } from '../types/order';
import { type IProduct } from '../types/product';
import { formatArrivingDate } from '../utils/date';

interface LocationState {
  item?: Item;
  product?: IProduct;
}

const TrackOrder = (): React.JSX.Element => {

  const location = useLocation();
  const { item, product } = location.state as LocationState;

  return (
    <>
      <UserHeader />
      <div className="flex flex-col gap-5 mx-auto max-w-5xl mt-10 p-3">
        <Link
          to='/order'
          className="link link-hover link-info w-fit"
        >
          View all orders
        </Link>

        <div className="flex flex-col gap-2">
          <p className="text-2xl font-semibold">
            Arriving on {formatArrivingDate(item?.arrivingDate ?? "")}
          </p>
          <p>{product?.productName}</p>
          <p>Quantity: {item?.quantity}</p>
          <img
            src="https://picsum.photos/200"
            alt="Product image"
            className="max-w-sm"
          />
        </div>

        <ul className="timeline w-full">
          <li>
            <div className="timeline-start timeline-box">{item?.status}</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="size-8 fill-primary"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr className="h-2" />
          </li>
          <li className="flex-1/2">
            <hr className="h-2" />
            <div className="timeline-start timeline-box">Shipped</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="size-8 fill-base-300"
              >
                <path
                  fillRule="nonzero"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <hr className="h-2" />
          </li>
          <li>
            <hr className="h-2" />
            <div className="timeline-start timeline-box">Delivered</div>
            <div className="timeline-middle">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                className="size-8 fill-base-300"
              >
                <path
                  fillRule="nonzero"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default TrackOrder;
