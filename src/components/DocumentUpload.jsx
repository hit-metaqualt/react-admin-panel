import { useState } from "react";
import { Button, Modal, Form, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addUserDocument, fetchUserDocuments } from "../redux/actions/userActions"; 
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DocumentUpload = ({ show, handleClose, userId }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { documents } = useSelector((state) => state.users);
  const authToken = token || localStorage.getItem("token");

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Select Document Name");

  const handleFileChange = (e) => setFile(e.target.files[0]);
  const handleNameChange = (e) => setName(e.target.value);
  const handleYearChange = (e) => setYear(e.target.value);
  const handleDropdownChange = (e) => {
    const selected = e.target.value;
    setSelectedOption(selected);
    if (selected !== "Other" && selected !== "Select Document Name") {
      setName(selected);
    } else if (selected === "Other") {
      setName("");
    }
  };

  const resetForm = () => {
    setFile(null);
    setName("");
    setYear("");
    setSelectedOption("Select Document Name");
  };

  const handleUpload = async () => {
    if (!file || !name) {
      setError("Please provide a document name and select a file.");
      toast.error("Please provide a document name and select a file.", { autoClose: 2000 });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("name", name);
      formData.append("file", file);
      if (year) formData.append("year", year);

      const result = await dispatch(addUserDocument(formData, authToken));

      if (result.success) {
        await dispatch(fetchUserDocuments(userId, authToken));
        toast.success("Document uploaded successfully!", { autoClose: 2000 });
        resetForm();
        handleClose();
      } else {
        setError(result.message || "Failed to upload document. Please try again.");
        toast.error(result.message || "Failed to upload document.", { autoClose: 2000 });
      }
    } catch (err) {
      setError("Failed to upload document. Please try again.");
      toast.error("Failed to upload document. Please try again.", { autoClose: 2000 });
    } finally {
      setLoading(false);
    }
  };

  const userDocuments = documents[userId]?.data || [];
  const documentNames = [...new Set(userDocuments.map((doc) => doc.name))];

  return (
    <Modal show={show} onHide={() => {
      resetForm();
      handleClose();
    }}>
      <Modal.Header closeButton>
        <Modal.Title>Upload New Document</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group>
            <Form.Label className="mb-1">Document Name</Form.Label>
            <Form.Control className="mb-3"
            as="select" value={selectedOption} onChange={handleDropdownChange}>
              <option value="Select Document Name" disabled>Select Document Name</option>
              {documentNames.map((doc, index) => (
                <option key={index} value={doc}>{doc}</option>
              ))}
              <option value="Other">Other</option>
            </Form.Control>
            {selectedOption === "Other" && (
              <Form.Control className="mb-3" type="text" value={name} onChange={handleNameChange} placeholder="Enter document name" required />
            )}
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-1">Select Document</Form.Label>
            <Form.Control type="file" className="mb-3" onChange={handleFileChange} required />
          </Form.Group>
          <Form.Group>
            <Form.Label className="mb-1">Year (Optional)</Form.Label>
            <Form.Control className="mb-3" type="text" value={year} onChange={handleYearChange} placeholder="e.g. 2019-2021" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => {
          resetForm();
          handleClose();
        }} disabled={loading}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpload} disabled={loading || !name || !file}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DocumentUpload;
