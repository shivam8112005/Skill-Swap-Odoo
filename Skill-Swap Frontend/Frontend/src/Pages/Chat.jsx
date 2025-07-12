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
const Chat = () => {
  return (
     <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800">Chat with Active Barter</h1>
            <div className="bg-white rounded-lg border border-gray-200 h-96">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Sarah Johnson</h3>
                <p className="text-sm text-gray-600">Photography lessons ↔ Web development</p>
              </div>
              <div className="p-4 space-y-3 h-64 overflow-y-auto">
                <div className="flex">
                  <div className="bg-gray-100 p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Hi! Ready for today's photography lesson?</p>
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-blue-600 text-white p-3 rounded-lg max-w-xs">
                    <p className="text-sm">Yes! I've prepared some React questions for you too.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  <input type="text" className="flex-1 p-3 border border-gray-300 rounded-lg" placeholder="Type your message..." />
                  <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
  )
}

export default Chat
