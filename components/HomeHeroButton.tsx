"use client";

import { signIn } from "@/actions/auth/Auth";
import React from "react";
import { Button } from "./ui/button";
import { SlEnergy } from "react-icons/sl";

const HomeHeroButton = () => {
  const handleSignIn = async () => {
    await signIn();
  };

  return (
    <Button variant="default" onClick={handleSignIn}>
      <SlEnergy size={20} /> <span>Get Started for Free</span>
    </Button>
  );
};

export default HomeHeroButton;
