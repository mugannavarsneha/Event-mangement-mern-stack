import { useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

function CreateEvent() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();

    // 🔒 validation
    if (!title || !description || !date || !image) {
      return alert("All fields including image are required");
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/events/create",
        {
          title,
          description,
          date,
          image,
        }
      );

      console.log(res.data);

      alert("Event Created 🎉");

      // ✅ clear form
      setTitle("");
      setDescription("");
      setDate("");
      setImage("");

    } catch (err) {
      console.log(err);
      alert("Error creating event");
    }
  };

  return (
    <div style={{ background: "#f4f6f9", minHeight: "100vh" }}>
      <Navbar />

      <div style={{ padding: "20px", display: "flex", justifyContent: "center" }}>
        <form
          onSubmit={handleCreate}
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "12px",
            width: "350px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2>Create Event 🎉</h2>

          <input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={inputStyle}
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={inputStyle}
          />

          {/* 🖼 IMAGE URL */}
          <input
            placeholder="Paste Image URL (Unsplash/Pexels)"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            style={inputStyle}
          />

          {/* 👀 PREVIEW */}
          {image && (
            <img
              src={image}
              alt="preview"
              onError={(e) => (e.target.style.display = "none")}
              style={{
                width: "100%",
                height: "180px",
                objectFit: "cover",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            />
          )}

          <button type="submit" style={btn}>
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

// 🎨 STYLES
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "6px",
  border: "1px solid #ccc",
};

const btn = {
  width: "100%",
  padding: "10px",
  background: "#4CAF50",
  color: "white",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
};

export default CreateEvent;