import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainView from "./components/Dashboard/MainView";
import Layout from "./components/common/Layout";
import { NoPage } from "./components/common/NoPage";
import Dashboard from "./components/Dashboard/Dashboard";
import SignUp from "./components/Auth/SignUp";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { AdminDashboard } from "./components/Dashboard/AdminDashboard";
import Profile from "./components/Dashboard/Profile";
import { BookingView } from "./components/Booking/BookingView";
import { DeskView } from "./components/Booking/DeskView";

function App() {
  const queryClient = new QueryClient();

  return (
    <>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MainView />} />
            <Route path="dashboard" element={<Dashboard/>} />
            <Route path="/adminDashboard" element={<AdminDashboard/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/booking" element={<BookingView/>} />
            <Route path="/:id" element={<DeskView/>} />
            <Route path="signup" element={<SignUp />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
    </>
  );
}

export default App;
