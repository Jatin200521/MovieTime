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
      src: "/img/Movie1.jpg",
      label: "Chainsaw Man – The Movie: Reze Arc",
    },
    { id: 2, src: "/img/Movie2.jpg", label: "Param Sundari" },
    { id: 3, src: "/img/Movie3.jpg", label: "The Conjuring: Last Rites" },
    { id: 4, src: "/img/Movie4.jpg", label: "Demon Slayer Infinity Castle" },
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

  return (
    <div
      className="min-h-screen flex items-start justify-center bg-cover bg-center pt-14"
      style={{ backgroundImage: "url('/img/background.jpg')" }}
    >
      <div className="bg-transparent p-8 w-full max-w-3xl text-center min-h-[70vh]">
        {/* Step 1: Start button */}
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            className="mx-auto focus:outline-none"
          >
            <img
              src="/img/3-1.thumb128.webp"
              alt="Start"
              className="w-64 h-64 object-contain hover:scale-105 transition-transform"
            />
          </button>
        )}

        {/* Step 2: Select a Movie */}
        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a Movie</h2>
            <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
              {images.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setSelectedImage(img);
                    setStep(3);
                  }}
                  className="flex-shrink-0 w-48 cursor-pointer border rounded-xl p-2 hover:shadow-lg bg-transparent"
                >
                  <img
                    src={img.src}
                    alt={img.label}
                    className="rounded-lg w-full h-64 object-cover"
                  />
                  <p className="mt-2 text-sm font-medium">{img.label}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Select a Date */}
        {step === 3 && selectedImage && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select a Date</h2>
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
            <h2 className="text-xl font-semibold mb-4">Available Times</h2>
            <div className="grid grid-rows-4 grid-cols-2 gap-3 justify-items-center">
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
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
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
                Confirm Booking
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Stored Bookings centered */}
        {step === 6 && (
          <div className="flex flex-col items-center">
            <h2 className="text-xl font-semibold mb-4">All Stored Bookings</h2>
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
          </div>
        )}
      </div>
    </div>
  );
}
