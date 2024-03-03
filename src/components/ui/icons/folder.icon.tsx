interface FolderIconProps {
  width: number;
  height: number | 'auto';
  fill: string;
  hover?: boolean;
}

function FolderIcon({ width, height, fill, hover = false }: FolderIconProps) {
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
      viewBox="0 0 24 24"
    >
      <path
        fill={fill}
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 6a2 2 0 012-2h3.93a2 2 0 011.664.89l.812 1.22A2 2 0 0013.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V6z"
      />
    </svg>
  );
}

export default FolderIcon;
