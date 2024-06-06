import React, { useContext, useState } from "react";
import "../../App.css";
import picture from "../Forms/assets/6736639.jpg";
import { Link } from "react-router-dom";
import Header from "../LandingPage.js/Header";
import AuthContext from "../Auth/AuthContext";

const Login = () => {
  const { loginUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    email.length > 0 && loginUser(email, password);
    console.log("Email:" + email);
    console.log("Password:" + password);
  };

  return (
    <>
      <div>
        <Header />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="login-container flex">
          <div className="flex flex-col sm:flex-row items-center">
            <div className="picture-login mx-16 mt-3">
              <img src={picture} alt="login-picture"></img>
            </div>
            <div className="login-form-container flex justify-center items-center sm:w-1/2">
              <div className="flex flex-col">
                <div className="login-form text-center flex-col">
                  <h1 className="text-3xl sm:text-4xl mb-2">Welcome</h1>
                  <h3 className="text-lg sm:text-xl mb-4">
                    Login to your account
                  </h3>
                </div>
                <div className="inputs">
                  <label
                    for="input-group-1"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your Email:
                  </label>
                  <div class="relative mb-6">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                      <svg
                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 16"
                      >
                        <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                        <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                      </svg>
                    </div>
                    <input
                      type="text"
                      id="input-group-1"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@gmail.com"
                      required
                      name="email"
                    />
                  </div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password:
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
                      <svg
                        className="w-6 h-6 text-gray-600 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 14v3m-3-6V7a3 3 0 1 1 6 0v4m-8 0h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                        />
                      </svg>
                    </span>
                    <input
                      type="password"
                      id="website-admin"
                      class="rounded-none rounded-e-lg bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                      name="password"
                    />
                  </div>
                  <div className="flex items-start mt-5 ">
                    <label
                      for="noaccount"
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Don't Have an account?&nbsp;
                      <Link
                        to="/Register"
                        href="#"
                        className="text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Register here
                      </Link>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="text-white bg-blue-700 mt-5 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
