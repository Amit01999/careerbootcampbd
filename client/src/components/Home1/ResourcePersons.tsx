import ram from '../../assets/resourseperson/ram.jpeg';
import rafid from '../../assets/resourseperson/sadman.jpeg';
import maruf from '../../assets/resourseperson/raful.jpeg';
import nafis from '../../assets/resourseperson/nafis .jpeg';
import rafiul from '../../assets/resourseperson/raful.jpeg';

const persons = [
  {
    name: 'Ram Krishna Shaha',
    designation: 'MTO, Dutch-Bangla Bank (DBBL)',
    image: ram,
  },
  {
    name: 'Sadman Rafid',
    designation: 'MTO, Mercantile Bank',
    image: rafid,
  },
  {
    name: 'Maruf Uz Zaman',
    designation: 'MTO, Prime Bank',
    image: maruf,
  },
  {
    name: 'Nafis Monsur',
    designation: 'MTO, Modhumoti Bank',
    image: nafis,
  },
  {
    name: 'Rafiul Hoque',
    designation: 'Officer, Agrani Bank | Ex-Banker, IFIC Bank',
    image: rafiul,
  },
];

export default function ResourcePersons() {
  return (
    <div className="py-8 md:py-12 lg:py-16 overflow-hidden">
      <div className="px-4 sm:px-6 md:px-12 lg:px-20 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
        <h2 className="text-center text-2xl sm:text-3xl md:text-4xl font-bold text-[#FFE8B0] mb-2 tracking-tight">
          Our Resource Persons
        </h2>
        <div className="w-16 sm:w-20 md:w-24 h-1 bg-gradient-to-r from-transparent via-[#FFE8B0] to-transparent mx-auto mb-6 sm:mb-8 md:mb-12"></div>
      </div>

      <div className="relative w-full overflow-hidden">
        {/* Left shadow gradient */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        {/* Right shadow gradient */}
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 md:w-32 lg:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none"></div>

        <div className="px-3 sm:px-4 md:px-12 lg:px-20 mx-2 sm:mx-4 md:mx-8 lg:mx-16">
          <div className="flex gap-4 sm:gap-6 md:gap-8 animate-scroll">
            {[...persons, ...persons].map((person, index) => (
              <div
                key={index}
                className="min-w-[200px] sm:min-w-[220px] md:min-w-[260px] bg-white/10 backdrop-blur-md rounded-xl md:rounded-2xl p-4 sm:p-5 md:p-6 text-center border border-white/20 hover:border-[#FFE8B0]/40 transition-all duration-500 shadow-card-animate"
              >
                <div className="relative inline-block">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full mx-auto object-cover border-2 sm:border-3 md:border-4 border-[#FFE8B0] shadow-xl"
                  />
                </div>
                <h3 className="mt-3 sm:mt-4 md:mt-5 text-base sm:text-lg md:text-xl font-bold text-white tracking-wide">
                  {person.name}
                </h3>
                <p className="text-xs sm:text-sm text-[#FFDFA3] mt-1.5 sm:mt-2 leading-relaxed font-medium">
                  {person.designation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* animation */}
      <style>{`
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }

        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .shadow-card-animate {
          animation: shadowPulse 3s ease-in-out infinite;
        }

        @keyframes shadowPulse {
          0%, 100% {
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          }
          50% {
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6), 0 0 40px rgba(255, 232, 176, 0.1);
          }
        }

        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 5s linear infinite;
          }
        }
      `}</style>
    </div>
  );
}
