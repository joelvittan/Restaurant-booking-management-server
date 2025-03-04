import fs from "fs";
import path from "path";

export const deleteImage = async (fileName) => {
    const filePath = path.join(process.cwd(), fileName);
    try {
        console.log(filePath);
        fs.unlinkSync(filePath);
    } catch (err) {
        console.error(`Error deleting image: ${fileName}`, err);
    }
};

