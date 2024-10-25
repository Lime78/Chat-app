import React from 'react';

const LoginPage: React.FC = () => {
  function handelLogin() {
    fetch ('/api/users')
  }
  return (
    <>
     <div className="container-page">
     <form action="" className="login-container">
        <label>
          Username:
          <input type="text" />
        </label>
        <label>
          Password:
          <input type="password" />
        </label>
        <div className="button-container">
          <button onClick={handelLogin}>Login</button>
          <button>Register</button>
          <button>Continue as guest</button>
        </div>
      </form>
     </div>
    </>
  );
};

export default LoginPage;