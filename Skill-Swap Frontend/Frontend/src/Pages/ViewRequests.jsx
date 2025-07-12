// import React, { useEffect, useState } from "react";
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
//   Clock,
// } from "lucide-react";
// const ViewRequests = () => {
//   const [loading, setLoading] = useState(true);
//   const [barter, setbarter] = useState([])
//   useEffect(() => {
//     const fetchBarter = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         "http://localhost:5000/api/barter/getBarter",
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           credentials: "include",
//         }
//       );

//       if (!response.ok) {
//         console.log("Failed to fetch profile data");
//       }

//       const data = await response.json()

//       if (data.status === 200) {
//         setbarter(data.barter)
//       }

//       // const data = await response.json()
//       // setUserData(data.user)
//       // setEditData({
//       //   skills: [...data.user.skills],
//       //   available: [...data.user.available],
//       //   private: data.user.private,
//       // })
//     } catch (err) {
//       setError("Failed to load barter data. Please try again.");
//       console.error("Error fetching barter:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchBarter()
//   }, [])

//   return (
//     <div className="space-y-6">
//       <h1 className="text-3xl font-bold text-gray-800">Open Barter Requests</h1>
//       <div className="grid gap-4">
//         {Array.from({ length: 5 }, (_, i) => (
//           <div
//             key={i}
//             className="bg-white p-6 rounded-lg border border-gray-200"
//           >
//             <div className="flex justify-between items-start mb-4">
//               <div>
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   Need help with React development
//                 </h3>
//                 <p className="text-gray-600">
//                   Offering: Graphic design services
//                 </p>
//               </div>
//               <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
//                 Open
//               </span>
//             </div>
//             <p className="text-gray-600 mb-4">
//               Looking for someone to help me build a responsive web application
//               using React. I can offer professional logo design or branding
//               services in return.
//             </p>
//             <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
//               Respond to Request
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ViewRequests;






"use client"

import { useEffect, useState } from "react"
import {
  Eye,
  Activity,
  MessageCircle,
  X,
  Users,
  Star,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  RefreshCw,
  AlertCircle,
} from "lucide-react"

const ViewRequests = () => {
  const [loading, setLoading] = useState(true)
  const [barter, setBarter] = useState([])
  const [error, setError] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const itemsPerPage = 6

  useEffect(() => {
    fetchBarter()
  }, [])

  const fetchBarter = async () => {
    try {
      setLoading(true)
      setError("")
      const response = await fetch("http://localhost:5000/api/barter/getBarter", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })

      if (!response.ok) {
        throw new Error("Failed to fetch barter data")
      }

      const data = await response.json()
      if (data.status === 200) {
        setBarter(data.barter || [])
      } else {
        throw new Error(data.message || "Failed to load barter data")
      }
    } catch (err) {
      setError("Failed to load barter data. Please try again.")
      console.error("Error fetching barter:", err)
    } finally {
      setLoading(false)
    }
  }

  // Filter and search functionality
  const filteredBarter = barter.filter((item) => {
    const matchesSearch =
      item.requiredSkills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.providedSkills.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.skillDescription.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesFilter = filterType === "all" || item.type === filterType

    return matchesSearch && matchesFilter
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredBarter.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = filteredBarter.slice(startIndex, endIndex)

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, filterType])

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const getTypeColor = (type) => {
    switch (type) {
      case "request":
        return "bg-blue-100 text-blue-800"
      case "offer":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const handlePageChange = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading barter requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Open Barter Requests</h1>
          <p className="text-gray-600">Discover skill exchange opportunities in our community</p>
        </div>

        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by skills or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            {/* Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="pl-10 pr-8 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white"
              >
                <option value="all">All Types</option>
                <option value="request">Requests</option>
                <option value="offer">Offers</option>
              </select>
            </div>

            {/* Refresh Button */}
            <button
              onClick={fetchBarter}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200 flex items-center space-x-2"
            >
              <RefreshCw className="w-5 h-5" />
              <span>Refresh</span>
            </button>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-sm text-gray-600">
            Showing {currentItems.length} of {filteredBarter.length} results
            {searchTerm && ` for "${searchTerm}"`}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-red-700">{error}</p>
            <button onClick={() => setError("")} className="ml-auto text-red-600 hover:text-red-800">
              <X className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Barter Cards */}
        {currentItems.length > 0 ? (
          <div className="grid gap-6">
            {currentItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-800">
                          Looking for: <span className="text-blue-600">{item.requiredSkills}</span>
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getTypeColor(item.type)}`}>
                          {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">
                        <span className="font-medium">Offering:</span>{" "}
                        <span className="text-green-600 font-semibold">{item.providedSkills}</span>
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Description:</h4>
                    <p className="text-gray-700 leading-relaxed">{item.skillDescription}</p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center space-x-6 text-sm text-gray-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>Barter Date: {formatDateTime(item.barterDateTime)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Posted: {formatDate(item.createdAt)}</span>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Respond</span>
                      </button>
                      <button className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-xl transition-colors duration-200 flex items-center space-x-2">
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No Barter Requests Found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm || filterType !== "all"
                ? "Try adjusting your search or filter criteria"
                : "Be the first to create a barter request!"}
            </p>
            {(searchTerm || filterType !== "all") && (
              <button
                onClick={() => {
                  setSearchTerm("")
                  setFilterType("all")
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-colors duration-200"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">
                Page {currentPage} of {totalPages} ({filteredBarter.length} total results)
              </div>

              <div className="flex items-center space-x-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                {/* Page Numbers */}
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
                          currentPage === pageNum ? "bg-blue-600 text-white" : "border border-gray-300 hover:bg-gray-50"
                        }`}
                      >
                        {pageNum}
                      </button>
                    )
                  })}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Summary */}
        {barter.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Total Requests</h4>
              <p className="text-2xl font-bold text-blue-600">{barter.length}</p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Active Today</h4>
              <p className="text-2xl font-bold text-green-600">
                {
                  barter.filter((item) => {
                    const today = new Date().toDateString()
                    const itemDate = new Date(item.createdAt).toDateString()
                    return today === itemDate
                  }).length
                }
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-800 mb-2">Unique Skills</h4>
              <p className="text-2xl font-bold text-purple-600">
                {
                  new Set([...barter.map((item) => item.requiredSkills), ...barter.map((item) => item.providedSkills)])
                    .size
                }
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ViewRequests
