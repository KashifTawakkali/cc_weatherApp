import React, { useState } from "react";
import CurrentLocation from "./currentLocation";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <div className="container">
        <CurrentLocation />
      </div>
      <div className="footer-info">
        
        | Developed by{" "}
        <a target="_blank" href="https://portpolio-3s9p.vercel.app/">
          Mohammadkashif Patel
        </a>{" "}
       
       
      </div>
    </React.Fragment>
  );
}

export default App;



// //import React, { useState } from "react";
// import CurrentLocation from "./currentLocation";
// import Login from "./components/login";
// import Register from "./components/register";

// function App() {
//   const [userLoggedIn, setUserLoggedIn] = useState(false); // Track if user is logged in
//   const [isRegistering, setIsRegistering] = useState(false); // Track if user is registering

//   const handleRegister = () => {
//     setIsRegistering(false);  // After successful registration, return to login page
//   };

//   const handleLogin = () => {
//     setUserLoggedIn(true);  // Set logged in state after successful login
//   };

//   const handleRegisterLink = () => {
//     setIsRegistering(true);  // Switch to register page
//   };

//   return (
//     <React.Fragment>
//       <div style={{ marginTop: "20px", textAlign: "center" }}>
//         {userLoggedIn ? (
//           <CurrentLocation />
//         ) : isRegistering ? (
//           <Register onRegister={handleRegister} />
//         ) : (
//           <div>
//             <Login onLogin={handleLogin} />
//             <p>
//               Don't have an account?{" "}
//               <button
//                 style={{
//                   backgroundColor: "#007BFF",
//                   color: "#fff",
//                   padding: "8px 15px",
//                   border: "none",
//                   borderRadius: "4px",
//                   cursor: "pointer",
//                   fontSize: "14px",
//                   marginTop: "10px",
//                 }}
//                 onClick={handleRegisterLink}
//               >
//                 Register
//               </button>
//             </p>
//           </div>
//         )}
//       </div>
//       <div style={{ position: "absolute", bottom: "10px", width: "100%", textAlign: "center", fontSize: "14px" }}>
//         | Developed by{" "}
//         <a
//           target="_blank"
//           href="https://portpolio-3s9p.vercel.app/"
//           style={{ color: "#007BFF", textDecoration: "none" }}
//         >
//           Mohammadkashif Patel
//         </a>
//       </div>
//     </React.Fragment>
//   );
// }

// export default App;
