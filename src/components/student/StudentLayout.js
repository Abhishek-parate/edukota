import React from 'react';
import Header from './Header';

const StudentLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex">
    

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 p-6 bg-gray-100 yash">
          {children}
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;
