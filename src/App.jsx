import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./page/Register";
import Login from "./page/Login";
import InventoryPage from "./page/InventoryPage";
import MainPage from "./page/MainPage";
import DashboardPage from "./page/DashboardPage";
import OrdersPage from "./page/OrdersPage";


function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Router>
      <Routes>
        {/* <Route
          path="/"
          element={
            <DashboardPage
              user={user}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        /> */}

        <Route
          path="/"
          element={
            <Register
              user={user}
              setUser={setUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/login"
          element={
            <Login
              user={user}
              setUser={setUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/inventory"
          element={
            <InventoryPage
              user={user}
              setUser={setUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/dashboard"
          element={
            <DashboardPage
              user={user}
              setUser={setUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />

        <Route
          path="/orders"
          element={
            <OrdersPage
              user={user}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
