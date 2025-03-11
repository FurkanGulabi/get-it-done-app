
import TodoContainer from "@/components/dashboard/todo/TodoContainer";
import React, { Suspense } from "react";

const Dashboard = () => {
  return (
    <main className="pt-32 flex flex-col items-start gap-2 px-8">
      <Suspense>
        <TodoContainer />
      </Suspense>
    </main>
  );
};

export default Dashboard;
