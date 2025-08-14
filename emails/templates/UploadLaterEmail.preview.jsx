import { UploadLaterEmail } from "./upload-later";

const UploadLaterEmailPreview = UploadLaterEmail;

UploadLaterEmailPreview.PreviewProps = {
  email: "test@example.com",
  uploadLink: "https://example.com/questionnaire/valuation?qid=689d3f472be83f8645486b6a",
};

export default UploadLaterEmailPreview;
