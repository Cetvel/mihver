import React from "react";
import { Button } from "../ui/button";
import { Check, Trash } from "lucide-react";

type DetailedTaskProps = {
  task: Task;
};

const DetailedTask = ({ task }: DetailedTaskProps) => {
  return (
    <div className="flex items-center rounded-r-xl rounded-l-sm gap-6 justify-between p-4 bg-base-100 border-l-4 border-l-primary group">
      <div className="flex-col space-y-2">
        <h3 className="header-4">{task.title}</h3>
        <span className="px-2 py-1 rounded-xl bg-card inline-block">
          {task.tag}
        </span>
      </div>

      <div className="flex items-center gap-2 md:opacity-0 group-hover:opacity-100 md:scale-90 group-hover:scale-100 transition-all duration-300">
        <Button size="icon-sm">
          <Check className="w-5 h-5" />
        </Button>
        <Button size="icon-sm">
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default DetailedTask;