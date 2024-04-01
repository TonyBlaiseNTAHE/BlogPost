import React, { useState, Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Label, TextInput, Button, Alert, Spinner } from "flowbite-react";

import logo from "../images/logo.png";
import OAuth from "../components/OAuth";

const Logo = () => (
  <img src={logo} alt="Tony's Blog Logo" className="h-8 sm:h-10 self-center" />
);

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password) {
      return setErrorMessage("please fill out all fields.");
    }
    try {
      setLoading(true);
      setErrorMessage(null);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success == false) {
        return setErrorMessage(data.message);
      }
      setLoading(false);
      if (res.ok) {
        navigate("/sign-in");
      }
    } catch (error) {
      setErrorMessage(errorMessage);
      setLoading(false);
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
              <Label value="Your username" />
              <TextInput
                type="text"
                placeholder="Username"
                id="username"
                onChange={handleChange}
              />
            </div>
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
                placeholder="Password"
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
                "Sign Up"
              )}
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to="/sign-in" className="text-cyan-500" disabled={loading}>
              Sign In
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color="failure">
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
