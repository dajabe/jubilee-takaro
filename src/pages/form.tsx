import type { NextPage } from "next";
import { type SubmitHandler, useForm, Controller } from "react-hook-form";
import { api } from "~/utils/api";
import { type Registrations } from "@prisma/client";
import { useState } from "react";

type RegistrationFormData = {
  email: string;
  guests: {
    firstName: string;
    lastName: string;
    child: boolean;
    ticketType: string;
  }[];
  guestCount: number;
};

const Form: NextPage = () => {
  const numberWords = [
    "Zero",
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
  ];
  // const { data } = api.registrations.getAll.useQuery();
  const [guestCount, setGuestCount] = useState(1);

  const { register, control, handleSubmit, reset } =
    useForm<RegistrationFormData>();

  const { mutate } = api.registrations.create.useMutation();

  const submitHandler: SubmitHandler<RegistrationFormData> = (rego) => {
    console.log(rego);
    // mutate(rego);
    reset();
  };

  const incrementGuestCount = () => {
    if (guestCount < 9) setGuestCount(guestCount + 1);
  };

  const decrementGuestCount = () => {
    if (guestCount > 1) setGuestCount(guestCount - 1);
  };

  return (
    <form
      className="mb-4 rounded-lg bg-white px-8 pb-8 pt-6 shadow-md"
      onSubmit={handleSubmit(submitHandler)}
    >
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
      <div className="mb-5">
        <label
          htmlFor="guestCount"
          className="w-full text-sm font-semibold text-gray-700"
        >
          Number of attendees
        </label>
        <div className="relative mt-1 flex h-10 w-full flex-row rounded-lg bg-transparent">
          <button
            onClick={decrementGuestCount}
            className=" h-full w-20 cursor-pointer rounded-l bg-gray-300 text-gray-600 outline-none hover:bg-gray-400 hover:text-gray-700"
          >
            <span className="m-auto text-2xl font-thin">−</span>
          </button>
          <input
            type="number"
            className="text-md md:text-basecursor-default flex w-full items-center bg-gray-300 text-center font-semibold text-gray-700 outline-none hover:text-black focus:text-black  focus:outline-none"
            {...register("guestCount", {
              valueAsNumber: true,
              min: 1,
              max: 9,
            })}
            value={guestCount}
            readOnly
          />
          <button
            onClick={incrementGuestCount}
            className="h-full w-20 cursor-pointer rounded-r bg-gray-300 text-gray-600 hover:bg-gray-400 hover:text-gray-700"
          >
            <span className="m-auto text-2xl font-thin">+</span>
          </button>
        </div>
      </div>
      <div>
        {Array.from({ length: guestCount }).map((_, index) => {
          return (
            <div key={index}>
              {index > 0 && (
                <div className="mt-10">
                  <hr className="mb-10 border-2 border-slate-200" />
                  <div className="mb-5 flex justify-between md:text-left">
                    <div className="flex-1 self-center text-xl font-bold text-slate-800">
                      {typeof numberWords[index] !== "undefined"
                        ? numberWords[index]
                        : ""}
                      {" guest"}
                    </div>
                    <label
                      htmlFor={`guests.${index}.child`}
                      className="inline-flex cursor-pointer items-center rounded-lg border-orange-takaro font-bold"
                    >
                      <input
                        id={`guests.${index}.child`}
                        className="peer/isChild hidden"
                        type="checkbox"
                        {...register(`guests.${index}.child`)}
                      />
                      <span className="m-0 rounded-l-lg bg-orange-takaro px-4 py-2 text-slate-800 peer-checked/isChild:bg-slate-200">
                        Adult
                      </span>
                      <span className="m-0 rounded-r-lg bg-slate-200 px-4 py-2 peer-checked/isChild:bg-orange-takaro">
                        Child
                      </span>
                    </label>
                  </div>
                </div>
              )}
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
                  {...register(`guests.${index}.firstName`, { required: true })}
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
                  {...register(`guests.${index}.lastName`, { required: true })}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-2 block font-bold text-slate-800 md:mb-0 md:text-left">
                Which days will {index > 0 ? "they" : "you"} attend?
              </div>
              <ul className="mb-5 grid w-full gap-2 font-bold md:grid-cols-3">
                <li className="">
                  <input
                    {...register(`guests.${index}.ticketType`)}
                    id="saturday-ticket"
                    type="radio"
                    value="saturday"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="saturday-ticket"
                    className="inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
                  >
                    Saturday
                  </label>
                </li>
                <li>
                  <input
                    {...register(`guests.${index}.ticketType`)}
                    id="sunday-ticket"
                    type="radio"
                    value="sunday"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="sunday-ticket"
                    className="inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
                  >
                    Sunday
                  </label>
                </li>
                <li>
                  <input
                    {...register(`guests.${index}.ticketType`)}
                    id="both-ticket"
                    type="radio"
                    value="both"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="both-ticket"
                    className="inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked:border-orange-takaro peer-checked:text-orange-800"
                  >
                    Both
                  </label>
                </li>
              </ul>
            </div>
          );
        })}
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
