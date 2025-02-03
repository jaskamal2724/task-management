const InputField = ({ label, type, placeholder, value, onChange, name }) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className="w-full input input-bordered bg-base-200 dark:bg-base-300 transition-colors" // ✅ Dynamic background
        required
      />
    </div>
  );
};

export default InputField;
