import { v2 as cloudinary } from "cloudinary";
import { config } from "dotenv";
config();

cloudinary.config({
  cloud_name: "dua8pltfu",
  api_key: "285521845195157",
  api_secret: "iln9xoKR4BDS-MRMpFav3xXvUvQ",
});
export default cloudinary;

