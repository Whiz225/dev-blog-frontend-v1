"use client";

import { useState } from "react";
import Form from "@/components/Form";
import Input from "@/components/Input";
import FormRowVertical from "@/components/FormRowVertical";
// import { useLogin } from "./useLogin";
import SpinnerMini from "@/components/SpinnerMini";
import Button from "@/components/Button";
import { useLogin } from "@/hooks/useLogin";

function LoginForm() {
  const [username, setUsername] = useState("emmav1_225");
  const [password, setPassword] = useState("emmav1_225");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password) return;
    login(
      { username, password },
      {
        onSettled: () => {
          setUsername("");
          setPassword("");
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical label="Username">
        <Input
          type="text"
          id="username"
          // This makes this form better for password managers
          autoComplete="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>

      <FormRowVertical label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isLoading}
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large" isLoading={isLoading}>
          {!isLoading ? "Log in" : <SpinnerMini />}
        </Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
