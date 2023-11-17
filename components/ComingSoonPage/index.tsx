import Image from "next/image";
import React from "react";

export const ComingSoon = () => {
  return (
    <div>
      <Image
        src="/images/maintenance-mode.jpg"
        alt="coming soon"
        width={1920}
        height={1024}
      />
    </div>
  );
};
