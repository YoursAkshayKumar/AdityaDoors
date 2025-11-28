"use client";
import React, { useEffect, useState, useRef } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

type IPropType = {
  specifications: Record<string, string>;
  setSpecifications: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  default_value?: Record<string, string>;
};

const Specifications = ({ specifications, setSpecifications, default_value }: IPropType) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const prevDefaultValueStr = useRef<string>("__INITIAL__");
  
  useEffect(() => {
    // Only sync with default_value on initial load (when prevDefaultValueStr is "__INITIAL__")
    // This is for edit mode when product data loads
    // We should NOT sync after user has made changes, as it would overwrite them
    const currentDefault = default_value && typeof default_value === 'object' && !Array.isArray(default_value) 
      ? default_value 
      : {};
    const currentStr = JSON.stringify(currentDefault);
    
    // ONLY update on initial load - never overwrite user changes
    if (prevDefaultValueStr.current === "__INITIAL__") {
      console.log('Initial load: Syncing specifications from default_value:', currentDefault);
      setSpecifications(currentDefault);
      prevDefaultValueStr.current = currentStr;
    } else {
      // After initial load, only update if default_value has changed AND we have no user changes
      // But to be safe, we'll only sync on initial load
      console.log('Skipping sync - not initial load. Current prev:', prevDefaultValueStr.current, 'New:', currentStr);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [default_value]);

  const handleAddSpecification = (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    
    const trimmedKey = newKey.trim();
    const trimmedValue = newValue.trim();
    
    if (!trimmedKey || !trimmedValue) {
      alert('Please enter both specification name and value');
      return;
    }
    
    // Use functional update to ensure we get the latest state
    setSpecifications((prev) => {
      // Check if key already exists to avoid overwriting
      if (prev[trimmedKey]) {
        alert(`Specification with key "${trimmedKey}" already exists.`);
        return prev;
      }
      
      // Create new object with the new specification
      const updated = {
        ...prev,
        [trimmedKey]: trimmedValue,
      };
      
      console.log('Adding specification:', trimmedKey, '=', trimmedValue);
      console.log('Total specifications after add:', Object.keys(updated).length);
      
      return updated;
    });
    
    // Clear inputs immediately
    setNewKey("");
    setNewValue("");
  };

  const handleRemoveSpecification = (key: string) => {
    setSpecifications((prev) => {
      const newSpecs = { ...prev };
      delete newSpecs[key];
      return newSpecs;
    });
  };

  const handleSpecificationChange = (key: string, value: string) => {
    setSpecifications((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (newKey.trim() && newKey !== oldKey) {
      const oldValue = specifications[oldKey];
      setSpecifications((prev) => {
        const newSpecs = { ...prev };
        delete newSpecs[oldKey];
        newSpecs[newKey.trim()] = oldValue;
        return newSpecs;
      });
    }
  };

  return (
    <div className="mb-5 tp-product-specifications">
      <div className="space-y-3">
        {Object.entries(specifications).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="text"
              value={key}
              onChange={(e) => {
                const newKeyValue = e.target.value;
                if (newKeyValue.trim() || newKeyValue === "") {
                  handleKeyChange(key, newKeyValue);
                }
              }}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Specification name"
            />
            <input
              type="text"
              value={value}
              onChange={(e) => handleSpecificationChange(key, e.target.value)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Specification value"
            />
            <button
              type="button"
              onClick={() => handleRemoveSpecification(key)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={newKey}
            onChange={(e) => setNewKey(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleAddSpecification(e);
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New specification name"
          />
          <input
            type="text"
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                e.stopPropagation();
                handleAddSpecification(e);
              }
            }}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="New specification value"
          />
          <button
            type="button"
            onClick={(e) => {
              console.log('Plus button clicked');
              e.preventDefault();
              e.stopPropagation();
              handleAddSpecification(e);
            }}
            className="p-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center cursor-pointer"
            aria-label="Add specification"
          >
            <PlusIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
      <em className="text-sm text-gray-500">Add specification key-value pairs</em>
    </div>
  );
};

export default Specifications;

