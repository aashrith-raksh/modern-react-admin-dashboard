import "./App.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./layouts/RootLayout";
import { Pie, Stacked } from "./components";
import {
  Ecommerce,
  Orders,
  Employees,
  Customers,
  Kanban,
  Editor,
  Calendar,
  ColorPicker,
  Line,
  Area,
  Bar,
  Financial,
  ColorMapping,
  Pyramid,
} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <Ecommerce /> },
      { path: "/ecommerce", element: <Ecommerce /> },

      // Pages
      { path: "/orders", element: <Orders /> },
      { path: "/employees", element: <Employees /> },
      { path: "/customers", element: <Customers /> },

      // Apps
      { path: "/kanban", element: <Kanban /> },
      { path: "/editor", element: <Editor /> },
      { path: "/calendar", element: <Calendar /> },
      { path: "/color-picker", element: <ColorPicker /> },

      // Charts
      { path: "/line", element: <Line /> },
      { path: "/area", element: <Area /> },
      { path: "/bar", element: <Bar /> },
      { path: "/pie", element: <Pie /> },
      { path: "/financial", element: <Financial /> },
      { path: "/color-mapping", element: <ColorMapping /> },
      { path: "/pyramid", element: <Pyramid /> },
      { path: "/stacked", element: <Stacked /> },
    ],
  },
]);

function App() {
  return (
    <RouterProvider router={router}></RouterProvider>
  );
}

export default App;
