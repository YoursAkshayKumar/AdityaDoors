"use client";
import React, { useEffect, useState, useImperativeHandle, forwardRef } from "react";
import { PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";

export interface ISpecification {
  label: string;
  value: string;
}

export interface SpecificationsRef {
  handleAddSpecification: () => void;
}

type IPropType = {
  specifications: ISpecification[];
  setSpecifications: React.Dispatch<React.SetStateAction<ISpecification[]>>;
  default_value?: ISpecification[];
};

const Specifications = forwardRef<SpecificationsRef, IPropType>(
  ({ specifications, setSpecifications, default_value }, ref) => {
    const [newLabel, setNewLabel] = useState("");
    const [newValue, setNewValue] = useState("");

    useEffect(() => {
      if (default_value && Array.isArray(default_value)) {
        setSpecifications(default_value);
      }
    }, [default_value, setSpecifications]);

    const handleAddSpecification = (e?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }

      const trimmedLabel = newLabel.trim();
      const trimmedValue = newValue.trim();

      // If called via ref (no event) and fields are empty, return silently
      if (!e && (!trimmedLabel || !trimmedValue)) {
        return;
      }

      // If called via button/keyboard and fields are empty, show alert
      if (e && (!trimmedLabel || !trimmedValue)) {
        alert("Please enter both specification label and value");
        return;
      }

      setSpecifications((prev) => [
        ...prev,
        { label: trimmedLabel, value: trimmedValue },
      ]);

      setNewLabel("");
      setNewValue("");
    };

    // Expose handleAddSpecification via ref
    useImperativeHandle(ref, () => ({
      handleAddSpecification: () => handleAddSpecification(),
    }));

  const handleRemoveSpecification = (index: number) => {
    setSpecifications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSpecificationChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    setSpecifications((prev) =>
      prev.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      )
    );
  };

    return (
      <div className="mb-5 tp-product-specifications">
        <div className="space-y-3">
          {specifications.map((spec, index) => (
            <div
              key={index}
              className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-gray-200 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1 font-medium">Label</label>
                <input
                  type="text"
                  value={spec.label}
                  onChange={(e) => handleSpecificationChange(index, "label", e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="e.g., Material"
                />
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1 flex flex-col">
                  <label className="text-xs text-gray-600 mb-1 font-medium">Value</label>
                  <input
                    type="text"
                    value={spec.value}
                    onChange={(e) => handleSpecificationChange(index, "value", e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="e.g., Aluminum"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(index)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors border border-red-200"
                  aria-label="Remove specification"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Specification */}
          <div className="border-2 border-dashed border-gray-300 rounded-md p-4 bg-white hover:border-blue-400 transition-colors">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1 font-medium">New Label</label>
                <input
                  type="text"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddSpecification(e);
                    }
                  }}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Finish"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-xs text-gray-600 mb-1 font-medium">New Value</label>
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
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Powder Coated"
                />
              </div>
            </div>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleAddSpecification(e);
              }}
              className="w-full sm:w-auto px-4 py-2 bg-blue-500 text-white hover:bg-blue-600 rounded-md transition-colors flex items-center justify-center gap-2 font-medium"
            >
              <PlusIcon className="w-5 h-5" />
              Add Specification
            </button>
          </div>
        </div>
        <em className="text-sm text-gray-500 mt-2 block">
          Add product specifications as label-value pairs (e.g., Material: Aluminum)
        </em>
      </div>
    );
  }
);

Specifications.displayName = "Specifications";

export default Specifications;

