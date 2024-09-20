import React from "react";
import Layout from "./Layout.jsx";
import Home from "./Home.jsx";
import { Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
      </Routes>
    </Layout>
  );
};

export default App;
