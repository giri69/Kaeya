import React, { useState } from "react";
import axios from "axios";

const DiscordWebhook = () => {
  const [webhookUrl, setWebhookUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const saveWebhook = async () => {
    try {
      setLoading(true);
      setSuccess(null);
      setError(null);

      // Get user ID from local storage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user.id) {
        throw new Error("User ID not found in local storage");
      }
      const userId = user.id;

      // API call to save webhook URL
      await axios.post("http://localhost:8000/alert/setdiscord", {
        user_id: userId,
        webhookUrl,
        type: "discord", // Send type as "discord"
      });

      setSuccess("Webhook URL saved successfully!");
    } catch (err) {
      setError(err.response?.data?.detail || err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800 p-6">
      <div className="max-w-4xl w-full bg-gray-900 text-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-blue-400 text-center mb-6">
          Save Discord Webhook
        </h1>
        <p className="text-gray-300 text-center mb-8">
          Configure your Discord webhook URL to receive alerts directly in your
          Discord server.
        </p>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="mb-6">
            <label
              htmlFor="webhookUrl"
              className="block text-gray-400 text-sm font-semibold mb-2"
            >
              Discord Webhook URL
            </label>
            <input
              type="url"
              id="webhookUrl"
              className="w-full p-3 text-white bg-gray-700 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
              placeholder="Enter your Discord Webhook URL"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
            />
          </div>
          <button
            onClick={saveWebhook}
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Saving..." : "Save Webhook"}
          </button>
          {success && (
            <p className="text-green-500 text-center mt-4">{success}</p>
          )}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default DiscordWebhook;
