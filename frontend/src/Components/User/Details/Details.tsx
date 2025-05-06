import React from "react";
import { FaTrophy, FaPaintBrush, FaShieldAlt } from "react-icons/fa"; // Import icons

interface ProductDetailProps {
  heading: string;
  description: string;
  icon: any
}

const ProductDetail: React.FC<ProductDetailProps> = ({ heading, description, icon }) => {
  return (
    <div className="flex-1 p-6 ">
      <div className="flex items-center mb-4">
        <div className="text-3xl text-primary mr-3">{icon}</div> {/* Icon on the left */}
        <h2 className="text-2xl font-semibold text-gray-800">{heading}</h2>
      </div>
      <p className="text-gray-600 text-lg">{description}</p>
    </div>
  );
};

const ProductDetails = () => {
  return (
    <div className="flex flex-wrap justify-between gap-8 max-w-7xl mx-auto p-6">
      <ProductDetail
        heading="Top Quality Craftsmanship"
        description="Each 3D crystal cube is meticulously crafted using high-grade crystal, ensuring flawless clarity and precision."
        icon={<FaTrophy />}
      />
      <ProductDetail
        heading="Customizable Designs"
        description="Personalize your crystal with any image or memory, turning it into a unique, one-of-a-kind keepsake."
        icon={<FaPaintBrush />}
      />
      <ProductDetail
        heading="Durable & Long-Lasting"
        description="Our 3D crystals are built to last, preserving your cherished moments for a lifetime without fading or losing their brilliance."
        icon={<FaShieldAlt />}
      />
    </div>
  );
};

export default ProductDetails;
