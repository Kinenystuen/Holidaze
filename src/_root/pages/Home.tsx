const Home = () => {
  return (
    <div className="relative ">
      <div className="relative z-10 bg-customBg pb-10 dark:bg-customBgDark">
        {/* BODY SECTION */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-10">
            <h1 className="text-4xl font-bold text-center text-customText dark:text-customTextDark">
              Home
            </h1>
            <p className="text-pink-600">Hello there</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
