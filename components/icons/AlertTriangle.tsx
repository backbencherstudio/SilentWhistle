interface Props {
  stroke: string;
}
const AlertTriangle = ({ stroke = "#D2D2D5" }: Props) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.43459 8.06915C6.44599 4.51003 7.45169 2.73047 8.83172 2.27238C9.59093 2.02037 10.4087 2.02037 11.168 2.27238C12.548 2.73047 13.5537 4.51003 15.5651 8.06915C17.5765 11.6283 18.5822 13.4078 18.2805 14.8578C18.1145 15.6555 17.7056 16.3791 17.1124 16.9248C16.034 17.9167 14.0226 17.9167 9.99984 17.9167C5.97704 17.9167 3.96565 17.9167 2.88731 16.9248C2.29407 16.3791 1.88516 15.6555 1.71919 14.8578C1.4175 13.4078 2.4232 11.6283 4.43459 8.06915Z"
        stroke={stroke}
        stroke-width="1.13"
      />
      <path
        d="M9.99349 13.3334H10.001"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M10 10.8334L10 7.50004"
        stroke={stroke}
        stroke-width="1.13"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default AlertTriangle;
