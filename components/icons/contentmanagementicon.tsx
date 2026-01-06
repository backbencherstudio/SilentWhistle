import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const contentManagementIcon = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.7513 9.91699H12.418M5.7513 5.75033H9.08464"
        stroke="#D2D2D5"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.16568 14.5C3.08225 14.3934 2.27063 14.068 1.72631 13.5237C0.75 12.5474 0.75 10.976 0.75 7.83333V7.41667C0.75 4.27397 0.75 2.70262 1.72631 1.72631C2.70262 0.75 4.27397 0.75 7.41667 0.75H10.75C13.8927 0.75 15.464 0.75 16.4404 1.72631C17.4167 2.70262 17.4167 4.27397 17.4167 7.41667V7.83333C17.4167 10.976 17.4167 12.5474 16.4404 13.5237C15.464 14.5 13.8927 14.5 10.75 14.5C10.2829 14.5104 9.91095 14.5459 9.54549 14.6292C8.54685 14.8591 7.6221 15.3701 6.70822 15.8157C5.40607 16.4507 4.755 16.7682 4.34641 16.4709C3.56474 15.8888 4.32878 14.0849 4.5 13.25"
        stroke="#D2D2D5"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};
