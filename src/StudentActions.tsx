// StudentActions.tsx
import React, { useState } from "react";
import axios from "axios";
import { securityKey } from "./App";

const StudentActions: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [eventId, setEventId] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>("");

  const handleEnrollInEvent = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/students/enrollInEvent/${eventId}/`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        }
      );
      setMessage("Enrolled in event successfully");
    } catch (error: any) {
      setMessage("Error enrolling in event");
    }
  };

  const handleCancelEvent = async () => {
    try {
      await axios.post(
        `http://localhost:8080/students/cancelEvent/${eventId}`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        }
      );
      setMessage("Cancelled event successfully");
    } catch (error: any) {
      setMessage("Error cancelling event");
    }
  };

  const handleRateEvent = async () => {
    try {
      await axios.post(
        `http://localhost:8080/students/rate/${eventId}/${rating}`,
        {},
        {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        }
      );
      setMessage("Rated event successfully");
    } catch (error: any) {
      setMessage("Error rating event");
    }
  };

  const handleSaveFeedback = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/students/rate/${eventId}/`,
        feedback , 
        {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      setMessage("Feedback saved successfully");
    } catch (error: any) {
      setMessage("Error saving feedback");
    }
  };

  return (
    <div>
      <h2>Student Actions</h2>
      <div>
        <label>Event ID:</label>
        <input
          type="number"
          value={eventId}
          onChange={(e) => setEventId(Number(e.target.value))}
        />
      </div>
      <button onClick={handleEnrollInEvent}>Enroll in Event</button>
      <button onClick={handleCancelEvent}>Cancel Event</button>
      <div>
        <label>Rating:</label>
        <input
          type="number"
          value={rating}
          onChange={(e) => setRating(Number(e.target.value))}
        />
      </div>
      <button onClick={handleRateEvent}>Rate Event</button>
      <div>
        <label>Feedback:</label>
        <input
          type="text"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </div>
      <button onClick={handleSaveFeedback}>Save Feedback</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default StudentActions;
