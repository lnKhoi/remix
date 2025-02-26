import React, { useState } from 'react';

import { Select } from 'antd';

const { Option } = Select;

interface CustomSelectProps {
  placeholder?: string;
  defaultOptions?: string[];
  onChange?: (selectedValues: string[]) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  placeholder = "Type and press Enter to add",
  defaultOptions = [],
  onChange,
}) => {
  const [options, setOptions] = useState<string[]>(defaultOptions);
  const [value, setValue] = useState<string[]>([]);
  const [searchText, setSearchText] = useState(""); // Track search input

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && searchText.trim()) {
      event.preventDefault();
      const newValue = searchText.trim();

      if (!options.includes(newValue)) {
        setOptions([...options, newValue]);
      }

      const newSelectedValues = [...value, newValue];
      setValue(newSelectedValues);
      onChange?.(newSelectedValues);

      setSearchText(""); // Reset search input
    }
  };

  return (
    <Select
      className="w-full"
      mode="multiple"
      placeholder={placeholder}
      maxTagCount={3}
      value={value}
      onChange={(selectedValues) => {
        setValue(selectedValues);
        onChange?.(selectedValues);
      }}
      onSearch={setSearchText} // Update search text
      searchValue={searchText} // Control search input
      onInputKeyDown={handleKeyDown}
    >
      {options.map((option) => (
        <Option key={option} value={option}>
          {option}
        </Option>
      ))}
    </Select>
  );
};

export default CustomSelect;
