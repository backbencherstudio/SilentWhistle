import { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export const svg = ({ size = 24, ...props }: IconProps) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.10892 12.3083C1.93171 13.47 2.72398 14.2763 3.69403 14.6782C7.41299 16.2188 12.5883 16.2188 16.3073 14.6782C17.2773 14.2763 18.0696 13.47 17.8924 12.3083C17.7835 11.5944 17.245 10.9999 16.846 10.4194C16.3234 9.64971 16.2715 8.81018 16.2714 7.91699C16.2714 4.46521 13.4639 1.66699 10.0007 1.66699C6.53742 1.66699 3.72992 4.46521 3.72992 7.91699C3.72985 8.81018 3.67792 9.64971 3.15532 10.4194C2.75635 10.9999 2.21783 11.5944 2.10892 12.3083Z"
        stroke="#D2D2D5"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.66797 15.834C7.05004 17.2717 8.39758 18.334 10.0013 18.334C11.605 18.334 12.9526 17.2717 13.3346 15.834"
        stroke="#D2D2D5"
        strokeWidth="1.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
