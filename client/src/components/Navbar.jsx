import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "lucide-react"

const Navbar = () => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    };

   

    return (
        <>
            <div className={` navbar shadow-md transition-colors duration-300 ${theme === "light" ? "bg-white text-black" : "bg-gray-900 text-white"
                }`}>

                <div className="navbar-start">
                    <a className="btn btn-ghost text-xl">Task Manager</a>
                </div>

                <div className="navbar-center">
                </div>

                <div className=" mr-0 navbar-end space-x-2">

                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="Tailwind CSS Navbar component"
                                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                            <li>
                                <a className="justify-between">
                                    Profile
                                    <span className="badge">New</span>
                                </a>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a>Logout</a></li>
                        </ul>
                    </div>

                    {/* Theme Toggle Button */}
                    <button onClick={toggleTheme} className="btn btn-ghost btn-circle transition-colors">
                        {theme === "light" ? (
                            <MoonIcon className="h-5 w-5 text-gray-700" />
                        ) : (
                            <SunIcon className="h-5 w-5 text-yellow-400" />
                        )}
                    </button>
                </div>


            </div>
        </>
    );
};

export default Navbar;
