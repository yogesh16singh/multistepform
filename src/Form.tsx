import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { setFormData, submitForm } from './store';
const steps = [
    { title: 'Basic Details', fields: ['name', 'email', 'phone'] },
    { title: 'Address', fields: ['address1', 'address2', 'city', 'state', 'pincode', 'country'] },
    { title: 'File Upload', fields: ['singleFile'] },
    { title: 'Multi File Upload', fields: ['multiFiles', 'geolocation'] },
    { title: 'Status', fields: [] },
];

const Form: React.FC = () => {
    const dispatch = useDispatch();
    const formData = useSelector((state: RootState) => state.form);

    const [currentStep, setCurrentStep] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(setFormData({ field: name, value }));
    };

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                        {field === ('multiFiles') || field === 'singleFile' ? (
                            <input type="file" name={field} multiple onChange={handleFileUpload} />
                        ) : (
                            <input type="text" name={field} value={formData[field] || ''} onChange={handleInputChange} />
                        )}
                    </div>
                ))}
            </div>
        );
    };
    const progressBarWidth = ((currentStep + 1) / steps.length) * 100;
    const progressPercentage = ((currentStep + 1) / steps.length) * 100;
    return (
        <div className="max-w-lg mx-auto p-4 border border-2 shadow-md">
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
                        <p>Form submitted successfully!</p>
                        <div className="mt-4">
                            <div className="flex justify-end">
                                <button className="bg-blue-500 text-white px-4 py-2 mt-4" onClick={() => setCurrentStep(0)}>
                                    Restart
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-4 py-2"
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
