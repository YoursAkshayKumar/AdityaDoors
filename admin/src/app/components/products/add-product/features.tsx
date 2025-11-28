import React, { useEffect, useRef } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};

const Features = ({ features, setFeatures, default_value }: IPropType) => {
  const prevDefaultValueStr = useRef<string>("__INITIAL__");
  
  useEffect(() => {
    // Always sync with default_value when it changes (for edit mode)
    // Handle both undefined and array cases
    const currentDefault = Array.isArray(default_value) ? default_value : [];
    const currentStr = JSON.stringify(currentDefault);
    
    // Always update if the value has actually changed (by content, not just reference)
    if (currentStr !== prevDefaultValueStr.current) {
      setFeatures(currentDefault);
      prevDefaultValueStr.current = currentStr;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [default_value]);

  return (
    <div className="mb-5 tp-product-features">
      <TagsInput
        value={features}
        onChange={setFeatures}
        name="features"
        placeHolder="enter features"
      />
      <em>press enter to add new feature</em>
    </div>
  );
};

export default Features;

