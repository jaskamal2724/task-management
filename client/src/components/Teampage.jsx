import axios from "axios";
import { User, FileText, PlusCircle, Star } from "lucide-react";
import { useEffect, useState } from "react";

const CreateTeamForm = () => {

  const [team, setTeam]=useState([])

  const fetchedTeams=async () => {
    const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/getTeams`)
    if(response.status==200){
      setTeam(response.data)
    }
    else{
      setTeam([])
    }
  }

  useEffect(()=>{
    fetchedTeams()
  },[team])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    console.log("Team:", { name, description });
    // Add your form submission logic here
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/createTeam`, { name: name, description: description }, { withCredentials: true })
      if (response.status == 200) {
        console.log("team created")
      }
      else {
        console.log("team not created")
      }
    } catch (error) {
      console.log("error in team creating ", error)
    }
  };

  return (
    <>
      <div className="flex flex-row md:flex-col md:gap-5  items-center">

      <div className=" max-w-md w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-8 shadow-lg bg-white dark:bg-gray-900 mt-10 transition-all duration-300 hover:shadow-xl">
        <h2 className="font-bold text-2xl text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <PlusCircle className="w-6 h-6" />
          Create Your Team
        </h2>
        <p className="text-gray-600 text-sm max-w-sm mt-2 dark:text-gray-300">
          Build your dream team with a name and a mission.
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="relative mb-6">
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
            >
              <User className="w-4 h-4 text-indigo-500" />
              Team Name
            </label>
            <input
              id="name"
              name="name"
              placeholder="e.g., Dream Coders"
              type="text"
              className="mt-1 w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          {/* Description Field */}
          <div className="relative mb-6">
            <label
              htmlFor="description"
              className="text-sm font-medium text-gray-700 dark:text-gray-200 flex items-center gap-2"
            >
              <FileText className="w-4 h-4 text-indigo-500" />
              Description
            </label>
            <textarea
              id="description"
              name="description"
              placeholder="What’s your team all about?"
              className="mt-1 w-full p-3 pl-10 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 resize-y min-h-[100px]"
              required
            />
          </div>

          {/* Create Team Button */}
          <button
            type="submit"
            className="relative w-full py-3 px-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg font-semibold shadow-md hover:from-indigo-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5" />
            Create Team
          </button>

          {/* Divider */}
          <div className="bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>

      {team.length>1 && 
      <div className="grid gap-10 grid-cols-2">
      {team.length>0 ? team.map((item)=>(
        <div className="w-80 mx-auto rounded-2xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-5" key={item._id}>
        
        <div className="relative h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-md">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">
              {item.name}
            </h2>
            
          </div>

          <div className="flex flex-col  items-center justify-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
            <p className="text-center text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Members: 5</span>
            <span>Founded: Feb 2025</span>
          </div>
          
          <button className="mt-6 w-full py-2 px-4 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200">
            Click for details
          </button>
        </div>

      </div>
      )) : "no meetings"}
      </div>
  }
      
      {team.length == 1 && 
      <div className="grid gap-10">
      {team.length>0 ? team.map((item)=>(
        <div className="w-80 mx-auto rounded-2xl bg-white dark:bg-gray-900 shadow-xl overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl mb-5" key={item._id}>
        
        <div className="relative h-24 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="p-3 bg-white/20 rounded-full backdrop-blur-md">
              <User className="w-10 h-10 text-white" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-center text-xl font-bold text-gray-800 dark:text-gray-100">
              {item.name}
            </h2>
            
          </div>

          <div className="flex flex-col  items-center justify-center gap-3 mb-6">
            <FileText className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-1" />
            <p className="text-center text-gray-600 dark:text-gray-300 text-base leading-relaxed">
              {item.description}
            </p>
          </div>

          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Members: 5</span>
            <span>Founded: Feb 2025</span>
          </div>
          
          <button className="mt-6 w-full py-2 px-4 bg-indigo-500 text-white rounded-lg font-semibold hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 transition-all duration-200">
            Click for details
          </button>
        </div>

      </div>
      )) : "no meetings"}
      </div>
      }

      </div>
      
    </>
  );
};

export default CreateTeamForm;