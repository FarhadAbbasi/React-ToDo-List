import { RotatingLines } from "react-loader-spinner";

export default function Spinner () {
  return (
    <RotatingLines
      strokeColor="red"
      strokeWidth="4"
      animationDuration="0.75"
      width="96"
      visible={true}
    />
  )
}

// you need to use this Loader component in the 
// TableComponentWithLoader component
