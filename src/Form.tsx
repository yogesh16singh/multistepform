// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setFormData, submitForm } from './store';
import { FormData } from './store';
import { useNavigate } from 'react-router-dom';
const steps = [
    { title: 'Basic Details', fields: ['name', 'email', 'phone_number'] },
    { title: 'Address', fields: ['address_1', 'address_2', 'city', 'state', 'pincode', 'country'] },
    { title: 'File Upload', fields: ['single_file'] },
    { title: 'Multi File Upload', fields: ['multi_ups1', 'geolocation'] },
    { title: 'Status', fields: [] },
];

const Form: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("Token")
    useEffect(() => {
        if (token == null) {
            navigate("/");

        }
    }, [])

    const dispatch = useDispatch();
    const formData: FormData = useSelector((state: RootState) => state.form);

    const [currentStep, setCurrentStep] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ field: name, value }));
    };

    const handleSFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        const file = e.target.files[0];
        if (file) {
            dispatch(setFormData({ field: e.target.name, value: file }));
        }
    };
    const handleMFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.files)
        const file = e.target.files && e.target.files[0];
        if (file) {
            dispatch(setFormData({ field: e.target.name, value: file }));
        }
    };
    const handleSubmit = () => {
        dispatch(submitForm(formData));
    };

    const renderStep = (stepIndex: number) => {
        const fields = steps[stepIndex].fields;
        return (
            <div className="mt-4">
                {fields.map((field) => (
                    <div key={field} className="mb-4">

                        <label htmlFor={field} className="block font-medium mb-1">{field}</label>
                        {field === ('multi_ups1') && <input type="file" name={field} multiple onChange={handleMFileUpload} />}
                        {field === ('single_file') && <input type="file" name={field} onChange={handleSFileUpload} />}
                        {field === ('pincode') && <input className='border border-black rounded-md ps-2' type="number" name={field} value={formData[field] || 0} onChange={handleInputChange} />}
                        {field === ('multi_ups1') || field === 'single_file' || field === ('pincode') ? (
                            null
                        ) : (
                            <input className='border border-black rounded-md ps-2' type="text" name={field} value={formData[field] || ''} onChange={handleInputChange} />
                        )}

                    </div>
                ))}
            </div>
        );
    };
    const progressBarWidth = ((currentStep + 1) / steps.length) * 100;
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;
    return (
        <div className="max-w-lg mx-auto p-4  border-2 shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Multi-Step Form</h1>
            <div className="bg-blue-200 p-2 mb-4">
                <div className="relative h-4 bg-blue-100">
                    <div className="absolute top-0 left-0 h-full bg-blue-500" style={{ width: `${progressBarWidth}%` }}>

                    </div>

                    <div className="absolute -top-1 right-2/4 h-full text-black px-2">
                        {`${Math.round(progressPercentage)}%`}
                    </div>
                </div>
            </div>


            {/* <div className="bg-blue-200 p-4 mb-4">
                Progress: Step {currentStep + 1} of {steps.length}
            </div> */}
            {
                currentStep === steps.length - 1 ? (
                    <div>
                        <p>Submit the form</p>
                        <div className="mt-4">
                            <div className="flex justify-between">
                                <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => setCurrentStep(0)}>
                                    Restart
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2 mt-4"
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <h2 className="text-lg font-medium mb-4">{steps[currentStep].title}</h2>
                        {renderStep(currentStep)}
                        <div className="flex justify-between mt-4">
                            {currentStep > 0 && (
                                <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setCurrentStep((prev) => prev - 1)}>
                                    Previous
                                </button>
                            )}
                            <button className="bg-blue-500 text-white px-4 py-2" onClick={() => setCurrentStep((prev) => prev + 1)}>
                                Next
                            </button>
                        </div>
                    </div>
                )
            }


        </div >
    );
};

export default Form;
