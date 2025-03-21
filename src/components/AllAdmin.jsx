import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdmins } from "../redux/actions/superAdminActions"; // Assuming this is your API action

const AllAdmin = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
    const { user, token } = useSelector((state) => state.auth);
  
  const dispatch = useDispatch();
  
  // Getting data from Redux store
  const { admins ,loading, error } = useSelector((state) => state.superAdmin);



  useEffect(() => {
    const superAdminId = user?.id; 
    dispatch(fetchAdmins(superAdminId));
  }, [dispatch]);



 

  return (
    <>
      <div id="content">
        <div className="main-content">
          <div className="row">
            <div className="col-md-12">
              <div className="table-wrapper">
                <div className="table-title">
                  <div className="row">
                    <div className="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                      <h2 className="ml-lg-2">Manage Admin</h2>
                    </div>
                    <div className="col-sm-6 p-0 flex justify-content-lg-end justify-content-center">
                      <Button variant="success" onClick={() => setShowAddModal(true)}>
                        Add New Admin
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Displaying Loading State */}
                {loading && <div>Loading admins...</div>}
                {/* {error && <div style={{ color: "red" }}>{error}</div>} */}

                {/* Display Admin Table */}
                <table className="table table-striped table-hover">
  <thead>
    <tr>
      <th>User Name</th>
      <th>Email</th>
      <th>Role</th>
      <th>Status</th>
      <th>Allowed Devices</th>
      <th>Actions</th>
    </tr>
  </thead>
  <tbody>
    {admins?.admins && admins?.admins?.length > 0 ? (
      admins?.admins?.map((admin) => (
        <tr key={admin.id}>
          <td>
            <Link to={`/users/${admin.id}`}>{admin.username}</Link>
          </td>
          <td>{admin.email}</td>
          <td>{admin.role}</td>
          <td>{admin.status}</td>
          <td>{admin.allowedDevices}</td>
          <td>
            <a className="edit" onClick={() => setShowEditModal(true)}>
              <i className="material-icons" title="Edit">✏️</i>
            </a>
            <a className="delete" onClick={() => setShowDeleteModal(true)}>
              <i className="material-icons" title="Delete">🗑️</i>
            </a>
          </td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan="6">No admins found</td>
      </tr>
    )}
  </tbody>
</table>


                {/* Pagination (You can implement pagination as needed) */}
                <div className="clearfix">
                  <div className="hint-text">
                    showing <b>5</b> out of <b>25</b>
                  </div>
                  <ul className="pagination">
                    <li className="page-item disabled"><a href="#">Previous</a></li>
                    <li className="page-item"><a href="#" className="page-link">1</a></li>
                    <li className="page-item"><a href="#" className="page-link">2</a></li>
                    <li className="page-item active"><a href="#" className="page-link">3</a></li>
                    <li className="page-item"><a href="#" className="page-link">4</a></li>
                    <li className="page-item"><a href="#" className="page-link">5</a></li>
                    <li className="page-item"><a href="#" className="page-link">Next</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Add User Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Add User Form */}
              <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group mt-2">
                <label>Email</label>
                <input type="email" className="form-control" required />
              </div>
              <div className="form-group mt-2">
                <label>Address</label>
                <textarea className="form-control" required></textarea>
              </div>
              <div className="form-group mt-2">
                <label>Whatsapp Number</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group mt-2">
                <label>Agez</label>
                <input type="number" className="form-control" required />
              </div>
              <div className="form-group mt-2">
                <label>Gender</label><br />
                <input type="radio" className="me-2" required /><span className="me-2">Male</span>
                <input type="radio" className="me-2" required /><span className="me-2">Female</span>
                <input type="radio" className="me-2" required /><span className="me-2">Other</span>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="success">Add</Button>
            </Modal.Footer>
          </Modal>

          {/* Edit User Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* Edit User Form (Similar to Add User) */}
              <div className="form-group">
                <label>User Name</label>
                <input type="text" className="form-control" required />
              </div>
              {/* ... Other form fields for email, address, etc. */}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                Cancel
              </Button>
              <Button variant="primary">Save Changes</Button>
            </Modal.Footer>
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this record?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                Cancel
              </Button>
              <Button variant="danger">Delete</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AllAdmin;
