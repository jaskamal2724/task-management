import { Label } from "./ui/label";
import { Input } from "./ui/input";

const InputField = ({ label, type, placeholder, value, onChange }) => (
  <div className="mb-4">
    <Label className="block mb-1 text-sm font-medium">{label}</Label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full"
    />
  </div>
);

export default InputField;
