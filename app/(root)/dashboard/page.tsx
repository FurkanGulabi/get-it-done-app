import AddTodoButton from "@/components/dashboard/todo/AddTodoButton";
import React from "react";

const Dashboard = () => {
  return (
    <main className="pt-28 flex flex-col items-start  px-8">
      <p>Dashboard</p>
      <AddTodoButton />
      <div>{/* <TodoList /> */}</div>
    </main>
  );
};

export default Dashboard;
