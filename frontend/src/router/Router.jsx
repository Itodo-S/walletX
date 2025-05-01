import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// LAYOUTS

// PAGES
import Home from "../pages/home/Home";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* LANDING PAGE */}
      <Route index element={<Home />} />

      {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
      <Route path="/dashboard" element={<DashboardLayout />}>
        {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /dashboard */}
        <Route path="" element={<Dashboard />} />
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
