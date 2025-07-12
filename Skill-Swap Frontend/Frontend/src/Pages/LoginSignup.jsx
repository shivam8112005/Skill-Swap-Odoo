
import { useState } from "react"
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Sparkles, Users, Award, Globe, CheckCircle } from "lucide-react"
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
import app  from '../firebase'

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const auth = getAuth(app)
    const navigate = useNavigate()
    const API_URL = import.meta.env.VITE_API_URL
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const features = [
        {
            icon: Users,
            title: "Connect with Learners",
            description: "Join a community of passionate skill exchangers",
        },
        {
            icon: Award,
            title: "Learn New Skills",
            description: "Master new abilities through peer-to-peer learning",
        },
        {
            icon: Globe,
            title: "Global Community",
            description: "Connect with people from around the world",
        },
    ]

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({
                ...prev,
                [name]: "",
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!isLogin && !formData.username.trim()) {
            newErrors.username = "Username is required"
        }

        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid"
        }

        if (!formData.password) {
            newErrors.password = "Password is required"
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (!isLogin && !formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password"
        } else if (!isLogin && formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsLoading(true)

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false)
            console.log(isLogin ? "Login successful" : "Signup successful", formData)
            // Here you would typically handle the actual authentication
        }, 2000)
    }

    const toggleMode = () => {
        setIsLogin(!isLogin)
        setFormData({
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setErrors({})
        setShowPassword(false)
        setShowConfirmPassword(false)
    }

    const handleClick = async () => {
        const provider = new GoogleAuthProvider()
        provider.setCustomParameters({ prompt: 'select_account' })
        provider.addScope("profile");


        try {
            const resultFromGoogle = await signInWithPopup(auth, provider)
            console.log(`${API_URL}/auth/google`);
            
            const res = await fetch(`${API_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify({
                    name: resultFromGoogle.user.displayName,
                    email: resultFromGoogle.user.email
                }),
            })

            const data = await res.json()
            console.log(data);
            
            // if (!data.success) {
            //     toast.error(data.message || 'Failed to authenticate with Google');
            //     return;
            // }

            if (data.status === 200 | 201) {
                toast.success(data.message)
                console.log("helooooooooooooooooooo");
                
                navigate('/')
            }
        } catch (error) {
            console.log("error", error)
            toast.error(error.message) // Error while closing the popup of google by client solve left
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex">
            {/* Left Side - Features */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=60 height=60 viewBox=0 0 60 60 xmlns=http://www.w3.org/2000/svg%3E%3Cg fill=none fillRule=evenodd%3E%3Cg fill=%23ffffff fillOpacity=0.05%3E%3Ccircle cx=30 cy=30 r=2/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>

                <div className="relative z-10 flex flex-col justify-center px-12 py-16 text-white">
                    <div className="mb-12">
                        <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            <span className="text-white font-medium">SkillSwap Platform</span>
                        </div>
                        <h1 className="text-4xl font-bold mb-4 leading-tight">
                            {isLogin ? "Welcome Back!" : "Join Our Community"}
                        </h1>
                        <p className="text-xl text-blue-100 leading-relaxed">
                            {isLogin
                                ? "Continue your learning journey and connect with amazing people"
                                : "Start your skill exchange adventure and learn something new today"}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                                    <feature.icon className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                                    <p className="text-blue-100">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
                        <div className="flex items-center space-x-4 text-sm">
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-300" />
                                <span>10,000+ Active Users</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <CheckCircle className="w-5 h-5 text-green-300" />
                                <span>25,000+ Skills Exchanged</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    {/* Mobile Header */}
                    <div className="lg:hidden text-center mb-8">
                        <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full mb-4">
                            <Sparkles className="w-4 h-4 text-blue-600" />
                            <span className="text-blue-800 font-medium">SkillSwap</span>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{isLogin ? "Welcome Back!" : "Join Us Today"}</h1>
                        <p className="text-gray-600">
                            {isLogin ? "Sign in to your account" : "Create your account to get started"}
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
                        <div className="p-8">
                            {/* Form Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">{isLogin ? "Sign In" : "Create Account"}</h2>
                                <p className="text-gray-600">
                                    {isLogin
                                        ? "Enter your credentials to access your account"
                                        : "Fill in your details to create a new account"}
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Username Field (Signup only) */}
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                name="username"
                                                value={formData.username}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${errors.username ? "border-red-500 bg-red-50" : "border-gray-300"
                                                    }`}
                                                placeholder="Enter your username"
                                            />
                                        </div>
                                        {errors.username && <p className="mt-1 text-sm text-red-600">{errors.username}</p>}
                                    </div>
                                )}

                                {/* Email Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${errors.email ? "border-red-500 bg-red-50" : "border-gray-300"
                                                }`}
                                            placeholder="Enter your email"
                                        />
                                    </div>
                                    {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                                </div>

                                {/* Password Field */}
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${errors.password ? "border-red-500 bg-red-50" : "border-gray-300"
                                                }`}
                                            placeholder="Enter your password"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                                </div>

                                {/* Confirm Password Field (Signup only) */}
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                value={formData.confirmPassword}
                                                onChange={handleInputChange}
                                                className={`w-full pl-10 pr-12 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200 ${errors.confirmPassword ? "border-red-500 bg-red-50" : "border-gray-300"
                                                    }`}
                                                placeholder="Confirm your password"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                ) : (
                                                    <Eye className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                                    </div>
                                )}

                                {/* Remember Me / Forgot Password */}
                                {isLogin && (
                                    <div className="flex items-center justify-between">
                                        <label className="flex items-center">
                                            <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                                            <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                        </label>
                                        <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                                            Forgot password?
                                        </button>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    ) : (
                                        <>
                                            {isLogin ? "Sign In" : "Create Account"}
                                            <ArrowRight className="w-5 h-5 ml-2" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Divider */}
                            <div className="mt-8 mb-6">
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-4 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="d-flex justify-center text-center">
                                <button className="m-auto w-full text-l flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200" onClick={handleClick}>
                                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                                        <path
                                            fill="#4285F4"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </button>
                            </div>

                            {/* Toggle Login/Signup */}
                            <div className="text-center">
                                <p className="text-gray-600">
                                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                                    <button
                                        type="button"
                                        onClick={toggleMode}
                                        className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Terms and Privacy */}
                    {!isLogin && (
                        <div className="mt-6 text-center text-sm text-gray-500">
                            By creating an account, you agree to our{" "}
                            <button className="text-blue-600 hover:text-blue-800">Terms of Service</button> and{" "}
                            <button className="text-blue-600 hover:text-blue-800">Privacy Policy</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default LoginSignup
