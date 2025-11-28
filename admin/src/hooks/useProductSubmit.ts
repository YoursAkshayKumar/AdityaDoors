"use client";
import { useEffect, useState, useRef } from "react";
import slugify from "slugify";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useAddProductMutation, useEditProductMutation } from "@/redux/product/productApi";
import { notifyError, notifySuccess } from "@/utils/toast";
import { IAddProduct } from "@/types/product-type";

type IBCType = {
  name: string;
  id: string;
};

const useProductSubmit = () => {
  const [img, setImg] = useState<string>("");
  const [relatedImages, setRelatedImages] = useState<string[]>([]);
  const [brand, setBrand] = useState<IBCType>({ name: '', id: '' });
  const [category, setCategory] = useState<IBCType>({ name: '', id: '' });
  const [parent, setParent] = useState<string>('');
  const [children, setChildren] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [colors, setColors] = useState<string[]>([]);
  const [features, setFeatures] = useState<string[]>([]);
  const [specifications, setSpecifications] = useState<Record<string, string>>({});
  const [fullDescription, setFullDescription] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(true);
  
  // Use refs to track latest state for form submission
  const featuresRef = useRef<string[]>([]);
  const specificationsRef = useRef<Record<string, string>>({});
  
  // Wrapper functions that update both state and refs immediately
  // These ensure refs always have the latest value, even before React state updates
  const setFeaturesWithRef = (value: string[] | ((prev: string[]) => string[])) => {
    if (typeof value === 'function') {
      // For functional updates, we need to read current state from ref to get absolute latest
      const currentFeatures = featuresRef.current;
      const newValue = value(currentFeatures);
      featuresRef.current = newValue; // Update ref immediately
      setFeatures(newValue); // Then update state
    } else {
      featuresRef.current = value; // Update ref immediately
      setFeatures(value); // Then update state
    }
  };
  
  const setSpecificationsWithRef = (value: Record<string, string> | ((prev: Record<string, string>) => Record<string, string>)) => {
    console.log('setSpecificationsWithRef called', { isFunction: typeof value === 'function' });
    
    if (typeof value === 'function') {
      // For functional updates, React provides the latest state in the function parameter
      // We need to update both state and ref synchronously
      setSpecifications((prev) => {
        console.log('setSpecifications callback in wrapper', { prev, prevKeys: Object.keys(prev) });
        const newValue = value(prev);
        console.log('New value calculated', { newValue, newKeys: Object.keys(newValue) });
        // Update ref immediately with the new value, before React state update completes
        specificationsRef.current = newValue;
        console.log('Ref updated', { refValue: specificationsRef.current, refKeys: Object.keys(specificationsRef.current) });
        return newValue;
      });
    } else {
      // For direct value updates, update ref first, then state
      console.log('Direct value update', { value, keys: Object.keys(value) });
      specificationsRef.current = value;
      setSpecifications(value);
    }
  };
  
  // Update refs whenever state changes (as backup, in case state is updated elsewhere)
  useEffect(() => {
    featuresRef.current = features;
  }, [features]);
  
  useEffect(() => {
    specificationsRef.current = specifications;
  }, [specifications]);

  const router = useRouter();


  // useAddProductMutation
  const [addProduct, { data: addProductData, isError, isLoading }] =
    useAddProductMutation();
  // useAddProductMutation
  const [editProduct, { data: editProductData, isError: editErr, isLoading: editLoading }] =
    useEditProductMutation();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
    reset,
  } = useForm();
  // resetForm

  // handle submit product
  const handleSubmitProduct = async (data: any) => {
    // Use the latest values from refs which are updated synchronously
    const currentFeatures = featuresRef.current;
    const currentSpecifications = specificationsRef.current;

    console.log('=== ADD PRODUCT SUBMISSION ===');
    console.log('Ref specifications:', currentSpecifications);
    console.log('State specifications:', specifications);
    console.log('Ref count:', Object.keys(currentSpecifications).length);
    console.log('State count:', Object.keys(specifications).length);
    console.log('Ref keys:', Object.keys(currentSpecifications));
    console.log('State keys:', Object.keys(specifications));

    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children || undefined,
      tags: tags,
      image: img,
      originalPrice: Number(data.price),
      price: Number(data.price),
      discount: Number(data.discount),
      relatedImages: relatedImages,
      description: data.description,
      brand: brand,
      category: category,
      unit: data.unit || undefined,
      quantity: Number(data.quantity),
      colors: colors,
      isOnSale: data.isOnSale,
      features: currentFeatures,
      specifications: currentSpecifications,
      fullDescription: data.fullDescription || undefined,
    };
    if (!img) {
      return notifyError("Product image is required");
    }
    if (!category.name) {
      return notifyError("Category is required");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be gether than discount");
    } else {
      const res = await addProduct(productData);

      if ("error" in res) {
        if ("data" in res.error) {
          const errorData = res.error.data as { message?: string, errorMessages?: { path: string, message: string }[] };
          if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
            const errorMessage = errorData.errorMessages.map(err => err.message).join(", ");
            return notifyError(errorMessage);
          }
          if (typeof errorData.message === "string") {
            return notifyError(errorData.message);
          }
        }
      }
      else {
        notifySuccess("Product created successFully");
        setIsSubmitted(true);
        router.push('/product-grid')
      }
    }
  };
  // handle edit product
  const handleEditProduct = async (data: any, id: string) => {
    // Validate required fields
    if (!img || !img.trim()) {
      return notifyError("Product image is required");
    }
    if (!category.name || !category.id || !category.name.trim() || !category.id.trim()) {
      return notifyError("Category is required. Please select a valid category.");
    }
    if (!parent || !parent.trim()) {
      return notifyError("Parent category is required");
    }
    if (Number(data.discount) > Number(data.price)) {
      return notifyError("Product price must be greater than discount");
    }
    if (!id || !id.trim()) {
      return notifyError("Product ID is invalid");
    }

    // Use the latest values from refs which are updated synchronously
    const currentFeatures = featuresRef.current;
    const currentSpecifications = specificationsRef.current;

    console.log('=== EDIT PRODUCT SUBMISSION ===');
    console.log('Ref specifications:', currentSpecifications);
    console.log('State specifications:', specifications);
    console.log('Ref count:', Object.keys(currentSpecifications).length);
    console.log('State count:', Object.keys(specifications).length);
    console.log('Ref keys:', Object.keys(currentSpecifications));
    console.log('State keys:', Object.keys(specifications));

    // product data
    const productData: IAddProduct = {
      sku: data.sku,
      title: data.title,
      parent: parent,
      children: children && children.trim() ? children : undefined,
      tags: tags.length > 0 ? tags : [],
      image: img,
      originalPrice: Number(data.price),
      price: Number(data.price),
      discount: Number(data.discount) || 0,
      relatedImages: relatedImages.length > 0 ? relatedImages : [],
      description: data.description,
      brand: brand.name ? brand : undefined,
      category: category,
      unit: data.unit || undefined,
      quantity: Number(data.quantity),
      colors: colors.length > 0 ? colors : [],
      isOnSale: data.isOnSale || false,
      features: currentFeatures,
      specifications: currentSpecifications,
      fullDescription: data.fullDescription || undefined,
    };

    const res = await editProduct({ id: id, data: productData })
    if ("error" in res) {
      if ("data" in res.error) {
        const errorData = res.error.data as { message?: string, errorMessages?: { path: string, message: string }[] };
        if (errorData.errorMessages && Array.isArray(errorData.errorMessages)) {
          const errorMessage = errorData.errorMessages.map(err => err.message).join(", ");
          return notifyError(errorMessage);
        }
        if (typeof errorData.message === "string") {
          return notifyError(errorData.message);
        }
      }
    }
    else {
      notifySuccess("Product edit successFully");
      setIsSubmitted(true);
      router.push('/product-grid')
    }
  };

  return {
    img,
    setImg,
    parent,
    brand,
    setBrand,
    category,
    setCategory,
    handleSubmitProduct,
    handleEditProduct,
    register,
    handleSubmit,
    errors,
    control,
    setParent,
    setChildren,
    setTags,
    setColors,
    setRelatedImages,
    tags,
    isSubmitted,
    relatedImages,
    colors,
    features,
    setFeatures: setFeaturesWithRef,
    specifications,
    setSpecifications: setSpecificationsWithRef,
    fullDescription,
    setFullDescription,
  };
};

export default useProductSubmit;
