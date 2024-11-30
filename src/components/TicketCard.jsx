import React from "react";

function TicketCard({ ticket, user, getUserAvatar, grouping, getStatusIcon }) {
  const getPriorityIcon = (priority) => {
    const icons = {
      4: "/SVG - Urgent Priority grey.svg",
      3: "/Img - High Priority.svg",
      2: "/Img - Medium Priority.svg",
      1: "/Img - Low Priority.svg",
      0: "/No-priority.svg",
    };
    return (
      <img src={icons[priority]} alt="Priority" className="priority-icon" />
    );
  };

  return (
    <div className="ticket-card">
      <div className="ticket-header">
        <span className="ticket-id">{ticket.id}</span>
        {user && (
          <div className={`user-avatar ${user.available ? "available" : ""}`}>
            {getUserAvatar(user.id)}
          </div>
        )}
      </div>

      <div className="ticket-title">
        <span className="ticket-status">
          {(grouping === "priority" || grouping === "user") &&
            getStatusIcon(ticket.status)}
        </span>
        {ticket.title}
      </div>
      <div className="ticket-tags">
        {getPriorityIcon(ticket.priority)}
        {ticket.tag.map((tag, index) => (
          <span key={index} className="tag">
            <span className="dot">●</span>
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

export default TicketCard;
