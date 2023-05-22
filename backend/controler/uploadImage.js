const cloudinary = require("cloudinary").v2;
const fs = require("fs");

module.exports = {
  uploadImage: async (req, res) => {
    try {
      const { file } = req;


      // SEND FILE TO CLOUDINARY
      cloudinary.config({
        cloud_name: "decy2t1yc",
        api_key: "797587299415564",
        api_secret: "rqxN_N9DRijkn_qF-rqW1zag6d8",

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
