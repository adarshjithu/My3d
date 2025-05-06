"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPublicIdFromUrl = getPublicIdFromUrl;
function getPublicIdFromUrl(url) {
    try {
        // Extract the part after "/upload/"
        const parts = url.split("/upload/")[1].split("/");
        // Check if the first part is a version number (e.g., v1740728694)
        if (parts[0].startsWith("v") && !isNaN(Number(parts[0].substring(1)))) {
            parts.shift(); // Remove version number
        }
        // Join the remaining parts to get the public ID
        const publicIdWithExtension = parts.join("/");
        // Remove the file extension
        return publicIdWithExtension.replace(/\.[^/.]+$/, "");
    }
    catch (error) {
        console.error("Invalid Cloudinary URL:", error);
        return null;
    }
}
// Example usage
