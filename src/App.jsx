import { useState } from "react";

export default function App() {
  const [step, setStep] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [storedData, setStoredData] = useState([]);

  // Function to generate all dates for a given month
  const generateMonthDates = (year, month) => {
    const dates = [];
    const date = new Date(year, month, 1);
    while (date.getMonth() === month) {
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const monthName = date.toLocaleDateString("en-US", { month: "short" });
      const day = date.getDate();
      dates.push(`${dayName}, ${monthName} ${day}`);
      date.setDate(date.getDate() + 1);
    }
    return dates;
  };

  const today = new Date();
  const dates = generateMonthDates(today.getFullYear(), today.getMonth());

  const images = [
    {
      id: 1,
      src: "https://cdn.district.in/movies-assets/images/cinema/p%20Chainsaw-Man---The-Movie--Reze-Arc-ee51dd10-4298-11f0-aa9f-8fefdb33bbbf.jpg",
      label: "Chainsaw Man – The Movie: Reze Arc",
    },
    {
      id: 2,
      src: "https://cdn.district.in/movies-assets/images/cinema/Param-Sundari_Poster-ef520680-7773-11f0-8df3-db01d1baa444.jpg",
      label: "Param Sundari",
    },
    {
      id: 3,
      src: "https://preview.redd.it/new-poster-for-the-conjuring-last-rites-v0-4a68gyttrsif1.jpeg?width=640&crop=smart&auto=webp&s=ea9bd9c777f8d3cd4f7a1b51975e19911dbb6633",
      label: "The Conjuring: Last Rites",
    },
    {
      id: 4,
      src: "https://cdn.district.in/movies-assets/images/cinema/Demon-Slayer--Kimetsu-no-Yaiba-a9b51c00-4534-11f0-aa9f-8fefdb33bbbf.jpg",
      label: "Demon Slayer Infinity Castle",
    },
  ];

  // Generate times dynamically (from 9 AM to 4 PM)
  const generateTimes = (startHour, endHour) => {
    const times = [];
    for (let hour = startHour; hour <= endHour; hour++) {
      const date = new Date();
      date.setHours(hour, 0, 0, 0);
      times.push(
        date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })
      );
    }
    return times;
  };

  const times = generateTimes(9, 16); // 9 AM to 4 PM

  const confirmBooking = () => {
    const newBooking = {
      image: selectedImage.label,
      date: selectedDate,
      time: selectedTime,
    };
    setStoredData([...storedData, newBooking]);
    setStep(6);
  };

  const lastBooking = storedData[storedData.length - 1]; // latest booking

  return (
    <div
      className="min-h-screen flex items-start justify-center bg-cover bg-center pt-20"
      style={{
        backgroundImage:
          "url('https://img.freepik.com/free-vector/flat-design-movie-theater-background_23-2150998489.jpg?semt=ais_hybrid&w=740&q=80')",
      }}
    >
      <div className="bg-transparent p-8 w-full max-w-3xl text-center min-h-[70vh]">
        {/* Step 1: Start button */}
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            className="mx-auto focus:outline-none"
          >
            <div className="flex justify-center space-x-2 mb-2">
              <span
                className="text-3xl font-bold animate-bounce"
                style={{ animationDelay: "0s" }}
              >
                Tap
              </span>
              <span
                className="text-3xl font-bold animate-bounce"
                style={{ animationDelay: "0.2s" }}
              >
                Tap
              </span>
              <span
                className="text-3xl font-bold animate-bounce"
                style={{ animationDelay: "0.4s" }}
              >
                Tap!!!
              </span>
            </div>

            <img
              src="https://i.pinimg.com/originals/d8/13/74/d81374b9bf003f023635d6ce58fc3d3c.gif"
              alt="Start"
              className="w-64 h-64 object-contain hover:scale-105 transition-transform"
            />
          </button>
        )}

        {/* Step 2: Select a Movie */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Koi si Movie Dekhne chloge mere saath 🥹!!
            </h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setSelectedImage(img);
                    setStep(3);
                  }}
                  className="flex-shrink-0 w-32 sm:w-48 cursor-pointer border rounded-xl p-2 hover:shadow-lg bg-transparent"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="rounded-lg w-full h-40 sm:h-64 object-cover"
                  />
                  <p className="mt-2 text-xs sm:text-sm font-medium">
                    {img.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select a Date */}
        {step === 3 && selectedImage && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Plzz date bhi bta do chlo 🥹....
            </h2>
            <div className="flex flex-wrap gap-2 justify-center max-h-64 overflow-y-auto no-scrollbar">
              {dates.map((date, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedDate(date);
                    setStep(4);
                  }}
                  className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
                >
                  {date}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Select a Time (2×4 grid centered) */}
        {step === 4 && selectedDate && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Jis bhi Times ap bolo Cutie 🤌
            </h2>
            <div className="grid grid-rows-4 grid-cols-2 gap-3">
              {times.map((time, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedTime(time);
                    setStep(5);
                  }}
                  className="px-4 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Booking Summary centered */}
        {step === 5 && selectedTime && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">
              Great now just send me the ss or next page 🥰🥰🥰
            </h2>
            <div className="bg-transparent p-4 rounded-lg text-left w-80">
              <p>
                <strong>Movie:</strong> {selectedImage.label}
              </p>
              <p>
                <strong>Date:</strong> {selectedDate}
              </p>
              <p>
                <strong>Time:</strong> {selectedTime}
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={confirmBooking}
                className="px-6 py-2 border border-black rounded-lg hover:bg-black hover:text-white transition"
              >
                Thank you jii 🫠!!..
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Stored Bookings centered */}
        {step === 6 && (
          <div className="flex flex-col items-center">
            {lastBooking && (
              <h2 className="text-xl font-semibold mb-4">
                Now i will wait till {lastBooking.date} 💝🥰
              </h2>
            )}
            <ul className="text-left space-y-2 w-80">
              {storedData.map((booking, idx) => (
                <li
                  key={idx}
                  className="bg-transparent p-3 rounded-lg border border-black"
                >
                  <p>
                    <strong>Movie:</strong> {booking.image}
                  </p>
                  <p>
                    <strong>Date:</strong> {booking.date}
                  </p>
                  <p>
                    <strong>Time:</strong> {booking.time}
                  </p>
                </li>
              ))}
            </ul>
            <img
              src="https://media.tenor.com/-HF7-xdOAAwAAAAj/bubu-dudu-bubu-dudu-shy.gif"
              alt="Img"
              className="w-32 h-32 mt-10 object-contain hover:scale-105 transition-transform"
            />
          </div>
        )}
      </div>
    </div>
  );
}
