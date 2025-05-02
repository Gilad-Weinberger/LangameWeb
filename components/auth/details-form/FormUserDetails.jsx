"use client";
import { useState } from "react";
import { ButtonDetailsForm } from "@/components/ui/ButtonDetailsForm";

const FormUserDetails = ({ nextStep, handleChange, values }) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!values.fullName.trim()) {
      newErrors.fullName = "שם מלא הוא חובה";
    }

    if (!values.username.trim()) {
      newErrors.username = "שם משתמש הוא חובה";
    } else if (values.username.length < 3) {
      newErrors.username = "שם המשתמש חייב להכיל לפחות 3 תווים";
    } else if (!/^[a-zA-Z0-9_]+$/.test(values.username)) {
      newErrors.username =
        "שם משתמש חייב להכיל רק אותיות, מספרים וסימנים תחתונים";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = (e) => {
    e.preventDefault();
    if (validateForm()) {
      nextStep();
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <form onSubmit={handleContinue}>
        <div className="space-y-6">
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              שם מלא
            </label>
            <input
              type="text"
              id="fullName"
              value={values.fullName}
              onChange={handleChange("fullName")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              placeholder="הכנס את שמך המלא"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-500">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-text-primary mb-1"
            >
              שם משתמש
            </label>
            <input
              type="text"
              id="username"
              value={values.username}
              onChange={handleChange("username")}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-main focus:border-transparent"
              placeholder="בחר שם משתמש"
            />
            {errors.username && (
              <p className="mt-1 text-sm text-red-500">{errors.username}</p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              זה יהיה השם המייצג אותך
            </p>
          </div>

          <div className="pt-4">
            <ButtonDetailsForm type="submit" variant="primary" fullWidth>
              המשך
            </ButtonDetailsForm>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormUserDetails;
