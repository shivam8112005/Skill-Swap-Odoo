import React from 'react'
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
  Clock
} from 'lucide-react';
const ViewRequests = () => {
  return (
   <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Open Barter Requests</h1>
            <div className="grid gap-4">
              {Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Need help with React development</h3>
                      <p className="text-gray-600">Offering: Graphic design services</p>
                    </div>
                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Open</span>
                  </div>
                  <p className="text-gray-600 mb-4">Looking for someone to help me build a responsive web application using React. I can offer professional logo design or branding services in return.</p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    Respond to Request
                  </button>
                </div>
              ))}
            </div>
          </div>
  )
}

export default ViewRequests
