import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import { Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import * as Buttons from "../../web/Buttons";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const PdfViewer = (props) => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
    setPageNumber(1);
  };

  const { openPdf, handleClosePdf, pdfData, title } = props;

  useEffect(() => {}, [pdfData]);

  const encoder = new TextEncoder();
  const bytes = encoder.encode(pdfData);

  const base64Data = `JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9GaWx0ZXIvRmxhdGVEZWNvZGUvTGVuZ3RoIDIwNDY+PnN0cmVhbQp4nM1Zy3rbthLe6ylm01b9atO4ELx4R0u2rNiWXElxzumXDSPRFhuJdCgqqd+mj3oGICmRBKikZ9UkThjin8FgMPPPAPzSu1r0CHiEwGKFD+ecWKJ89P3qoRpkvEIx+wBj/PDIaflAvWrw8MY96qXF4/Wi93vvi/ph8A5HRviM5lAg+JsCE8RyBbiukPht7+KGAsWn515/EfwHxpOn6Xhw/eviT6mpJieosJgNrmcf5XwlNs3ilyTcwCB9fSvlvvSIEpuNepwA/hE2ARd/sqg31+yTzvkmgY4rH5lLAL2koNUQSnMHnykXwHl9zMY3XWNKjvBuuY4xKVfYYpbTxxou5gxchzad9OH6/nwwnQD+LGbTe/gZ5h/Gi8Ht6DqY6c6WGgRvapjfTh9hMrU4jGbX1xN4DGZ3MJ8OxteL/57BLHg3nQeT4AwWgdRX12TbUlMfnoLhKHg4g6swCXefwyRfh2cw2v8ZZmF+BtwTghGzLVy0N/0B4BLgN5/6QnjC5cynZlHmNgXfzya4CpQ2w6nXnmk0X4wnF+/HEzUjs4PBw+O163D/jv7hdyghLdflYR7BJNxGSsfo/btgFizMsoS2DbjehvHGbDAx7PQ4+ZrGS5wutRobIbG2WyjvE6Zrs7mraxui5au6HoU66OH0nLJzRhjvsI55LX3RJv4aZW9oXh5p9tEyufsd1rW1PaSrCBZRtoXpMzyGb9soyc2GOH7Lq/P96+smjrLzWfRsnk0TmebrKAPER1mULKOP/d3HXw+EYyQU4R0IhWgJ7hCVwlS+aid4x5iSs/0y+Y2SnaNKlvvdkh1jSo55p+bsHJWyRx/YnpmsHIc1HX21f4uyX3bGBHEEbyfIU/RXmpjBNmuDt/vtpzA2ozntSv1LCObDm5FZjGmT1BL+Eh7CNTLcbp1noVme2k3px02I+Zs+g4rR8O1HdBCNIQdpkofLHB6jbJcmHXwnfNcsdQm0K6f17VK7BdNshelR0o4hndpiB2oxTCE0FhxGu9cwX65hmC73Ms9xpo6JTMI11gE5scFINbHd5r9y2mgF+TpL9y9rA8GoWQ2SeZyEeWyMTTlX0ZU1PBlvNnLj7+PVKk5eLu5n57PZCZfqGh7SPM3gKVzHS2yJjJJqbtYqUYpEcebKU1rtcIjT5OYuyhOyNmAZxe1mzc5FvSvGGSYmcVsA5hPL8UuEIyzaBnAhLM`;

  const decodedData = atob(base64Data);

  const base64ToDataUri = (base64Data) => {
    return `data:application/pdf;base64,${base64Data}`;
  };

  // Now, you can use the demoData variable in your code.

  return (
    <Dialog open={openPdf} maxWidth="lg">
      <DialogTitle>
        <div className="dialogheaderstyle">
          <Typography variant="h5">{title}</Typography>
          <Buttons.CloseButton onClick={handleClosePdf} />
        </div>
      </DialogTitle>
      <DialogContent>
        <div style={{ width: "1000px", height: "700px" }}>
          <iframe
            title="PDF Viewer"
            width="100%"
            height="100%"
            src={base64ToDataUri(pdfData)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfViewer;
