import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';
import { axiosInstance } from '../config/axios';

const FilterTabs = () => {
  const filtersTabRef = React.useRef<HTMLDivElement | null>(null);
  const [categories, setCategories] = React.useState<string[] | null>(null);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await axiosInstance.get<{ category: string[] }>('/categories');
      const categories = response.data.category;
      setCategories(categories);
    }

    fetchCategories();
  }, []);

  const handleClick: React.MouseEventHandler<SVGSVGElement> = (e) => {
    // previous button
    if (e.currentTarget.classList.contains('previous')) {
      filtersTabRef.current?.scrollBy({ left: -200, behavior: 'smooth' });
      return;
    }
    // next button
    if (e.currentTarget.classList.contains('next')) {
      filtersTabRef.current?.scrollBy({ left: 200, behavior: 'smooth' });
      return;
    }
  };

  return (
    <div className="flex flex-row my-8 gap-2 justify-center">
      <ChevronLeft
        className="btn btn-square self-center previous"
        onClick={handleClick}
      />
      <div
        ref={filtersTabRef}
        className="tabs tabs-box flex-nowrap scroll-smooth overflow-hidden"
      >
        {categories?.map(category =>
          <input type="radio" name="tab" className="tab" aria-label={category} />
        )}
      </div>
      <ChevronRight
        className="btn btn-square self-center next"
        onClick={handleClick}
      />
    </div>
  );
};

export default FilterTabs;
