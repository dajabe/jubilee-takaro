import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";
import Form from "./form";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";
import { LoadingSpinner } from "~/components/loading";

const Home: NextPage = () => {
  const { data, isLoading } = api.registrations.getAll.useQuery();
  const user = useUser();

  if (isLoading) return <LoadingSpinner />;

  if (!data) return <div>Something went wrong</div>;

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
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="container flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-slate-100 sm:text-[4rem]">
              Takaro AFC
            </h2>
            <h1 className="text-5xl font-extrabold tracking-tight text-slate-100 sm:text-[5rem]">
              50th Jubilee
            </h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-slate-100">
              Book your spot at our 50th Jubilee celebration now!
              <br />
              {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
            </p>
          </div>
          <div className="w-full max-w-md">
            <Form />
          </div>
        </div>
        <div>
          {!user.isSignedIn && (
            <SignInButton mode="modal">
              <button className="focus:shadow-outline rounded bg-slate-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-slate-100 focus:outline-none">
                Sign In
              </button>
            </SignInButton>
          )}
          {user.isSignedIn && (
            <SignOutButton>
              <button className="focus:shadow-outline rounded bg-slate-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-slate-100 focus:outline-none">
                Sign Out
              </button>
            </SignOutButton>
          )}
        </div>
        <ul>
          {data?.map((registration) => (
            <li key={registration.id}>{registration.email}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default Home;
