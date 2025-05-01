import Sidebar from "./Sidebar";

const PageLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full overflow-hidden" dir="rtl">
      <Sidebar />
      <div className="flex-1 overflow-auto py-8 px-32 bg-bg" dir="rtl">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
