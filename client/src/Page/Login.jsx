import React from 'react'

const Login = () => {
  
    return (
        <main className="flex flex-col items-center justify-center px-4 items-center ps">
            <div className="max-w-sm w-full text-gray-600">
                <div className="text-center">
                    <img src="https://res.cloudinary.com/do5e8qwxk/image/upload/v1732354208/Screenshot_2024-11-23_145750_gr3gjx.png" width={150} className="mx-auto" />
                    <div className="mt-5 space-y-2">
                        <h3 className="text-blue-800 text-2xl font-bold sm:text-3xl ">Log in to your account</h3>
                        <p className="text-white">Don't have an account? <a href="javascript:void(0)" className="font-medium text-indigo-600 hover:text-indigo-500">Sign up</a></p>
                    </div>
                </div>
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="mt-8 space-y-5"
                >
                    <div>
                        <label className="font-medium text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium text-white">
                            Password
                        </label>
                        <input
                            type="password"
                            required
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <button
                        className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                    >
                        Sign in
                    </button>
                    <div className="text-center">
                        <a href="javascript:void(0)" className="hover:text-indigo-600">Forgot password?</a>
                    </div>
                </form>
            </div>
        </main>
    )
}


export default Login