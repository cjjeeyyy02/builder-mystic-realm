import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchWithDropdownProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
  inputClassName?: string;
}

export function SearchWithDropdown({
  placeholder,
  value,
  onChange,
  options,
  className = "",
  inputClassName = "",
}: SearchWithDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputValue(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInputValue(newValue);
    onChange(newValue);
  };

  const handleOptionSelect = (optionValue: string, optionLabel: string) => {
    setInputValue(optionLabel);
    onChange(optionValue);
    setIsOpen(false);
  };

  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
        <Input
          placeholder={placeholder}
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => setIsOpen(true)}
          className={`pr-8 pl-8 ${inputClassName}`}
        />
        <Button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2 w-6 h-6 p-0 bg-transparent hover:bg-gray-100 border-0"
        >
          <ChevronDown className={`w-3 h-3 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </Button>
      </div>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-48 overflow-y-auto">
          <div className="py-1">
            {filteredOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleOptionSelect(option.value, option.label)}
                className="w-full text-left px-3 py-1 text-xs hover:bg-gray-50 transition-colors"
              >
                {option.label}
              </button>
            ))}
            {filteredOptions.length === 0 && (
              <div className="px-3 py-1 text-xs text-gray-500">No results found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
