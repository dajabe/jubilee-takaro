import { type NextPage } from "next";

import Form from "~/components/form";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[theme('colors.orange.takaro')] to-[#b47834]">
        <div className="absolute left-0 top-0 h-full w-full bg-opacity-60 bg-[url('/takaro-pattern-150.png')] bg-repeat "></div>
        <div className="z-10 flex w-screen flex-col items-center justify-center gap-6 px-4 py-16">
          <div className="container flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center gap-2">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-200 drop-shadow-xl sm:text-[5rem]">
                50th Jubilee
              </h1>
              <p className="text-2xl text-slate-200">
                Book your spot at our 50th Jubilee celebration now!
              </p>
            </div>
            <Form />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
