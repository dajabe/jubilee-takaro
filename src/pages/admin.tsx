import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "~/utils/api";
import { SignInButton, useClerk, useUser } from "@clerk/nextjs";
// import { LoadingSpinner } from "~/components/loading";

const Home: NextPage = () => {
  // const { data, isLoading } = api.registrations.getAll.useQuery();
  const user = useUser();
  const { signOut } = useClerk();
  // if (isLoading) return <LoadingSpinner />;

  // if (!data) return <div>Something went wrong</div>;

  return (
    <>
      <Head>
        <title>Takaro AFC 50th Jubilee</title>
        <meta
          name="description"
          content="Register to come to Takaro AFC's 50th Jubilee celebration"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[theme('colors.orange.takaro')] to-[#b47834]">
        <div>
          {!user.isSignedIn && (
            <SignInButton mode="modal">
              <button className="focus:shadow-outline rounded bg-slate-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-slate-100 focus:outline-none">
                Sign In
              </button>
            </SignInButton>
          )}
          {user.isSignedIn && (
            <button
              onClick={() => signOut()}
              className="focus:shadow-outline rounded bg-slate-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-slate-100 focus:outline-none"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
      </main>
    </>
  );
};

export default Home;
