interface Props {
  stroke?: string;
}

const RoundChat = ({ stroke = "#D2D2D5" }: Props) => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.2316 8.5372C17.2316 12.9398 13.5001 16.5095 8.89827 16.5095C8.35718 16.5102 7.81764 16.4601 7.28612 16.3603C6.90355 16.2885 6.71226 16.2525 6.57871 16.2729C6.44517 16.2933 6.25592 16.394 5.87743 16.5953C4.80672 17.1647 3.55823 17.3657 2.35753 17.1424C2.81389 16.5811 3.12556 15.9076 3.26309 15.1856C3.34642 14.744 3.13994 14.3149 2.83068 14.0009C1.42605 12.5746 0.564941 10.6525 0.564941 8.5372C0.564941 4.13458 4.29642 0.564941 8.89827 0.564941C13.5001 0.564941 17.2316 4.13458 17.2316 8.5372Z"
        stroke={stroke}
        stroke-width="1.13"
        stroke-linejoin="round"
      />
      <path
        d="M8.89454 8.89832H8.90201M12.2241 8.89832H12.2316M5.56494 8.89832H5.57242"
        stroke={stroke}
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default RoundChat;
