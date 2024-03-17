import { useEffect } from "react";
import {
  Outlet,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  useNavigate,
  useRouteError,
} from "react-router-dom";
import Main from "./pages/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import Ideas from "./pages/Ideas";
import Random from "./pages/Random";
const queryClient = new QueryClient();
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />, // Use the Layout component for the root route
      errorElement: <ErrorBoundary />,
      children: [
        { path: "/", element: <Main /> },
        { path: "/ideas", element: <Ideas /> },
        { path: "/random", element: <Random /> },
      ],
    },
  ]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

function ErrorBoundary() {
  let error = useRouteError();
  console.error(error);
  const navigate = useNavigate();
  return (
    <div className="w-screen bg-[#7e7e7e7e] flex justify-center items-center h-screen">
      <div className="container w-fit text-center font-[600] m-auto inset-0">
        <h1 className="text-[100px] ">404</h1>
        <p className="text-[20px]">Dang! Something went wrong.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-10 bg-[#222] text-[#ccc] px-4 py-3"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
}

function Layout() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top whenever the location changes
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <div>
      <Header />
      <div className="min-h-[80vh]">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}

export default App;
