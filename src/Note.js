import React from 'react';

export default ({ children, onDelete }) => (
  <div className="Note">
    {children}
    <div className="delete-btn" onClick={onDelete}>Remove</div>
  </div>
);
