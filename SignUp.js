import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ onSignUp }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');

    const handleSignUp = () => {
        // 새로운 사용자 정보를 처리
        const newUser = {
            id: newUsername,
            password: newPassword,
            email: newEmail,
        };

        // 회원 가입 처리 함수 호출
        onSignUp(newUser);

        // 회원 가입 후 입력 필드 초기화
        setNewUsername('');
        setNewPassword('');
        setNewEmail('');
    };

    return (
        <div>
            <h2>회원 가입</h2>
            <input type="text" placeholder="아이디" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
            <br/>
            <input type="password" placeholder="비밀번호" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            <br/>
            <input type="text" placeholder="이메일 주소" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <br/>
            <button onClick={handleSignUp}>회원 가입 완료</button>
            <Link to="/login">로그인</Link>
        </div>
    );
};

export default SignUp;
