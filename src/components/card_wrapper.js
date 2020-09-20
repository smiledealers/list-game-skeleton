import React from 'react';

const CardWrapper = ({ children }) => {
  return (
    <section className="bg-off-white br4-ns pa3 br--bottom-ns pa3 h-100 overflow-y-hidden flex flex-column">
      {children}
    </section>
  );
};

export default CardWrapper;
