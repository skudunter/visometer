import Image from "next/image";
function LoadingSpinner() {
  return <Image src='/loadingIndicators/tail-spin.svg' width={100} height={100} alt="loading-indicator"></Image>;
}
export default LoadingSpinner;
