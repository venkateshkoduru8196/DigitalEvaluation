import { useEffect, useState, useCallback } from "react";
import {
  fetchStudents,
  addStudent,
  editStudent,
  removeStudent
} from "../../services/studentService";
import "./Students.css";

function Students() {
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    rollNumber: "",
    registrationNumber: "",
    firstName: "",
    lastName: "",
    email: "",
    courseId: "",
    branchId: "",
    currentSemester: "",
    status: "Active"
  });

  const [editForm, setEditForm] = useState({});

  // ================= LOAD =================
  const loadStudents = useCallback(async () => {
    try {
      const data = await fetchStudents();
      setStudents(data || []);
    } catch (err) {
      console.error("Error loading students", err);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // ================= VALIDATION =================
 
//   const validate = () => {
//   let newErrors = {};

//   if (!form.rollNumber.trim())
//     newErrors.rollNumber = "Roll Number is required";

//   if (!form.firstName.trim())
//     newErrors.firstName = "First Name is required";

//   if (!form.courseId)
//     newErrors.courseId = "Course is required";

//   if (!form.branchId)
//     newErrors.branchId = "Branch is required";

//   if (!form.currentSemester)
//     newErrors.currentSemester = "Semester is required";

//   // ✅ UPDATED EMAIL VALIDATION
//   if (!form.email.trim()) {
//     newErrors.email = "Email is required";
//   } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
//     newErrors.email = "Invalid email";
//   }

//   setErrors(newErrors);
//   return Object.keys(newErrors).length === 0;
// };
     

  
  const validate = () => {
  let newErrors = {};

  if (!form.rollNumber.trim())
    newErrors.rollNumber = "Roll Number is required";

  if (!form.firstName.trim())
    newErrors.firstName = "First Name is required";

  if (!form.courseId)
    newErrors.courseId = "Course is required";

  if (!form.branchId)
    newErrors.branchId = "Branch is required";

  if (!form.currentSemester)
    newErrors.currentSemester = "Semester is required";

  // ✅ UPDATED EMAIL VALIDATION
  if (!form.email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    newErrors.email = "Invalid email";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};   
















  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });

    // remove error on typing
    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[name];
      return copy;
    });
  };

  // ================= ADD =================
  const handleAdd = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const payload = {
        ...form,
        courseId: parseInt(form.courseId),
        branchId: parseInt(form.branchId),
        currentSemester: parseInt(form.currentSemester)
      };

      await addStudent(payload);

      loadStudents();
      setErrors({});

      setForm({
        rollNumber: "",
        registrationNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        courseId: "",
        branchId: "",
        currentSemester: "",
        status: "Active"
      });

    } catch (err) {
      setErrors({
        rollNumber: err.response?.data?.message || "Something went wrong"
      });
    }
  };

  // ================= EDIT =================
  const handleEdit = (student) => {
    setEditId(student.studentId);
    setEditForm({ ...student });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await editStudent(editForm);
      setEditId(null);
      loadStudents();
    } catch {
      alert("Update failed");
    }
  };

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await removeStudent(id);
      loadStudents();
    } catch {
      alert("Delete failed");
    }
  };

  return (
    <div className="students-container">
      <h2 className="title">🎓 Student Management</h2>

      {/* FORM */}
      <form className="student-form" onSubmit={handleAdd}>
        <h3>Add Student</h3>

        <label>Roll Number</label>
        <input
          name="rollNumber"
          value={form.rollNumber}
          onChange={handleChange}
          className={errors.rollNumber ? "input-error" : ""}
        />
        {errors.rollNumber && <p className="error">{errors.rollNumber}</p>}

        <label>Registration Number</label>
        <input
          name="registrationNumber"
          value={form.registrationNumber}
          onChange={handleChange}
        />

        <label>First Name</label>
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          className={errors.firstName ? "input-error" : ""}
        />
        {errors.firstName && <p className="error">{errors.firstName}</p>}

        <label>Last Name</label>
        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          className={errors.email ? "input-error" : ""}
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Course ID</label>
        <input
          name="courseId"
          value={form.courseId}
          onChange={handleChange}
          className={errors.courseId ? "input-error" : ""}
        />
        {errors.courseId && <p className="error">{errors.courseId}</p>}

        <label>Branch ID</label>
        <input
          name="branchId"
          value={form.branchId}
          onChange={handleChange}
          className={errors.branchId ? "input-error" : ""}
        />
        {errors.branchId && <p className="error">{errors.branchId}</p>}

        <label>Semester</label>
        <input
          name="currentSemester"
          value={form.currentSemester}
          onChange={handleChange}
          className={errors.currentSemester ? "input-error" : ""}
        />
        {errors.currentSemester && (
          <p className="error">{errors.currentSemester}</p>
        )}

        <label>Status</label>
        <input
          name="status"
          value={form.status}
          onChange={handleChange}
        />

        <button type="submit" className="btn add-btn">
          Add Student
        </button>
      </form>

      {/* TABLE */}
      <div className="table-wrapper">
        <table className="student-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Roll</th>
              <th>Email</th>
              <th>Course</th>
              <th>Branch</th>
              <th>Sem</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s) =>
              editId === s.studentId ? (
                <tr key={s.studentId} className="edit-row">
                  <td>{s.studentId}</td>

                  <td>
                    <input
                      name="firstName"
                      value={editForm.firstName}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="rollNumber"
                      value={editForm.rollNumber}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="email"
                      value={editForm.email}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="courseId"
                      value={editForm.courseId}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="branchId"
                      value={editForm.branchId}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="currentSemester"
                      value={editForm.currentSemester}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <input
                      name="status"
                      value={editForm.status}
                      onChange={handleEditChange}
                    />
                  </td>

                  <td>
                    <button className="btn save-btn" onClick={handleUpdate}>
                      Save
                    </button>
                    <button
                      className="btn cancel-btn"
                      onClick={() => setEditId(null)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ) : (
                <tr key={s.studentId}>
                  <td>{s.studentId}</td>
                  <td>{s.firstName}</td>
                  <td>{s.rollNumber}</td>
                  <td>{s.email}</td>
                  <td>{s.courseId}</td>
                  <td>{s.branchId}</td>
                  <td>{s.currentSemester}</td>
                  <td>{s.status}</td>

                  <td>
                    <button
                      className="btn edit-btn"
                      onClick={() => handleEdit(s)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn delete-btn"
                      onClick={() => handleDelete(s.studentId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;