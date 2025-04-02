import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { FaLock, FaEnvelope, FaUserCircle } from "react-icons/fa"
import SummaryApi from "../common"
import Context from "../context"
import { toast } from "sonner"
import iconGoogle from "../assets/logodegoogle.svg"

const Login = () => {
  const navigate = useNavigate()
  const { fetchUserDetails, fetchAccountAddToCartProduct } = useContext(Context)

  const [data, setData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const [isLoading, setIsLoading] = useState(false)

  const handleOnChange = (e) => {
    const { name, value, type, checked } = e.target
    setData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const dataResponse = await fetch(SummaryApi.login.url, {
        method: SummaryApi.login.method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          rememberMe: data.rememberMe,
        }),
      })

      const responseData = await dataResponse.json()

      if (responseData.success) {
        toast.success(responseData.message)
        localStorage.setItem("authToken", responseData.token)
        navigate("/")
        fetchUserDetails()
        fetchAccountAddToCartProduct()
      } else {
        toast.warning(responseData.message)
      }
    } catch (error) {
      console.error("Login request error:", error)
      toast.error("There was an error trying to log in. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl w-full flex flex-col md:flex-row">
        {/* Left Column - Image/Branding */}
        <div className="md:w-1/2 bg-zinc-800 p-12 hidden md:flex flex-col justify-between">
          <div>
            <h2 className="text-white text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-blue-100 mb-8">
              Log in to access your account and continue your shopping experience with us.
            </p>
            <div className="bg-white/20 p-6 rounded-lg backdrop-blur-sm">
              <p className="text-white italic">
                "Shopping with this platform has been a game-changer. The user experience is seamless and the products
                are top-notch!"
              </p>
              <div className="mt-4 flex items-center">
                <FaUserCircle className="text-white text-xl mr-2" />
                <p className="text-white font-medium">Sarah Johnson</p>
              </div>
            </div>
          </div>
          <div className="mt-auto">
            <p className="text-blue-100 text-sm">© 2024 Exhibition website created by Sky.</p>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Sign In</h3>
            <p className="text-gray-500 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  value={data.password}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="rememberMe"
                  type="checkbox"
                  name="rememberMe"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={data.rememberMe}
                  onChange={handleOnChange}
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <Link to="/forgot-password" className="text-sm font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              className="w-full flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <img src={iconGoogle || "/placeholder.svg"} alt="Google" className="w-5 h-5 mr-2" />
              Sign in with Google
            </button>

            <p className="mt-6 text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <Link to="/sign-up" className="font-medium text-zinc-800 hover:text-zinc-700">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login





