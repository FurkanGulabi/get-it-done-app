import AddTodoButton from "@/components/dashboard/todo/AddTodoButton";
import TodoContainer from "@/components/dashboard/todo/TodoContainer";
import React from "react";

const Dashboard = () => {
  return (
    <main className="pt-28 flex flex-col items-start gap-2 px-8">
      <p>Dashboard</p>
      <AddTodoButton />
      <TodoContainer />
    </main>
  );
};

export default Dashboard;
