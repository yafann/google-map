"use client";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";

function HeaderNavBar() {
  const { data: session } = useSession();
  const [profileClick, setProfileClick] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const dropdownRef = useRef(null);

  // Initialize user data when session is available
  useEffect(() => {
    if (session?.user) {
      setUsername(session.user.name || '');
      setImagePreview(session.user.image || '');
    }
  }, [session]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileClick(false);
        setEditMode(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    try {
      // TODO: Implement API call to update username
      const response = await fetch('/api/user/update-username', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username }),
      });

      if (response.ok) {
        setEditMode(false);
      } else {
        throw new Error('Failed to update username');
      }
    } catch (error) {
      console.error("Error updating username:", error);
      // TODO: Show error message to user
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        // Show preview immediately
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);

        // TODO: Implement API call to upload image
        const formData = new FormData();
        formData.append('image', file);

        const response = await fetch('/api/user/update-image', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        // Revert preview on error
        setImagePreview(session?.user?.image || '');
        // TODO: Show error message to user
      }
    }
  };

  return session?.user && (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white">
      <div className="flex items-center justify-between px-6 py-3 border-b">
        <div className="flex items-center gap-8">
          <Image 
            src="/logo.png" 
            alt="logo" 
            width={40} 
            height={40} 
            className="hover:opacity-80 transition-all"
          />
          <nav className="flex gap-6">
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Home</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span>Favourite</span>
            </button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="flex items-center gap-3 bg-gray-50 px-4 py-2.5 rounded-full w-[400px] focus-within:bg-white focus-within:ring-2 focus-within:ring-blue-500 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setProfileClick(!profileClick)}
              className="flex items-center gap-2 p-1.5 rounded-full hover:bg-gray-100 transition-all"
            >
              <div className="relative w-9 h-9">
                <Image
                  src={imagePreview || session.user.image}
                  alt={username || session.user.name}
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {profileClick && (
              <div className="absolute right-0 mt-2 w-[320px] bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
                <div className="p-6">
                  <div className="relative group mx-auto w-24 h-24">
                    <Image
                      src={imagePreview || session.user.image}
                      alt={username || session.user.name}
                      fill
                      className="rounded-full object-cover ring-4 ring-gray-50"
                    />
                    <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all cursor-pointer rounded-full">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </label>
                  </div>

                  <div className="mt-6">
                    {editMode ? (
                      <form onSubmit={handleUsernameSubmit} className="space-y-3">
                        <input
                          type="text"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Enter new username"
                          autoFocus
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-all"
                          >
                            บันทึก
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setEditMode(false);
                              setUsername(session.user.name);
                            }}
                            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-all"
                          >
                            ยกเลิก
                          </button>
                        </div>
                      </form>
                    ) : (
                      <div className="text-center">
                        <div className="flex items-center justify-center gap-2">
                          <h3 className="text-lg font-medium text-gray-900">
                            {username || session.user.name}
                          </h3>
                          <button
                            onClick={() => setEditMode(true)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{session.user.email}</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t">
                  <button
                    onClick={() => signOut()}
                    className="flex items-center justify-center gap-2 w-full px-6 py-4 text-gray-700 hover:bg-gray-50 transition-all"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    <span>ออกจากระบบ</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderNavBar;