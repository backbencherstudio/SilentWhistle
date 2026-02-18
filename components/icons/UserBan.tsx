import type { SVGProps } from "react";
const UserBan = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.8332 18.3333H5.49223C4.20441 18.3333 3.1801 17.7066 2.26039 16.8304C0.377641 15.0367 3.46884 13.6033 4.64782 12.9013C6.64716 11.7108 9.03526 11.3812 11.2498 11.9126"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.75 5.41663C13.75 7.48769 12.0711 9.16663 10 9.16663C7.92893 9.16663 6.25 7.48769 6.25 5.41663C6.25 3.34556 7.92893 1.66663 10 1.66663C12.0711 1.66663 13.75 3.34556 13.75 5.41663Z"
        stroke="currentColor"
        strokeWidth="1.13"
      />
      <path
        d="M13.375 13.375L17.4583 17.4583M18.3333 15.4167C18.3333 13.8058 17.0275 12.5 15.4167 12.5C13.8058 12.5 12.5 13.8058 12.5 15.4167C12.5 17.0275 13.8058 18.3333 15.4167 18.3333C17.0275 18.3333 18.3333 17.0275 18.3333 15.4167Z"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserBan;
