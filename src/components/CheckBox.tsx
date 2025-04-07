import { useState } from 'react';

type CheckBoxProps = {
  label: string;
  value: boolean;
  onChange: () => void;
};

const CheckBox = ({ label, value, onChange }: CheckBoxProps) => {
  const [checked, setChecked] = useState(value);

  const handleClick = () => {
    setChecked(!checked);
    onChange();
  };

  return (
    <div className="flex items-center" onClick={handleClick}>
      <div
        className={`w-4 h-4 border-2 border-red rounded-sm mr-3 flex items-center justify-center cursor-pointer transition-colors ${
          checked ? 'bg-red border-red' : ''
        }`}
      />

      <label className="text-gray-700 font-normal">{label}</label>
    </div>
  );
};
export default CheckBox;
