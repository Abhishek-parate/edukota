import React from "react";

function ThankYou() {
  return (
    <div className="container mx-auto py-4 px-6">
      {/* Banner Image */}
      <div className="w-full mb-4">
        <img
          src="/assets/logo-educat.jpg" // Replace with actual banner image URL
          alt="Banner"
          className="w-full h-auto object-cover rounded-lg shadow-lg"
        />
      </div>

      {/* Main Content Section */}
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-8 text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-gray-800">Thank You!</h1>
        <p className="text-gray-600 text-lg mb-4">
          Your exam has been submitted successfully. 🎉
        </p>

        {/* Results Declaration Banner */}
        <div className="bg-yellow-300 text-yellow-900 p-4 rounded-lg shadow-lg">
          <h2 className="font-semibold text-xl">Results Declaration</h2>
          <p className="text-base">Your results will be declared soon! Stay tuned.</p>
        </div>

        <p className="text-gray-500 text-md">
          We appreciate your effort and commitment. Your answers are being processed.
        </p>

        {/* Navigation Buttons */}
        <div className="flex justify-center space-x-4">
          <a
            href="/"
            aria-label="Go to home"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Go to Home
          </a>
          
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
