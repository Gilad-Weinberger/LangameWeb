"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/PageLayout";
import FormUserDetails from "@/components/auth/details-form/FormUserDetails";
import FormEloQuiz from "@/components/auth/details-form/FormEloQuiz";
import FormTopics from "@/components/auth/details-form/FormTopics";
import FormCompletion from "@/components/auth/details-form/FormCompletion";
import { saveUserObject } from "@/lib/firestoreFunctions";

const DetailsForm = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    elo: 1200, // Default starting Elo
    topics: [], // Array to store selected topics
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (!user) {
      router.push("/auth/signin");
    }
  }, [user, router]);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleChange = (input) => (e) => {
    setFormData({ ...formData, [input]: e.target.value });
  };

  const setEloScore = (score) => {
    setFormData({ ...formData, elo: score });
  };

  const handleTopicsChange = (selectedTopics) => {
    setFormData({ ...formData, topics: selectedTopics });
  };

  const handleSubmitForm = async () => {
    setIsSubmitted(true);
  };

  const submitForm = async () => {
    try {
      // Save user profile to Firestore
      await saveUserObject(user, {
        username: formData.username,
        fullName: formData.fullName,
        photoURL: user.photoURL,
        elo: formData.elo,
        topics: formData.topics, // Include selected topics
        userId: user.uid, // Include the auth user ID
      });

      console.log("Profile successfully updated");
      router.push("/dashboard");
    } catch (error) {
      console.error("Error saving profile:", error);
      // You can add error handling here
    }
  };

  const renderStep = () => {
    if (isSubmitted) {
      return <FormCompletion submitForm={submitForm} />;
    }

    switch (step) {
      case 1:
        return (
          <FormUserDetails
            nextStep={nextStep}
            handleChange={handleChange}
            values={formData}
          />
        );
      case 2:
        return (
          <FormEloQuiz
            prevStep={prevStep}
            nextStep={nextStep}
            setEloScore={setEloScore}
          />
        );
      case 3:
        return (
          <FormTopics
            prevStep={prevStep}
            nextStep={handleSubmitForm}
            handleTopicsChange={handleTopicsChange}
            selectedTopics={formData.topics}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-screen h-screen justify-center bg-bg" dir="rtl">
      <div className="w-full max-w-2xl mx-auto h-full justify-center pt-20 bg-bg">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">השלם את הפרופיל שלך</h1>
            {!isSubmitted && (
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 1 ? "bg-main" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 2 ? "bg-main" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 3 ? "bg-main" : "bg-gray-300"
                  }`}
                ></div>
              </div>
            )}
          </div>
        </div>

        {renderStep()}
      </div>
    </div>
  );
};

export default DetailsForm;
