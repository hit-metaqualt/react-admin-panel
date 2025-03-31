import React from 'react'
import Navbar from "../../components/Navbar";
const Profile = () => {
  return (
    <>
      <Navbar />
      <div id="content">
        <div className="container my-4">
          <div className="row justify-content-center">
            <div className="col-md-5 border p-4 rounded ">
      <form>
                <div>
                  <label className="mb-1">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Address</label>
                  <input
                    type="text"
                    name="address"
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Whatsapp Number</label>
                  <input
                    type="text"
                    name="whatsappNumber"
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-1">Age</label>
                  <input
                    type="number"
                    name="age"
                    className="form-control mb-2"
                  />
                </div>
                <div>
                  <label className="mb-2">Gender</label>
                  <input
                    type="text"
                    name="gender"
                    className="form-control"
                  />
                </div>
              </form>
              </div>
              </div>
              </div>
      </div>
    </>
  )
}

export default Profile