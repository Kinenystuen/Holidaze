import LoginForm from "../../../components/Auth/LoginForm";
import { Link } from "react-router-dom";

const PageAuth = () => {
  return (
    <div className="bg-slate-700 text-white min-h-screen flex items-center justify-center">
      <LoginForm />
      <Link to="/">Home</Link>
    </div>
  );
};

export default PageAuth;
