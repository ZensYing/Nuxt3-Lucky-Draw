declare module 'pdfjs-dist/build/pdf.js' {
    export const GlobalWorkerOptions: {
      workerSrc: string;
    };
  
    export function getDocument(params: { data: Uint8Array | Buffer }): {
      promise: Promise<PDFDocumentProxy>;
    };
  
    export interface PDFDocumentProxy {
      numPages: number;
      getPage(pageNumber: number): Promise<PDFPageProxy>;
    }
  
    export interface PDFPageProxy {
      getTextContent(): Promise<TextContent>;
    }
  
    export interface TextContent {
      items: TextItem[];
    }
  
    export interface TextItem {
      str: string;
    }
  }
  
  declare module 'pdfjs-dist/build/pdf.worker.entry';