import datauriparser from "datauri/parser.js";
import path from "path";

const parser = new datauriparser();

const getDataURI = (file) => {
  if (!file || !file.buffer) {
    throw new Error("File buffer is missing.");
  }

  const extName = path.extname(file.originalname).toLowerCase(); // Ensure lowercase for consistent matching
  
  // You can validate the extension here if needed (example: allow only images)
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];
  if (!allowedExtensions.includes(extName)) {
    throw new Error("Invalid file extension.");
  }
  
  // Convert to Data URI
  return parser.format(extName, file.buffer).content;
};

export default getDataURI;
