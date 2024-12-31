// EventList.tsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { securityKey } from "./App";

interface Event {
  id: number;
  organizerId: string;
  location: string;
  services: string;
  phoneNumber: string;
  description: string;
  mentorName: string;
  type: string;
  date: string;
  startTime: string;
  endTime: string;
  seats: number;
  participants: number;
  rating: number;
  numRatings: number;
  feedback: string[];
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:8080/events", {
          headers: {
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        });
        setEvents(response.data);
      } catch (error: any) {
        setMessage("Error fetching events");
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <h2>All Events</h2>
      {message && <p>{message}</p>}
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <h3>{event.location}</h3>
            <p>{event.description}</p>
            <p>Organizer: {event.organizerId}</p>
            <p>Mentor: {event.mentorName}</p>
            <p>Type: {event.type}</p>
            <p>Date: {event.date}</p>
            <p>Start Time: {event.startTime}</p>
            <p>End Time: {event.endTime}</p>
            <p>Seats: {event.seats}</p>
            <p>Participants: {event.participants}</p>
            <p>Rating: {event.rating}</p>
            <p>Number of Ratings: {event.numRatings}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
