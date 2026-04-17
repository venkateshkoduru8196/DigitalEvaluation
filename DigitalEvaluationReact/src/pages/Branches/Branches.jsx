import { useEffect, useState } from "react";
import {
  fetchBranches,
  createBranch,
  updateBranch,
  removeBranch
} from "../../services/branchService";
import "./Branches.css";

function Branches() {
  const [branches, setBranches] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    collegeId: "",
    branchName: "",
    branchCode: "",
    hodFacultyId: ""
  });

  const [editForm, setEditForm] = useState({});

  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      const data = await fetchBranches();
      setBranches(data || []);
    } catch {
      alert("Error loading branches");
    }
  };

  // ================= ADD =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        collegeId: Number(form.collegeId),
        branchName: form.branchName.trim(),
        branchCode: form.branchCode.trim(),
        hodFacultyId: form.hodFacultyId
          ? Number(form.hodFacultyId)
          : null
      };

      await createBranch(payload);
      loadBranches();

      setForm({
        collegeId: "",
        branchName: "",
        branchCode: "",
        hodFacultyId: ""
      });
    } catch (err) {
      alert(err.response?.data || "Error adding branch");
    }
  };

  // ================= EDIT =================
  const handleEdit = (b) => {
    setEditId(b.branchId);
    setEditForm({ ...b });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      const payload = {
        branchId: editForm.branchId,
        collegeId: Number(editForm.collegeId),
        branchName: editForm.branchName.trim(),
        branchCode: editForm.branchCode.trim(),
        hodFacultyId: editForm.hodFacultyId
          ? Number(editForm.hodFacultyId)
          : null
      };

      await updateBranch(payload);
      setEditId(null);
      setEditForm({});
      loadBranches();
    } catch (err) {
      alert(err.response?.data || "Error updating branch");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Delete branch?")) return;

    try {
      await removeBranch(id);
      loadBranches();
    } catch {
      alert("Error deleting branch");
    }
  };

  return (
    <div className="branches-container">
      <h2>🏫 Branch Management</h2>

      {/* ================= FORM ================= */}
      <form className="branch-form" onSubmit={handleAdd}>
        <div className="form-group">
          <label>College ID</label>
          <input
            type="number"
            name="collegeId"
            value={form.collegeId}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch Name</label>
          <input
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Branch Code</label>
          <input
            name="branchCode"
            value={form.branchCode}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>HOD Faculty ID (optional)</label>
          <input
            type="number"
            name="hodFacultyId"
            value={form.hodFacultyId}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn add-btn">
          Add Branch
        </button>
      </form>

      {/* ================= TABLE ================= */}
      <div className="table-wrapper">
        <table className="branch-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>College</th>
              <th>Name</th>
              <th>Code</th>
              <th>HOD</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {branches.length === 0 ? (
              <tr>
                <td colSpan="6">No data</td>
              </tr>
            ) : (
              branches.map((b) =>
                editId === b.branchId ? (
                  <tr key={b.branchId} className="edit-row">
                    <td>{b.branchId}</td>

                    <td>
                      <input
                        type="number"
                        name="collegeId"
                        value={editForm.collegeId}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <input
                        name="branchName"
                        value={editForm.branchName}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <input
                        name="branchCode"
                        value={editForm.branchCode}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <input
                        type="number"
                        name="hodFacultyId"
                        value={editForm.hodFacultyId || ""}
                        onChange={handleEditChange}
                      />
                    </td>

                    <td>
                      <button
                        type="button"
                        className="btn save-btn"
                        onClick={handleUpdate}
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        className="btn cancel-btn"
                        onClick={() => {
                          setEditId(null);
                          setEditForm({});
                        }}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ) : (
                  <tr key={b.branchId}>
                    <td>{b.branchId}</td>
                    <td>{b.collegeId}</td>
                    <td>{b.branchName}</td>
                    <td>{b.branchCode}</td>
                    <td>{b.hodFacultyId || "-"}</td>

                    <td>
                      <button
                        className="btn edit-btn"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn delete-btn"
                        onClick={() => handleDelete(b.branchId)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                )
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Branches;