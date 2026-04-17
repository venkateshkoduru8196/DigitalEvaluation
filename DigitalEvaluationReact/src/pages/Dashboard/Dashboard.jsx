// // // import { useEffect, useState } from "react";
// // // import API from "../../api/axios";
// // // import { uploadExcel } from "../../services/excelService";
// // // import { useNavigate } from "react-router-dom";
// // // import MenuList from "../../components/Menu/MenuList"; 
// // // import "./Dashboard.css";

// // // function Dashboard() {
// // //   const [message, setMessage] = useState("");
// // //   const [file, setFile] = useState(null);
// // //   const [uploadResult, setUploadResult] = useState("");
// // //   const [sidebarOpen, setSidebarOpen] = useState(true);
// // //   const navigate = useNavigate();

// // //   useEffect(() => {
// // //     API.get("/Secured")
// // //       .then(res => setMessage(res.data))
// // //       .catch(() => setMessage("Unauthorized"));
// // //   }, []);

// // //   const handleFileChange = (e) => setFile(e.target.files[0]);

// // //   const handleUpload = async () => {
// // //     if (!file) {
// // //       alert("Please select an Excel file first.");
// // //       return;
// // //     }
// // //     try {
// // //       const response = await uploadExcel(file);
// // //       setUploadResult(response);
// // //     } catch (err) {
// // //       setUploadResult("Upload failed. Check console for details.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="dashboard-layout">
// // //       {/* Sidebar */}
// // //       <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
// // //         <div className="sidebar-header">
// // //           <h2 className="sidebar-title">
// // //             {sidebarOpen ? "Digital Evaluation" : "DE"}
// // //           </h2>
// // //           <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
// // //             ☰
// // //           </button>
// // //         </div>
// // //         <MenuList sidebarOpen={sidebarOpen} />
// // //       </aside>

// // //       {/* Main Content */}
// // //       <main className="main-content">
// // //         <h1>Dashboard Overview</h1>

// // //         {/* Stat Cards */}
// // //         <div className="stats-grid">
// // //           <div className="stat-card blue">
// // //             <h3>Total Colleges</h3>
// // //             <p>0</p>
// // //             <span onClick={() => navigate("/colleges")}>View Details →</span>
// // //           </div>
// // //           <div className="stat-card yellow">
// // //             <h3>Excel Uploads</h3>
// // //             <p>0</p>
// // //             <span onClick={() => navigate("/dashboard")}>Upload Now →</span>
// // //           </div>
// // //           <div className="stat-card green">
// // //             <h3>Authorized</h3>
// // //             <p>{message}</p>
// // //             <span>System Status</span>
// // //           </div>
// // //         </div>

// // //         {/* Upload Section */}
// // //         <div className="dashboard-card">
// // //           <h2>Upload Students Excel</h2>
// // //           <input 
// // //             type="file" 
// // //             accept=".xlsx" 
// // //             className="file-input" 
// // //             onChange={handleFileChange} 
// // //           />
// // //           <button className="primary-btn" onClick={handleUpload}>Upload</button>
// // //           {uploadResult && <p className="upload-result">{uploadResult}</p>}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // // export default Dashboard;





// // import { useEffect, useState } from "react";
// // import API from "../../api/axios";
// // import { uploadExcel } from "../../services/excelService";
// // import { useNavigate } from "react-router-dom";
// // import MenuList from "../../components/Menu/MenuList"; 
// // import "./Dashboard.css";

// // function Dashboard() {
// //   const [message, setMessage] = useState("");
// //   const [file, setFile] = useState(null);
// //   const [uploadResult, setUploadResult] = useState("");
// //   const [sidebarOpen, setSidebarOpen] = useState(true);
// //   const [stats, setStats] = useState({ colleges: 0, uploads: 0 });
// //   const navigate = useNavigate();

// //   useEffect(() => {
// //     // Auth check
// //     API.get("/Secured")
// //       .then(res => setMessage(res.data))
// //       .catch(() => setMessage("Unauthorized"));

// //     // Example stats fetch
// //     API.get("/College/count")
// //       .then(res => setStats(prev => ({ ...prev, colleges: res.data })))
// //       .catch(() => {});

// //     API.get("/Upload/count")
// //       .then(res => setStats(prev => ({ ...prev, uploads: res.data })))
// //       .catch(() => {});
// //   }, []);

// //   const handleFileChange = (e) => setFile(e.target.files[0]);

// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select an Excel file first.");
// //       return;
// //     }
// //     try {
// //       const response = await uploadExcel(file);
// //       setUploadResult(response);
// //       setStats(prev => ({ ...prev, uploads: prev.uploads + 1 }));
// //     } catch (err) {
// //       setUploadResult("Upload failed. Check console for details.");
// //     }
// //   };

// //   return (
// //     <div className="dashboard-layout">
// //       {/* Sidebar */}
// //       <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
// //         <div className="sidebar-header">
// //           <h2 className="sidebar-title">
// //             {sidebarOpen ? "Digital Evaluation" : "DE"}
// //           </h2>
// //           <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
// //             ☰
// //           </button>
// //         </div>
// //         <MenuList sidebarOpen={sidebarOpen} />
// //       </aside>

