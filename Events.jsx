import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function Events() {
  const [events, setEvents] = useState([]);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/events");
      console.log("EVENT DATA:", res.data); // 🔍 debug
      setEvents(res.data);
    } catch (err) {
      console.log(err);
      alert("Error fetching events");
    }
  };

  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/events/${editingEvent._id}`,
        editingEvent
      );

      alert("Event Updated ✏️");
      setEditingEvent(null);
      fetchEvents();
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/events/${id}`);
      alert("Event Deleted 🗑");
      fetchEvents();
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  const handleBook = async (eventId) => {
    try {
      await axios.post("http://localhost:5000/api/bookings/book", {
        userId: localStorage.getItem("userId"),
        eventId: eventId,
      });

      alert("Event Booked 🎟");
    } catch (err) {
      console.log(err);
      alert("Booking failed");
    }
  };

  const btn = {
    padding: "6px 12px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginRight: "8px",
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>All Events 🎉</h2>

        {/* ✏️ EDIT FORM */}
        {editingEvent && (
          <div
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "10px",
              marginBottom: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            }}
          >
            <h3>Edit Event</h3>

            <input
              value={editingEvent.title}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", padding: "8px" }}
            />

            <input
              value={editingEvent.description}
              onChange={(e) =>
                setEditingEvent({
                  ...editingEvent,
                  description: e.target.value,
                })
              }
              style={{ display: "block", marginBottom: "10px", padding: "8px" }}
            />

            <input
              type="date"
              value={editingEvent.date}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, date: e.target.value })
              }
              style={{ marginBottom: "10px", padding: "8px" }}
            />

            {/* 🔥 IMAGE EDIT FIELD */}
            <input
              placeholder="Image URL"
              value={editingEvent.image || ""}
              onChange={(e) =>
                setEditingEvent({ ...editingEvent, image: e.target.value })
              }
              style={{ display: "block", marginBottom: "10px", padding: "8px" }}
            />

            <button
              onClick={handleUpdate}
              style={{ ...btn, background: "#007BFF", color: "white" }}
            >
              Update
            </button>

            <button
              onClick={() => setEditingEvent(null)}
              style={{ ...btn, background: "gray", color: "white" }}
            >
              Cancel
            </button>
          </div>
        )}

        {/* 📋 EVENT LIST */}
        {events.length === 0 ? (
          <p>No events available</p>
        ) : (
          events.map((e) => (
            <div
              key={e._id}
              style={{
                background: "white",
                padding: "20px",
                margin: "15px 0",
                borderRadius: "12px",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              {/* 🔥 IMAGE DISPLAY (THIS WAS MISSING) */}
              {e.image && (
                <img
                  src={e.image}
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

              <h3>{e.title}</h3>
              <p>{e.description}</p>
              <p>
                <b>Date:</b> {e.date}
              </p>

              <button
                onClick={() => handleBook(e._id)}
                style={{ ...btn, background: "#4CAF50", color: "white" }}
              >
                Book
              </button>

              <button
                onClick={() => setEditingEvent(e)}
                style={{ ...btn, background: "orange", color: "white" }}
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(e._id)}
                style={{ ...btn, background: "red", color: "white" }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Events;