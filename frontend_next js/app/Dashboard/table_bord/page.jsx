'use client';

import React from 'react';

const SalesDashboard = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customers Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-rose-100 to-rose-200 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <span className="text-gray-600 font-medium">Customers</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extrabold text-gray-800">3,782</h2>
            <div className="flex items-center text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">11.01%</span>
            </div>
          </div>
        </div>

        {/* Orders Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-gradient-to-br from-rose-100 to-rose-200 p-3 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
              </svg>
            </div>
            <span className="text-gray-600 font-medium">Orders</span>
          </div>
          <div className="flex items-center justify-between">
            <h2 className="text-4xl font-extrabold text-gray-800">5,359</h2>
            <div className="flex items-center text-rose-600 bg-rose-50 px-2 py-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">9.05%</span>
            </div>
          </div>
        </div>

        {/* Monthly Target Card */}
        <div className="bg-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-xl text-gray-800">Monthly Target</h3>
            <button className="text-gray-400 hover:text-rose-600 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
              </svg>
            </button>
          </div>
          
          <div className="flex justify-center mb-6">
            <div className="relative h-44 w-44">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="10"/>
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="url(#grad)" 
                  strokeWidth="10" 
                  strokeDasharray="283" 
                  strokeDashoffset="70" 
                  strokeLinecap="round" 
                  transform="rotate(-90 50 50)"
                  className="animate-pulse-slow"
                />
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#e11d48', stopOpacity: 1 }} /> {/* rose-600 */}
                    <stop offset="100%" style={{ stopColor: '#be123c', stopOpacity: 1 }} /> {/* darker rose shade */}
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold text-gray-800">75.55%</span>
                <span className="text-rose-600 text-sm font-medium">+10%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-rose-50 to-rose-100 p-3 text-center text-sm text-gray-600 rounded-lg mb-4">
            You earned <span className="font-bold text-rose-600">$3,287</span> today, surpassing last month's performance. Amazing work!
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Target', value: '$20K', color: 'rose-600', direction: 'down' },
              { label: 'Revenue', value: '$20K', color: 'rose-600', direction: 'up' },
              { label: 'Today', value: '$20K', color: 'rose-600', direction: 'up' },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-gray-500 text-sm">{item.label}</p>
                <div className="flex items-center justify-center">
                  <span className="font-bold text-gray-800">{item.value}</span>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 text-${item.color} ml-1`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d={item.direction === 'up' ? 
                      "M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" : 
                      "M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"} clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Monthly Sales Chart */}
      <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-xl text-gray-800">Monthly Sales</h3>
          <button className="text-gray-400 hover:text-rose-600 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
            </svg>
          </button>
        </div>
        
        <div className="h-72 flex items-end space-x-2 mb-2">
          {[
            { month: 'Jan', value: 150 },
            { month: 'Feb', value: 350 },
            { month: 'Mar', value: 180 },
            { month: 'Apr', value: 280 },
            { month: 'May', value: 180 },
            { month: 'Jun', value: 180 },
            { month: 'Jul', value: 260 },
            { month: 'Aug', value: 100 },
            { month: 'Sep', value: 200 },
            { month: 'Oct', value: 350 },
            { month: 'Nov', value: 250 },
            { month: 'Dec', value: 100 }
          ].map((item) => (
            <div key={item.month} className="flex-1 flex flex-col items-center group">
              <div 
                className="w-full bg-gradient-to-t from-rose-500 to-rose-600 rounded-t-md transition-all duration-300 group-hover:h-[110%]" 
                style={{ height: `${(item.value / 400) * 200}px` }}
              ></div>
              <div className="text-xs text-gray-500 mt-2 font-medium">{item.month}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesDashboard;