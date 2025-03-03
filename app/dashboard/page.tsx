
import TodoContainer from "@/components/dashboard/todo/TodoContainer";
import React from "react";

const Dashboard = () => {
  return (
    <main className="pt-32 flex flex-col items-start gap-2 px-8">
      <TodoContainer />
    </main>
  );
};

export default Dashboard;
