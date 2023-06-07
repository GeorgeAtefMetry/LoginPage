import React, { useState, useEffect, useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

// Reducer Fn receives two arguments two parameters our last state snapshot and the action that was dispatched
const passwordReducer = (state, action) => {
  if(action.type === 'USER_INPUT'){
    return { value : action.val, isValid : action.val.trim().length > 6 }
  }
  if(action.type === 'USER_BLUR'){
    return { value : state.value, isValid : state.value.trim().length > 6 }
  }
  return { value : '', isValid : null }
}

const Login = (props) => {
  const [enteredEmail, setEnteredEmail] = useState('');
  const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [passwordState, dispatchPassword ] = useReducer( passwordReducer, { value : '', isValid : null })

  useEffect(() => {
    const TimeOut = setTimeout(() => {
      setFormIsValid(
        enteredEmail.includes('@') && passwordState.value.trim().length > 6
        )
    }, 500);
      return () => {
        clearTimeout(TimeOut);  
      }
  }, [enteredEmail,passwordState.value]);

  const emailChangeHandler = (event) => {
    setEnteredEmail(event.target.value);
  };
  const passwordChangeHandler = (event) => {
    // Obj with type field that describes what happened and extra payload 
    dispatchPassword({type : 'USER_INPUT', val : event.target.value})
    setFormIsValid(
      enteredEmail.includes('@') && event.target.value.trim().length > 6)
  };

  const validateEmailHandler = () => {
    setEmailIsValid(enteredEmail.includes('@'));
  };
  const validatePasswordHandler = () => {
    dispatchPassword({type : 'INPUT_BLUR'})
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(enteredEmail, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>

        <div
          className={`${classes.control} ${
            emailIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={enteredEmail}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>

        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>

      </form>
    </Card>
  );
};

export default Login;
