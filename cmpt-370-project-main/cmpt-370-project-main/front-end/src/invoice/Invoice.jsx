import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { request, gql } from "graphql-request";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import { useParams } from "react-router-dom";

const endpoint = import.meta.env.VITE_API_ENDPOINT;
const serverUrl = import.meta.env.VITE_APP_SERVER_URL;

// Get invoice by id
function getInvoice(id) {
    return useQuery(["invoice", id], async () => {
        const data = await request(
            endpoint,
            gql`
              query{
                  invoice(id: "${id}"){
                      id
                      amount
                      pdf
                }
              }`,
        );
        return data;
    });
}

// Invoice component view
export default function Invoice({ ID }) {
    let { id } = useParams();
    if (id === undefined) {
        id = ID;
    }

    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

    const { status, data, error, isFetching, refetch } = getInvoice(id);

    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    const [pdf, setPdf] = useState("");

    useEffect(() => {
        if (data?.invoice?.pdf)
            setPdf(serverUrl + data?.invoice.pdf.replace(".", ""));
    }, [data]);

    function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div>
            <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} scale={0.8} />
            </Document>
        </div>
    );
}
