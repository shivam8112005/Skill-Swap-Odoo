// import React from 'react'
// import {
//   Eye,
//   Send,
//   Activity,
//   MessageCircle,
//   User,
//   FileText,
//   Settings,
//   Menu,
//   X,
//   Users,
//   ArrowRight,
//   Star,
//   Clock
// } from 'lucide-react';
// const PostRequests = () => {
//   return (
//      <div className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Send Barter Request</h1>
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">What skill do you need help with?</label>
//                   <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Web Development, Photography, Language Learning" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">What can you offer in return?</label>
//                   <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Graphic Design, Writing, Music Lessons" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
//                   <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Describe your request in detail..."></textarea>
//                 </div>
//                 <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
//                   Send Request
//                 </button>
//               </div>
//             </div>
//           </div>
//   )
// }

// export default PostRequests

"use client";

import { useState } from "react";
import {
  Send,
  Activity,
  FileText,
  Users,
  Star,
  Calendar,
  AlertCircle,
} from "lucide-react";

const PostRequests = () => {
  const [formData, setFormData] = useState({
    type: "request",
    skillDescription: "",
    requiredSkills: "",
    providedSkills: "",
    barterDateTime: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      // Get userId from localStorage, context, or however you manage user state
      const userId = localStorage.getItem("userId"); // Replace with actual user ID logic

      const requestData = {
        ...formData,
        userId: userId,
      };

      console.log(requestData)

      const response = await fetch("/api/skill/postskill", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error("Failed to create skill post");
      }

      const result = await response.json();
      console.log("Success:", result);

      setSuccess(true);
      // Reset form
      setFormData({
        type: "request",
        skillDescription: "",
        requiredSkills: "",
        providedSkills: "",
        barterDateTime: "",
      });
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Create Skill Barter Post
      </h1>

      <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Type Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Post Type
            </label>
            <div className="flex space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="request"
                  checked={formData.type === "request"}
                  onChange={handleInputChange}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm text-gray-700">Request Help</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="type"
                  value="offer"
                  checked={formData.type === "offer"}
                  onChange={handleInputChange}
                  className="mr-2 text-blue-600"
                />
                <span className="text-sm text-gray-700">Offer Help</span>
              </label>
            </div>
          </div>

          {/* Required Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Users className="inline w-4 h-4 mr-1" />
              What skill do you need help with?
            </label>
            <input
              type="text"
              name="requiredSkills"
              value={formData.requiredSkills}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Web Development, Photography, Language Learning"
              required
            />
          </div>

          {/* Provided Skills */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Star className="inline w-4 h-4 mr-1" />
              What can you offer in return?
            </label>
            <input
              type="text"
              name="providedSkills"
              value={formData.providedSkills}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Graphic Design, Writing, Music Lessons"
              required
            />
          </div>

          {/* Skill Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <FileText className="inline w-4 h-4 mr-1" />
              Detailed Description
            </label>
            <textarea
              name="skillDescription"
              value={formData.skillDescription}
              onChange={handleInputChange}
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Describe your request in detail..."
              required
            />
          </div>

          {/* Barter Date Time */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <Calendar className="inline w-4 h-4 mr-1" />
              Preferred Barter Date & Time
            </label>
            <input
              type="datetime-local"
              name="barterDateTime"
              value={formData.barterDateTime}
              onChange={handleInputChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center p-3 bg-red-50 border border-red-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-700 text-sm">{error}</span>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="flex items-center p-3 bg-green-50 border border-green-200 rounded-lg">
              <Star className="w-5 h-5 text-green-500 mr-2" />
              <span className="text-green-700 text-sm">
                Skill post created successfully!
              </span>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {loading ? (
              <>
                <Activity className="w-4 h-4 mr-2 animate-spin" />
                Creating Post...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Create {formData.type === "request" ? "Request" : "Offer"}
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PostRequests;
