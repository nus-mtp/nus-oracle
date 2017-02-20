import React from 'react';
import Sidebar from '../components/Sidebar';
import StudyPlan2 from '../components/StudyPlan2';

export default function Dashboard() {
  return (
    <div className="with-side-menu">
      <Sidebar />
      <StudyPlan2 />
    </div>
  );
}
//<Sidebar />
//<StudyPlan2 />
