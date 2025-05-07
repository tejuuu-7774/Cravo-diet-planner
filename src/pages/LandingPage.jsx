import { Link } from "react-router-dom";

export default function Landing(){
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white text-orange-400">
      <img src="src/Images/Cravologo.png" alt="CRAVO Logo" className="w-50 h-50 " />
      <h1 className="text-4xl font-bold mb-2 italic">Welcome to CRAVO</h1>
      <p className="mb-6 text-lg text-center max-w-xl italic">Plan your meals. Track your calories. Live healthier every day.</p>
      <div className="flex gap-4">
        <Link to="/login" className="px-7 py-2 bg-orange-400 text-white rounded-xl hover:bg-orange-500">Login</Link>
        <Link to="/signup" className="px-6 py-2 border border-orange-500 text-orange-500 rounded-xl hover:bg-orange-100">Sign Up</Link>
      </div>
    </div>
  );
};

