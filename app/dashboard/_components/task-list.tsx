"use client";

import React, { useEffect, useState } from "react";
import TagManager from "./tag-manager";
import Task from "./task";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Reorder } from "framer-motion";
import { filterTasks } from "./task-filter";
import AddTask from "@/components/global/add-task";
import TagFilter from "@/components/global/tag-filter";
import StatusFilter from "@/components/global/status-filter";
import { Card } from "@/components/ui/card";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";

const Tasktag = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const {
    data: taskData,
    error,
    isLoading,
  } = useSWR<Task[]>("/todo/today", fetcher, {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
  });

  useEffect(() => {
    if (taskData) {
      setTasks(taskData);
    }
  }, [taskData]);

  return (
    <>
      <aside className="flex flex-col gap-4 flex-grow lg:col-span-5">
        <div className="items-center justify-between flex">
          <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6 md:pl-4 flex-1">
            <h2 className="text-lg font-bold text-secondary-foreground whitespace-nowrap mt-0.5">
              Bugünün Görevleri
            </h2>
            <div className="flex gap-3 items-center">
              <TagFilter onChange={setSelectedTag} />
              <StatusFilter onChange={setSelectedStatus} />
              <TagManager />
            </div>
          </div>
          <AddTask />
        </div>

        <Card className="p-2 md:p-4">
          <ScrollArea className="h-[300px] lg:h-[292px] flex-grow overflow-x-hidden">
            <Reorder.Group axis="y" values={tasks} onReorder={setTasks}>
              <div className="flex flex-col gap-3 w-full">
                {isLoading && <p>Loading...</p>}
                {error && <p>Error: {error.message}</p>}
                {tasks.length === 0 && !isLoading && <p>There are no tasks.</p>}
                {filterTasks(tasks, selectedTag, selectedStatus).map((task) => (
                  <Task key={task._id} task={task} />
                ))}
              </div>
            </Reorder.Group>
          </ScrollArea>
        </Card>
      </aside>
    </>
  );
};

export default Tasktag;