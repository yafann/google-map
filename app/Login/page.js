"use client";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

function Login() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    if (session?.user) {
      router.push("/");
    }
  }, [session, router]);

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = {
      username: formData.get('username'),
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData)
      });

      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!');
        setIsSignUp(false);
      } else {
        alert(data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred during registration');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const loginData = {
      email: formData.get('email'),
      password: formData.get('password')
    };

    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      alert('Login successful!');
      
      // เก็บข้อมูลผู้ใช้ใน localStorage หรือ state
      localStorage.setItem('userProfile', JSON.stringify(data));

      // เปลี่ยนเส้นทางไปยังหน้า /
      router.push("/");
    } catch (error) {
      console.error('Error:', error);
      alert(error.message || 'An error occurred during login');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 p-6">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-sm rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-8 border border-white/20">
        <div className="flex justify-center mb-8">
          <div className="relative">
            <Image
              src="/logo.png"
              alt="logo"
              width={120}
              height={120}
              className="drop-shadow-xl hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute -inset-2 bg-blue-500/20 rounded-full blur-xl -z-10"></div>
          </div>
        </div>
        {isSignUp ? (
          <form onSubmit={handleSignUp}>
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Create an Account
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-300"
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Sign Up
            </button>
            <p className="mt-6 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(false)}
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline transition-colors"
              >
                Sign In
              </button>
            </p>
          </form>
        ) : (
          <div>
            <h2 className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
              Welcome Back
            </h2>
            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-300"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-sm font-medium mb-1"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 outline-none hover:border-blue-300"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                Sign In
              </button>
            </form>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => signIn('google')}
                className="w-full py-3 px-4 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center justify-center gap-3"
              >
                <Image
                  src="/google.svg"
                  alt="Google"
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
                <span className="text-gray-700 font-medium">Continue with Google</span>
              </button>
            </div>
            <p className="mt-8 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setIsSignUp(true)}
                className="text-blue-500 hover:text-blue-600 font-medium hover:underline transition-colors"
              >
                Sign Up
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;