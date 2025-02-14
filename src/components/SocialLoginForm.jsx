import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { socialLoginAction } from "@/app/actions/authActions";

const SocialLoginForm = () => {
  return (
    <form className="flex flex-col gap-3 mt-4" action={socialLoginAction}>
      <button
        className="flex items-center justify-center gap-2 bg-transparent hover:bg-gray-100 text-gray-500 text-sm font-semibold py-2 px-4 border border-gray-300 rounded"
        type="submit"
        name="action"
        value="google"
      >
        <FcGoogle className="text-lg" /> Log in with Google
      </button>
      <button
        className="flex items-center justify-center gap-2 bg-transparent hover:bg-gray-100 text-gray-500 text-sm font-semibold py-2 px-4 border border-gray-300 rounded"
        type="submit"
        name="action"
        value="github"
      >
        <FaGithub className="text-lg" /> Log in with GitHub
      </button>
    </form>
  );
};

export default SocialLoginForm;
