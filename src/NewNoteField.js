import React, { useRef } from 'react';
import './NewNoteField.css';

export default ({ onPost }) => {
  const inputRef = useRef(null);
  const handlePost = text => {
    if (text.trim().length === 0) {
      alert("Cannot post an empty note");
      return;
    }
    onPost(text);
  };
  return (
    <div className="NewNoteField">
      <div className="header">
        <div className="label">Create new note...</div>
        <div className="post-btn"
          onClick={e => handlePost(inputRef.current.value)}>Post</div>
      </div>
      <textarea ref={inputRef}></textarea>
    </div>
  );
};