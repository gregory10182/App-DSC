import React, { useState } from "react";
import apiUser from "./api/login";

export default function Login({setUser}) {
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
      password
    })
    .then((res) => {
      console.log(res)
    })

    apiUser
      .login({
        local,
        password,
      })
      .then((res) => {
        console.log(res);

        window.localStorage.setItem("loggedUser", JSON.stringify(res));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const renderLogin = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="Local"
        value={local}
        name="Local"
        placeholder="Local"
        onChange={({ target }) => setLocal(target.value)}
      />

      <input
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

      <button>Login</button>
    </form>
  );

  const renderRegister = () => (
    <form onSubmit={handleRegister}>
      <input
        type="text"
        id="Local"
        value={local}
        name="Local"
        placeholder="Local"
        onChange={({ target }) => setLocal(target.value)}
      />

      <input
        type="password"
        value={password}
        name="Password"
        placeholder="Password"
        onChange={({ target }) => setPassword(target.value)}
      />

      <button>Crear Cuenta</button>
    </form>

  );

  return (
    <div className="Login">
      <h2>{nuevaCuenta ? "Registro" : "Inicio de Sesion" }</h2>
      {nuevaCuenta ? renderRegister() : renderLogin()}

      <button
        className="crearCuentaBtn"
        onClick={() => {
          setNuevaCuenta(!nuevaCuenta);
        }}
      >
        {nuevaCuenta ? "Iniciar Sesion" : "Crear Cuenta"}
      </button>
    </div>
  );
  
  
}
