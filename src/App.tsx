// App.tsx
import React from 'react';
import LoginForm from './UserLogin';
import EditEventForm from './UpdateEvent';
import StudentActions from './StudentActions';
import StudentLogin from './StudentLogin'
import EventActions from './EventActions'
import EventList from './EventList';
export const securityKey = "be4b22d2-8181-4441-b439-849eefe6f52d";


const initialEvent = {
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
      <EditEventForm eventId={1} initialEvent={initialEvent} /> {/* Replace 1 with the actual event ID */}
      <StudentLogin/>
      <StudentActions/>
      <EventActions/> 
      <EventList/>
    </div>
  );
};

export default App;
