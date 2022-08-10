import { useState } from "react";

import { LoginForm } from "./LoginForm";
import { SignUpForm } from "./SignUpForm";

export const LoginPage = () => {
  const [isUser, setIsUser] = useState(true);

  const isLoggedInHandler = (): void => {
    setIsUser((current) => !current);
  };

  return (
    <main className="flex flex-col items-center m-10">
      <div className="flex flex-col py-10 mx-4 mt-8 bg-white border-2 border-solid w-80">
        <h1 className="pt-4 text-xl text-center">TravelBud</h1>
        <p className="text-lg text-center">Where will you go?</p>
        {isUser && (
          <p className="px-2 pt-4 text-xl text-center">
            Log in today and plan your next trip with TravelBud.
          </p>
        )}
        {!isUser && (
          <p className="px-2 pt-4 text-xl text-center">
            Sign up today and begin planning your next trip.
          </p>
        )}
        {isUser && <LoginForm />}

        {!isUser && <SignUpForm directUser={isLoggedInHandler} />}

        {isUser && (
          <div className="flex justify-center pt-6">
            <h1>Don&apos;t have an account?</h1>
            <button
              onClick={isLoggedInHandler}
              className="pl-2 font-jost-semibold text-sky-500"
            >
              Sign Up
            </button>
          </div>
        )}
        {!isUser && (
          <div className="flex justify-center pt-6">
            <h1>Have an account?</h1>
            <button
              onClick={isLoggedInHandler}
              className="pl-2 font-jost-semibold text-sky-500"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </main>
  );
};
