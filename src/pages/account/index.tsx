import React from "react";
import PersonalInfo from "@/sections/PersonalInfo";

const Account = () => {
  return (
    <div>
      <div className="w-full h-24 bg-black" />
      <div className="mx-auto lg:max-w-7xl px-4 md:px-8 my-10 w-full">
        <PersonalInfo />
      </div>
    </div>
  );
};

export default Account;
