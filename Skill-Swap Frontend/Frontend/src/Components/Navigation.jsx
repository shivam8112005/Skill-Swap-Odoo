import React, { useState } from 'react'
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
import { Link, useNavigate } from 'react-router-dom';
const Navigation = (props) => {
  // const [activeTab, setActiveTab] = useState('home');
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate=useNavigate()
  const navigationItems = [
    { id: 'home', label: 'Home', icon: Users },
    { id: 'view-requests', label: 'View Open Barter Requests', icon: Eye },
    { id: 'send-request', label: 'Send Barter Request', icon: Send },
    { id: 'active-requests', label: 'Active Barter Requests', icon: Activity },
    { id: 'chat', label: 'Chat with Active Barter', icon: MessageCircle },
    { id: 'profile', label: 'Profile Page', icon: User },
    { id: 'text-quiz', label: 'Summarize Text & Generate Quiz', icon: FileText },
    // { id: 'settings', label: 'Settings', icon: Settings }
  ];

  const handleTabClick = (tabId) => {
    if (tabId === 'text-quiz') {
      props.setIsModalOpen(true);
    } else {
      props.setActiveTab(tabId);
    }
    
    // props.setIsSidebarOpen(false);
  };
   function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

  return (
    <>
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <button
          onClick={() => props.setIsSidebarOpen(!props.isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-6 h-6" />
        </button>
        {props.isSidebarOpen && (
          <h2 className="text-xl font-bold text-gray-800 ml-2">SkillSwap</h2>
        )}
      </div>

      <nav className="p-4">
        <ul className="space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
          
            return (
                item.id==='profile' && !getCookie('token')?
                
                <Link to='/login-signup'>
                <li key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full ${props.isSidebarOpen ? 'flex items-center p-3' : 'flex justify-center p-2'} 
      rounded-lg transition-all duration-300
      ${props.activeTab === item.id ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}
    `}
                  >
                    <Icon className={`transition-all ${props.isSidebarOpen ? 'w-5 h-5' : 'w-7 h-7'}`} />
                    {props.isSidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
                  </button>
                </li>
              </Link>
                
                :
              <Link to={item.id === 'home' ? '/' : item.id}>
                <li key={item.id}>
                  <button
                    onClick={() => handleTabClick(item.id)}
                    className={`w-full ${props.isSidebarOpen ? 'flex items-center p-3' : 'flex justify-center p-2'} 
      rounded-lg transition-all duration-300
      ${props.activeTab === item.id ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'}
    `}
                  >
                    <Icon className={`transition-all ${props.isSidebarOpen ? 'w-5 h-5' : 'w-7 h-7'}`} />
                    {props.isSidebarOpen && <span className="ml-3 text-sm">{item.label}</span>}
                  </button>
                </li>
              </Link>


            );
          })}
        </ul>
      </nav>
    </>
  )
}

export default Navigation
