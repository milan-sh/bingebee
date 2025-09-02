import { Frown } from "lucide-react";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white">
      <p className="text-gray-600">OOPS! PAGE NOT FOUND</p>
      <h1 className="text-6xl md:text-8xl font-bold my-4">404</h1>
      <div className="text-gray-600 text-center">
        <p>WE ARE SORRY, BUT THE PAGE YOU REQUESTED</p>
        <p>WAS NOT FOUND</p>
        <Frown size={46} className="mx-auto mt-4 text-white"/>
      </div>
      <Link to={"/"} className="text-lg underline underline-offset-8 decoration-white text-blue-600">Return to home page</Link>
    </div>
  );
};

export default NotFound;
