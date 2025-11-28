import React, { useEffect } from "react";
import { TagsInput } from "react-tag-input-component";

type IPropType = {
  features: string[];
  setFeatures: React.Dispatch<React.SetStateAction<string[]>>;
  default_value?: string[];
};

const Features = ({ features, setFeatures, default_value }: IPropType) => {
  useEffect(() => {
    if (default_value) {
      setFeatures(default_value);
    }
  }, [default_value, setFeatures]);

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

