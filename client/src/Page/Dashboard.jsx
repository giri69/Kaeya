import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const openPopup = () => setPopupOpen(true);
  const closePopup = () => setPopupOpen(false);

  const handleSubmit = () => {
    console.log({ name, type: "EC2", description });
    closePopup();
    navigate("/cards");
  };

  return (
    <div className="w-screen h-screen bg-gray-800">
      <nav className="bg-grey-400 py-4 px-8">
        <div className="container flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Dashboard</h1>
          <button
            onClick={openPopup}
            className="bg-white text-blue-600 font-semibold py-2 px-4 rounded shadow hover:bg-gray-100 transition"
          >
            Open Form
          </button>
        </div>
      </nav>

      
      {isPopupOpen && (
  <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
    <div className="bg-gradient-to-br from-gray-800 to-gray-700 rounded-xl shadow-2xl p-8 w-11/12 max-w-lg">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Enter Details
      </h2>
      <form>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="name"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border-none rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-300 font-semibold mb-2">
            Type:
          </label>
          <div className="w-full px-4 py-3 rounded-md bg-gray-900 text-gray-400">
            EC2
          </div>
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-300 font-semibold mb-2"
            htmlFor="description"
          >
            Description (Optional):
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-3 border-none rounded-md bg-gray-900 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a description"
          ></textarea>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={closePopup}
            className="bg-gray-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-gray-500 transition duration-200"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-blue-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Dashboard;
