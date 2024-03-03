interface FileIconProps {
  width: number;
  height: number | 'auto';
  fill: string;
  hover?: boolean;
}

function FileIcon({ width, height, fill, hover = false }: FileIconProps) {
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
        fill-rule="evenodd"
        d="M12 2H6a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-8h-6a3 3 0 0 1-3-3V2zm9 7v-.172a3 3 0 0 0-.879-2.12l-3.828-3.83A3 3 0 0 0 14.172 2H14v6a1 1 0 0 0 1 1h6z"
        clip-rule="evenodd"
      />
    </svg>
  );
}

export default FileIcon;
