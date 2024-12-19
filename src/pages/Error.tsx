import { Link, useRouteError } from "react-router-dom";

export default function Error() {
  const error = useRouteError();
  console.log(error);
  return (
    <main className="flex flex-col w-screen h-screen items-center justify-center gap-4">
      {/* <h3>{error?.data || "Unexpected error occurred"}</h3> */}
      <Link to="/dashboard" className="underline">
        Back To Home
      </Link>
    </main>
  );
}
