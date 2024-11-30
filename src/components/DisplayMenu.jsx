import React, { useState } from "react";

function DisplayMenu({ grouping, sorting, onGroupingChange, onSortingChange }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="display-menu">
      <button className="display-button" onClick={() => setIsOpen(!isOpen)}>
        <img src="/Display.svg" alt="Display" />
        Display
        <img src="/down.svg" alt="Toggle" className={isOpen ? "rotated" : ""} />
      </button>

      {isOpen && (
        <div className="menu-popup">
          <div className="menu-item">
            <span>Grouping</span>
            <select
              value={grouping}
              onChange={(e) => onGroupingChange(e.target.value)}
            >
              <option value="status">Status</option>
              <option value="user">User</option>
              <option value="priority">Priority</option>
            </select>
          </div>

          <div className="menu-item">
            <span>Ordering</span>
            <select
              value={sorting}
              onChange={(e) => onSortingChange(e.target.value)}
            >
              <option value="priority">Priority</option>
              <option value="title">Title</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}

export default DisplayMenu;
