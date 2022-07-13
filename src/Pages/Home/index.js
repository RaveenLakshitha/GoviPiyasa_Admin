import { Outlet } from "react-router";
import Sidebar from "../../Components/Sidebar/index1";
import "./styles.css";

export default function Home() {
  
  return (
    <div className="HomeMain">
      <Sidebar />
      <Outlet />
    </div>
  );
}
