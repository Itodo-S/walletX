import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// LAYOUTS

// PAGES
import Home from "../pages/home/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      {/* LANDING PAGE */}
      <Route index element={<Home />} />

      {/* EVERY OTHER PAGE ROUTING SHOULD BE DONE IN HERE */}
      <Route path="dashboard" element={<h1>HELLOOOOOOOOOOOOOOO</h1>}>
        {/* TO NAVIGATE TO THIS ROUTE JUST GO TO: /flexi/example  */}
        {/* <Route path="governance" element={<h1>Governance Page</h1>} /> */}
      </Route>
    </Route>
  )
);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
