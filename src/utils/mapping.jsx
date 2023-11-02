const priorityNames = {
  4: "Urgent",
  3: "High",
  2: "Medium",
  1: "Low",
  0: "No Priority",
};

const getPriorityName = (priority) => {
  return priorityNames[priority] || "No Priority";
};

const userAvailabilityColor = (available) => {
  return available ? "#e8b603" : "#dfe1e4";
};

export { getPriorityName, userAvailabilityColor };
