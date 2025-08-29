import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [showConfirmModal, setShowConfirmModal] = useState(false);
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
    setShowConfirmModal(true);
  };

  const handleConfirmSend = () => {
    const uploadedDocs = documents.filter(doc => doc.uploaded);
    console.log("Sending files:", uploadedDocs);
    alert(`${uploadedDocs.length} files sent successfully!`);
    setShowConfirmModal(false);
  };

  const handleCancelSend = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-3 py-2">
        <div className="flex items-center justify-between max-w-3xl mx-auto">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              onClick={() => navigate(-1)}
              className="p-1 h-6 w-6"
            >
              <ArrowLeft className="w-3 h-3" />
            </Button>
            <h1 className="text-xs font-medium text-gray-600">AI2AIM WORKSPACE</h1>
          </div>

          <h2 className="text-sm font-semibold text-blue-600">CANDIDATE DOCUMENTS REPOSITORY</h2>

          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
            <User className="w-3 h-3 text-gray-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-3 py-4">
        <div className="space-y-2">
          {documents.map((document) => (
            <Card key={document.id} className="border border-gray-300">
              <CardContent className="p-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-medium text-gray-800">
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
                      className={`text-xs px-2 py-1 h-6 ${
                        document.uploaded
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-gray-50 text-gray-600 border-gray-300"
                      }`}
                    >
                      {document.uploaded ? (
                        <>
                          <Upload className="w-2 h-2 mr-1" />
                          Uploaded
                        </>
                      ) : (
                        "Upload Here"
                      )}
                    </Button>
                  </div>
                </div>
                
                {document.uploaded && document.file && (
                  <div className="mt-1 text-xs text-gray-500">
                    File: {document.file.name} ({(document.file.size / 1024 / 1024).toFixed(2)} MB)
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Send Files Button - Always Visible */}
        <div className="flex justify-center mt-4 sticky bottom-4 bg-white p-2 border border-gray-200 rounded-lg shadow-lg">
          <Button
            onClick={handleSendFiles}
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-2 text-xs font-medium h-8"
            disabled={!documents.some(doc => doc.uploaded)}
          >
            SEND FILES
          </Button>
        </div>
      </div>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <DialogContent className="max-w-sm bg-gray-100 border-2 border-gray-300">
          <DialogHeader className="text-center">
            <DialogTitle className="text-sm font-bold text-purple-600 mb-2">
              CONFIRMATION
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-2">
            <p className="text-xs text-gray-800 mb-4">
              Do you want to send the files?
            </p>

            <div className="flex justify-center gap-4">
              <Button
                onClick={handleConfirmSend}
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-1 text-xs font-medium h-6"
              >
                YES
              </Button>
              <Button
                onClick={handleCancelSend}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-1 text-xs font-medium h-6"
              >
                NO
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
