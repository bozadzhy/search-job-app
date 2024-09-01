import React, { FC, ReactNode } from 'react';

const Content: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="p-4">
      {children}
    </div>
  );
};

export default Content