import type { NextPage } from "next";
import { type SubmitHandler, useForm } from "react-hook-form";
import { api } from "~/utils/api";
import { type Registrations } from "@prisma/client";

const Form: NextPage = () => {
  // const { data } = api.registrations.getAll.useQuery();
  const { register, handleSubmit } = useForm<Registrations>();

  const { mutate } = api.registrations.create.useMutation();

  const submitHandler: SubmitHandler<Registrations> = (rego) => {
    mutate(rego);
  };

  return (
    <form
      className="mb-4 rounded bg-white px-8 pb-8 pt-6 shadow-md"
      onSubmit={handleSubmit(submitHandler)}
    >
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
          className="w-full appearance-none rounded border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
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
          className="w-full appearance-none rounded border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
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
          className="w-full appearance-none rounded border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
        />
      </div>
      <button
        className="focus:shadow-outline rounded bg-orange-takaro px-4 py-2 font-bold text-slate-100 shadow hover:bg-orange-400 focus:outline-none"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default Form;
