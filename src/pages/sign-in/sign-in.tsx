import { useState } from 'react';
import Footer from '../../components/footer/footer';
import Logo from '../../components/header/logo';
import { login } from '../../store/api-actions';
import { useAppDispatch } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts';

function SignIn(): JSX.Element {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="button" onClick={() => {
              dispatch(login({ email, password }));
              navigate(AppRoute.Root);
            }}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}

export default SignIn;