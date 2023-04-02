import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "~/utils/api";

const Home: NextPage = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const secretMessage = api.example.getSecretMessage.useQuery();

  return (
    <>
      <Head>
        <title>Takaro AFC 50th Jubilee</title>
        <meta
          name="description"
          content="Register to come to Takaro AFC's 50th Jubilee celebration"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[theme('colors.orange.takaro')] to-[#b47834]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <div className="container flex flex-col items-center justify-center gap-4">
            <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-[4rem]">
              Takaro AFC
            </h2>
            <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
              50th Jubilee
            </h1>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              Book your spot at our 50th Jubilee celebration now!
              <br />
              {/* {hello.data ? hello.data.greeting : "Loading tRPC query..."} */}
            </p>
          </div>
          <div className="w-full max-w-md">
            <form
              className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
              action="/register"
              method="post"
            >
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="firstName"
                  className="mb-1 block pr-4 font-bold text-gray-700 md:mb-0 md:text-left"
                >
                  First Name
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  id="firstName"
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="lastName"
                  className="mb-1 block pr-4 font-bold text-gray-700 md:mb-0 md:text-left"
                >
                  Last Name
                </label>
                <input
                  required
                  type="text"
                  name="lastName"
                  id="lastName"
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor="email"
                  className="mb-1 block pr-4 font-bold text-gray-700 md:mb-0 md:text-left"
                >
                  Email
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  id="email"
                  className="w-full appearance-none rounded border-2 border-gray-200 bg-gray-200 px-4 py-2 leading-tight text-gray-700 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <button
                className="focus:shadow-outline rounded bg-orange-takaro px-4 py-2 font-bold text-white shadow hover:bg-orange-400 focus:outline-none"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
