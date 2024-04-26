"use client";

import { TailSpin } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-screen h-screen mx-auto flex justify-center items-center">
      <TailSpin
        visible={true}
        height="100"
        width="100"
        color="#ffffff"
        ariaLabel="tail-spin-loading"
        radius="1"
      />
    </div>
  );
}
