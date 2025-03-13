import React, { useState, useEffect } from 'react';
import Widget from './Widget';
import './WidgetList.css';

const WidgetList = () => {
  const [widgets, setWidgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchWidgets = async () => {
      try {
        // In a real application, this would be an API call
        // const response = await fetch('/api/widgets');
        // const data = await response.json();
        
        // For now, we'll use mock data
        const mockData = [
          {
            id: 1,
            title: 'Dashboard Widget',
            description: 'Displays key metrics and performance indicators for the application.',
            status: 'Active'
          },
          {
            id: 2,
            title: 'User Profile Widget',
            description: 'Shows user information and account settings.',
            status: 'Completed'
          },
          {
            id: 3,
            title: 'Notification Widget',
            description: 'Alerts users about important updates and events.',
            status: 'Pending'
          },
          {
            id: 4,
            title: 'Analytics Widget',
            description: 'Provides detailed statistics and data visualization.',
            status: 'Active'
          },
          {
            id: 5,
            title: 'Calendar Widget',
            description: 'Displays upcoming events and appointments.',
            status: 'Pending'
          }
        ];
        
        setWidgets(mockData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch widgets. Please try again later.');
        setLoading(false);
        console.error('Error fetching widgets:', err);
      }
    };

    fetchWidgets();
  }, []);

  const handleEditWidget = (id) => {
    // In a real application, this would open an edit form or modal
    console.log(`Editing widget with ID: ${id}`);
  };

  const handleDeleteWidget = (id) => {
    // In a real application, this would call an API to delete the widget
    setWidgets(widgets.filter(widget => widget.id !== id));
    console.log(`Deleted widget with ID: ${id}`);
  };

  const filteredWidgets = filter === 'all' 
    ? widgets 
    : widgets.filter(widget => widget.status.toLowerCase() === filter);

  if (loading) {
    return <div className="widget-list-loading">Loading widgets...</div>;
  }

  if (error) {
    return <div className="widget-list-error">{error}</div>;
  }

  return (
    <div className="widget-list-container">
      <div className="widget-list-header">
        <h2>Widgets</h2>
        <div className="widget-filters">
          <button 
            className={filter === 'all' ? 'active' : ''} 
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button 
            className={filter === 'active' ? 'active' : ''} 
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button 
            className={filter === 'pending' ? 'active' : ''} 
            onClick={() => setFilter('pending')}
          >
            Pending
          </button>
          <button 
            className={filter === 'completed' ? 'active' : ''} 
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>
      </div>
      
      {filteredWidgets.length === 0 ? (
        <div className="no-widgets-message">
          No widgets found. {filter !== 'all' && 'Try changing the filter.'}
        </div>
      ) : (
        <div className="widget-list">
          {filteredWidgets.map(widget => (
            <Widget
              key={widget.id}
              id={widget.id}
              title={widget.title}
              description={widget.description}
              status={widget.status}
              onEdit={handleEditWidget}
              onDelete={handleDeleteWidget}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WidgetList;