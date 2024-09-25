import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "./ui/sonner";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
);

// // ExampleComponent.jsx
// import React, { useEffect } from "react";
// import api from "../api"; // Axios instance

// const ExampleComponent = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await api.get("/users/profile/");
//         console.log("Profile data:", response.data);
//       } catch (error) {
//         console.error("Error fetching profile:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <div>Example Component</div>;
// };

// export default ExampleComponent;
