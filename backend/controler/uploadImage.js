const cloudinary = require("cloudinary").v2;
const fs = require("fs");

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const { file } = req;
     

      // Configure Cloudinary with your credentials
      cloudinary.config({
        cloud_name: "dzgsr9fgg",
        api_key: "176655669282821",
        api_secret: "QJz5EoeOzHe8qkhr4AEx7ATfaCQ",
      });
      

      const filePath = file.path;
      const uniqueFilename = new Date().toISOString();

      cloudinary.uploader.upload(
        filePath,
        {
          public_id: `Workers/${uniqueFilename}`,
          tags: "Workers",
        },
        function (err, result) {
          if (err) {
            
            return res.send(err);
          }

          fs.unlinkSync(filePath);
        console.log(result.url);
          res.json(result.url);
        }
      );
    } catch (error) {
      
      res.status(500).send("Error uploading file");
    }
  },
};
