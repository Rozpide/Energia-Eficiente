import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';


export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add signup logic here
    console.log('Signup data:', formData);
  };
  return (
    <div className="mx-auto my-5">
    <div className="container">
      {/* Left Side - Description */}
      <div className="">
        <h1 className="">Become a member</h1>
        <p className="">
          Onmino helps you organize your ideas, tasks, and projects simply and efficiently. Start today!
        </p>
      </div>
      {/* Right Side - Signup Form */}
      <div className="w-1/2 p-8 bg-white">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
              required
            />
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn mx-2"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="mb-4 relative">
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-[#D0D7DE] rounded-md focus:outline-none focus:ring-2 focus:ring-[#1F6FEB]"
              required
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  </div>
)
}