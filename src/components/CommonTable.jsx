import React, { useEffect, useRef, useState } from "react";
import $ from "jquery";
import "datatables.net-bs5";

const DataTable = () => {
  const tableRef = useRef(null);
  const [data, setData] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", status: "Active" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", status: "Inactive" },
  ]);

  useEffect(() => {
    const table = $(tableRef.current).DataTable();

    return () => {
      table.destroy();
    };
  }, [data]); // Re-initialize when data updates

  // Add new entry
  const addNewEntry = () => {
    const newId = data.length + 1;
    const newData = {
      id: newId,
      name: `User ${newId}`,
      email: `user${newId}@example.com`,
      status: newId % 2 === 0 ? "Active" : "Inactive",
    };
    setData([...data, newData]);
  };

  // Delete entry
  const deleteEntry = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  // Edit entry (for now, just toggles status)
  const editEntry = (id) => {
    setData(
      data.map((item) =>
        item.id === id ? { ...item, status: item.status === "Active" ? "Inactive" : "Active" } : item
      )
    );
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3">Manage Admin</h2>
      <button className="btn btn-primary mb-3" onClick={addNewEntry}>
        Add New
      </button>
      <table ref={tableRef} className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id}>
              <td>{index + 1}</td>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.status}</td>
              <td>
                <button className="btn btn-warning btn-sm me-2" onClick={() => editEntry(item.id)}>
                  Edit
                </button>
                <button className="btn btn-danger btn-sm" onClick={() => deleteEntry(item.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
