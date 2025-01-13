

// components

import CardSettings from "@/components/Cards/CardSettings.jsx";

export default function Settings() {
  return (
    <>
      <div className="flex flex-wrap bg-white">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full lg:w-4/12 px-4">
        </div>
      </div>
    </>
  );
}
