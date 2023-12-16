'use client'
import { FormEvent, useContext, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { AuthContext } from "./_context/AuthContext"
import { useRouter } from "next/navigation"
import { authenticate_user } from '../utils/user'

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const router = useRouter();
  const [formUser, setFormUser] = useState({
    'username': '',
    'password': ''
  });

  useEffect(() => {
    const user = localStorage.getItem('user_data');
    if (user != null) {
      router.push('/Dashboard');
    }
    setIsAuthenticating(false);
  }, [])

  const { setUser } = useContext(AuthContext);

  const handleSubmit = async (e: FormEvent) => {
    setIsLoading(true);
    e.preventDefault();

    await authenticate_user(formUser).then(data => {
      console.log("data ", data)
      if (data!.status == 200) {
        alert("User logged in successfully");
        localStorage.setItem('token', JSON.stringify(data!.message.token));
        localStorage.setItem('user_data', JSON.stringify(data!.message.user));
        setUser({
          token: data!.message.token,
          user: data!.message.user
        })
        router.push('/Dashboard');
      } else {
        alert(data?.message);
      }
    })
    setIsLoading(false);
  }

  if (isAuthenticating) return (
    <div className='h-screen justify-center items-center flex'>
      <div>
        <svg className="animate-spin ml-1 mr-3 h-10 w-10 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
        </svg>
      </div>
      <div>
        Authenticating...
      </div>
    </div>
  )
  return (
    <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center">
          <Image
            src="/Logo.png"
            alt="Your Company"
            width={100}
            height={100}
          />
        </div>
        <h2 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to Billing Managment System
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" action="#" method="POST" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="username"
                type="username"
                autoComplete="username"
                value={formUser.username}
                onChange={(e) => setFormUser({ ...formUser, username: e.target.value })}
                required
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <Link href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formUser.password}
                onChange={(e) => setFormUser({ ...formUser, password: e.target.value })}
                className="pl-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? (
                <svg className="animate-spin ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.21.896 4.21 2.344 5.648l2.657-2.357z"></path>
                </svg>) :
                "Sign in"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn

// <option disabled selected style={{ display: 'none' }}>Word Limit</option>