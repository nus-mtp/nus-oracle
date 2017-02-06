import React from 'react';
import Sidebar from '../components/Sidebar';
import StudyPlan from '../components/StudyPlan';

export default function Dashboard() {
  return (
    <div className="with-side-menu">
      <Sidebar />
      <StudyPlan />
    </div>
  );
}
