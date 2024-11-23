import React from "react";
import { useNavigate } from "react-router-dom";

const CardsPage = () => {
  const navigate = useNavigate();

  const cards = [
    {
      id: 1,
      title: "Virtual Machines",
      description: "Spin up scalable virtual machines in seconds.",
    },
    {
      id: 2,
      title: "Cloud Storage",
      description: "Secure, scalable, and reliable cloud storage solutions.",
    },
    {
      id: 3,
      title: "Load Balancer",
      description: "Distribute incoming traffic for optimal performance.",
    },
  ];

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center p-6">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-10 text-center">
        Discover Cloud Services
      </h1>
      <p className="text-gray-400 text-center mb-10 max-w-2xl">
        Explore our comprehensive suite of cloud services designed to
        supercharge your applications. Click on any service below to get started.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {cards.map((card) => (
          <div
            key={card.id}
            onClick={() => navigate(`/details/${card.id}`)}
            className="bg-gradient-to-tr from-gray-700 to-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 p-6 cursor-pointer flex flex-col items-center text-center"
          >
            <img
              src="https://media.printables.com/media/prints/128175/images/1229540_1fa51ee6-6136-48b0-9c8b-44990845c1b4/ec2-1.png"
              alt="Service Icon"
              className="w-16 h-16 mb-4"
            />
            <h3 className="text-xl font-bold text-gray-100">{card.title}</h3>
            <p className="text-gray-300 mt-2">{card.description}</p>
            <p className="text-sm text-gray-400 mt-4">
              Click to explore detailed installation guides and code snippets.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsPage;
