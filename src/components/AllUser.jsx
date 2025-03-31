import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers, createUser, deleteUser } from "../redux/actions/userActions";
import { toast } from "react-toastify"; // Import Toastify

const AllUser = () => {
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const authToken = token || localStorage.getItem("token");
 const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    address: "",
    whatsappNumber: "",
    age: "",
    gender: "",
    adminId: user?.id,
  });

  const users = useSelector((state) => state.users);

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    if (authToken) {
      dispatch(fetchAllUsers(authToken));
    }
  }, [dispatch, authToken]);

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.users?.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(users?.users?.length / usersPerPage);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleCreateUser = async () => {
    try {
      const result=await dispatch(createUser(newUser,authToken));
      setNewUser({
        username: "",
        email: "",
        address: "",
        whatsappNumber: "",
        age: "",
        gender: "",
        adminId: user?.id,
      });

      dispatch(fetchAllUsers(authToken));
      toast.success("User created successfully!", { autoClose: 2000, position: "top-center"  });
      setShowAddModal(false);
    } catch (error) {
      toast.error("Error creating user. Please try again.");

    }
  };



  const handleDeleteUser = async (id) => {
    if (id && authToken) {
      const result = await dispatch(deleteUser(id, authToken)); // Trigger the delete action

      if (result?.type === "DELETE_USER_SUCCESS") {
        toast.success("User deleted successfully!"); // Show success toast
      } else {
        toast.error("Failed to delete user."); // Show error toast
      }

      dispatch(fetchAllUsers(authToken)); 
    }
  };

 
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
                      <h2 className="ml-lg-2">Manage User</h2>
                    </div>
                    <div className="col-sm-6 p-0 flex justify-content-lg-end justify-content-center">
                      <Button variant="success" onClick={() => setShowAddModal(true)}>
                        Add New User
                      </Button>
                    </div>
                  </div>
                </div>

                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>User Name</th>
                      <th>Email</th>
                      <th>Address</th>
                      <th>Whatsapp Number</th>
                      <th>Age</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentUsers?.length !== 0 &&
                      currentUsers?.map((user,I) => (
                        <tr key={I}>
                          <td>
                          <Link to={`/user-document/${user?._id}`}>{user.username}</Link>
                          </td>
                          <td>{user.email}</td>
                          <td>{user.address}</td>
                          <td>{user.whatsappNumber}</td>
                          <td>{user.age}</td>
                          <td>{user.gender || "Not specified"}</td>
                          <th>
                            <a className="edit" onClick={() => setShowEditModal(true)}>
                              <i className="material-icons" data-toggle="tooltip" title="Edit">
                                &#xE254;
                              </i>
                            </a>
                            <a className="delete" onClick={() => {
                              handleDeleteUser(user?.id)
                              }}>
                              <i className="material-icons" data-toggle="tooltip" title="Delete">
                                &#xE872;
                              </i>
                            </a>
                          </th>
                        </tr>
                      ))}
                  </tbody>
                </table>

                <div className="clearfix">
                  <div className="hint-text">
                    Showing <b>{currentUsers?.length}</b> out of <b>{users?.users?.length}</b>
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
          </div>

          {/* Add User Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div>
                  <label className="mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    value={newUser.username}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={newUser.email}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={newUser.address}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Whatsapp Number</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    value={newUser.whatsappNumber}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={newUser.age}
                    onChange={handleInputChange}
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-2">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    value={newUser.gender}
                    onChange={handleInputChange}
                    className="form-control"
                  />
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="success" onClick={handleCreateUser}>
                Add
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default AllUser;
