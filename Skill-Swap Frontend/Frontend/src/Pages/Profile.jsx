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
// const Profile = () => {
//   return (
//      <div className="space-y-6">
//             <h1 className="text-3xl font-bold text-gray-800">Profile Page</h1>
//             <div className="bg-white p-6 rounded-lg border border-gray-200">
//               <div className="flex items-center space-x-4 mb-6">
//                 <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
//                   <User className="w-10 h-10 text-blue-600" />
//                 </div>
//                 <div>
//                   <h2 className="text-2xl font-semibold text-gray-800">John Doe</h2>
//                   <p className="text-gray-600">Web Developer & Designer</p>
//                 </div>
//               </div>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-3">Skills I Offer</h3>
//                   <div className="space-y-2">
//                     <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">React Development</span>
//                     <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm ml-2">UI/UX Design</span>
//                     <span className="inline-block bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">JavaScript</span>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold text-gray-800 mb-3">Skills I Want to Learn</h3>
//                   <div className="space-y-2">
//                     <span className="inline-block bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">Photography</span>
//                     <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm ml-2">Spanish</span>
//                     <span className="inline-block bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">Guitar</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//   )
// }

// export default Profile






import { useState, useEffect } from "react"
import {
  User,
  Mail,
  Edit3,
  Save,
  X,
  Plus,
  Eye,
  EyeOff,
  Calendar,
  Clock,
  Star,
  Award,
  Shield,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    skills: [],
    private: false,
    available: [],
  })
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    skills: [],
    available: [],
    private: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState("")
  const [newSkill, setNewSkill] = useState("")

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  // Fetch user profile data
  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      setLoading(true)
      const response = await fetch("http://localhost:5000/api/users/userprofile", {
        method: 'GET',
         headers: {
          "Content-Type": "application/json",
          "Authorization": `${document.cookie}`
        },
        credentials: 'include'
      })

      if (!response.ok) {
        console.log("Failed to fetch profile data")
      }

      const data = await response.json()
      console.log(data)
      setUserData(data.user)
      setEditData({
        skills: [...data.user.skills],
        available: [...data.user.available],
        private: data.user.private,
      })
    } catch (err) {
      setError("Failed to load profile data. Please try again.")
      console.error("Error fetching profile:", err)
    } finally {
      setLoading(false)
    }
  }

  const handleEditToggle = () => {
    if (isEditing) {
      // Reset edit data to original data
      setEditData({
        skills: [...userData.skills],
        available: [...userData.available],
        private: userData.private,
      })
      setNewSkill("")
    }
    setIsEditing(!isEditing)
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const response = await fetch("http://localhost:5000/api/users/profileUpdate", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify({
          skills: editData.skills,
          available: editData.available,
          private: editData.private,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to update profile")
      }

      const updatedData = await response.json()
      setUserData(updatedData)
      setIsEditing(false)
      setNewSkill("")
    } catch (err) {
      setError("Failed to save changes. Please try again.")
      console.error("Error saving profile:", err)
    } finally {
      setSaving(false)
    }
  }

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData({
        ...editData,
        skills: [...editData.skills, newSkill.trim()],
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove) => {
    setEditData({
      ...editData,
      skills: editData.skills.filter((skill) => skill !== skillToRemove),
    })
  }

  const toggleAvailability = (day) => {
    const updatedAvailable = editData.available.includes(day)
      ? editData.available.filter((d) => d !== day)
      : [...editData.available, day]

    setEditData({
      ...editData,
      available: updatedAvailable,
    })
  }

  const togglePrivacy = () => {
    setEditData({
      ...editData,
      private: !editData.private,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/30 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">My Profile</h1>
          <p className="text-gray-600">Manage your skills and availability</p>
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

        {/* Profile Header Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-white" />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
                  <div className="flex items-center space-x-2 text-blue-100">
                    <Mail className="w-4 h-4" />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center space-x-4 mt-3">
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span className="text-sm">{userData.skills.length} Skills</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{userData.available.length} Days Available</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditToggle}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center space-x-2"
              >
                {isEditing ? <X className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
              </button>
            </div>
          </div>

          {/* Privacy Status */}
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {userData.private ? (
                  <EyeOff className="w-5 h-5 text-gray-600" />
                ) : (
                  <Eye className="w-5 h-5 text-green-600" />
                )}
                <div>
                  <h3 className="font-semibold text-gray-800">Profile Visibility</h3>
                  <p className="text-sm text-gray-600">
                    {userData.private ? "Your profile is private" : "Your profile is public"}
                  </p>
                </div>
              </div>
              {isEditing && (
                <button
                  onClick={togglePrivacy}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${
                    editData.private ? "bg-gray-400" : "bg-green-500"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${
                      editData.private ? "translate-x-1" : "translate-x-6"
                    }`}
                  />
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Skills Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-yellow-500" />
                  My Skills
                </h3>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                  {isEditing ? editData.skills.length : userData.skills.length} skills
                </span>
              </div>
            </div>

            <div className="p-6">
              {isEditing && (
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && addSkill()}
                      placeholder="Add a new skill..."
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                    <button
                      onClick={addSkill}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors duration-200 flex items-center"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-3">
                {(isEditing ? editData.skills : userData.skills).map((skill, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 px-4 py-2 rounded-xl flex items-center space-x-2 group"
                  >
                    <span className="text-gray-800 font-medium">{skill}</span>
                    {isEditing && (
                      <button
                        onClick={() => removeSkill(skill)}
                        className="text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {(isEditing ? editData.skills : userData.skills).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No skills added yet</p>
                  {isEditing && <p className="text-sm">Add your first skill above</p>}
                </div>
              )}
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Calendar className="w-6 h-6 mr-3 text-green-500" />
                  Availability
                </h3>
                <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                  {isEditing ? editData.available.length : userData.available.length} days
                </span>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-3">
                {daysOfWeek.map((day) => {
                  const isAvailable = isEditing ? editData.available.includes(day) : userData.available.includes(day)

                  return (
                    <div
                      key={day}
                      className={`flex items-center justify-between p-4 rounded-xl border transition-all duration-200 ${
                        isAvailable ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"
                      } ${isEditing ? "cursor-pointer hover:shadow-md" : ""}`}
                      onClick={isEditing ? () => toggleAvailability(day) : undefined}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${isAvailable ? "bg-green-500" : "bg-gray-300"}`} />
                        <span className={`font-medium ${isAvailable ? "text-green-800" : "text-gray-600"}`}>{day}</span>
                      </div>
                      {isAvailable && <CheckCircle className="w-5 h-5 text-green-600" />}
                    </div>
                  )
                })}
              </div>

              {userData.available.length === 0 && !isEditing && (
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No availability set</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-center">
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center space-x-3"
            >
              {saving ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              <span>{saving ? "Saving..." : "Save Changes"}</span>
            </button>
          </div>
        )}

        {/* Profile Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Skills Offered</h4>
            <p className="text-2xl font-bold text-blue-600">{userData.skills.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-6 h-6 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Days Available</h4>
            <p className="text-2xl font-bold text-green-600">{userData.available.length}</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-800 mb-2">Profile Status</h4>
            <p className={`text-2xl font-bold ${userData.private ? "text-gray-600" : "text-purple-600"}`}>
              {userData.private ? "Private" : "Public"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile

