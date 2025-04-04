declare module 'pdf-parse' {
    interface PDFData {
      text: string;
      numpages: number;
      numrender: number;
      info: any;
      metadata: any;
      version: string;
    }
  
    export default function pdfParse(dataBuffer: Buffer): Promise<PDFData>;
  }