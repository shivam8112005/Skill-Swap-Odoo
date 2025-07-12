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
const ActiveRequests = () => {
  return (
     <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Active Barter Requests</h1>
            <div className="grid gap-4">
              {Array.from({ length: 3 }, (_, i) => (
                <div key={i} className="bg-white p-6 rounded-lg border border-gray-200">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">Photography lessons for web development</h3>
                      <p className="text-gray-600">Partner: Sarah Johnson</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">In Progress</span>
                  </div>
                  <p className="text-gray-600 mb-4">Currently learning photography basics while teaching React development fundamentals.</p>
                  <div className="flex space-x-3">
                    <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Continue Chat
                    </button>
                    <button className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors">
                      Mark Complete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
  )
}

export default ActiveRequests
