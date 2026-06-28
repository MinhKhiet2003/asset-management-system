import React from 'react';

const Badge = ({ children, color = 'gray' }) => {
  const colors = {
    green: 'badge-green',
    yellow: 'badge-yellow',
    red: 'badge-red',
    blue: 'badge-blue',
    gray: 'badge-gray',
  };
  return <span className={`badge ${colors[color]}`}>{children}</span>;
};

export default Badge;