import React, { useState } from 'react';
import Select, { ActionMeta, MultiValue } from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

interface TagOption {
  value: number;
  label: string;
}

interface TagSelectorProps {
  tags: TagOption[];
  onChange: (selectedTags: TagOption[]) => void;
}

const TagSelector: React.FC<TagSelectorProps> = ({ tags, onChange }) => {
  const [selectedOptions, setSelectedOptions] = useState<TagOption[]>([]);

  const handleChange = (
    selected: MultiValue<TagOption>,
    actionMeta: ActionMeta<TagOption>
  ) => {
    // Aquí hacemos una copia del arreglo inmutable para convertirlo en un arreglo mutable
    const mutableSelected = [...selected];
    setSelectedOptions(mutableSelected);
    onChange(mutableSelected); // Notificar al componente padre sobre el cambio
  };

  return (
    <Select
      components={animatedComponents}
      isMulti
      options={tags}
      value={selectedOptions}
      onChange={handleChange}
      className="basic-multi-select"
      classNamePrefix="select"
  
    />
  );
};

export default TagSelector;