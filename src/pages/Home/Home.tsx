import { Header } from "../../pages/Home/Header.js";
import { Hero } from "../../pages/Home/Hero.js";
import { UsersList } from "../../components/UsersList/UsersList.js";
import { RegistrationForm } from "../../components/RegistrationForm/RegistrationForm.js";
import { useRef } from "react";
import React from 'react';


export default function Home() {
  const resetRef = useRef<null | (() => void)>(null);
  return (
    <>
      <Header />
      <Hero />
      <UsersList onReadyReset={(fn) => (resetRef.current = fn)} />
      <RegistrationForm onSuccess={() => resetRef.current?.()} />
    </>
  );
}
