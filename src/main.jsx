import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { action as destroyAction } from "./routes/destroy";
import "./index.css";
import Index from "./routes/index";

// Root
import Root, {
  loader as rootLoader,
  action as rootAction,
} from "./routes/root";

// Error 모듈
import ErrorPage from "./error-page";

// Contact 모듈
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from "./routes/contact";

// Edit 모듈
import EditContact, { action as editAction } from "./routes/edit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    
    // 사이드 바 메뉴 클릭 Main 렌더링
    children: [
      { index: true, element: <Index /> },
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
        action: contactAction,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
