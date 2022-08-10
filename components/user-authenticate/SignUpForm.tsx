import { useEffect, useState } from "react";
import classNames from "classnames";

const isEmpty = (value: string) => value.trim() === "";

const isNineChars = (value: string) => value.trim().length >= 9;

const emailValidation = (value: string) => {
  const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (value.match(pattern)) {
    return true;
  } else {
    return false;
  }
};

type APIMessage = {
  message?: string;
  email?: boolean;
  userName?: boolean;
  success?: boolean;
};

const initialAPIMessage = {
  message: "",
  email: false,
  userName: false,
};

type UserSignUp = {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
  touched: {
    firstName: boolean;
    lastName: boolean;
    userName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
  valid: {
    firstName: boolean;
    lastName: boolean;
    userName: boolean;
    email: boolean;
    password: boolean;
    confirmPassword: boolean;
  };
};

const intialFormState = {
  firstName: "",
  lastName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
  touched: {
    firstName: false,
    lastName: false,
    userName: false,
    email: false,
    password: false,
    confirmPassword: false,
  },
  valid: {
    firstName: true,
    lastName: true,
    userName: true,
    email: true,
    password: true,
    confirmPassword: true,
  },
};

type SignUpFormProps = {
  directUser: () => void;
};

export const SignUpForm = ({ directUser }: SignUpFormProps) => {
  const [form, setForm] = useState<UserSignUp>(intialFormState);
  const [APIMessage, setAPIMessage] = useState<APIMessage>(initialAPIMessage);
  const [loadingSpinner, setLoadingSpinner] = useState<boolean>(false);
  const [passwordsDontMatch, setPasswordsDontMatch] = useState<boolean>(false);

  const submitUserData = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const firstNameIsValid = !isEmpty(form.firstName);
    const lastNameIsValid = !isEmpty(form.lastName);
    const userNameIsValid = !isEmpty(form.userName);
    const emailIsValid = emailValidation(form.email);
    const passwordisValid = isNineChars(form.password);
    const confirmPasswordIsValid = isNineChars(form.confirmPassword);

    setForm((current) => ({
      ...current,
      valid: {
        firstName: firstNameIsValid,
        lastName: lastNameIsValid,
        userName: userNameIsValid,
        email: emailIsValid,
        password: passwordisValid,
        confirmPassword: confirmPasswordIsValid,
      },
    }));

    if (form.password != form.confirmPassword) {
      setPasswordsDontMatch(true);
      return;
    }

    const formIsValid =
      firstNameIsValid &&
      lastNameIsValid &&
      userNameIsValid &&
      emailIsValid &&
      passwordisValid &&
      confirmPasswordIsValid;

    let userData = {
      firstName: form.firstName,
      lastName: form.lastName,
      userName: form.userName,
      email: form.email,
      password: form.confirmPassword,
    };

    if (!formIsValid) {
      return;
    } else {
      fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })
        .then((res) => res.json())
        .then((data) => setAPIMessage(data));
    }

    directUser();
  };

  if (loadingSpinner) {
    return (
      <div className="p-20 mx-auto">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={submitUserData}
      className="flex flex-col items-center justify-center pt-4"
    >
      <section className="flex flex-col items-center">
        <div className="mb-2">
          <label htmlFor="firstName">
            <input
              id="firstName"
              type="text"
              placeholder="First Name"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  firstName: e.target.value,
                  touched: {
                    ...current.touched,
                    firstName: true,
                  },
                }))
              }
              value={form.firstName}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.firstName || form.touched.firstName,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.firstName && !form.touched.firstName,
              })}
            />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="lastName">
            <input
              id="lastName"
              type="text"
              placeholder="Last Name"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  lastName: e.target.value,
                  touched: {
                    ...current.touched,
                    lastName: true,
                  },
                }))
              }
              value={form.lastName}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.lastName || form.touched.lastName,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.lastName && !form.touched.lastName,
              })}
            />
          </label>
        </div>
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="email">
            <input
              id="email"
              type="email"
              placeholder="Create a dummy email address"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  email: e.target.value,
                  touched: {
                    ...current.touched,
                    email: true,
                  },
                }))
              }
              value={form.email}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.email || form.touched.email,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.email && !form.touched.email,
              })}
            />
          </label>
          {APIMessage.email && (
            <p className="mt-2 text-center">{APIMessage.message}</p>
          )}
        </div>
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="userName">
            <input
              id="userName"
              type="text"
              placeholder="Username"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  userName: e.target.value,
                  touched: {
                    ...current.touched,
                    userName: true,
                  },
                }))
              }
              value={form.userName}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.userName || form.touched.userName,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.userName && !form.touched.userName,
              })}
            />
          </label>
          {APIMessage.userName && <p className="mt-2">{APIMessage.message}</p>}
        </div>
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="password">
            <input
              id="password"
              type="password"
              placeholder="Password with min 9 characters"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  password: e.target.value,
                  touched: {
                    ...current.touched,
                    password: true,
                  },
                }))
              }
              value={form.password}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.password || form.touched.password,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.password && !form.touched.password,
              })}
            />
          </label>
          {!form.valid.password && (
            <p className="px-8 my-4 text-center">
              Create a password with a minimum of 9 characters.
            </p>
          )}
        </div>
        <div className="flex flex-col items-center mb-2">
          <label htmlFor="confirmPassword">
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  confirmPassword: e.target.value,
                  touched: {
                    ...current.touched,
                    confirmPassword: true,
                  },
                }))
              }
              value={form.confirmPassword}
              className={classNames({
                "p-2 rounded-md w-60 bg-light-gray border-none focus:outline-button-pink":
                  form.valid.confirmPassword || form.touched.confirmPassword,
                "p-2 rounded-md w-60 bg-light-gray border-b-2 border-red-900":
                  !form.valid.confirmPassword && !form.touched.confirmPassword,
              })}
            />
          </label>
          {passwordsDontMatch && (
            <p className="px-8 my-4 text-center">
              Please enter matching passwords.
            </p>
          )}
        </div>
        <button className="py-1 mt-4 text-white rounded-md w-60 bg-sky-500">
          Submit
        </button>
      </section>
    </form>
  );
};
