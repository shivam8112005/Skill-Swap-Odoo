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
const PostRequests = () => {
  return (
     <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Send Barter Request</h1>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What skill do you need help with?</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Web Development, Photography, Language Learning" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">What can you offer in return?</label>
                  <input type="text" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="e.g., Graphic Design, Writing, Music Lessons" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Detailed Description</label>
                  <textarea rows="4" className="w-full p-3 border border-gray-300 rounded-lg" placeholder="Describe your request in detail..."></textarea>
                </div>
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                  Send Request
                </button>
              </div>
            </div>
          </div>
  )
}

export default PostRequests
