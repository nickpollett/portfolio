import axios from "axios";
import { useState } from "react";

const endpoint = import.meta.env.VITE_API_ENDPOINT;

// data upload and import item
export default function DataImport() {
    const [fileName, setFileName] = useState(null);
    const [status, setStatus] = useState(null);

    // upload file to server
    const handleSubmit = async (e) => {
        let formData = new FormData();
        formData.append("file", fileName.data, fileName.data.name);
        const response = await fetch(endpoint + "/file", {
            method: "POST",
            body: formData,
        });
        if (response) setStatus(response.statusText);
    };

    // handle file selection
    const handleFileChange = (e) => {
        const csvfile = {
            preview: URL.createObjectURL(e.target.files[0]),
            data: e.target.files[0],
        };
        setFileName(csvfile);
    };

    return (
        <div className="grid grid-cols-1">
            <h1 className="my-2 text-bold">Import Clients</h1>
            <div>
                <div className="m-1 p-1">
                    <input
                        onChange={handleFileChange}
                        type="file"
                        className="w-80 m-1"
                    />
                    <button
                        onClick={(event) => handleSubmit(event.target)}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-2 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Import
                    </button>
                </div>
            </div>
        </div>
    );
}
