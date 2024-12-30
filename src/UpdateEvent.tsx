// EditEventForm.tsx
import React, { useState } from 'react';
import axios from 'axios';
import { securityKey } from './App';

interface Event {
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
}

interface EditEventFormProps {
  eventId: number;
  initialEvent: Event;
}

const EditEventForm: React.FC<EditEventFormProps> = ({ eventId, initialEvent }) => {
  const [event, setEvent] = useState<Event>(initialEvent);
  const [message, setMessage] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEvent(prevState => ({ ...prevState, [name]: value }));
  };

  const formatTime = (time: string) => {
    return time ? `${time}:00` : '';
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Format startTime and endTime
    const formattedEvent = {
      ...event,
      startTime: formatTime(event.startTime),
      endTime: formatTime(event.endTime),
    };

    try {
      const response = await axios.put(
        `http://localhost:8080/events/${eventId}`,
        formattedEvent,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${btoa(`user:${securityKey}`)}`,
          },
          withCredentials: true,
        }
      );
      setMessage('Event updated successfully');
    } catch (error: any) {
      console.error('There was an error updating the event:', error);
      setMessage('There was an error updating the event');
    }
  };

  return (
    <div>
      <h2>Edit Event</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Location:</label>
          <input
            type="text"
            name="location"
            value={event.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Services:</label>
          <input
            type="text"
            name="services"
            value={event.services}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={event.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={event.description}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Mentor Name:</label>
          <input
            type="text"
            name="mentorName"
            value={event.mentorName}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={event.type}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            name="date"
            value={event.date}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Start Time:</label>
          <input
            type="time"
            name="startTime"
            value={event.startTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>End Time:</label>
          <input
            type="time"
            name="endTime"
            value={event.endTime}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Seats:</label>
          <input
            type="number"
            name="seats"
            value={event.seats !== undefined ? event.seats.toString() : ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default EditEventForm;
