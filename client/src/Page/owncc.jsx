import React, { useState } from "react";

const DetailsPage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("js"); // Default to JavaScript

  const examples = [
    {
      title: "Install Tailwind CSS",
      jsCode: `npm install -D tailwindcss\nnpx tailwindcss init`,
      pythonCode: `pip install tailwindcss\npython -m tailwindcss init`,
    },
    {
      title: "Configure Template Paths",
      jsCode: `content: ["./src/**/*.{html,js}"]`,
      pythonCode: `content = ["./src/**/*.{html,py}"]`,
    },
    {
      title: "Start Development",
      jsCode: `npx tailwindcss -i ./src/input.css -o ./dist/output.css --watch`,
      pythonCode: `tailwindcss -i ./src/input.css -o ./dist/output.css --watch`,
    },
  ];

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    alert("Code copied!");
  };

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl mx-auto bg-gray-900 text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-blue-400 text-center mb-6">
           Installation Guide
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Switch between JavaScript and Python code examples using the options below.
        </p>

        {/* Radio Buttons for Language Selection */}
        <div className="flex justify-center items-center space-x-6 mb-8">
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="js"
              checked={selectedLanguage === "js"}
              onChange={() => setSelectedLanguage("js")}
              className="form-radio text-blue-500"
            />
            <span className="text-gray-300">JavaScript</span>
          </label>
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="radio"
              name="language"
              value="python"
              checked={selectedLanguage === "python"}
              onChange={() => setSelectedLanguage("python")}
              className="form-radio text-blue-500"
            />
            <span className="text-gray-300">Python</span>
          </label>
        </div>

        {/* Code Examples */}
        <div className="space-y-8">
          {examples.map((example, index) => (
            <div key={index} className="relative">
              <h2 className="text-2xl font-bold text-white mb-4">
                {example.title}
              </h2>

              {/* Code Block with Copy Button */}
              <div className="bg-gray-800 text-gray-300 p-4 rounded-lg mb-4 relative">
                <button
                  onClick={() =>
                    handleCopy(
                      selectedLanguage === "js"
                        ? example.jsCode
                        : example.pythonCode
                    )
                  }
                  className="absolute top-2 right-2 bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-500 transition"
                >
                  Copy
                </button>
                <pre>
                  <code>
                    {selectedLanguage === "js"
                      ? example.jsCode
                      : example.pythonCode}
                  </code>
                </pre>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
