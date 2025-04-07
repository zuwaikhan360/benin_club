import { useState } from 'react';
import Loading from './Loading';

interface PdfUploadProps {}
function PdfUpload({}: PdfUploadProps) {
  const [newsletterUrl, setNewsletterUrl] = useState('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.value;
    setNewsletterUrl(selectedFile);
  };

  function isValidGoogleDriveLink(link: string) {
    // Regular expression to match Google Drive file links
    const googleDriveRegex =
      /^https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/?/;

    // Check if the link matches the regex pattern
    return googleDriveRegex.test(link);
  }

  const handleUpload = async () => {
    try {
      const isValid = isValidGoogleDriveLink(newsletterUrl);
      if (!isValid) {
        setUploadError('Invalid link ');
        return;
      }
      setLoading(true);
      const response = await fetch('/api/newsletter/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newsletterUrl }),
      });
      if (!response.ok) {
        throw new Error('Unable to upload newsletter url.');
      }
      setUploadSuccess(true);
      setNewsletterUrl('');
      setLoading(false);
    } catch (error) {
      console.error('Error uploading newsletter:', error);
      setUploadError('Upload failed');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Enter Url to newsletter</h2>
      <input
        type="text"
        value={newsletterUrl}
        onChange={handleFileChange}
        className="py-2 px-2 w-full bg-red bg-opacity-20 mb-3 rounded-md focus:outline-none focus:text-gray-900"
      />
      {loading ? (
        <Loading />
      ) : (
        <button
          onClick={handleUpload}
          className="bg-red text-white px-4 py-2 rounded-lg hover:bg-pink"
        >
          Upload
        </button>
      )}
      {uploadError && <p className="text-red mt-2">Error: {uploadError}</p>}
      {uploadSuccess && <p className="text-green mt-2">Upload Success</p>}
    </div>
  );
}

export default PdfUpload;
