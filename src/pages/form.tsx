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
          const wordIndex = numberWords[index] ?? "0";
          return (
            <div key={index}>
              {index > 0 && (
                <div className="mt-10">
                  <hr className="mb-10 border-2 border-slate-200" />
                  <div className="mb-5 flex justify-between md:text-left">
                    <div className="flex-1 self-center text-xl font-bold text-slate-800">
                      {wordIndex + " guest"}
                    </div>
                    <label
                      htmlFor={`guests.${index}.child`}
                      className="inline-flex cursor-pointer items-center rounded-lg border-orange-takaro font-bold"
                    >
                      <input
                        id={`guests.${index}.child`}
                        className="peer hidden"
                        type="checkbox"
                        {...register(`guests.${index}.child`)}
                      />
                      <span className="m-0 rounded-l-lg bg-orange-takaro px-4 py-2 text-slate-800 peer-checked:bg-slate-200">
                        Adult
                      </span>
                      <span className="m-0 rounded-r-lg bg-slate-200 px-4 py-2 peer-checked:bg-orange-takaro">
                        Child
                      </span>
                    </label>
                  </div>
                </div>
              )}
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={`firstName-guest${wordIndex}`}
                  className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id={`firstName-guest${wordIndex}`}
                  autoComplete="given-name"
                  {...register(`guests.${index}.firstName`, { required: true })}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={`lastName-guest${wordIndex}`}
                  className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id={`lastName-guest${wordIndex}`}
                  {...register(`guests.${index}.lastName`, { required: true })}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-2 block font-bold text-slate-800 md:mb-0 md:text-left">
                Which days will {index > 0 ? "they" : "you"} attend?
              </div>
              <div className="mb-5 grid w-full gap-2 font-bold md:grid-cols-3">
                <input
                  {...register(`guests.${index}.ticketType`)}
                  id={`saturday-guest${wordIndex}`}
                  type="radio"
                  value="saturday"
                  className={`peer/saturday hidden`}
                />
                <label
                  htmlFor={`saturday-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/saturday:border-orange-takaro peer-checked/saturday:text-orange-800`}
                >
                  Saturday
                </label>
                <input
                  {...register(`guests.${index}.ticketType`)}
                  id={`sunday-guest${wordIndex}`}
                  type="radio"
                  value="sunday"
                  className={`peer/sunday hidden`}
                />
                <label
                  htmlFor={`sunday-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/sunday:border-orange-takaro peer-checked/sunday:text-orange-800`}
                >
                  Sunday
                </label>
                <input
                  {...register(`guests.${index}.ticketType`)}
                  id={`both-guest${wordIndex}`}
                  type="radio"
                  value="both"
                  className={`peer/both hidden`}
                />
                <label
                  htmlFor={`both-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/both:border-orange-takaro peer-checked/both:text-orange-800`}
                >
                  Both
                </label>
              </div>
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
