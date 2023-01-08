import React from "react";

interface IndexProps {}

const LoginPage = ({}: IndexProps) => {
  const handleSubmitLoginForm = () => {};
  return (
    <div>
      <form onSubmit={handleSubmitLoginForm}>
        <label>
          Id
          <input name="" 
          pattern="
          //최소 @와 .을 포함해야함 - 이메일정규식
          "/>
        </label>
        <label>
          Password
          <input 
          minLength={8}
          //최소 8자이상입력해야함
          />
        </label>
        <button
          disabled={
            false
            // "이메일 비밀번호가 모두 입력이 되어있고 조건을 만족해야 활성화"
          }
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
