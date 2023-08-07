import React from 'react';
import './globals.css'

const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
