"use client";
import { useState } from "react";
import { ButtonDetailsForm } from "@/components/ui/ButtonDetailsForm";

const topics = [
  { id: "programming", label: "תכנות" },
  { id: "technology", label: "טכנולוגיה" },
  { id: "science", label: "מדע" },
  { id: "math", label: "מתמטיקה" },
  { id: "language", label: "שפות" },
  { id: "history", label: "היסטוריה" },
  { id: "geography", label: "גאוגרפיה" },
  { id: "arts", label: "אומנות" },
  { id: "music", label: "מוזיקה" },
  { id: "sports", label: "ספורט" },
  { id: "movies", label: "סרטים" },
  { id: "books", label: "ספרים" },
  { id: "food", label: "אוכל" },
  { id: "travel", label: "טיולים" },
  { id: "games", label: "משחקים" },
];

const FormTopics = ({
  nextStep,
  prevStep,
  handleTopicsChange,
  selectedTopics,
}) => {
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (selectedTopics.length === 0) {
      newErrors.topics = "נא לבחור לפחות נושא אחד";
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

  const toggleTopic = (topicId) => {
    const updatedTopics = selectedTopics.includes(topicId)
      ? selectedTopics.filter((id) => id !== topicId)
      : [...selectedTopics, topicId];

    handleTopicsChange(updatedTopics);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <form onSubmit={handleContinue}>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">
              בחר נושאים שמעניינים אותך
            </h2>
            <p className="text-sm text-text-secondary mb-6">
              באפשרותך לבחור כמה נושאים שתרצה ללמוד או לשחק
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-3">
              {topics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => toggleTopic(topic.id)}
                  className={`px-6 py-2 rounded-xl transition-colors ${
                    selectedTopics.includes(topic.id)
                      ? "bg-main text-white"
                      : "bg-gray-100 text-text-primary hover:bg-gray-200"
                  }`}
                >
                  {topic.label}
                </button>
              ))}
            </div>

            {errors.topics && (
              <p className="mt-2 text-sm text-red-500">{errors.topics}</p>
            )}
          </div>

          <div className="flex justify-between pt-4">
            <ButtonDetailsForm
              type="button"
              onClick={prevStep}
              variant="secondary"
            >
              &rarr; חזרה
            </ButtonDetailsForm>

            <ButtonDetailsForm type="submit" variant="primary">
              סיום
            </ButtonDetailsForm>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FormTopics;
