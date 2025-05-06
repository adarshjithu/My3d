"use client";

import { IBase } from "@/Interfaces/IBase";
import { ICategory } from "@/Interfaces/ICategory";
import { IFrame } from "@/Interfaces/IFrame";
import { ISize } from "@/Interfaces/ISize";
import { addNewProduct, getDataForAddProduct } from "@/Services/adminService";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { NestedModal } from "./AddBaseModal";
import ButtonLoading from "@/Components/User/Loading/ButtonLoading";

const AddProductForm = () => {
    const [images, setImages] = useState<File[]>([]);
    const [sizeGuideImage,setSizeGuideImage] = useState<any>(null)
    const [variants, setVariants] = useState<any[]>([]);
    const [base, setBase] = useState<IBase[]>([]);
    const [size, setSize] = useState<ISize[]>([]);
    const [category, setCategory] = useState<ICategory[]>([]);
    const [frames, setFrames] = useState<IFrame[]>([]);
    const [orientation, setOrientation] = useState(false);
    const [baseModal, setBaseModal] = useState(false);
    const [baseType, setBaseType] = useState("");
    const [baseIndex, setBaseIndex] = useState<number>(0);
    const [loading,setLoading] = useState(false)
    

    // Form data state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        baseprice: "",
        discountprice: "",
        frame:'',

    });

    // Handle Image Upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);

        setImages([...images, ...files]);
    };

    // Add Variant
    const addVariant = () => {
        setVariants([...variants, { size: "", price: 0, base: { sleeping: "", standing: "", default: "" } }]);
    };

    // // Update Variant
    // const updateVariant = (index: number, key: string, value: string | number) => {
    //     const updatedVariants = [...variants];
    //     updatedVariants[index] = { ...updatedVariants[index], [key]: value };
    //     setVariants(updatedVariants);
    // };

    // const toggleOrientationCheckbox = (index: number, checked: boolean) => {
    //     setVariants(
    //         variants?.map((obj, i) => {
    //             if (index == i) {
    //                 return { ...obj, orientation: checked };
    //             }
    //             return obj;
    //         })
    //     );
    // };
    // Remove Variant
    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    // Fetch Data for Dropdowns
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getDataForAddProduct();
                const response = res?.data?.data;
                setFrames(response?.frame);
                setBase(response?.base);

                setCategory(response?.category);
                setSize(response?.size);
            } catch (error) {
                toast.error(error);
            }
        };
        fetchData();
    }, []);

    // Handle Form Data Change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        console.log(name, value);
        setFormData({ ...formData, [name]: value });
    };

    // Handle Form Submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newFormData = new FormData();
        let newVariants: any = [];
        if (orientation) {
            newVariants = variants.map((obj) => {
                return { ...obj, base: { standing: obj?.base?.standing, sleeping: obj?.base?.sleeping } };
            });
        } else {
            newVariants = variants.map((obj) => {
                return { ...obj, base: { default: obj?.base?.default } };
            });
        }

        newFormData.append("variants", JSON.stringify(newVariants));
        for (let i = 0; i < images.length; i++) {
            newFormData.append(`image${i}`, images[i]);
        }
        newFormData.append("name", formData?.name);
        newFormData.append("description", formData?.description);
        newFormData.append("baseprice", formData?.baseprice);
        newFormData.append("discountprice", formData?.discountprice);
        newFormData.append("category", formData?.category);
        newFormData.append("frame",formData?.frame);
        newFormData.append("sizeguide",sizeGuideImage)
        
        try {
            setLoading(true)
            const res = await addNewProduct(newFormData);
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.error(error);
        }
    };

    const handleVarientChange = (e: any, index: number) => {
        setVariants(
            variants?.map((obj, i) => {
                if (index == i) {
                    return { ...obj, [e.target.name]: e.target.value };
                }
                return obj;
            })
        );
    };

    const handleBaseChange = (e: any, index: number) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name == "default") {
            setVariants(
                variants?.map((obj, i) => {
                    if (i == index) {
                        return { ...obj, base: { ...obj.base, ["default"]: value, sleeping: "", standing: "" } };
                    }

                    return obj;
                })
            );
        }

        if (name == "standing") {
            setVariants(
                variants?.map((obj, i) => {
                    if (i == index) {
                        return { ...obj, base: { ...obj.base, ["standing"]: value, default: "" } };
                    }

                    return obj;
                })
            );
        }

        if (name == "sleeping") {
            setVariants(
                variants?.map((obj, i) => {
                    if (i == index) {
                        return { ...obj, base: { ...obj.base, ["sleeping"]: value, default: "" } };
                    }

                    return obj;
                })
            );
        }
    };

    const changeCategory = (data: string) => {
      
        setFormData({ ...formData, category: data });
    };

    const changeFrame = (data:string)=>{
        setFormData({...formData,frame:data})
    }
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {baseModal && (
                <NestedModal
                    variants={variants}
                    baseType={baseType}
                    setVariants={setVariants}
                    baseIndex={baseIndex}
                    setBaseModal={setBaseModal}
                    base={base}
                />
            )}
            <div className="w-full max-w-3xl bg-white dark:bg-gray-900 p-8 shadow-2xl rounded-xl overflow-y-auto max-h-[90vh]">
                <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6 text-center">Add New Product</h2>

                <form className="space-y-8" onSubmit={handleSubmit}>
                    {/* Product Details */}
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Product Details</h3>
                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleInputChange}
                                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                rows={4}
                            />
                        </div>
                    </section>

                    {/* Price & Category */}
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Price & Category</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Actual Price</label>
                                <input
                                    type="number"
                                    name="baseprice"
                                    value={formData.baseprice}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                />
                            </div>
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Discount Price</label>
                                <input
                                    type="number"
                                    name="discountprice"
                                    value={formData.discountprice}
                                    onChange={handleInputChange}
                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                />
                            </div>
                        </div>

                        {/* category */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Category</label>
                                <select
                                    onChange={(e) => changeCategory(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option></option>
                                    {category?.map((category: ICategory) => {
                                        return <option value={category?._id}>{category?.name}</option>;
                                    })}
                                </select>
                            </div>
                       
                   
                        </div>
                    </section>
                    {/* Price and frames */}
                    <section>
                        
                       

                        {/* category */}
                        
                            <div>
                                <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Frames</label>
                                <select
                                    onChange={(e) => changeFrame(e.target.value)}
                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                >
                                    <option></option>
                                    {frames?.map((frame: IFrame) => {
                                        return <option value={frame?._id}>{frame?.frameName} <img className="w-[35px] h-[35px]" src={frame?.image} alt="" /></option>;
                                    })}
                                </select>
                            </div>
                         
                   
                        
                    </section>

                    <section>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                            Variants {/* Orientation Checkbox */}
                            <div className="flex items-center space-x-2">
                                <input type="checkbox" checked={orientation} onChange={(e) => setOrientation(e.target.checked)} className="w-5 h-5" />
                                <label className="text-gray-700 dark:text-gray-300 text-lg">Enable Orientation</label>
                            </div>
                        </h3>

                        {variants.map((variant, index) => (
                            <div className="grid grid-cols-1 bg-gray-100 p-5 rounded-lg sm:grid-cols-3 gap-4 items-end mb-4">
                                {/* Size Input */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Size</label>
                                    <input
                                        type="text"
                                        value={variant.size}
                                        onChange={(e) => handleVarientChange(e, index)}
                                        placeholder="e.g. 50x50x50"
                                        name="size"
                                        className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Price Input */}
                                <div>
                                    <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Price</label>
                                    <input
                                        type="number"
                                        value={variant.price}
                                        name="price"
                                        onChange={(e) => handleVarientChange(e, index)}
                                        className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                    />
                                </div>

                                {/* Conditional Base Input */}
                                {orientation ? (
                                    <>
                                        {/* Standing Base */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Standing Base</label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    name="standing"
                                                    value={variant?.base?.standing || ""}
                                                    onChange={(e) => handleBaseChange(e, index)}
                                                    placeholder="e.g. 100x100x70"
                                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setBaseIndex(index);
                                                        setBaseModal(true);
                                                        setBaseType("standing");
                                                    }}
                                                    className="px-4 py-2  text-black rounded-md hover:bg-gray-200 active:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
                                                >
                                                    Add+
                                                </button>
                                            </div>
                                        </div>

                                        {/* Sleeping Base */}
                                        <div>
                                            <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Sleeping Base</label>
                                            <div className="flex">
                                                <input
                                                    type="text"
                                                    name="sleeping"
                                                    value={variant?.base?.sleeping || ""}
                                                    onChange={(e) => handleBaseChange(e, index)}
                                                    placeholder="e.g. 120x80x50"
                                                    className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                                />
                                                <button
                                                    onClick={() => {
                                                        setBaseIndex(index);
                                                        setBaseModal(true);
                                                        setBaseType("sleeping");
                                                    }}
                                                    className="px-4 py-2  text-black rounded-md hover:bg-gray-200 active:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
                                                >
                                                    Add+
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    /* Single Base Input */
                                    <div>
                                        <label className="block text-gray-700 dark:text-gray-300 text-lg mb-2 text-left">Base</label>
                                        <div className="flex">
                                            <input
                                                type="text"
                                                name="default"
                                                value={variant?.base?.default || ""}
                                                onChange={(e) => handleBaseChange(e, index)}
                                                placeholder="e.g. 100x100x70"
                                                className="w-full p-4 border border-gray-300 rounded-lg dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                                            />
                                            <button
                                                onClick={() => {
                                                    setBaseIndex(index);
                                                    setBaseModal(true);
                                                    setBaseType("default");
                                                }}
                                                className="px-4 py-2 b text-black rounded-md hover:bg-gray-200 active:bg-gray-200 focus:outline-none focus:ring focus:ring-blue-300"
                                            >
                                                Add+
                                            </button>
                                        </div>
                                    </div>
                                )}

                                {/* Remove Variant Button */}
                                <button onClick={() => removeVariant(index)} type="button" className="text-red-500 text-lg">
                                    ✖ Remove
                                </button>
                            </div>
                        ))}

                        {/* Add Variant Button */}
                        <button onClick={addVariant} type="button" className="w-full bg-blue-600 text-white py-3 rounded-lg mt-4">
                            + Add Variant
                        </button>
                    </section>

                    {/* Images */}
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Product Guide</h3>
                        <input type="file"  onChange={(e:any)=>setSizeGuideImage(e.target.files[0])} className="w-full p-4 border border-gray-300 rounded-lg" />
                        <div className="flex space-x-4 mt-4">
                            
                                {sizeGuideImage&&<img src={URL.createObjectURL(sizeGuideImage)} alt="Product" className="w-24 h-24 object-cover rounded-lg border" />}
                       
                        </div>
                    </section>
                    <section>
                        <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Product Images</h3>
                        <input type="file" multiple onChange={handleImageUpload} className="w-full p-4 border border-gray-300 rounded-lg" />
                        <div className="flex space-x-4 mt-4">
                            {images.map((img, index) => (
                                <img key={index} src={URL.createObjectURL(img)} alt="Product" className="w-24 h-24 object-cover rounded-lg border" />
                            ))}
                        </div>
                    </section>

                    {/* Submit */}
                    <section>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-4 rounded-lg">
                          {loading? <ButtonLoading/>: 'Add Product'}
                        </button>
                    </section>
                </form>
            </div>
        </div>
    );
};

export default AddProductForm;
