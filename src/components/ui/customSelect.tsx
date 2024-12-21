import React from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

interface CustomSelectProps {
  placeholder: string;
  data: { id: string | number; name: string }[] | string[];
  onValueChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ placeholder, data, onValueChange }) => {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-[180px] border-foreground">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {data && data.length > 0 && (
          <>
            {data.map((item, index) =>
              typeof item === 'string' ? (
                <SelectItem value={item} key={index}>
                  {item}
                </SelectItem>
              ) : (
                <SelectItem value={`${item.id}`} key={item.id}>
                  {item.name}
                </SelectItem>
              )
            )}
          </>
        )}
      </SelectContent>
    </Select>
  );
};

export default CustomSelect;
