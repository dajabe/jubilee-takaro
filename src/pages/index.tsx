import { type NextPage } from "next";

import Form from "~/components/form";

const Home: NextPage = () => {
  return (
    <>
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
            </p>
          </div>
          <div className="w-full max-w-md">
            <Form />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
