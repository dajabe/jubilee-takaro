import { type NextPage } from 'next'

import Form from '~/components/form'

const Home: NextPage = () => {
  return (
    <>
      <main className="text-slate-200 flex min-h-screen flex-col items-center bg-gradient-to-b from-[theme('colors.orange.takaro')] to-[#b47834]">
        <div className="absolute left-0 top-0 h-screen w-screen bg-opacity-30 bg-[url('/takaro-pattern-150.png')] bg-center bg-repeat "></div>
        <div className="z-10 flex w-screen flex-col items-center justify-center gap-6 px-4 py-10">
          <div className="flex w-3/4 flex-col items-center justify-center gap-4 rounded-2xl bg-zinc-800 p-12 shadow-md">
            <div className="flex flex-col items-center gap-2">
              <h1 className="mb-4 text-5xl font-extrabold tracking-tight drop-shadow-xl sm:text-[5rem]">
                50<sup>th</sup> JUBILEE'
              </h1>
              <p className="text-2xl">
                Register here to join the Takaro AFC 50th Jubilee celebration!
              </p>
              <p className="text-lg"></p>
              <p className="text-lg">
                This form will register you to attend the Takaro AFC 50th Jubilee dinner. Once you
                have registered here we will send you an invoice for payment. Once payment has been
                received your seat at the dinner will be confirmed. To confirm numbers for
                registrations please ensure you have paid entry a week before the event.
              </p>
            </div>
            <Form />
            <div></div>
          </div>
        </div>
      </main>
    </>
  )
}

export default Home
