import fs from "fs";
import { parse } from "csv-parse";
import multer from "multer";
import client from "../db/client.js";

// Multer is a middleware for handling multipart/form-data, which is primarily used for uploading files.
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./import/files");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
});

// Parse the CSV file
const parser = parse({ delimiter: "," }, async function (err, data) {
    // insert each row int the database
    data.forEach((element) => {
        let result = client.resolvers.Mutation.createClient(null, {
            name: element[0],
            phone_number: element[1],
            email: element[2],
            address: element[3],
            notes: element[10],
        });
        return result;
    });
});

export const upload = multer({ storage: storage });

// Read the CSV file
export const csvLoader = (req) => {
    fs.createReadStream(req.file.path).pipe(parser);
};
