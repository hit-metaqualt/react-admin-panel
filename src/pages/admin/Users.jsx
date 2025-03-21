import { Link } from "react-router-dom";
import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import Navbar from "../../components/Navbar"
const Users = () => {

  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <>
      <Navbar />
      
      <div id="content">
        <div class="main-content">
          <div class="row">
            <div class="col-md-12">
              <div class="table-wrapper">

                <div class="table-title">
                  <div class="row">
                    <div class="col-sm-6 p-0 flex justify-content-lg-start justify-content-center">
                      <h2 class="ml-lg-2">Manage User Documents</h2>
                    </div>
                    <div class="col-sm-6 p-0 flex justify-content-lg-end justify-content-center">
                      <Button variant="success" onClick={() => setShowAddModal(true)}>
                        Add New Document
                      </Button>
                    </div>
                  </div>
                </div>

                <table class="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Document Name</th>
                      <th>Type</th>
                      <th>Uploaded Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>Pan Card</td>
                      <td>PDF</td>
                      <td>2025-02-20</td>
                      <th>
                        <a class="Download">
                          <i class="material-icons" data-toggle="tooltip"
                            title="Download">&#xE2C4;</i>
                        </a>
                        <a class="delete" onClick={() => setShowDeleteModal(true)}>
                          <i class="material-icons" data-toggle="tooltip"
                            title="Delete">&#xE872;</i>
                        </a>
                      </th>
                    </tr>
                    <tr>
                      <td>Adhar Card</td>
                      <td>JPG</td>
                      <td>2025-02-18</td>
                      <th>
                        <a class="Download">
                          <i class="material-icons" data-toggle="tooltip"
                            title="Download">&#xE2C4;</i>
                        </a>
                        <a class="delete" onClick={() => setShowDeleteModal(true)}>
                          <i class="material-icons" data-toggle="tooltip"
                            title="Delete">&#xE872;</i>
                        </a>
                      </th>
                    </tr>

                    <tr>
                      <td>Driving License</td>
                      <td>PNG</td>
                      <td>2025-02-18</td>
                      <th>
                        <a class="Download">
                          <i class="material-icons" data-toggle="tooltip"
                            title="Download">&#xE2C4;</i>
                        </a>
                        <a class="delete" onClick={() => setShowDeleteModal(true)}>
                          <i class="material-icons" data-toggle="tooltip"
                            title="Delete">&#xE872;</i>
                        </a>
                      </th>
                    </tr>

                    <tr>
                      <td>Passport</td>
                      <td>PDF</td>
                      <td>2025-02-18</td>
                      <th>
                        <a class="Download">
                          <i class="material-icons" data-toggle="tooltip"
                            title="Download">&#xE2C4;</i>
                        </a>
                        <a class="delete" onClick={() => setShowDeleteModal(true)}>
                          <i class="material-icons" data-toggle="tooltip"
                            title="Delete">&#xE872;</i>
                        </a>
                      </th>
                    </tr>
                  </tbody>
                </table>
                <div class="clearfix">
                  <div class="hint-text">showing <b>5</b> out of <b>25</b></div>
                  <ul class="pagination">
                    <li class="page-item disabled"><a href="#">Previous</a></li>
                    <li class="page-item "><a href="#" class="page-link">1</a></li>
                    <li class="page-item "><a href="#" class="page-link">2</a></li>
                    <li class="page-item active"><a href="#" class="page-link">3</a></li>
                    <li class="page-item "><a href="#" class="page-link">4</a></li>
                    <li class="page-item "><a href="#" class="page-link">5</a></li>
                    <li class="page-item "><a href="#" class="page-link">Next</a></li>
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
              <div className="form-group">
                <label>Document Name</label>
                <input type="text" className="form-control" required />
              </div>
              <div className="form-group  mt-2">
                <label>Upload Here</label>
                <input type="file" className="form-control" required />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </Button>
              <Button variant="success">Add</Button>
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
        </div >
      </div>
    </>
  )
}

export default Users