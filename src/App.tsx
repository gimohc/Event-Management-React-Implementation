// App.tsx
import React from 'react';
import LoginForm from './LoginForm';
import EditEventForm from './UpdateEvent';
import StudentActions from './StudentActions';
import StudentLogin from './StudentLogin'

export const securityKey = "3286bdad-5d21-4743-9efc-800fca9162ff";


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
      <StudentActions></StudentActions>
    </div>
  );
};

export default App;
