"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { useGetAllCategoriesQuery } from "@/redux/category/categoryApi";
import ErrorMsg from "../common/error-msg";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// prop type
type IPropType = {
  setCategory: React.Dispatch<SetStateAction<{ name: string; id: string }>>;
  setParent: React.Dispatch<SetStateAction<string>>;
  setChildren: React.Dispatch<SetStateAction<string>>;
  default_value?: {
    parent: string;
    id: string;
    children: string;
  };
};

export default function ProductCategory({
  setCategory,
  setParent,
  setChildren,
  default_value,
}: IPropType) {
  const [open, setOpen] = React.useState<string>("");
  const { data: categories, isError, isLoading } = useGetAllCategoriesQuery();
  const [currentParent, setCurrentParent] = useState<string>("");
  const [currentChildren, setCurrentChildren] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string[]>(() => {
    if (default_value) {
      const items = [default_value.parent];
      if (default_value.children && default_value.children.trim()) {
        items.push(default_value.children);
      }
      return items;
    }
    return [];
  });
  
  const prevDefaultValue = React.useRef<{ parent: string; id: string; children: string } | undefined>(undefined);

  useEffect(() => {
    // Only update if default_value has actually changed (by value, not just reference)
    if (default_value?.parent && default_value.id) {
      const { id, parent, children } = default_value;
      const prev = prevDefaultValue.current;
      
      // Check if values have actually changed
      const hasChanged = !prev || 
        prev.id !== id || 
        prev.parent !== parent || 
        (prev.children || "") !== (children || "");
      
      if (hasChanged) {
        setCategory({ id: id, name: parent });
        setParent(parent);
        setCurrentParent(parent);
        if (children && children.trim()) {
          setChildren(children);
          setCurrentChildren(children);
          setSelectedCategory([parent, children].filter((c) => c && c.trim()));
        } else {
          setChildren("");
          setCurrentChildren("");
          setSelectedCategory([parent].filter((c) => c && c.trim()));
        }
        prevDefaultValue.current = { id, parent, children: children || "" };
      }
    } else if (default_value === undefined && prevDefaultValue.current) {
      // Reset if default_value is removed
      setCategory({ name: '', id: '' });
      setParent("");
      setCurrentParent("");
      setChildren("");
      setCurrentChildren("");
      setSelectedCategory([]);
      prevDefaultValue.current = undefined;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [default_value?.id, default_value?.parent, default_value?.children]);

  // handleCategory
  const handleCategory = (value: string, title: string) => {
    setOpen(open === value ? "" : value);
    if (value && title) {
      setCategory({ id: value, name: title });
      setParent(title);
      setCurrentParent(title);
    }
    if (title && title.trim()) {
      if (selectedCategory.includes(title)) {
        const newSelected = selectedCategory.filter((c) => c !== title);
        setSelectedCategory(newSelected);
        // If removing parent category, also clear children
        if (title === currentParent) {
          setChildren("");
          setCurrentChildren("");
          if (currentChildren) {
            setSelectedCategory(newSelected.filter((c) => c !== currentChildren));
          }
        }
      } else {
        setSelectedCategory([...selectedCategory.filter((c) => c.trim()), title]);
      }
    }
  };

  // handle sub category
  const handleSubCategory = (subCate: string) => {
    if (!subCate || !subCate.trim()) return;
    setChildren(subCate);
    setCurrentChildren(subCate);
    if (selectedCategory.includes(subCate)) {
      setSelectedCategory(selectedCategory.filter((c) => c !== subCate && c.trim()));
    } else {
      setSelectedCategory([...selectedCategory.filter((c) => c.trim()), subCate]);
    }
  };

  // decide what to render
  let content = null;

  if (isLoading) {
    content = <h2>Loading....</h2>;
  }
  if (!isLoading && isError) {
    content = <ErrorMsg msg="There was an error" />;
  }
  if (!isLoading && !isError && categories?.result.length === 0) {
    content = <ErrorMsg msg="No Category Found" />;
  }

  if (!isLoading && !isError && categories?.success) {
    const categoryItems = categories.result;

    content = (
      <>
        <div className="p-0">
          {categoryItems.map((item) => (
            <div
              key={item._id}
              className={`${open === item._id ? "active" : ""}`}
            >
              <div className="p-0">
                <div
                  onClick={() => handleCategory(item._id, item.parent)}
                  className="border-b-0 p-3 relative"
                >
                  <h5 color="blue-gray" className="mr-auto font-medium mb-0 page-title cursor-pointer">
                    {item.parent}
                  </h5>
                  <span className="absolute top-0 right-0 px-3">
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`mx-auto h-4 w-4 transition-transform ${
                        open === item._id ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </div>
              </div>
              {item.children && item.children.length > 0 && (
                <div
                  className={`py-1 ml-8 ${open === item._id ? "block" : "hidden"}`}
                >
                  <div className="p-0">
                    {item.children.map((sub: string, i: number) => (
                      <h6 className="cursor-pointer" key={i} onClick={() => handleSubCategory(sub)}>
                        {sub}
                      </h6>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      <div className="tags-input-wrapper mb-2">
        {selectedCategory.filter((c) => c && c.trim()).map((c, i) => {
          const isParent = c === currentParent;
          const isChild = c === currentChildren;
          return (
            <span key={i} className="tag">
              {c}
              <b onClick={() => {
                if (isParent) {
                  setCategory({ name: '', id: '' });
                  setParent("");
                  setCurrentParent("");
                  setChildren("");
                  setCurrentChildren("");
                } else if (isChild) {
                  setChildren("");
                  setCurrentChildren("");
                }
                setSelectedCategory(selectedCategory.filter((cat) => cat !== c && cat.trim()));
              }}>×</b>
            </span>
          );
        })}
      </div>
      <div className="h-80 overflow-y-scroll overflow-x-hidden">
        <div>{content}</div>
      </div>
    </>
  );
}
