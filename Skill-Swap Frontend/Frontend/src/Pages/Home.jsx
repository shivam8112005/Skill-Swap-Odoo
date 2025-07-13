


import { useState } from "react"
import {
  Send,
  Activity,
  MessageCircle,
  FileText,
  X,
  Users,
  ArrowRight,
  Star,
  Sparkles,
  TrendingUp,
  Zap,
  Award,
  Globe,
  Shield,
  Heart,
  BookOpen,
  Camera,
  Code,
  Palette,
  Music,
  Languages,
  Calculator,
  Briefcase,
} from "lucide-react"

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const featuredSkills = [
    { name: "Web Development", requests: 24, rating: 4.8, trend: "+12%", color: "bg-blue-500" },
    { name: "Graphic Design", requests: 18, rating: 4.9, trend: "+8%", color: "bg-purple-500" },
    { name: "Data Analysis", requests: 12, rating: 4.7, trend: "+15%", color: "bg-green-500" },
    { name: "Language Teaching", requests: 31, rating: 4.6, trend: "+5%", color: "bg-orange-500" },
    { name: "Photography", requests: 15, rating: 4.8, trend: "+20%", color: "bg-pink-500" },
    { name: "Music Production", requests: 8, rating: 4.9, trend: "+10%", color: "bg-indigo-500" },
  ]

  const skillCategories = [
    { name: "Technology", icon: Code, count: 156, color: "bg-blue-500" },
    { name: "Creative Arts", icon: Palette, count: 89, color: "bg-purple-500" },
    { name: "Languages", icon: Languages, count: 124, color: "bg-green-500" },
    { name: "Music", icon: Music, count: 67, color: "bg-pink-500" },
    { name: "Photography", icon: Camera, count: 45, color: "bg-orange-500" },
    { name: "Business", icon: Briefcase, count: 78, color: "bg-indigo-500" },
    { name: "Education", icon: BookOpen, count: 92, color: "bg-teal-500" },
    { name: "Mathematics", icon: Calculator, count: 34, color: "bg-red-500" },
  ]

  const testimonials = [
    {
      name: "Alex Johnson",
      skill: "Web Developer",
      text: "I learned Spanish in exchange for teaching React. Amazing platform!",
      rating: 5,
      avatar: "AJ",
    },
    {
      name: "Maria Garcia",
      skill: "Graphic Designer",
      text: "Found the perfect photography mentor. The community is so supportive!",
      rating: 5,
      avatar: "MG",
    },
    {
      name: "David Chen",
      skill: "Data Scientist",
      text: "Exchanged data analysis skills for guitar lessons. Best decision ever!",
      rating: 5,
      avatar: "DC",
    },
  ]

  const platformStats = [
    { label: "Active Users", value: "10,000+", icon: Users },
    { label: "Skills Exchanged", value: "25,000+", icon: Award },
    { label: "Success Rate", value: "94%", icon: TrendingUp },
    { label: "Countries", value: "50+", icon: Globe },
  ]

  const popularSkills = [
    "JavaScript",
    "Python",
    "Spanish",
    "Guitar",
    "Photography",
    "Yoga",
    "Cooking",
    "Digital Marketing",
    "Adobe Photoshop",
    "Public Speaking",
    "French",
    "Piano",
    "Data Science",
    "UI/UX Design",
    "German",
    "Violin",
  ]

  const renderContent = () => {
    return (
      <div className="space-y-16">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 opacity-90"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
          <div className="relative text-center p-12 rounded-2xl">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-yellow-300" />
              <span className="text-white text-sm font-medium">Welcome to SkillSwap</span>
            </div>
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome <span className="text-yellow-300">To Skill Swap!</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with others to exchange skills and learn something new. Your next learning adventure is just a
              click away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Start Bartering
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm bg-transparent flex items-center justify-center transition-all duration-300">
                Explore Skills
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>

        {/* Platform Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {platformStats.map((stat, index) => (
            <div
              key={index}
              className="text-center shadow-lg border-0 bg-gradient-to-br from-white to-blue-50/50 hover:shadow-xl transition-all duration-300 rounded-lg p-6"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Skills */}
          <div className="shadow-xl border-0 bg-gradient-to-br from-white to-blue-50/50 rounded-lg">
            <div className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <TrendingUp className="w-6 h-6 mr-3 text-blue-600" />
                  Featured Skills
                </h2>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">Trending</span>
              </div>
            </div>
            <div className="px-6 pb-6 space-y-4">
              {featuredSkills.map((skill, index) => (
                <div
                  key={index}
                  className="group p-4 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${skill.color}`}></div>
                      <div>
                        <h3 className="font-semibold text-gray-800 group-hover:text-blue-700 transition-colors">
                          {skill.name}
                        </h3>
                        <p className="text-sm text-gray-500">{skill.requests} active requests</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-green-600 border border-green-200 bg-green-50 px-2 py-1 rounded-md text-xs font-medium">
                        {skill.trend}
                      </span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm font-medium text-gray-700">{skill.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skill Categories */}
          <div className="shadow-xl border-0 bg-gradient-to-br from-white to-purple-50/50 rounded-lg">
            <div className="p-6 pb-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                <Activity className="w-6 h-6 mr-3 text-purple-600" />
                Skill Categories
              </h2>
            </div>
            <div className="px-6 pb-6">
              <div className="grid grid-cols-2 gap-3">
                {skillCategories.map((category, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 bg-white rounded-xl border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                  >
                    <div
                      className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center flex-shrink-0`}
                    >
                      <category.icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-medium text-gray-800 text-sm truncate">{category.name}</h3>
                      <p className="text-xs text-gray-500">{category.count} skills</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Popular Skills Tags */}
        <div className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/50 rounded-lg">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center mb-2">
              <Star className="w-6 h-6 mr-3 text-green-600" />
              Popular Skills
            </h2>
            <p className="text-gray-600 mb-6">Most requested skills on our platform</p>
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-wrap gap-3">
              {popularSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 text-sm font-medium bg-white hover:bg-green-50 border border-gray-200 hover:border-green-300 cursor-pointer transition-all duration-300 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="shadow-xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 rounded-lg">
          <div className="text-center p-6 pb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">How It Works</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Getting started with skill exchange is simple and rewarding
            </p>
          </div>
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <Send className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">1</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Post Your Request</h3>
                <p className="text-gray-600 leading-relaxed">
                  Describe what skill you want to learn and what you can offer in return
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">2</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Find Matches</h3>
                <p className="text-gray-600 leading-relaxed">
                  Browse available requests and connect with people who need your skills
                </p>
              </div>

              <div className="text-center group">
                <div className="relative mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg group-hover:shadow-xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <MessageCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                    <span className="text-xs font-bold text-gray-800">3</span>
                  </div>
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-3">Start Learning</h3>
                <p className="text-gray-600 leading-relaxed">Chat with your match and begin exchanging knowledge</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="shadow-xl border-0 bg-gradient-to-br from-white to-yellow-50/50 rounded-lg">
          <div className="text-center p-6 pb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Heart className="w-8 h-8 mr-3 text-red-500" />
              What Our Users Say
            </h2>
            <p className="text-gray-600 text-lg">Real stories from our amazing community</p>
          </div>
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl border border-gray-100 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.skill}</p>
                    </div>
                  </div>
                  <div className="flex mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trust & Safety */}
        <div className="shadow-xl border-0 bg-gradient-to-br from-white to-green-50/50 rounded-lg">
          <div className="text-center p-6 pb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center">
              <Shield className="w-8 h-8 mr-3 text-green-600" />
              Safe & Secure Platform
            </h2>
            <p className="text-gray-600 text-lg">Your safety and privacy are our top priorities</p>
          </div>
          <div className="px-6 pb-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Verified Profiles</h4>
                <p className="text-sm text-gray-600">All users go through verification process</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Secure Chat</h4>
                <p className="text-sm text-gray-600">End-to-end encrypted messaging</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Rating System</h4>
                <p className="text-sm text-gray-600">Community-driven feedback system</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">24/7 Support</h4>
                <p className="text-sm text-gray-600">Always here to help you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="shadow-xl border-0 bg-gradient-to-br from-blue-600 to-purple-700 text-white rounded-lg">
          <div className="text-center p-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Your Learning Journey?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of learners who are already exchanging skills and growing together
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-700 hover:bg-blue-50 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                <Zap className="w-5 h-5 mr-2" />
                Get Started Now
              </button>
              <button className="border border-white/30 text-white hover:bg-white/10 font-semibold px-8 py-3 rounded-xl backdrop-blur-sm bg-transparent flex items-center justify-center transition-all duration-300">
                Learn More
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Content */}
        <main className="flex-1 p-6 overflow-y-auto">{renderContent()}</main>
      </div>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)} />
      )}

      {/* Enhanced Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border-0 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold">AI Text Tools</h2>
                  <p className="text-blue-100 text-sm mt-1">Summarize & Generate Quiz</p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-white hover:bg-white/20 rounded-full p-2 transition-colors duration-200"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Paste your text here</label>
                <textarea
                  rows={6}
                  className="w-full border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none p-3"
                  placeholder="Enter text to summarize and generate quiz from..."
                />
              </div>

              <div className="flex space-x-3">
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Summary
                </button>
                <button className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-4 py-3 flex items-center justify-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Create Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Home
