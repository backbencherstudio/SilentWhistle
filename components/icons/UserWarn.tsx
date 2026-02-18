import type { SVGProps } from "react";
const UserWarn = (props: SVGProps<SVGSVGElement>) => {
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
        d="M13.3335 18.3334L15.8335 15.8334M15.8335 15.8334L18.3335 13.3334M15.8335 15.8334L13.3335 13.3334M15.8335 15.8334L18.3335 18.3334"
        stroke="currentColor"
        strokeWidth="1.13"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default UserWarn;
