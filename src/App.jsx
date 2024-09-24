import React from "react";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import { Route, Routes } from "react-router-dom";
import VideoUpload from "./VideoUpload.jsx";
import { Dashboard } from "./components/AllVideosPage/Dashboard.jsx";
import MaxWidthWrapper from "./MaxWidthWrapper.jsx";
import VideoDetails from "./components/AllVideosPage/VideoDetails.jsx";
import { AuthProvider } from "./AuthContext";
import PrivateRoute from "./PrivateRoute";

const App = () => {
  return (
    <AuthProvider>
      <Layout>
        <Routes>
          {/* Public route */}
          <Route path="/" element={<Home />} />

          {/* Protected routes */}
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <VideoUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MaxWidthWrapper>
                  <Dashboard />
                </MaxWidthWrapper>
              </PrivateRoute>
            }
          />
          <Route
            path="/video/:id"
            element={
              <PrivateRoute>
                <VideoDetails />
              </PrivateRoute>
            }
          />
        </Routes>
      </Layout>
    </AuthProvider>
  );
};

export default App;
