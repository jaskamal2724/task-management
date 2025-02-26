import React, { useEffect, useState } from "react";
import axios from "axios";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const navigate = useNavigate()
    const [users, setUsers] = useState([]);
    const [task, setTasks] = useState([])
    const [team, setTeam] = useState([])

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getusers`);
            if (res.status === 200) {
                setUsers(res.data);
            } else {
                console.log("Users not found");
            }
        } catch (error) {
            console.log("Error in fetching users:", error);
        }
    };

    const fetchtask = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettask`)
            if (res.status == 200) {
                [
                    setTasks(res.data)
                ]
            }
            else {
                console.log("task can't fetched")
            }
        } catch (error) {
            console.log("error in fetching tasks ", error)
        }
    }

    const fetchteam = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getTeams`)
            if (res.status == 200) {
                setTeam(res.data)
            }
            else {
                console.log("team can't fetched ")
            }
        } catch (error) {
            console.log("error in fetching teams ", error)
        }
    }

    const handlelogout = async () => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
            if (response.status == 200) {
                console.log("logout success")
                navigate("/signin")
            }
            else {
                console.log("logout failed")
            }
        } catch (error) {
            console.log("error in logout ", error)
        }

    }

    useEffect(() => {
        fetchUsers();
        fetchtask()
        fetchteam()
    }, []);

    return (

    <div className="min-h-screen  text-white flex justify-center p-6">
        <div className="w-full max-w-5xl flex flex-col">
            <h2 className="text-2xl font-bold mb-4 text-[#2D336B] text-center">User List</h2>
            <div className="overflow-hidden rounded-lg shadow-lg">
                <table className="min-w-full bg-[#F2F6D0] rounded-lg">
                    <thead>
                        <tr className="bg-[#F2F6D0] text-[#443627]">
                                <th className="py-3 px-6 text-left">Name</th>
                                <th className="py-3 px-6 text-left">Email</th>
                                <th className="py-3 px-6 text-left">Role</th>
                                <th className="py-3 px-6 text-left">Tasks</th>
                                <th className="py-3 px-6 text-left">Team</th>
                                <th className="py-3 px-6 text-left">Created At</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (

                            <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-750 transition">
                                <td className="py-4 px-6 flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-indigo-200 flex items-center justify-center text-[#443627] font-semibold mr-3">
                                            {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                            <p className="font-semibold text-[#443627]">{user.username}</p>
                                            <p className="text-[#443627] text-sm">@{user.username.toLowerCase()}</p>
                                    </div>
                                </td>
                                <td className="py-4 px-6 text-[#443627]">{user.email}</td>
                                <td className="py-4 px-6 text-[#443627]">{user.role}</td>
                                <td className="py-4 px-6 text-[#443627]"> {user.role == "Member" ? ((task.filter((tsk) => tsk.id == user._id)).length) : "N/A"} </td>
                                <td className="py-4 px-6 text-[#443627]">{user.role == "Member" ? ((team.filter((tm) => tm.createdBy == user._id)).length) : "N/A"}</td>
                                <td className="py-4 px-6 text-[#443627]">{new Date(user.createdAt).toLocaleDateString()} </td>
                            </tr>
                        ))}
                        {users.length === 0 && (
                            <tr>
                                <td colSpan="6" className="text-center py-6 text-gray-400">
                                        No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <button onClick={handlelogout} className="mx-auto mt-10">
            <LogOut className="text-black "/>
            </button>
        </div>
    </div>
    );
};

export default AdminPage;
