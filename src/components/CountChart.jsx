import React, { useState } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, title: "Client Accounts", type: "clientAccounts" },
    { id: 2, title: "Cloud Account Risk Assessment", type: "riskAssessment" },
    { id: 3, title: "Top 5 Resources Security Score", type: "securityScore" },
    { id: 4, title: "Workload Alerts", type: "workloadAlerts" },
    { id: 5, title: "Registry Scan", type: "registryScan" },
    { id: 6, title: "Image Security Issues", type: "securityIssues" }
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWidgets, setSelectedWidgets] = useState([]);

  const availableWidgets = [
    { id: 'widget1', title: "Widget 1" },
    { id: 'widget2', title: "Widget 2" },
    { id: 'clientAccounts', title: "Cloud Accounts" },
    { id: 'riskAssessment', title: "Cloud Account Risk Assessment" }
  ];

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

  const toggleWidgetSelection = (widgetId) => {
    setSelectedWidgets(prevSelected => 
      prevSelected.includes(widgetId)
        ? prevSelected.filter(id => id !== widgetId)
        : [...prevSelected, widgetId]
    );
  };

  const addSelectedWidgets = () => {
    const newWidgets = selectedWidgets.map(widgetId => {
      const widget = availableWidgets.find(w => w.id === widgetId);
      return { id: Date.now() + Math.random(), title: widget.title, type: widgetId };
    });
    setWidgets([...widgets, ...newWidgets]);
    setIsModalOpen(false);
    setSelectedWidgets([]);
  };

  const deleteWidget = (widgetId) => {
    setWidgets(widgets.filter(widget => widget.id !== widgetId));
  };

  const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg w-96">
          {children}
        </div>
      </div>
    );
  };

  const Card = ({ id, title, children, type, onDelete }) => (
    <div className="bg-white p-4 rounded-lg shadow relative">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        <button 
          onClick={() => onDelete(id)} 
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      {children}
    </div>
  );

  const renderWidget = (widget) => {
    switch(widget.type) {
      case 'clientAccounts':
        return (
          <div>
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
          </div>
        );
      case 'riskAssessment':
        return (
          <div>
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
          </div>
        );
      case 'securityScore':
      case 'workloadAlerts':
        return <div className="text-center text-gray-500 mt-8">No Graph data available!</div>;
      case 'registryScan':
        return (
          <div>
            <div className="mb-2">1470 Total vulnerabilities</div>
            <div className="bg-gray-200 h-4 rounded-full">
              <div className="bg-red-500 h-4 rounded-full" style={{width: '70%'}}></div>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>● Critical (4)</span>
              <span>● High (382)</span>
            </div>
          </div>
        );
      case 'securityIssues':
        return (
          <div>
            <div className="mb-2">2 Total Images</div>
            <div className="bg-gray-200 h-4 rounded-full">
              <div className="bg-red-500 h-4 rounded-full" style={{width: '50%'}}></div>
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>● Critical (2)</span>
              <span>● High (2)</span>
            </div>
          </div>
        );
      default:
        return <div>Unknown widget type</div>;
    }
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">CNAPP Dashboard</h1>
        <div>
          <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Add Widget</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded">Last 7 days ▼</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {widgets.map(widget => (
          <Card key={widget.id} id={widget.id} title={widget.title} type={widget.type} onDelete={deleteWidget}>
            {renderWidget(widget)}
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Add Widget</h2>
        <p className="mb-4">Personalize your dashboard by adding the following widget</p>
        <div className="space-y-2 mb-4">
          {availableWidgets.map(widget => (
            <label key={widget.id} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selectedWidgets.includes(widget.id)}
                onChange={() => toggleWidgetSelection(widget.id)}
              />
              <span>{widget.title}</span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
          <button onClick={addSelectedWidgets} className="px-4 py-2 bg-blue-500 text-white rounded">Confirm</button>
        </div>
      </Modal>
    </div>
  );
};

export default Dashboard;