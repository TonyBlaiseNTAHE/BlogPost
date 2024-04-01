import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import { useDispatch, useSelector } from "react-redux";

import logo from "../images/logo.png";
import OAuth from "../components/OAuth";

const Logo = () => (
  <img src={logo} alt="Tony's Blog Logo" className="h-8 sm:h-10 self-center" />
);

export default function SignIn() {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure("please fill out all fields."));
    }
    try {
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(formData);
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items gap-5">
        {/* left side */}
        <div className="flex-1">
          <Link to="/" className="flex items-center">
            <Logo />
            <span className="ml-2  font-bold dark:text-white hover:text-blue-700 text-4xl">
              Tony's Blog
            </span>
          </Link>
          <p className="tex-sm mt-5">
            Welcome to my Blog Post website. You can sign up with your email and
            password or with Google.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Your email" />
              <TextInput
                type="text"
                placeholder="Email"
                id="email"
                onChange={handleChange}
              />
            </div>
            <div className="">
              <Label value="Your Password" />
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handleChange}
              />
            </div>
            <Button gradientMonochrome="cyan" type="submit" outline>
              {loading ? (
                <Fragment>
                  <Spinner size="sm" />
                  <span className="pl-3">Loading...</span>
                </Fragment>
              ) : (
                "Sign In"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Do not Have an account?</span>
            <Link to="/sign-up" className="text-cyan-500" disabled={loading}>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage.error}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
