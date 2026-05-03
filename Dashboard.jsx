import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [eventsCount, setEventsCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/events")
      .then((res) => setEventsCount(res.data.length))
      .catch(() => console.log("Error fetching events"));

    axios
      .get(`http://localhost:5000/api/bookings/${userId}`)
      .then((res) => setBookingCount(res.data.length))
      .catch(() => console.log("Error fetching bookings"));
  }, [userId]);

  const card = {
    flex: 1,
    padding: "20px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    textAlign: "center",
  };

  const btn = {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "10px",
    background: "#007BFF",
    color: "white",
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      
      {/* ✅ NAVBAR */}
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h1>Dashboard 🎉</h1>

        {/* 📊 CARDS */}
        <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
          <div style={card}>
            <h2>{eventsCount}</h2>
            <p>Total Events</p>
          </div>

          <div style={card}>
            <h2>{bookingCount}</h2>
            <p>My Bookings</p>
          </div>
        </div>

        {/* 🔗 ACTION BUTTONS */}
        <div style={{ marginTop: "30px" }}>
          <button onClick={() => navigate("/create")} style={btn}>
            Create Event
          </button>

          <button onClick={() => navigate("/events")} style={btn}>
            View Events
          </button>

          <button onClick={() => navigate("/bookings")} style={btn}>
            My Bookings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;