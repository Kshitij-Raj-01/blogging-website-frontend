import axios from 'axios';

export const uploadImage = async (img) => {
    try {
        // Get the upload URL from the server
        const response = await axios.get(`${import.meta.env.VITE_SERVER_DOMAIN}/get-upload-url`);

        // Check if the response contains the upload URL
        if (!response.data || !response.data.uploadURL) {
            throw new Error("Failed to retrieve upload URL from server.");
        }

        const { uploadURL } = response.data;

        // Upload the image to the provided upload URL
        const uploadResponse = await axios({
            method: "PUT",
            url: uploadURL,
            headers: { "Content-Type": img.type }, // Use the image type for correct content-type
            data: img
        });

        // Check if the upload was successful
        if (uploadResponse.status !== 200) {
            throw new Error("Image upload failed: " + uploadResponse.statusText);
        }

        // Return the URL of the uploaded image (remove query params if present)
        return uploadURL.split("?")[0];
    } catch (error) {
        console.error("Error uploading image: ", error.message); // Log the error message for debugging
        throw error; // Re-throw the error for handling in the calling function
    }
};