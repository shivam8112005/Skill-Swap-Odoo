import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
// import Navigation from './Components/Navigation';
import Navigation from '../Components/Navigation';
import { Menu, User, X } from 'lucide-react';

const Layout = () => {
    const [activeTab, setActiveTab] = useState('home');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate()
     function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
    const handleClick=()=>{
        // console.log(document.cookie," dsfhgweukfhierhngherkuhgijeriogjpoerkg;oerlgergherh");
        
        if(!getCookie('token')) navigate('/login-signup');
        else navigate('/profile');

    }
    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <div className={`h-screen bg-white transition-all duration-300 ${isSidebarOpen ? 'w-60' : 'w-16'} sticky top-0`}>
                <Navigation
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                    isSidebarOpen={isSidebarOpen}
                    setIsSidebarOpen={setIsSidebarOpen}
                    setIsModalOpen={setIsModalOpen}
                />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 p-4">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 capitalize">
                            {activeTab.replace('-', ' ')}
                        </h1>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-lg hover:bg-gray-100" onClick={handleClick}>
                                <User className="w-6 h-6 text-gray-600" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* This renders each page */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>

            {/* Optional Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center p-4">
                    <div className="bg-white rounded-lg max-w-md w-full p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Summarize Text & Generate Quiz</h2>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        {/* Modal content */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Layout;
