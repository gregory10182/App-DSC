import React, { useState } from "react";

export default function Login() {
  const [local, setLocal] = useState("");
  const [password, setPassword] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Holaa")
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <input 
          type="text"
          id="Local"
          value={local}
          name="Local"
          placeholder="Local"
          onChange={({target}) => setLocal(target.value)}
        />

        <input 
          type="password"
          value={password}
          name="Password"
          placeholder="Password"
          onChange={({target}) => setPassword(target.value)}
        />

        <button>
          Login
        </button>
      </form>
    </div>
  );
}
