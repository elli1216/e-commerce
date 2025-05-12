import { ChevronLeft, ChevronRight } from 'lucide-react';
import React from 'react';

const FilterTabs = () => {
  const filtersTabRef = React.useRef<HTMLDivElement | null>(null);

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
        <input type="radio" name="tab" className="tab" aria-label="Laptop" />
        <input type="radio" name="tab" className="tab" aria-label="Desktop" />
        <input type="radio" name="tab" className="tab" aria-label="Gaming" />
        <input type="radio" name="tab" className="tab" aria-label="Accessories" />
        <input type="radio" name="tab" className="tab" aria-label="Audio" />
        <input type="radio" name="tab" className="tab" aria-label="Keyboard" />
        <input type="radio" name="tab" className="tab" aria-label="Webcam" />
        <input type="radio" name="tab" className="tab" aria-label="Monitor" />
        <input type="radio" name="tab" className="tab" aria-label="Printer" />
        <input type="radio" name="tab" className="tab" aria-label="Networking" />
        <input type="radio" name="tab" className="tab" aria-label="Storage" />
        <input type="radio" name="tab" className="tab" aria-label="Software" />
        <input type="radio" name="tab" className="tab" aria-label="Software" />
        <input type="radio" name="tab" className="tab" aria-label="Software" />
        <input type="radio" name="tab" className="tab" aria-label="Software" />
        <input type="radio" name="tab" className="tab" aria-label="Software" />
      </div>
      <ChevronRight
        className="btn btn-square self-center next"
        onClick={handleClick}
      />
    </div>
  );
};

export default FilterTabs;
