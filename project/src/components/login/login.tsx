import { ChangeEvent, FormEvent, useState } from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

function Login ():JSX.Element {
  const [login, setLogin] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const dispatch = useAppDispatch();

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (login && password) {
      dispatch(loginAction({login, password}));
    }
  };

  const loginChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setLogin(evt.target.value);
  };

  const passwordChange = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.target.value = evt.target.value.replace(/\s/g, '');
    setPassword(evt.target.value);
  };

  return (
    <section className="login">
      <h1 className="login__title">Sign in</h1>
      <form
        onSubmit={handleSubmit}
        className="login__form form"
        action="#"
        method="post"
        data-testid="login-form"
      >
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">E-mail</label>
          <input
            onChange={loginChange}
            className="login__input form__input"
            type="text"
            name="email"
            placeholder="Email"
            required
            data-testid="login"
          />
        </div>
        <div className="login__input-wrapper form__input-wrapper">
          <label className="visually-hidden">Password</label>
          <input
            onChange={passwordChange}
            className="login__input form__input"
            type="password"
            name="password"
            placeholder="Password"
            required
            pattern="(?!^[0-9]*$)(?!^[A-Za-zА-Яа-яЁё]*$)^([A-Za-zА-Яа-яЁё0-9]{6,50})$"
            data-testid="password"
          />
        </div>
        <button className="login__submit form__submit button" type="submit">Sign in</button>
      </form>
    </section>
  );
}

export default Login;
