import React from "react";
import TicketCard from "./TicketCard";

function KanbanBoard({ tickets, users, grouping, sorting }) {
  const getUserAvatar = (userId) => {
    const userAvatars = {
      "usr-1": "/bo-1-130x180.jpg",
      "usr-2": "/hiroshi-nohara-1-130x200.jpg",
      "usr-3": "/shinnosuke-nohara-1-285x399.jpg",
      "usr-4": "/tooru-kazama-1-130x180.jpg",
      "usr-5": "/masao-sato-1-130x180.jpg",
    };
    return (
      <img
        src={userAvatars[userId]}
        alt="User Avatar"
        className="user-avatar"
      />
    );
  };

  const getGroupedTickets = () => {
    let grouped = {};

    if (grouping === "status") {
      const statusOrder = [
        "Backlog",
        "Todo",
        "In progress",
        "Done",
        "Cancelled",
      ];
      statusOrder.forEach((status) => {
        grouped[status] = tickets.filter((ticket) => ticket.status === status);
      });
    } else if (grouping === "user") {
      users.forEach((user) => {
        grouped[user.name] = tickets.filter(
          (ticket) => ticket.userId === user.id
        );
      });
    } else if (grouping === "priority") {
      const priorityOrder = [4, 3, 2, 1, 0];
      const priorityNames = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No priority",
      };
      priorityOrder.forEach((priority) => {
        grouped[priorityNames[priority]] = tickets.filter(
          (ticket) => ticket.priority === priority
        );
      });
    }

    Object.keys(grouped).forEach((key) => {
      grouped[key].sort((a, b) => {
        if (sorting === "priority") {
          return b.priority - a.priority;
        } else {
          return a.title.localeCompare(b.title);
        }
      });
    });

    return grouped;
  };

  const getPriorityIcon = (priority) => {
    const icons = {
      4: "/SVG - Urgent Priority colour.svg",
      3: "/Img - High Priority.svg",
      2: "/Img - Medium Priority.svg",
      1: "/Img - Low Priority.svg",
      0: "/No-priority.svg",
      Urgent: "/SVG - Urgent Priority colour.svg",
      High: "/Img - High Priority.svg",
      Medium: "/Img - Medium Priority.svg",
      Low: "/Img - Low Priority.svg",
      "No priority": "/No-priority.svg",
    };
    return (
      <img src={icons[priority]} alt="Priority" className="priority-icon" />
    );
  };

  const getStatusIcon = (status) => {
    const icons = {
      Backlog: "/Backlog.svg",
      Todo: "/To-do.svg",
      "In progress": "/in-progress.svg",
      Done: "/Done.svg",
      Cancelled: "/Cancelled.svg",
    };
    return <img src={icons[status]} alt={status} className="status-icon" />;
  };

  const groupedTickets = getGroupedTickets();

  return (
    <div className="kanban-board">
      {Object.entries(groupedTickets).map(([group, tickets]) => (
        <div key={group} className="ticket-group">
          <div className="group-header">
            <div className="group-title">
              {grouping === "priority" && getPriorityIcon(group)}
              {grouping === "status" && getStatusIcon(group)}
              {grouping === "user" && (
                <div className="user-avatar">
                  {users.find((u) => u.name === group) &&
                    getUserAvatar(users.find((u) => u.name === group).id)}
                </div>
              )}
              <span>{group}</span>
              <span className="ticket-count">{tickets.length}</span>
            </div>
            <div className="group-actions">
              <img src="/add.svg" alt="Add" />
              <img src="/3 dot menu.svg" alt="More" />
            </div>
          </div>
          <div className="tickets-container">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                user={users.find((u) => u.id === ticket.userId)}
                getUserAvatar={getUserAvatar}
                grouping={grouping}
                getStatusIcon={getStatusIcon}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;
