import { buttonStyle, buttonStyleOutline } from "@/constants/styles";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Loading from "../Loading";

interface ResetPasswordFormProps {
  token: string | string[] | undefined;
}

const ResetPasswordForm = (props: ResetPasswordFormProps): JSX.Element => {
  const { token } = props;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [passwordStrengthMsg, setPasswordStrengthMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(passwordStrengthMsg);
    if (passwordStrengthMsg) return;

    if (!password || !confirmPassword) {
      setErrorMsg("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {
      const res = await fetch(`/api/auth/reset-password?token=${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
        }),
      });

      if (res.ok) {
        router.push("/auth/signin");
        setLoading(false);
      } else {
        const data = await res.json();
        setLoading(false);
        setErrorMsg(data.message);
      }
    } catch (error) {
      console.error(error);
      setLoading(false);
      setErrorMsg("Error resetting password");
    }
  };

  const checkPasswordStrength = (password: string): string => {
    // Password strength validation rules here
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/\d/.test(password)) {
      return "Password must contain at least one digit.";
    }
    if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
      return "Password must contain at least one special character !@#$%^&*()_+-=";
    }
    return "";
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordStrengthMsg(checkPasswordStrength(event.target.value));
    setPassword(event.target.value);
  };

  return (
    <>
      <div className="h-20 w-full bg-black" />

      <div className="flex mx-auto lg:max-w-7xl px-4 md:px-8 justify-center items-center mt-20 mb-10 w-full">
        <div className="bg-white px-4 shadow-md rounded-lg md:px-8 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="flex md:flex-row gap-4 ">
            <h2 className="text-2xl md:text-4xl uppercase font-base mb-2">
              Create
            </h2>
            <h2 className="text-2xl md:text-4xl uppercase font-bold mb-4 text-red">
              Password
            </h2>
          </div>
          <p className="text-red text-sm h-5">{errorMsg && errorMsg}</p>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onFocus={() => setErrorMsg("")}
                value={password}
                onChange={onChange}
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              />
              <p className="text-red h-5 text-sm">
                {passwordStrengthMsg && passwordStrengthMsg}
              </p>
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirm-password"
                className="block text-gray-700 font-bold mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 block w-full md:w-96 rounded-md p-2 shadow-lg focus:border-red focus:ring-red focus:outline-red"
              />
            </div>
            <div className="mt-10 flex w-full justify-end ">
              <button
                type="submit"
                className={`${
                  loading ? buttonStyleOutline : buttonStyle
                } mt-5 md:mt-0 md:ml-5`}
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Password"}
              </button>
            </div>
          </form>
          <div className="w-full flex justify-center items-center">
            {loading ? <Loading /> : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPasswordForm;
