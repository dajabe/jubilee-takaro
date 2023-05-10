import { type NextPage } from "next";

import Form from "~/components/form";

const Home: NextPage = () => {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[theme('colors.orange.takaro')] to-[#b47834]">
        <div className="absolute left-0 top-0 h-full w-full bg-opacity-30 bg-[url('/takaro-pattern-150.png')] bg-center bg-repeat "></div>
        <div className="z-10 flex w-screen flex-col items-center justify-center gap-6 px-4 py-16">
          <div className="container flex flex-col items-center justify-center gap-4">
            <Form />
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
