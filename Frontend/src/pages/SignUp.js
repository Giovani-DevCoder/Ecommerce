import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaLock, FaEnvelope, FaUser, FaCheckCircle } from "react-icons/fa"
import SummaryApi from "../common"
import { toast } from "sonner"
import iconGoogle from "../assets/logodegoogle.svg"

const SignUp = () => {
  const navigate = useNavigate()

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [passwordError, setPasswordError] = useState("")

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Clear password error when user types in password fields
    if (name === "password" || name === "confirmPassword") {
      setPasswordError("")
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match")
      return
    }

    if (!data.agreeToTerms) {
      toast.warning("Please agree to the terms and conditions")
      return
    }

    setIsLoading(true)

    try {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const responseData = await dataResponse.json()

      if (responseData.success) {
        toast.success(responseData.message)
        navigate("/login")
      } else if (responseData.error) {
        toast.warning(responseData.message)
      }
    } catch (error) {
      console.error("Request error:", error)
      toast.error("There was an error creating your account. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-10">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Column - Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
            <p className="text-gray-500 mt-2">Join us and start your shopping journey</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={data.firstName}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaUser className="text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={data.lastName}
                    onChange={handleOnChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={data.email}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Create a password"
                  className={`w-full pl-10 pr-3 py-3 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  className={`w-full pl-10 pr-3 py-3 border ${
                    passwordError ? "border-red-500" : "border-gray-300"
                  } rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                />
              </div>
              {passwordError && <p className="mt-1 text-sm text-red-600">{passwordError}</p>}
            </div>

            <div className="flex items-center">
              <input
                id="agreeToTerms"
                type="checkbox"
                name="agreeToTerms"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                checked={data.agreeToTerms}
                onChange={handleOnChange}
                required
              />
              <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img src={iconGoogle || "/placeholder.svg"} alt="Google" className="w-5 h-5 mr-2" />
              Sign up with Google
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-zinc-800 hover:text-zinc-700">
                Sign in
              </Link>
            </p>
          </form>
        </div>

        {/* Right Column - Image/Branding */}
        <div className="md:w-1/2 bg-zinc-800 p-12 hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl font-bold mb-6">Join Our Community</h2>
            <p className="text-blue-100 mb-8">
              Create an account to enjoy exclusive benefits, track your orders, and get personalized recommendations.
            </p>
            <div className="space-y-4">
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-300 text-xl mr-3 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">Fast Checkout</h4>
                  <p className="text-blue-100 text-sm">Save your details for a quicker shopping experience</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-300 text-xl mr-3 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">Order History</h4>
                  <p className="text-blue-100 text-sm">Easily track and manage your orders</p>
                </div>
              </div>
              <div className="flex items-start">
                <FaCheckCircle className="text-blue-300 text-xl mr-3 mt-0.5" />
                <div>
                  <h4 className="text-white font-semibold">Personalized Experience</h4>
                  <p className="text-blue-100 text-sm">Get recommendations based on your preferences</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-blue-100 text-sm">© 2024 Exhibition website created by Giovanni.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp

