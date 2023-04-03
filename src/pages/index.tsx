import { type NextPage } from "next";
import Head from "next/head";

// import { api } from "~/utils/api";
import Form from "./form";
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs";

const Home: NextPage = () => {
  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  // const secretMessage = api.example.getSecretMessage.useQuery();

  const user = useUser();

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
            <Form />
          </div>
        </div>
        <div>
          {!user.isSignedIn && (
            <SignInButton mode="modal">
              <button className="focus:shadow-outline rounded bg-gray-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-white focus:outline-none">
                Sign In
              </button>
            </SignInButton>
          )}
          {user.isSignedIn && (
            <SignOutButton>
              <button className="focus:shadow-outline rounded bg-gray-200 px-4 py-2 font-bold text-orange-takaro shadow hover:bg-white focus:outline-none">
                Sign Out
              </button>
            </SignOutButton>
          )}
        </div>
      </main>
    </>
  );
};

export default Home;
