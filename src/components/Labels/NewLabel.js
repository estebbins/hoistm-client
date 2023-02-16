import React, { useState } from "react";
import axios from "axios";

function NewLabel({ onAdd }) {
  const [name, setName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/labels", { name }).then((response) => {
      onAdd(response.data);
      setName("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}

export default NewLabel;
