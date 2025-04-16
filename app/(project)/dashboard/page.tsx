import { handleGoogleSignOut } from "@/app/actions/handle-google-auth";
import { auth } from "@/app/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  const email = session?.user?.name;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <header className="bg-white shadow-md p-4 mb-6 flex justify-between items-center">
        <div>
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <h2 className="text-1xl font-bold text-gray-800">
          Bem-vindo {email ? email : "Usuário"}
        </h2>
        </div>
        <div className="flex space-x-4">
          <Link href={"/payments"}>Pagamentos</Link>

          {email ? (
            <form action={handleGoogleSignOut}>
              <button
                type="submit"
              >
                Sair
              </button>
            </form>
          ) : null}
        </div>
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

      <footer></footer>
    </div>
  );
};

export default DashboardPage;
