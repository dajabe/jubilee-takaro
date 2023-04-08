import type { NextPage } from "next";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { type Registrations } from "@prisma/client";

const Form: NextPage = () => {
  // const { data } = api.registrations.getAll.useQuery();
  const { register, handleSubmit, reset } = useForm<Registrations>();

  const { mutate } = api.registrations.create.useMutation();

  const submitHandler: SubmitHandler<Registrations> = (rego) => {
    mutate(rego);
    reset();
  };

  return (
    <form
      className="mb-4 rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
      onSubmit={handleSubmit(submitHandler)}
    >
      <ul className="mb-5 grid w-full gap-2 md:grid-rows-3">
        <li className="">
          <input
            {...register("ticketType")}
            id="saturday-ticket"
            type="radio"
            value="saturday"
            className="peer hidden"
          />
          <label
            htmlFor="saturday-ticket"
            className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white p-5 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Saturday</div>
              <div className="w-full">
                Just showing up for the first night and gift
              </div>
            </div>
          </label>
        </li>
        <li>
          <input
            {...register("ticketType")}
            id="sunday-ticket"
            type="radio"
            value="sunday"
            className="peer hidden"
          />
          <label
            htmlFor="sunday-ticket"
            className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white p-5 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Sunday</div>
              <div className="w-full">Just making it to the main event</div>
            </div>
          </label>
        </li>
        <li>
          <input
            {...register("ticketType")}
            id="both-ticket"
            type="radio"
            value="both"
            className="peer hidden"
          />
          <label
            htmlFor="both-ticket"
            className="inline-flex w-full cursor-pointer items-center justify-between rounded-lg border border-slate-200 bg-white p-5 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
          >
            <div className="block">
              <div className="w-full text-lg font-semibold">Both Days</div>
              <div className="w-full">There for the whole shindig</div>
            </div>
          </label>
        </li>
      </ul>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="firstName"
          className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
        >
          First Name
        </label>
        <input
          type="text"
          id="firstName"
          autoComplete="given-name"
          {...register("firstName", { required: true })}
          className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="lastName"
          className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
        >
          Last Name
        </label>
        <input
          type="text"
          id="lastName"
          {...register("lastName", { required: true })}
          className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
        />
      </div>
      <div className="mb-4 flex flex-col">
        <label
          htmlFor="email"
          className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register("email", { required: true })}
          className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
        />
      </div>
      <button
        className="focus:shadow-outline rounded-lg bg-orange-takaro px-4 py-2 font-bold text-slate-100 shadow hover:bg-orange-400 focus:outline-none"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Form;
