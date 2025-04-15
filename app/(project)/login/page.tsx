import { handleGoogleSignIn } from "@/app/actions/handle-google-auth";

export default function Login() {
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Login</h1>
      <form className="mt-10" action={handleGoogleSignIn}>
        <button
          className="border rounded-md p-2 cursor-pointer hover:bg-yellow-100"
          type="submit"
        >
          Signin with Google
        </button>
      </form>
    </div>
  );
}
