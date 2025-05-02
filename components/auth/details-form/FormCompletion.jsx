"use client";
import { ButtonDetailsForm } from "@/components/ui/ButtonDetailsForm";

const FormCompletion = ({ submitForm }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="text-center">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-text-primary mb-2">
            הפרופיל שלך מוכן!
          </h2>
          <p className="text-text-secondary">
            תודה שהשלמת את תהליך הרישום. כעת תוכל להתחיל לשחק וללמוד בהתאם
            לנושאים שבחרת.
          </p>
        </div>
        <div className="space-y-3">
          <ButtonDetailsForm
            type="button"
            onClick={submitForm}
            variant="primary"
            fullWidth
          >
            התחל לשחק
          </ButtonDetailsForm>
        </div>
      </div>
    </div>
  );
};

export default FormCompletion;
