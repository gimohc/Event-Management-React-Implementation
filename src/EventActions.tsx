// EventActions.tsx
import React, { useState } from "react";
import axios from "axios";
import { securityKey } from "./App";

const EventActions: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [eventId, setEventId] = useState<number>(0); 
  const [eventDetails, setEventDetails] = useState<any>({
    location: "",
    services: "",
    phoneNumber: "",
    description: "",
    mentorName: "",
    type: "TRAINING", // Default value
    date: "",
    startTime: "00:00:00", // Default value to include seconds
    endTime: "00:00:00", // Default value to include seconds
    seats: 0,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleGetEvent = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/events/${eventId}`, // eventid should be event id after clicking edit in frontend
        {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        }
      );
      setEventDetails(response.data);
      setMessage("Event fetched successfully");
    } catch (error: any) {
      setMessage("Error fetching event");
    }
  };

  const handleCreateEvent = async () => {
    try {
      await axios.post("http://localhost:8080/events", eventDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
        },
        withCredentials: true,
      });
      setMessage("Event created successfully");
    } catch (error: any) {
      setMessage("Error creating event");
    }
  };

  const handleUpdateEvent = async () => {
    try {
      await axios.put(`http://localhost:8080/events/${eventId}`, eventDetails, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
        },
        withCredentials: true,
      });
      setMessage("Event updated successfully");
    } catch (error: any) {
      setMessage("Error updating event");
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(`http://localhost:8080/events/${eventId}`, {
        headers: {
          Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
        },
        withCredentials: true,
      });
      setMessage("Event deleted successfully");
    } catch (error: any) {
      setMessage("Error deleting event");
    }
  };

  return (
    <div>
      <h2>Event Actions</h2>
      <div>
        <label>Event ID:</label>
        <input
          type="number"
          value={eventId}
          onChange={(e) => setEventId(Number(e.target.value))}
        />
      </div>
      <button onClick={handleGetEvent}>Get Event</button>
      <button onClick={handleDeleteEvent}>Delete Event</button>
      <h3>Event Details</h3>
      <form>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={eventDetails.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Services:</label>
          <input
            type="text"
            name="services"
            value={eventDetails.services}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={eventDetails.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={eventDetails.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mentor Name:</label>
          <input
            type="text"
            name="mentorName"
            value={eventDetails.mentorName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <select
            name="type"
            value={eventDetails.type}
            onChange={handleInputChange}
          >
            <option value="TRAINING">TRAINING</option>
            <option value="COMPETITION">COMPETITION</option>
            <option value="WORKSHOP">WORKSHOP</option>
            <option value="LECTURE">LECTURE</option>
            <option value="INITIATIVE">INITIATIVE</option>
            <option value="EXHIBITION">EXHIBITION</option>
          </select>
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={eventDetails.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={eventDetails.startTime}
            onChange={(e) =>
              setEventDetails({
                ...eventDetails,
                startTime: e.target.value + ":00", // Append seconds
              })
            }
          />
        </div>
        <div>
          <label>End Time:</label>
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={eventDetails.endTime}
            onChange={(e) =>
              setEventDetails({
                ...eventDetails,
                endTime: e.target.value + ":00", // Append seconds
              })
            }
          />
        </div>
        <div>
          <label>Seats:</label>
          <input
            type="number"
            name="seats"
            value={
              eventDetails.seats !== undefined
                ? eventDetails.seats.toString()
                : ""
            }
            onChange={handleInputChange}
          />
        </div>
        <button type="button" onClick={handleCreateEvent}>
          Create Event
        </button>
        <button type="button" onClick={handleUpdateEvent}>
          Update Event
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EventActions;
