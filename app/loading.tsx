import LoadingSpinner from "./_components/loadingSpinner";
export default function HomePageLoading() {
  return (
    <div className="bg-primary flex justify-center items-center h-screen">
      <div className="scale-150">
        <LoadingSpinner />
      </div>
    </div>
  );
}
