import React from 'react';
import HomePage from '../_components/layout/main';


const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col">
      <HomePage/>
    </div>
  );
};

export default AuthLayout;