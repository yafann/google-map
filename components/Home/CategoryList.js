import React, { useState } from 'react'
import Data from './../../Shared/Data'
import Image from "next/image";


function CategoryList({onCategoryChange}) {
    const [categoryList, setCategoryList] = useState(Data.CategoryListData)
    const [setlectedCategory, setSelectedCategory] = useState();
  // ... existing code ...
  return (
    <div className="p-4">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 mt-11">เลือกประเภทสถานที่</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categoryList.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col justify-center items-center p-4 rounded-xl transition-all duration-300 hover:shadow-lg cursor-pointer
            ${setlectedCategory == index 
              ? 'bg-purple-50 border-2 border-purple-500 shadow-md' 
              : 'bg-white border border-gray-200 hover:border-purple-300'
            }`}
            onClick={() => {
              setSelectedCategory(index);
              onCategoryChange(item.value);
            }}
          >
            <div className="mb-3">
              <Image
                src={item.icon}
                alt={item.name}
                width={48}
                height={48}
                className={`transition-all duration-300 ${
                  setlectedCategory == index ? '' : 'grayscale hover:grayscale-0'
                }`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
// ... existing code ...

export default CategoryList
