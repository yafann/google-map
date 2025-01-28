import Data from '@/Shared/Data'
import React, { useState } from 'react'

function SelectRating() {
    const [selectedRating, setSelectedRating] = useState([]);

    const onSelectedRating = (isChecked,value) =>{
        if(isChecked)
        {
            setSelectedRating([...selectedRating,value]);
        }
        else{
            setSelectedRating(selectedRating.filter((n)=>n!==value));
        }
        console.log(selectedRating)
    }
    return (
      <div className='p-4'>
        <div className='max-w-3xl mx-auto'>
          <h2 className='text-xl font-semibold mb-4 text-gray-800'>เลือกระดับคะแนน</h2>
          <div className='bg-white rounded-xl p-3 shadow-sm '>
            <div className='space-y-2'>
              {Data.ratingList.map((item, index) => (
                <div 
                  key={index} 
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200
                    ${selectedRating.includes(item.name)
                      ? 'bg-purple-50 text-purple-700'
                      : 'hover:bg-gray-50'
                    }`}
                  onClick={(e) => onSelectedRating(!selectedRating.includes(item.name), item.name)}
                >
                  <div className='text-lg text-yellow-400'>{item.icon}</div>
                  <span className='text-sm font-medium'>{item.name}</span>
                  <div className='ml-auto'>
                    <div className={`w-5 h-5 rounded-full border-2 transition-colors
                      ${selectedRating.includes(item.name)
                        ? 'border-purple-500 bg-purple-500'
                        : 'border-gray-300'
                      }`}
                    >
                      {selectedRating.includes(item.name) && (
                        <div className='flex items-center justify-center h-full'>
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
}

export default SelectRating
