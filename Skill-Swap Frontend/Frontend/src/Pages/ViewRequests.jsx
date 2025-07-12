import React, { useEffect, useState } from "react";
import {
  Eye,
  Send,
  Activity,
  MessageCircle,
  User,
  FileText,
  Settings,
  Menu,
  X,
  Users,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
const ViewRequests = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBarter = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "http://localhost:5000/api/barter/getBarter",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${document.cookie}`,
          },
          credentials: "include",
        }
      );

      if (!response.ok) {
        console.log("Failed to fetch profile data");
      }

      // const data = await response.json()
      // setUserData(data.user)
      // setEditData({
      //   skills: [...data.user.skills],
      //   available: [...data.user.available],
      //   private: data.user.private,
      // })
    } catch (err) {
      setError("Failed to load barter data. Please try again.");
      console.error("Error fetching barter:", err);
    } finally {
      setLoading(false);
    }
  };

  fetchBarter()
  }, [])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">Open Barter Requests</h1>
      <div className="grid gap-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-lg border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Need help with React development
                </h3>
                <p className="text-gray-600">
                  Offering: Graphic design services
                </p>
              </div>
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                Open
              </span>
            </div>
            <p className="text-gray-600 mb-4">
              Looking for someone to help me build a responsive web application
              using React. I can offer professional logo design or branding
              services in return.
            </p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              Respond to Request
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewRequests;
