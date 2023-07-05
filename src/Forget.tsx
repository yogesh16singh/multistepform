import React, { useState } from 'react';

const Forget: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsEmailValid(validateEmail(email));

        if (isEmailValid) {
            setIsSubmitting(true);
            // Simulate an API call for password reset
            setTimeout(() => {
                // Reset form and show success message
                setEmail('');
                setIsSubmitted(true);
                setIsSubmitting(false);
            }, 2000);
        }
    };

    const validateEmail = (email: string) => {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 shadow-lg rounded-lg">
                <h2 className="text-2xl mb-4">Forgot Password</h2>
                {isSubmitted ? (
                    <div>
                        <p className="mb-4 text-green-500">Password reset email sent!</p>
                        <p>
                            Please check your email for further instructions to
                            reset your password.
                        </p>
                    </div>
                ) : (
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
                                <p className="text-red-500 text-sm mt-1">
                                    Invalid email format
                                </p>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default Forget;
