import { X } from "lucide-react";

export default function SizeGuideModal({ image,setGuideModal }: any) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg w-96 shadow-lg relative">
        <button 
            onClick={()=>setGuideModal(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={24} />
        </button>
        <h2 className="text-lg font-semibold text-center mb-2">Size Guide</h2>
        <img 
          src={image} 
          alt="Size Guide" 
          className="w-full h-auto rounded-md"
        />
      </div>
    </div>
  );
}