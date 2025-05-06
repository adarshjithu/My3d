import React from "react";

function ImageViewModal({ setImageViewModal, image }: { setImageViewModal: any; image: string }) {
    return (
        <div onClick={()=>setImageViewModal(false)} className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <img
                className="h-auto max-w-lg transition-all duration-300 rounded-lg cursor-pointer filter grayscale hover:grayscale-0"
                src={image}
                alt="image description"
            />
        </div>
    );
}

export default ImageViewModal;
