import React, { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useLocalStorage from "../util/localStorageHook";

const AppContext = createContext();

export function LoginStore(props) {
  const [loggedUser, setLoggedUser] = useLocalStorage("loggedUser", {});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // const [jwtToken, setJwtToken] = useState(null);
  // const [refreshToken, setRefreshToken] = useState(null);

  const loginHandler = async (event, email, password) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") alert("All fields are required");

    try {
      const response = await fetch(`http://localhost:5000/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error.message);
      }

      setLoggedUser({ username: data?.username, role: data?.role, id: data?._id });

      // setRefreshToken(data.refreshToken);
      // setJwtToken(data.token);
    } catch (err) {
      return alert(err.message);
    }
  };

  const registerHandler = async (event, email, password, repass) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "" || repass.trim() === "") {
      return alert("All fields are required");
    }

    if (password !== repass) {
      return alert("Passwords don't match!");
    }

    try {
      const response = await fetch(`http://localhost:5000/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      console.log(response);

      const data = await response.json();

      console.log(data);

      // if (!response.ok) {
      //   if (data.error.message === "EMAIL_EXISTS") {
      //     throw new Error("This email has already been registered!");
      //   } else {
      //     throw new Error("Couldn't finish registration. Please retry.");
      //   }
      // }

      // setJwtToken(data.token);
      // setRefreshToken(data.refreshToken);

      setLoggedUser({ username: email.substring(0, email.indexOf("@")) });
      setIsLoading(false);
      navigate("/polls", { replace: true });
    } catch (err) {
      console.log(err);
      return alert(err.message);
    }
  };

  const logoutHandler = async () => {
    // setJwtToken(null);
    // setRefreshToken(null);

    setLoggedUser({});
    try {
      const response = await fetch(`http://localhost:5000/auth/logout`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        }
      });
      console.log(response);
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error.message);
      }
    } catch (err) {
      return alert(err.message);
    }
  };

  const resetPasswordHandler = async (event, email) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/auth/password-reset/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email
        })
      });
      const data = response.json();
    } catch (error) {
      console.log(error);
    }
  };

  const saveNewPasswordHandler = async (event, password, confirmPassword, tokenId) => {
    event.preventDefault();

    console.log(password);

    if (password !== confirmPassword) {
      return alert("Passwords don't match!");
    } else {
      await fetch(`http://localhost:5000/auth/password-reset/${tokenId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          password,
          tokenId
        })
      });
      navigate("/login", { replace: true });
    }
  };

  return (
    <AppContext.Provider
      value={{
        loggedUser,
        setLoggedUser,
        isLoading,
        setIsLoading,
        loginHandler,
        registerHandler,
        resetPasswordHandler,
        saveNewPasswordHandler,
        logoutHandler
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}

export default function useLoginStore() {
  return React.useContext(AppContext);
}

// useEffect(() => {
//   if (!jwtToken) return;
//   const updateRefreshToken = async () => {
//     try {
//       const response = await fetch(`http://localhost:5000/auth/token`, {
//         method: "POST",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//           token: refreshToken,
//           user: loggedUser
//         })
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message);
//       }
//     } catch (err) {
//       return alert(err);
//     }
//   };

//   updateRefreshToken();
// }, [jwtToken]);
