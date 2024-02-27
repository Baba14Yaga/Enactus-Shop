import { useState } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { publicRequest } from "../requestMethods";
import { Link } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin: 2px;
`;
const Success = styled.span`
  color: green;
`;
const Error = styled.span`
  color: red;
`;
const Register = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    img: "",
    confirm: "",
    match: false,
    Registered: false,
    message: null,
  });
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
    setForm((prev) => {
      const pass = prev.password;
      const conf = prev.confirm;
      return {
        ...prev,
        match: pass === conf,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const register = async (user) => {
      try {
        const res = await publicRequest.post("/auth/register", user);
        console.log(res.data);
        setForm((prev) => ({
          ...prev,
          message: res.data.message,
        }));
      } catch (err) {
        console.log(err.response);
        setForm((prev) => ({
          ...prev,
          message: err.response,
        }));
      }
    };
    register({
      firstName: form.firstName,
      lastName: form.lastName,
      username: form.userName,
      email: form.email,
      password: form.password,
      img: form.img,
    });
    setForm((prev) => ({
      ...prev,
      Registered: true,
    }));
  };
  return (
    <Container>
      <Wrapper>
        <Title>CREATE AN ACCOUNT</Title>
        <Form>
          <Input
            type="text"
            placeholder="first name"
            onChange={handleChange}
            name="firstName"
            value={form.firstName}
          />
          <Input
            type="text"
            placeholder="last name"
            onChange={handleChange}
            name="lastName"
            value={form.lastName}
          />
          <Input
            type="text"
            placeholder="username"
            onChange={handleChange}
            name="userName"
            value={form.userName}
          />
          <Input
            type="email"
            placeholder="email"
            onChange={handleChange}
            name="email"
            value={form.email}
          />
          <Input
            type="password"
            placeholder="password"
            onChange={handleChange}
            name="password"
            value={form.password}
          />
          <Input
            type="text"
            placeholder="confirm password"
            onChange={handleChange}
            name="confirm"
            value={form.confirm}
          />
          {form.password && form.confirm && !form.match && (
            <Error>Password do not match</Error>
          )}
          {form.Registered && form.message?.status==400 &&<Error>{form.message}</Error>}
          {  form.Registered && form.message?.status==200 &&
            <Success>
              Hello <b>{form.firstName + " " + form.lastName}</b> !<br />
              You are now successfully registered
              <br />
              Go to LOGIN
            </Success>
          }
          {form.Registered && form.message?.code === 11000 && (
            <Error>
              Hello <b>{form.firstName + " " + form.lastName}</b> !<br />
              <b>{form.email}</b> email already exist
              <br />
            </Error>
          )}
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button
            onClick={handleSubmit}
            disabled={!form.match && !form.password && !form.userName}
          >
            CREATE
          </Button>
          {form.Registered && (
            <Link to={`/login`}>
              <Button>LOGIN</Button>
            </Link>
          )}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
