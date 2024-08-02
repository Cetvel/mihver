import React from "react";
import Banner from "./_components/banner";
import DatePicker from "./_components/date-picker";
import TaskList from "./_components/task-list";
import Timer from "./_components/timer";
import PageHeader from "@/components/global/page-header";
import { instance } from "@/lib/utils";

const page = async () => {
  return (
    <>
      <PageHeader title="Panel" />
      <div className="flex flex-col gap-6 h-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 place-items-stretch lg:grid-cols-7 flex-1 gap-y-6 gap-x-6 items-center">
          <Banner />
          <DatePicker />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-7 items-stretch flex-1 gap-y-6 lg:gap-x-6">
          <TaskList />
          <Timer />
        </div>
      </div>
    </>
  );
};

export default page;
