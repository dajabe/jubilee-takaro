import type { NextPage } from "next";
import {
  type SubmitHandler,
  useForm,
  useFieldArray,
  type Control,
  useWatch,
} from "react-hook-form";
import { api } from "~/utils/api";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationInput,
  type GuestSchema,
  type RegistrationSchema,
} from "~/types";
import { numberWords, ticketPrices } from "~/utils/generics";

const Form: NextPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RegistrationSchema>({
    defaultValues: {
      email: "",
      amount: 0,
      guests: [
        { firstName: "", lastName: "", isChild: false, ticketType: "both" },
      ],
    },
    resolver: zodResolver(registrationInput),
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

  const submitHandler: SubmitHandler<RegistrationSchema> = (rego) => {
    rego.amount = calcTotal(rego.guests);
    createRegistration(rego);
  };

  const calcTotal = (g: GuestSchema): number => {
    const total = g.reduce((acc, guest) => {
      if (guest.isChild) {
        return acc + ticketPrices.child;
      }
      if (guest.ticketType === "friday") {
        return acc + ticketPrices.friday;
      }
      if (guest.ticketType === "saturday") {
        return acc + ticketPrices.saturday;
      }
      return acc + ticketPrices.both;
    }, 0);

    return total;
  };

  const Total = ({ control }: { control: Control<RegistrationSchema> }) => {
    const guests = useWatch({
      name: "guests",
      control,
    });
    const total = calcTotal(guests);

    return (
      <div className="w-full text-end text-xl font-bold text-slate-800">
        Total: ${total}
      </div>
    );
  };

  return (
    <form
      className="mb-4 rounded-lg bg-slate-100 px-8 pb-8 pt-6 shadow-md"
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
          const watchChild = watch(`guests.${index}.isChild`);
          return (
            <div key={field.id}>
              {/* {index > 0 && ( */}
              <div className={`mt-6 ${index ? "" : "hidden"}`}>
                <hr className="border-2 border-slate-200" />
                <div className="my-5 flex-1 self-center text-xl font-bold text-slate-800">
                  {wordIndex + " guest"}
                </div>
                <div className="mb-5 flex justify-between md:text-left">
                  <label
                    htmlFor={`guests.${index}.isChild`}
                    className={`inline-flex cursor-pointer items-center rounded-lg border-orange-takaro font-bold`}
                  >
                    <input
                      id={`guests.${index}.isChild`}
                      className="peer hidden"
                      type="checkbox"
                      {...register(`guests.${index}.isChild` as const, {
                        value: false,
                        onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                          if (e.target.checked)
                            setValue(`guests.${index}.ticketType`, "friday");
                        },
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
              {/* )} */}
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
              <div className="mb-5 grid w-full gap-4 font-bold md:grid-cols-3">
                <input
                  {...register(`guests.${index}.ticketType` as const)}
                  id={`both-guest${wordIndex}`}
                  type="radio"
                  value="both"
                  className={`peer/both hidden`}
                  disabled={watchChild}
                />
                <label
                  htmlFor={`both-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 ${
                    watchChild ? "text-slate-200" : "text-slate-700"
                  } hover:bg-slate-100 peer-checked/both:bg-orange-takaro peer-checked/both:text-slate-800`}
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
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-100 peer-checked/friday:bg-orange-takaro peer-checked/friday:text-slate-800`}
                >
                  <span className="self-center">Friday</span>
                  <span className="self-center">
                    ${watchChild ? ticketPrices.child : ticketPrices.friday}
                  </span>
                </label>
                <input
                  {...register(`guests.${index}.ticketType` as const)}
                  id={`saturday-guest${wordIndex}`}
                  type="radio"
                  value="saturday"
                  className={`peer/saturday hidden`}
                  disabled={watchChild}
                />
                <label
                  htmlFor={`saturday-guest${wordIndex}`}
                  className={`inline-flex w-full cursor-pointer flex-col place-content-center rounded-lg border border-slate-200 bg-white p-2 ${
                    watchChild ? "text-slate-200" : "text-slate-700"
                  } hover:bg-slate-100 peer-checked/saturday:bg-orange-takaro peer-checked/saturday:text-slate-800`}
                >
                  <span className="self-center">Saturday (R18)</span>
                  <span className="self-center">${ticketPrices.saturday}</span>
                </label>
              </div>
            </div>
          );
        })}
      </div>
      <Total control={control} />
      <div className="mt-6 flex justify-between">
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
          className={`focus:shadow-outline rounded-lg bg-orange-takaro px-4  py-2 font-bold text-slate-900 shadow hover:bg-orange-400 focus:outline-none disabled:bg-slate-300`}
          type="submit"
          disabled={isRegistering}
        >
          {isRegistering ? (
            <>
              <svg
                aria-hidden="true"
                role="status"
                className="mr-3 inline h-6 w-6 animate-spin fill-orange-takaro text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="orange-takaro"
                />
              </svg>{" "}
              Registering
            </>
          ) : (
            "Register"
          )}
        </button>
      </div>
    </form>
  );
};

export default Form;
