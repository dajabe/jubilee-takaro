import type { NextPage } from "next";
import { type SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";

type RegistrationFormData = {
  email: string;
  guests: {
    firstName: string;
    lastName: string;
    isChild: boolean;
    ticketType: "both" | "saturday" | "friday";
  }[];
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

  const ticketPrices = {
    child: 10,
    friday: 25,
    saturday: 85,
    both: 100,
  };

  const { register, handleSubmit, reset, control } =
    useForm<RegistrationFormData>({
      defaultValues: {
        guests: [
          { firstName: "", lastName: "", isChild: false, ticketType: "both" },
        ],
      },
      mode: "onBlur",
    });

  const { fields, append, remove } = useFieldArray({
    name: "guests",
    rules: {
      minLength: 1,
    },
    control,
  });

  const { mutate: createRegistration, isLoading: isRegistering } =
    api.registrations.create.useMutation({
      onSuccess: () => {
        toast.success(
          "You are now registered please check your inbox for a confirmation email"
        );
        reset();
      },
      onError: () => {
        toast.error(
          "Something went wrong with the registration please contact jubilee@takaroafc.co.nz"
        );
      },
    });

  const submitHandler: SubmitHandler<RegistrationFormData> = (rego) => {
    if (rego.guests[0]) rego.guests[0].isChild = false;
    createRegistration(rego);
    console.log(rego);
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
      <div>
        {fields.map((field, index) => {
          const wordIndex = numberWords[index] ?? "0";
          return (
            <div key={field.id}>
              {index > 0 && (
                <div className="mt-6">
                  <hr className="border-2 border-slate-200" />
                  <div className="my-5 flex-1 self-center text-xl font-bold text-slate-800">
                    {wordIndex + " guest"}
                  </div>
                  <div className="mb-5 flex justify-between md:text-left">
                    <label
                      htmlFor={`guests.${index}.isChild`}
                      className="inline-flex cursor-pointer items-center rounded-lg border-orange-takaro font-bold"
                    >
                      <input
                        id={`guests.${index}.isChild`}
                        className="peer hidden"
                        type="checkbox"
                        {...register(`guests.${index}.isChild` as const, {
                          required: true,
                        })}
                      />
                      <span className="m-0 rounded-l-lg bg-orange-takaro px-4 py-2 text-slate-800 peer-checked:bg-slate-200">
                        Adult
                      </span>
                      <span className="m-0 rounded-r-lg bg-slate-200 px-4 py-2 peer-checked:bg-orange-takaro">
                        Child
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="focus:shadow-outline rounded-lg bg-slate-700 px-4 py-2 font-bold text-slate-100 shadow hover:bg-red-800 focus:outline-none"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={`guests.${index}.firstName`}
                  className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id={`guests.${index}.firstName`}
                  autoComplete="given-name"
                  {...register(`guests.${index}.firstName` as const, {
                    required: true,
                  })}
                  defaultValue={field.firstName}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4 flex flex-col">
                <label
                  htmlFor={`guests.${index}.lastName`}
                  className="mb-1 block pr-4 font-bold text-slate-800 md:mb-0 md:text-left"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id={`guests.${index}.lastName`}
                  {...register(`guests.${index}.lastName` as const, {
                    required: true,
                  })}
                  defaultValue={field.lastName}
                  className="w-full appearance-none rounded-lg border-2 border-slate-200 bg-slate-100 px-4 py-2 leading-tight text-slate-800 focus:border-orange-takaro focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-2 block font-bold text-slate-800 md:mb-0 md:text-left">
                Which days will {index > 0 ? "they" : "you"} attend?
              </div>
              <div className="mb-5 grid w-full gap-2 font-bold md:grid-cols-3">
                <input
                  {...register(`guests.${index}.ticketType` as const)}
                  id={`both-guest${wordIndex}`}
                  type="radio"
                  value="both"
                  className={`peer/both hidden`}
                />
                <label
                  htmlFor={`both-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/both:bg-orange-takaro peer-checked/both:text-slate-800`}
                >
                  <span className="self-center">Both days</span>{" "}
                  <span className="self-center">${ticketPrices.both}</span>
                </label>
                <input
                  {...register(`guests.${index}.ticketType` as const)}
                  id={`friday-guest${wordIndex}`}
                  type="radio"
                  value="friday"
                  className={`peer/friday hidden`}
                />
                <label
                  htmlFor={`friday-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/friday:bg-orange-takaro peer-checked/friday:text-slate-800`}
                >
                  <span className="self-center">Friday</span>
                  <span className="self-center">${ticketPrices.friday}</span>
                </label>
                <input
                  {...register(`guests.${index}.ticketType` as const)}
                  id={`saturday-guest${wordIndex}`}
                  type="radio"
                  value="saturday"
                  className={`peer/saturday hidden`}
                />
                <label
                  htmlFor={`saturday-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-600 peer-checked/saturday:bg-orange-takaro peer-checked/saturday:text-slate-800`}
                >
                  <span className="self-center">Saturday</span>
                  <span className="self-center">${ticketPrices.saturday}</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-10 flex justify-between">
        <button
          type="button"
          onClick={() =>
            append({
              firstName: "",
              lastName: "",
              isChild: false,
              ticketType: "both" as const,
            })
          }
          className="focus:shadow-outline rounded-lg bg-orange-takaro px-4 py-2 font-bold text-slate-900 shadow hover:bg-orange-400 focus:outline-none"
        >
          <span className="m-auto">Add Guest</span>
        </button>

        <button
          className="focus:shadow-outline rounded-lg bg-orange-takaro px-4 py-2 font-bold text-slate-900 shadow hover:bg-orange-400 focus:outline-none"
          type="submit"
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default Form;
