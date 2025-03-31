import { useEffect, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import DocumentUpload from "../../components/DocumentUpload";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchUserDocuments } from "../../redux/actions/userActions";

const UserDocuments = () => {

  const dispatch = useDispatch();
  const { userId } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const authToken = token || localStorage.getItem("token");
  const { documents } = useSelector((state) => state.users);
  const [showYearWiseModal, setShowYearWiseModal] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  console.log("11111111111111-userId",userId)

  useEffect(() => {
    if (userId && authToken) {
      dispatch(fetchUserDocuments(userId, authToken));
    }
  }, [dispatch, userId, authToken]);

  const handleViewYearWiseData = (doc) => {
    setSelectedDocument(doc);
    setShowYearWiseModal(true);
  };

  const handleDeleteDocument = async (docId) => {
    const res = await dispatch(deleteDocument(docId, authToken));
    if (res.success) {
      toast.success("Document deleted successfully!", { autoClose: 2000 });
      await dispatch(fetchUserDocuments(userId, authToken));
    }
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const documentList = documents[userId]?.data || [];
  const totalPages = Math.ceil(documentList.length / itemsPerPage);
  const currentDocuments = documentList.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <>
      <Navbar />
      <ToastContainer position="top-right" />
      <div className="main-content">
        <div className="table-wrapper">
          <div className="table-title d-flex justify-content-between">
            <h2>Manage User Documents</h2>
            <Button variant="success" onClick={() => setShowUploadModal(true)}>
              Add New Document
            </Button>
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Document Name</th>
                <th>ID</th>
                <th>Uploaded Date</th>
                <th>Status</th>
                <th>Year-wise Data</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
            {currentDocuments?.length > 0 ? (
                      currentDocuments.map((doc) => (
                <tr key={doc._id}>
                  <td>{doc.name}</td>
                  <td>{doc._id}</td>
                  <td>{new Date(doc.uploadedAt).toLocaleDateString()}</td>
                  <td>
                    {doc.hasYearWiseData ? (
                      <span className="badge bg-success">Available</span>
                    ) : (
                      <span className="badge bg-secondary">Not Available</span>
                    )}
                  </td>
                  <td>
                    {doc.hasYearWiseData ? (
                      <Button variant="info" size="sm" onClick={() => { setSelectedDocument(doc); setShowYearWiseModal(true); }}>
                        View
                      </Button>
                    ) : (
                      <span className="text-muted">No Data</span>
                    )}
                  </td>
                  <td>
                    <Button variant="info" size="sm" onClick={() => window.open(doc.fileUrl, "_blank")}>
                      View PDF
                    </Button>
                    <a href={doc.fileUrl} download className="btn btn-primary ms-2 p-1 text-white" style={{fontSize:"13px"}}>
                      Download
                    </a>
                  </td>
                </tr>
               ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No documents found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{currentDocuments.length}</b> out of <b>{documentList.length}</b>
                  </div>
                  <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                      <a href="#" className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                        Previous
                      </a>
                    </li>
                    {[...Array(totalPages)].map((_, index) => (
                      <li key={index} className={`page-item ${currentPage === index + 1 ? "active" : ""}`}>
                        <a href="#" className="page-link" onClick={() => handlePageChange(index + 1)}>
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                      <a href="#" className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                        Next
                      </a>
                    </li>
                  </ul>
                </div>
        </div>
      </div>

      <DocumentUpload show={showUploadModal} handleClose={() => setShowUploadModal(false)} userId={userId}/>

      <Modal show={showYearWiseModal} onHide={() => setShowYearWiseModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Year-wise Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedDocument?.yearWiseData?.length ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Year</th>
                  <th>Uploaded Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {selectedDocument.yearWiseData.map((yearData) => (
                  <tr key={yearData.id}>
                    <td>{yearData.yearRange}</td>
                    <td>{new Date(yearData.uploadedAt).toLocaleDateString()}</td>
                    <td>
                      <Button variant="info" size="sm" className="text-white" onClick={() => window.open(yearData.fileUrl, "_blank")}>
                        View
                      </Button>
                      <a href={yearData.fileUrl} download className="btn btn-primary text-white py-1">
                        Download
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No year-wise data available.</p>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UserDocuments;
