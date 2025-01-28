import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function RangeSelect({ onRadiusChange }) {
  const [radius, setRadius] = useState(4);
  const [isDragging, setIsDragging] = useState(false);

  const handleRadiusChange = (e) => {
    const valueInKm = e.target.value;
    setRadius(valueInKm);
    onRadiusChange(valueInKm);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl p-6 shadow-sm border border-gray-100"
    >
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">รัศมีการค้นหา</h2>
        <p className="text-sm text-gray-500 mt-1">
          เลือกระยะทางในการค้นหาสถานที่
        </p>
      </div>

      {/* Range Input Container */}
      <div className="relative mb-8">
        <div className="flex justify-between mb-2">
          <span className="text-sm text-gray-500">0.5 กม.</span>
          <span className="text-sm text-gray-500">50 กม.</span>
        </div>

        {/* Custom Range Input */}
        <div className="relative">
          <div className="absolute left-0 right-0 h-2 bg-gray-100 rounded-full" />
          <div
            className="absolute left-0 h-2 bg-purple-500 rounded-full"
            style={{ width: `${(radius - 0.5) / (50 - 0.5) * 100}%` }}
          />
          <input
            type="range"
            min="0.5"
            max="50"
            step="0.5"
            value={radius}
            onChange={handleRadiusChange}
            onMouseDown={() => setIsDragging(true)}
            onMouseUp={() => setIsDragging(false)}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="relative w-full h-2 appearance-none bg-transparent cursor-pointer"
            style={{
              '--range-progress': `${(radius - 0.5) / (50 - 0.5) * 100}%`,
            }}
          />
        </div>

        {/* Current Value Indicator */}
        <motion.div
          initial={false}
          animate={{
            scale: isDragging ? 1.1 : 1,
            y: isDragging ? -24 : -16
          }}
          className="absolute left-0 -top-2 transform -translate-y-full"
          style={{ left: `calc(${(radius - 0.5) / (50 - 0.5) * 100}% - 24px)` }}
        >
          <div className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md">
            {radius} กม.
          </div>
        </motion.div>
      </div>

      {/* Quick Select Buttons */}
      <div className="grid grid-cols-4 gap-2">
        {[1, 5, 10, 20].map((value) => (
          <motion.button
            key={value}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setRadius(value);
              onRadiusChange(value);
            }}
            className={`
              px-3 py-2 rounded-lg text-sm font-medium transition-all
              ${radius === value
                ? 'bg-blue-50 text-purple-600 border-2 border-blue-200'
                : 'bg-gray-50 text-gray-600 border border-gray-200 hover:bg-gray-100'
              }
            `}
          >
            {value} กม.
          </motion.button>
        ))}
      </div>

      {/* Current Selection Info */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <svg
              className="w-5 h-5 text-purple-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
          <div>
            <p className="text-sm text-gray-600">
              ค้นหาสถานที่ในรัศมี <span className="font-medium text-gray-900">{radius} กิโลเมตร</span>
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        input[type="range"] {
          -webkit-appearance: none;
          height: 8px;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        input[type="range"]::-webkit-slider-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        }

        input[type="range"]::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #fff;
          border: 2px solid #3B82F6;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          transition: all 0.2s;
        }

        input[type="range"]::-moz-range-thumb:hover {
          transform: scale(1.1);
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </motion.div>
  );
}

export default RangeSelect;