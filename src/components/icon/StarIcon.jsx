export default function StarIcon(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5 text-primary"
      {...props}
    >
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        fill={props.fill ?? 'currentColor'}
        d="M12 3.5l2.36 4.78 5.28.77-3.82 3.72.9 5.25L12 15.8l-4.72 2.22.9-5.25-3.82-3.72 5.28-.77z"
      />
    </svg>
  )
}
