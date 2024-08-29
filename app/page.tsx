import * as React from "react";

const HomePage: React.FC = () => {
  return (
    <div className="mt-24">
      <div className="relative z-10 text-center">
        <h1 className="text-4xl text-primary-30 mb-10 tracking-tight font-normal">
          به وب سایت شبکه کمک رسان ایران خوش آمدید
        </h1>
        <a
          href="/blog"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          بررسی مقالات
        </a>
      </div>
    </div>
  );
};

export default HomePage;
