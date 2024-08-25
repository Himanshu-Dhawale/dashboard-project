import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  // Dummy data for charts
  const clientAccountsData = [
    { name: 'Connected', value: 3 },
    { name: 'Not Connected', value: 12 },
  ];

  const riskAssessmentData = [
    { name: 'Failure', value: 5839 },
    { name: 'Warning', value: 584 },
    { name: 'Passed', value: 7334 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const Card = ({ title, children, addWidget }) => (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {addWidget && (
          <button className="text-blue-500 hover:text-blue-700">+ Add Widget</button>
        )}
      </div>
      {children}
    </div>
  );

  return (
    <div className="bg-gray-100 p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Last 7 days ▼</button>
      </div>
      <div className="grid grid-cols-2 gap-6">
        <Card title="Client Accounts">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={clientAccountsData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {clientAccountsData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="mr-4">● Connected (3)</span>
            <span>● Not Connected (12)</span>
          </div>
        </Card>
        <Card title="Cloud Account Risk Assessment">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={riskAssessmentData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {riskAssessmentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="text-center mt-2">
            <span className="mr-4">● Failure (5839)</span>
            <span className="mr-4">● Warning (584)</span>
            <span>● Passed (7334)</span>
          </div>
        </Card>
        <Card title="Top 5 Resources Security Score" addWidget>
          <div className="text-center text-gray-500 mt-8">No Graph data available!</div>
        </Card>
        <Card title="Workload Alerts" addWidget>
          <div className="text-center text-gray-500 mt-8">No Graph data available!</div>
        </Card>
        <Card title="Registry Scan">
          <div className="mb-2">1470 Total vulnerabilities</div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-red-500 h-4 rounded-full" style={{width: '70%'}}></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>● Critical (4)</span>
            <span>● High (382)</span>
          </div>
        </Card>
        <Card title="Image Security Issues">
          <div className="mb-2">2 Total Images</div>
          <div className="bg-gray-200 h-4 rounded-full">
            <div className="bg-red-500 h-4 rounded-full" style={{width: '50%'}}></div>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span>● Critical (2)</span>
            <span>● High (2)</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;