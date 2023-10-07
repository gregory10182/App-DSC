import React, { useState } from "react";
import apiUser from "./api/login";
import styled from "styled-components";

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;

const StyledLogin = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 280px;
`;

const LoginTitle = styled.h2`
  color: #009635;
  width: 100%;
  height: 10%;
  font-size: 20px;
  margin-bottom: 0px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #009635;
  padding: 10px;
  border-radius: 10px;
  align-items: center;
  height: 50%;
  width: 100%;
`;

const LoginInput = styled.input`
  width: 85%;
  height: 30px;
  border-radius: 5px;
  outline: none;
  border: none;
  color: #009635;
`;

const LoginSubmit = styled.button`
  width: auto;
  height: 30px;
  color: #009635;
  background-color: #ebebeb;
  font-size: 16px;
`;

const ChangeFormBtn = styled.button`
  background-color: #009635;
  color: #ebebeb;
  font-size: 16px;
  width: 60%;
  height: 12%;
`;

export default function Login({ setUser }) {
  const [local, setLocal] = useState("");
  const [password, setPassword] = useState("");
  const [nuevaCuenta, setNuevaCuenta] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    apiUser
      .login({
        local,
        password,
      })
      .then((res) => {
        console.log(res);

        window.localStorage.setItem("loggedUser", JSON.stringify(res));
        setUser(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();

    apiUser
      .signin({
        local,
        password,
      })
      .then((res) => {
        console.log(res);
      });
  };

  const renderLogin = () => (
    <LoginForm onSubmit={handleSubmit}>
      <LoginInput
        type="text"
        id="Local"
        value={local}
        name="Local"
        placeholder="Local"
        onChange={({ target }) => setLocal(target.value)}
      />

      <LoginInput
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

      <LoginSubmit>Login</LoginSubmit>
    </LoginForm>
  );

  const renderRegister = () => (
    <LoginForm onSubmit={handleRegister}>
      <LoginInput
        type="text"
        id="Local"
        value={local}
        name="Local"
        placeholder="Local"
        onChange={({ target }) => setLocal(target.value)}
      />

      <LoginInput
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

      <LoginSubmit>Crear Cuenta</LoginSubmit>
    </LoginForm>
  );

  return (
    <LoginContainer>
      <StyledLogin>
        <LoginTitle>{nuevaCuenta ? "Registro" : "Inicio de Sesion"}</LoginTitle>
        {nuevaCuenta ? renderRegister() : renderLogin()}

        <ChangeFormBtn
          className="crearCuentaBtn"
          onClick={() => {
            setNuevaCuenta(!nuevaCuenta);
          }}
        >
          {nuevaCuenta ? "Iniciar Sesion" : "Crear Cuenta"}
        </ChangeFormBtn>
      </StyledLogin>
    </LoginContainer>
  );
}
