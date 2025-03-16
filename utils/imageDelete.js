import fs from "fs";
import path from "path";

export const deleteImage = async (fileName) => {
    const filePath = path.join(process.cwd(), fileName);

    try {
        fs.unlinkSync(filePath);
        console.log(`Image deleted: ${fileName}`);
    } catch (err) {
        console.error(`Error deleting image: ${fileName}`, err);
    }
};

