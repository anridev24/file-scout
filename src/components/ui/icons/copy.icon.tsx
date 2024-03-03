interface CopyIconProps {
  width: number;
  height: number | 'auto';
  fill: string;
  hover?: boolean;
}

function CopyIcon({ width, height, fill, hover = false }: CopyIconProps) {
  return (
    <svg
      className={
        hover
          ? 'cursor-pointer filter transition-all duration-150 ease-in-out hover:brightness-75'
          : ''
      }
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 512 512"
    >
      <path
        fill={fill}
        d="M408 480H184a72 72 0 01-72-72V184a72 72 0 0172-72h224a72 72 0 0172 72v224a72 72 0 01-72 72z"
      />
      <path
        fill={fill}
        d="M160 80h235.88A72.12 72.12 0 00328 32H104a72 72 0 00-72 72v224a72.12 72.12 0 0048 67.88V160a80 80 0 0180-80z"
      />
    </svg>
  );
}

export default CopyIcon;
