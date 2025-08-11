
import React from 'react';

interface DisplayProps {
  value: string;
}

const Display: React.FC<DisplayProps> = ({ value }) => {
  const getFontSize = (val: string) => {
    const length = val.replace(/,/g, '').length;
    if (length > 15) return 'text-4xl';
    if (length > 10) return 'text-5xl';
    if (length > 7) return 'text-6xl';
    return 'text-8xl';
  };

  return (
    <div className="bg-black text-white w-full h-32 flex items-end justify-end p-6 mb-4 rounded-b-lg">
      <h1 className={`font-light ${getFontSize(value)} break-all text-right transition-font-size duration-200`}>
        {value}
      </h1>
    </div>
  );
};

export default Display;
