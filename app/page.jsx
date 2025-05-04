import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 overflow-hidden md:pt-24 md:pb-20">
        <div className="container px-4 mx-auto text-center max-w-7xl">
          <div className="relative z-10 max-w-2xl mx-auto mb-8 md:mb-12">
            <h1 className="mb-4 text-3xl font-bold leading-tight text-gray-900 md:text-5xl lg:text-6xl md:leading-tight">
              שפר את האנגלית שלך בדרך{" "}
              <span className="text-indigo-600">מהנה ותחרותית</span>
            </h1>
            <p className="mb-6 text-base text-gray-600 md:text-lg lg:text-xl">
              למד אנגלית בזמן אמת עם שחקנים אחרים, שפר את הדירוג שלך וראה את
              ההתקדמות שלך מיום ליום.
            </p>
            <div className="flex flex-col items-center justify-center gap-3 md:flex-row md:gap-4">
              <Link
                href="/auth/signup"
                className="w-full px-6 py-3 text-base font-medium text-white transition-all rounded-full bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto md:text-lg"
              >
                התחל לשחק בחינם
              </Link>
              <Link
                href="/auth/signin"
                className="w-full px-6 py-3 mt-3 text-base font-medium transition-all border border-gray-300 rounded-full text-indigo-600 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 md:w-auto md:mt-0 md:text-lg"
              >
                התחברות
              </Link>
            </div>
          </div>

          <div className="relative mx-auto overflow-hidden rounded-lg shadow-xl max-w-5xl">
            <Image
              src="/game-preview.svg"
              alt="משחק לימוד אנגלית"
              width={1200}
              height={675}
              className="w-full h-auto"
              priority
            />
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mt-16 -mr-16 hidden lg:block">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-indigo-100"
            fill="currentColor"
          >
            <circle cx="100" cy="100" r="100" />
          </svg>
        </div>
        <div className="absolute bottom-0 left-0 -mb-16 -ml-16 hidden lg:block">
          <svg
            width="200"
            height="200"
            viewBox="0 0 200 200"
            className="text-blue-100"
            fill="currentColor"
          >
            <circle cx="100" cy="100" r="100" />
          </svg>
        </div>
      </section>

      {/* Problem-Solution Section */}
      <section className="py-12 bg-white md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-10 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
              למידת אנגלית לא חייבת להיות משעממת
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              הגישה המסורתית ללימוד אנגלית יכולה להיות יבשה ולא מעניינת. אנחנו
              פתרנו את הבעיה הזו עם משחק מולטיפלייר מהנה.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            <div className="p-6 transition-all border border-gray-100 rounded-xl hover:shadow-lg md:p-8">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-red-500 rounded-lg md:w-16 md:h-16 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
                הבעיה
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside md:text-base md:space-y-3">
                <li>לימוד אנגלית לבד יכול להיות משעמם</li>
                <li>קשה להתמיד בלימוד ללא מוטיבציה</li>
                <li>קשה לראות התקדמות אמיתית</li>
                <li>לימוד מסורתי לא תמיד מתאים לקצב שלך</li>
              </ul>
            </div>

            <div className="p-6 transition-all border border-gray-100 rounded-xl hover:shadow-lg md:p-8">
              <div className="flex items-center justify-center w-12 h-12 mb-4 text-white bg-green-500 rounded-lg md:w-16 md:h-16 md:mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 md:w-8 md:h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-lg font-semibold text-gray-900 md:text-xl">
                הפתרון שלנו
              </h3>
              <ul className="space-y-2 text-sm text-gray-600 list-disc list-inside md:text-base md:space-y-3">
                <li>משחק תחרותי מהנה במודל מולטיפלייר</li>
                <li>מערכת דירוג שמראה את ההתקדמות שלך</li>
                <li>אתגרים יומיים ושבועיים לשמירה על מוטיבציה</li>
                <li>התאמה אישית לרמה שלך עם למידה מותאמת אישית</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-50 md:py-20">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-10 text-center md:mb-16">
            <h2 className="mb-4 text-2xl font-bold text-gray-900 md:text-3xl lg:text-4xl">
              תכונות עיקריות
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
              הפלטפורמה שלנו מציעה מגוון תכונות שיעזרו לך לשפר את האנגלית שלך
              בצורה יעילה ומהנה
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-8">
            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                משחק מולטיפלייר
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                התחרה מול שחקנים אחרים בזמן אמת לתרגול והנאה משותפת.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                שיפור אוצר מילים
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                למד מילים חדשות בהקשר משחקי שיעזור לך לזכור אותן לזמן רב.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                דירוג ומעקב
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                צבור נקודות, שפר את הדירוג שלך ועקוב אחר ההתקדמות שלך לאורך זמן.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                אתגרי תרגום
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                תרגם מילים ומשפטים מעברית לאנגלית ולהיפך בזמן מוגבל.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                השלמת משפטים
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                השלם את החלקים החסרים במשפטים באנגלית ושפר את הבנת הקריאה שלך.
              </p>
            </div>

            <div className="p-4 bg-white rounded-lg shadow-sm md:p-6">
              <div className="flex items-center justify-center w-10 h-10 mb-3 text-white rounded-full bg-indigo-600 md:w-12 md:h-12 md:mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                  />
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900 md:text-xl">
                התאמה אישית
              </h3>
              <p className="text-sm text-gray-600 md:text-base">
                המערכת מתאימה את רמת הקושי לרמה האישית שלך לחוויית למידה מיטבית.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white md:py-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              היתרונות של משחק Langame
            </h2>
            <p className="text-lg text-gray-600">
              למה לבחור בפלטפורמה שלנו ללימוד אנגלית?
            </p>
          </div>

          <div className="grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                למידה מהירה יותר
              </h3>
              <p className="text-gray-600">
                הצורה התחרותית מאיצה את הלמידה ומשפרת את יכולת הזיכרון וההטמעה
                של מילים חדשות.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                למידה מהנה
              </h3>
              <p className="text-gray-600">
                המשחקיות הופכת את לימוד האנגלית לחוויה מהנה במקום למשימה משעממת.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                למידה חברתית
              </h3>
              <p className="text-gray-600">
                התחרות והשוואה עם חברים יוצרת מוטיבציה גבוהה יותר להתמיד
                ולהצליח.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                התאמה אישית
              </h3>
              <p className="text-gray-600">
                התאמת רמת הקושי והחומר הנלמד בהתאם לרמה ולצרכים האישיים שלך.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                למידה בכל זמן
              </h3>
              <p className="text-gray-600">
                משחק קצר בכל זמן פנוי - בהפסקות, בתור, או בנסיעה בתחבורה
                ציבורית.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-white rounded-full bg-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </div>
              <h3 className="mb-3 text-xl font-semibold text-gray-900">
                מדידה והתקדמות
              </h3>
              <p className="text-gray-600">
                מערכת הדירוג מאפשרת לך לראות את ההתקדמות שלך ולהשוות אותה עם
                אחרים.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50 md:py-24">
        <div className="container px-4 mx-auto max-w-7xl">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-6 text-3xl font-bold text-gray-900 md:text-4xl">
              איך זה עובד?
            </h2>
            <p className="text-lg text-gray-600">
              4 צעדים פשוטים להתחלת המסע שלך ללימוד אנגלית בדרך חדשה ומהנה
            </p>
          </div>

          <div className="relative">
            <div className="absolute hidden w-1 h-full transform -translate-x-1/2 lg:block bg-indigo-200 left-1/2"></div>

            <div className="space-y-12">
              <div className="relative grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="relative order-last lg:order-first">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="/step1.svg"
                      alt="הרשמה פשוטה"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto text-xl font-bold text-white rounded-full bg-indigo-600 lg:absolute lg:top-0 lg:right-0 lg:mx-0">
                    1
                  </div>
                  <div className="p-6 mt-6 bg-white rounded-lg shadow-sm lg:mt-0 lg:mr-16">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                      הרשמה פשוטה
                    </h3>
                    <p className="text-gray-600">
                      צור חשבון בקלות באמצעות האימייל שלך או התחבר דרך חשבון
                      גוגל. תהליך קצר וידידותי שלוקח פחות מדקה.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto text-xl font-bold text-white rounded-full bg-indigo-600 lg:absolute lg:top-0 lg:left-0 lg:mx-0">
                    2
                  </div>
                  <div className="p-6 mt-6 bg-white rounded-lg shadow-sm lg:mt-0 lg:ml-16">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                      מבחן רמה קצר
                    </h3>
                    <p className="text-gray-600">
                      ענה על כמה שאלות שיעזרו לנו להתאים את המשחק לרמת האנגלית
                      שלך, כדי שתוכל להתחיל בדיוק מהנקודה הנכונה עבורך.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="/step2.svg"
                      alt="מבחן רמה קצר"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="relative grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="relative order-last lg:order-first">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="/step3.svg"
                      alt="שחק משחקים בזמן אמת"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>

                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto text-xl font-bold text-white rounded-full bg-indigo-600 lg:absolute lg:top-0 lg:right-0 lg:mx-0">
                    3
                  </div>
                  <div className="p-6 mt-6 bg-white rounded-lg shadow-sm lg:mt-0 lg:mr-16">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                      שחק משחקים בזמן אמת
                    </h3>
                    <p className="text-gray-600">
                      התחרה נגד שחקנים אחרים ברמה דומה לשלך במשחקי תרגום, השלמת
                      משפטים, ואתגרי אוצר מילים מגוונים.
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative grid items-center grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="relative">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto text-xl font-bold text-white rounded-full bg-indigo-600 lg:absolute lg:top-0 lg:left-0 lg:mx-0">
                    4
                  </div>
                  <div className="p-6 mt-6 bg-white rounded-lg shadow-sm lg:mt-0 lg:ml-16">
                    <h3 className="mb-4 text-2xl font-semibold text-gray-900">
                      צבור נקודות ושפר את הדירוג שלך
                    </h3>
                    <p className="text-gray-600">
                      ככל שתשחק ותנצח יותר, כך הדירוג שלך יעלה. עקוב אחר
                      ההתקדמות שלך בלוח התוצאות ושתף את ההישגים שלך עם חברים.
                    </p>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <Image
                      src="/step4.svg"
                      alt="צבור נקודות ושפר את הדירוג שלך"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-indigo-600 md:py-24">
        <div className="container px-4 mx-auto text-center max-w-7xl">
          <div className="max-w-3xl mx-auto mb-10">
            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl">
              מוכנים להתחיל ללמוד אנגלית בדרך חדשה?
            </h2>
            <p className="mb-8 text-lg text-indigo-100">
              הצטרפו למאות לומדים שכבר שיפרו את האנגלית שלהם דרך Langame. התחילו
              לשחק עכשיו - בחינם!
            </p>
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <Link
                href="/auth/signup"
                className="px-8 py-4 text-lg font-medium text-indigo-600 transition-all bg-white rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                התחל לשחק עכשיו
              </Link>
              <Link
                href="/auth/signin"
                className="px-8 py-4 text-lg font-medium text-white transition-all border border-white rounded-full hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-indigo-600"
              >
                התחבר לחשבון קיים
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
