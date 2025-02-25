import { User, FileText, PlusCircle } from "lucide-react";

const CreateTeamForm = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("name");
    const description = formData.get("description");
    console.log("Team:", { name, description });
    // Add your form submission logic here
  };

  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-6 md:p-8 shadow-lg bg-white dark:bg-gray-900 mt-10 transition-all duration-300 hover:shadow-xl">
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
  );
};

export default CreateTeamForm;