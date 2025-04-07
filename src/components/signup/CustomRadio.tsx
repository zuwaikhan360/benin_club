import React from 'react';
import { motion } from 'framer-motion';

interface RadioProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

const CustomRadio: React.FC<RadioProps> = ({
  name,
  value,
  checked,
  onChange,
}) => {
  return (
    <motion.label
      className="relative flex items-center cursor-pointer mr-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        className={`border-2 border-gray rounded-full h-4 w-4 ${
          checked ? 'border-red bg-red' : ''
        }`}
      ></div>
      <span className="ml-2 text-gray-700">{value}</span>
    </motion.label>
  );
};

export default CustomRadio;
