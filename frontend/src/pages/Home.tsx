import React from 'react';
import Product from '../components/Product';
import UserHeader from '../components/UserHeader';
import FilterTabs from '../components/FilterTabs';

const Home = (): React.JSX.Element => {
  return (
    <>
      <UserHeader />
      <div className="max-w-7xl mx-auto px-2">
        <FilterTabs />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-2">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
      </div>
    </>
  );
};

export default Home;