// //       {/* Main Content */}
// //       <main className="main-content">
// //         <h1>Dashboard Overview</h1>

// //         {/* Stat Cards */}
// //         <div className="stats-grid">
// //           <div className="stat-card blue">
// //             <h3>Total Colleges</h3>
// //             <p>{stats.colleges}</p>
// //             <span onClick={() => navigate("/colleges")}>View Details →</span>
// //           </div>
// //           <div className="stat-card yellow">
// //             <h3>Excel Uploads</h3>
// //             <p>{stats.uploads}</p>
// //             <span onClick={() => navigate("/dashboard")}>Upload Now →</span>
// //           </div>
// //           <div className="stat-card green">
// //             <h3>Authorized</h3>
// //             <p>{message}</p>
// //             <span>System Status</span>
// //           </div>
// //         </div>

// //         {/* Upload Section */}
// //         {/* <div className="dashboard-card">
// //           <h2>Upload Students Excel</h2>
// //           <input 
// //             type="file" 
// //             accept=".xlsx" 
// //             className="file-input" 
// //             onChange={handleFileChange} 
// //           />
// //           <button className="primary-btn" onClick={handleUpload}>Upload</button>
// //           {uploadResult && <p className="upload-result">{uploadResult}</p>}
// //         </div> */}
// //       </main>
// //     </div>
// //   );
// // }

// // export default Dashboard;


// import { useEffect, useState } from "react";
// import API from "../../api/axios";
// import { useNavigate } from "react-router-dom";
// import MenuList from "../../components/Menu/MenuList";
// import "./Dashboard.css";

// function Dashboard() {
//   const [message, setMessage] = useState("");
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [stats, setStats] = useState({ colleges: 0, uploads: 0 });

//   const navigate = useNavigate();

//   useEffect(() => {
//     API.get("/Secured")
//       .then(res => setMessage(res.data))
//       .catch(() => setMessage("Unauthorized"));

//     API.get("/College/count")
//       .then(res => setStats(prev => ({ ...prev, colleges: res.data })))
//       .catch(() => {});

//     API.get("/Upload/count")
//       .then(res => setStats(prev => ({ ...prev, uploads: res.data })))
//       .catch(() => {});
//   }, []);

//   return (
//     <div className="dashboard-layout">
      
//       {/* Sidebar */}
//       <aside className={`sidebar ${sidebarOpen ? "" : "collapsed"}`}>
//         <div className="sidebar-header">
//           <h2 className="sidebar-title">
//             {sidebarOpen ? "Digital Evaluation" : "DE"}
//           </h2>

//           <button
//             className="hamburger"
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//           >
//             ☰
//           </button>
//         </div>

//         <MenuList sidebarOpen={sidebarOpen} />
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <h1>Dashboard Overview</h1>

//         <div className="stats-grid">
//           <div className="stat-card blue">
//             <h3>Total Colleges</h3>
//             <p>{stats.colleges}</p>
//             <span onClick={() => navigate("/colleges")}>
//               View Details →
//             </span>
//           </div>

//           <div className="stat-card yellow">
//             <h3>Excel Uploads</h3>
//             <p>{stats.uploads}</p>
//             <span onClick={() => navigate("/dashboard")}>
//               Upload Now →
//             </span>
//           </div>

//           <div className="stat-card green">
//             <h3>Authorized</h3>
//             <p>{message}</p>
//             <span>System Status</span>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// export default Dashboard;




import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
import MenuList from "../../components/Menu/MenuList";
import "./Dashboard.css";

function Dashboard() {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [stats, setStats] = useState({ colleges: 0, uploads: 0 });

  const navigate = useNavigate();

  useEffect(() => {
    API.get("/Secured")
      .then(res => setMessage(res.data))
      .catch(() => setMessage("Unauthorized"));

    API.get("/College/count")
      .then(res => setStats(prev => ({ ...prev, colleges: res.data })));

    API.get("/Upload/count")
      .then(res => setStats(prev => ({ ...prev, uploads: res.data })));
  }, []);

  return (
    <div className="dashboard-layout">

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
        <div className="sidebar-header">
          <h2 className="sidebar-title">
            {sidebarOpen ? "Digital Evaluation" : "DE"}
          </h2>

          <button
            className="hamburger"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>

        <MenuList sidebarOpen={sidebarOpen} />
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h1>Dashboard Overview</h1>

        <div className="stats-grid">
          <div className="stat-card blue">
            <h3>Total Colleges</h3>
            <p>{stats.colleges}</p>
            <span onClick={() => navigate("/colleges")}>
              View Details →
            </span>
          </div>

          <div className="stat-card yellow">
            <h3>Excel Uploads</h3>
            <p>{stats.uploads}</p>
            <span onClick={() => navigate("/dashboard")}>
              Upload Now →
            </span>
          </div>

          <div className="stat-card green">
            <h3>Authorized</h3>
            <p>{message}</p>
            <span>System Status</span>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;