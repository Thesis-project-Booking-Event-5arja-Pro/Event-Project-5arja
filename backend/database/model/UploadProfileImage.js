const conn = require("../../database/index");

module.exports = {
  UploadProfileImage: async (file) => {
    try {
      // Upload the image to Cloudinary
      const uploadResult = await cloudinary.uploader.upload(file);
      console.log(uploadResult);
      return uploadResult.secure_url;
    } catch (error) {
      throw error;
    }
  },
};
