import React from "react";
import Image from "next/image";

const Loading: React.FC = () => {
  return (
    <div className='w-full flex-center'>
      <Image
        src='/icons/loader.svg'
        width={50}
        height={50}
        alt='loader'
        className='object-contain'
      />
    </div>
  );
};

export default Loading;