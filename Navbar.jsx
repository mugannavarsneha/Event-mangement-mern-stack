import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "15px 30px",
      background: "#1e1e2f",
      color: "white"
    }}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        EventApp 🎉
      </h2>

      <div>
        <button onClick={() => navigate("/events")} style={btn}>Events</button>
        <button onClick={() => navigate("/create")} style={btn}>Create</button>
        <button onClick={() => navigate("/bookings")} style={btn}>Bookings</button>
        <button onClick={handleLogout} style={{ ...btn, background: "red" }}>
          Logout
        </button>
      </div>
    </div>
  );
}

const btn = {
  marginLeft: "10px",
  padding: "8px 15px",
  border: "none",
  borderRadius: "5px",
  background: "#4CAF50",
  color: "white",
  cursor: "pointer"
};

export default Navbar;