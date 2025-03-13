import React from 'react';
import PropTypes from 'prop-types';
import './Widget.css';

const Widget = ({ id, title, description, status, onEdit, onDelete }) => {
  return (
    <div className={`widget ${status.toLowerCase()}`}>
      <div className="widget-header">
        <h3>{title}</h3>
        <div className="widget-actions">
          <button 
            className="edit-button" 
            onClick={() => onEdit(id)}
            aria-label="Edit widget"
          >
            ✏️
          </button>
          <button 
            className="delete-button" 
            onClick={() => onDelete(id)}
            aria-label="Delete widget"
          >
            🗑️
          </button>
        </div>
      </div>
      <p className="widget-description">{description}</p>
      <div className="widget-footer">
        <span className="widget-status">Status: {status}</span>
      </div>
    </div>
  );
};

Widget.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['Active', 'Pending', 'Completed']).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default Widget;