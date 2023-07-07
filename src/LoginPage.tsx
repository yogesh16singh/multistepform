import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import {
    setEmail,
    setPassword,
    setIsEmailValid,
    setLoggedIn,
} from './authSlice';
import { RootState } from './store';
import { useNavigate } from 'react-router-dom';

interface ApiResponse {
    message: string;
    authToken: string;
}

const LoginPage: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    // const [responseData, setResponseData] = useState<ApiResponse | null>(null);
    // const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { email, password, isEmailValid } = useSelector(
        (state: RootState) => state.auth
    );

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setEmail(event.target.value));
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch(setPassword(event.target.value));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch(setIsEmailValid(validateEmail(email)));

        if (isEmailValid) {
            setIsSubmitting(true);
            // Simulate an API call for login
            try {
                await login(email, password);
                dispatch(setLoggedIn(true));
                // Redirect or perform other actions upon successful login
            } catch (error) {
                console.error('Login error:', error);
            }
            setIsSubmitting(false);
        }
    };

    const validateEmail = (email: string) => {
        // Basic email validation using a regular expression
        // alert("hello");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const login = (email: string, password: string) => {
        const requestOptions: RequestInit = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        };
        fetch('https://x8ki-letl-twmt.n7.xano.io/api:XooRuQbs/auth/login', requestOptions)
            .then((response) => response.json())
            .then((data: ApiResponse) => {
                // setResponseData(data);
                if (data.authToken) {
                    // alert("success");
                    setIsSuccess(true);
                    setTimeout(() => {
                        setIsSuccess(false);
                        navigate("/form");
                    }, 3000)
                    localStorage.setItem("Token", data.authToken);
                } else {
                    setIsFailed(true);
                    setTimeout(() => {
                        setIsFailed(false);
                    }, 3000)
                }

                // setError(null);
            })
            .catch((error) => {
                console.log(error)
                // setError(error.message);
                // setResponseData(null);
            });
        // Simulate an API call for login
        // return new Promise<void>((resolve, reject) => {
        //     // setTimeout(() => {
        //     //     console.log("code here")
        //     //     if (email === 'test@example.com' && password === 'password') {
        //     //         resolve();
        //     //     } else {
        //     //         reject(new Error('Invalid email or password'));
        //     //     }
        //     // }, 1000);
        // });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg">
                {isSuccess && (
                    <p
                        className="text-lg text-green-600"
                    >
                        Login Successfully
                    </p>
                )}
                {isFailed && (
                    <p
                        className="text-lg text-red-600"
                    >
                        Login Failed
                    </p>
                )}
                <h2 className="text-2xl mb-4">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="email" className="block mb-2">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="email"
                            className={`border ${isEmailValid ? 'border-gray-300' : 'border-red-500'
                                } rounded-md px-4 py-2 w-full`}
                            value={email}
                            onChange={handleEmailChange}
                            required
                        />
                        {!isEmailValid && (
                            <p className="text-red-500 text-sm mt-1">Invalid email format</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block mb-2">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="border border-gray-300 rounded-md px-4 py-2 w-full"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md mr-2"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Logging in...' : 'Log In'}
                    </button>
                    <Link to={"/forget"}>
                        <span className=" flex text-gray-500 text-sm mt-2">
                            Forgot Password
                        </span>
                    </Link>

                </form>
                <div className="mt-4">
                    <Link to={"/form"}>
                        <span className=" flex text-gray-500 text-sm mt-2">
                            Fill the Form
                        </span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
