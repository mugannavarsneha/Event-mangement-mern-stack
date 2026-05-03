import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/bookings/${userId}`
        );

        console.log("BOOKINGS DATA:", res.data);
        setBookings(res.data);
      } catch (err) {
        console.log(err);
        alert("Error fetching bookings");
      }
    };

    if (userId) {
      fetchBookings();
    }
  }, [userId]);

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>My Bookings 🎟</h2>

        {bookings.length === 0 ? (
          <p>No bookings yet</p>
        ) : (
          bookings.map((b) => (
            <div
              key={b._id}
              style={{
                background: "white",
                padding: "20px",
                margin: "15px 0",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* 🖼 IMAGE */}
              {b.event?.image && (
                <img
                  src={b.event.image}
                  alt="event"
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                    borderRadius: "10px",
                    marginBottom: "10px",
                  }}
                />
              )}

              {/* 📄 DETAILS */}
              <h3>{b.event?.title}</h3>
              <p>{b.event?.description}</p>
              <p>
                <b>Date:</b> {b.event?.date}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MyBookings;