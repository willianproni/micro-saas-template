import { handleGoogleSignOut } from "@/app/actions/handle-google-auth";
import { auth } from "@/app/lib/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if(!session){
    redirect("/login")
  }

    const email = session?.user?.name;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <h2 className="text-1xl font-bold text-gray-800">
          Bem-vindo {email ? email : "Usuário"}
        </h2>
      </header>

      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Card 1</h2>
          <p className="text-gray-600">This is a simple card description.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Card 2</h2>
          <p className="text-gray-600">This is another card description.</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-700">Card 3</h2>
          <p className="text-gray-600">Yet another card description.</p>
        </div>
      </main>

      <footer>
        {email ? (
          <form action={handleGoogleSignOut}>
            <button
              className="border rounded-md p-2 cursor-pointer hover:bg-yellow-100"
              type="submit"
            >
              LogOut
            </button>
          </form>
        ) : null}
      </footer>
    </div>
  );
};

export default DashboardPage;
