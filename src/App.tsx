// App.tsx
import React from 'react';
import LoginForm from './UserLogin';
import EditEventForm from './UpdateEvent';
import StudentActions from './StudentActions';
import StudentLogin from './StudentLogin'
import EventActions from './EventActions'
import EventList from './EventList';
export const securityKey = "2d0dec62-425c-43ce-9628-e2ac379210f9"; // changes on every api refresh


const initialEvent = {
  id: 1,
  location: "Sample Location",
  services: "Service1,Service2",
  phoneNumber: "1234567890",
  description: "Sample Description",
  mentorName: "Sample Mentor",
  type: "TRAINING",
  date: "2023-01-01",
  startTime: "09:00",
  endTime: "17:00",
  seats: 100,
};

const App: React.FC = () => {
  return (
    <div className="App">
      <LoginForm />
      <EditEventForm eventId={1} initialEvent={initialEvent} /> 
      <StudentLogin/>
      <StudentActions/>
      <EventActions/> 
      <EventList/>
    </div>
  );
};

export default App;
