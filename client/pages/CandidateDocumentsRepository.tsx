import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, User, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DocumentSection {
  id: string;
  title: string;
  uploaded: boolean;
  file?: File;
}

export default function CandidateDocumentsRepository() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<DocumentSection[]>([
    { id: "offer-letter", title: "Signed Offer Letter", uploaded: false },
    { id: "address-proofs", title: "Address Proofs", uploaded: false },
    { id: "identification-proofs", title: "Identification Proofs", uploaded: false },
    { id: "employment-exit", title: "Last Employment Exit Document", uploaded: false },
    { id: "pay-slips", title: "Last 3 Months Pay Slips", uploaded: false },
    { id: "bank-statement", title: "Last 6 Months Bank Statement", uploaded: false },
  ]);

  const handleFileUpload = (documentId: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setDocuments(prev => prev.map(doc => 
        doc.id === documentId 
          ? { ...doc, uploaded: true, file }
          : doc
      ));
    }
  };

  const handleSendFiles = () => {
    const uploadedDocs = documents.filter(doc => doc.uploaded);
    console.log("Sending files:", uploadedDocs);
    alert(`${uploadedDocs.length} files ready to send!`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-medium text-gray-600">AI2AIM WORKSPACE</h1>
          </div>
          
          <h2 className="text-lg font-semibold text-blue-600">CANDIDATE DOCUMENTS REPOSITORY</h2>
          
          <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="space-y-4">
          {documents.map((document) => (
            <Card key={document.id} className="border border-gray-300">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-800">
                    {document.title}
                  </h3>
                  
                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${document.id}`}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => handleFileUpload(document.id, e)}
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    />
                    <Button
                      variant="outline"
                      className={`text-xs px-4 py-2 ${
                        document.uploaded
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      }`}
                    >
                      {document.uploaded ? (
                        <>
                          <Upload className="w-3 h-3 mr-1" />
                          Uploaded
                        </>
                      ) : (
                        "Upload Here"
                      )}
                    </Button>
                  </div>
                </div>
                
                {document.uploaded && document.file && (
                  <div className="mt-2 text-xs text-gray-500">
                    File: {document.file.name} ({(document.file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Send Files Button */}
        <div className="flex justify-center mt-8">
          <Button
            onClick={handleSendFiles}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-sm font-medium"
            disabled={!documents.some(doc => doc.uploaded)}
          >
            SEND FILES
          </Button>
        </div>
      </div>
    </div>
  );
}
