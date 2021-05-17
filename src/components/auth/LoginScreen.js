import React from "react";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useForm } from "../../hooks/useForm";
import { startLogin, startRegister } from "../../redux-logic/actions/auth";
import "./LoginScreen.css";

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [loginValues, handelLoginInputChange] = useForm({
    lEmail: "jdmv161010@gmail.com",
    lPassword: "123456",
  });

  const { lEmail, lPassword } = loginValues;

  const [registerValues, handelRegisterInputChange] = useForm({
    rName: "David",
    rEmail: "mvjuan97@gmail.com",
    rPassword1: "123456",
    rPassword2: "123456",
  });

  const { rName, rEmail, rPassword1, rPassword2 } = registerValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(lEmail, lPassword));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (rPassword1 !== rPassword2) {
      Swal.fire("Error", "Las constraseñas deben ser iguales", "error");
    }

    dispatch(startRegister(rName, rEmail, rPassword1));
  };

  return (
    <div className="container login-container">
      <div className="row">
        <div className="col-md-6 login-form-1">
          <h3>Ingreso</h3>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Correo"
                name="lEmail"
                value={lEmail}
                onChange={handelLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="lPassword"
                value={lPassword}
                onChange={handelLoginInputChange}
              />
            </div>
            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Login" />
            </div>
          </form>
        </div>

        <div className="col-md-6 login-form-2">
          <h3>Registro</h3>
          <form onSubmit={handleRegister}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                name="rName"
                value={rName}
                onChange={handelRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                name="rEmail"
                value={rEmail}
                onChange={handelRegisterInputChange}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Contraseña"
                name="rPassword1"
                value={rPassword1}
                onChange={handelRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Confirma la contraseña"
                name="rPassword2"
                value={rPassword2}
                onChange={handelRegisterInputChange}
              />
            </div>

            <div className="form-group">
              <input type="submit" className="btnSubmit" value="Crear cuenta" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
