import { Link, useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

const Login = () => {
  const navigate = useNavigate();

  const onLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className={styles.loginBg} style={{  minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <form style={{ width: '400px', padding: '20px', borderRadius: '8px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', backgroundColor: '#fff' }}>
        <div className={styles.headerLogin}>
          <h1 style={{ color: 'rgb(25, 118, 210)', textAlign: 'center' }}>Food Security</h1>
        </div>
        <div className={styles.login}>
          <header>
            <h2 style={{ color: 'rgb(25, 118, 210)', textAlign: 'center', marginBottom: '20px' }}>Login</h2>
          </header>

          <div className={styles.formElements}>
            <label htmlFor="username" style={{ color: 'rgb(25, 118, 210)' }}>
              Email ID
            </label>{' '}
            <input type="email" name="email" style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '15px' }} />
          </div>

          <div className={styles.formElements}>
            <label htmlFor="password" style={{ color: 'rgb(25, 118, 210)' }}>
              Password
            </label>{' '}
            <input type="password" name="password" style={{ width: '100%', padding: '10px', borderRadius: '5px', marginBottom: '20px' }} />
          </div>

          <div className={styles.formElements}>
            <button
              onClick={(e) => onLogin(e)}
              className={styles.buttonLogin}
              id="form-btn"
              type="submit"
              style={{
                backgroundColor: 'rgb(25, 118, 210)',
                color: '#fff',
                padding: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                width: '100%',
                border: 'none',
              }}
            >
              Login
            </button>
          </div>

          <p style={{ textAlign: 'center', marginTop: '10px', color: 'rgb(25, 118, 210)' }}>
            Don't have an account? <Link to="/signup" style={{ color: 'rgb(25, 118, 210)', textDecoration: 'underline' }}>Sign up</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
