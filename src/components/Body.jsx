import React from 'react';
import { Profile } from './Profile';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';

export const Body = () => {
  const totalItems = 21;
  const itemsPerPage = 5;

  return (
    <div className="container mx-auto w-full px-4 py-6 relative"> {/* Added relative here */}
      <h2 className="text-xl font-extrabold text-gray-900 mb-6 tracking-tight font-poppins">Popular Novels</h2>
      <div className="relative overflow-hidden"> {/* Prevents horizontal scrolling */}
        <Splide
          options={{
            type: 'loop',
            perPage: itemsPerPage,
            perMove: 1,
            gap: '1rem',
            arrows: true,
            pagination: false,
            drag: true,
            keyboard: true,
            breakpoints: {
              640: { perPage: 1 },
              768: { perPage: 2 },
              1024: { perPage: 3 },
              1280: { perPage: itemsPerPage },
            },
          }}
          className="splide-container"
        >
          {Array.from({ length: totalItems }).map((_, index) => (
            <SplideSlide key={index} className="px-1">
              <div className="transform scale-90"> {/* Shrinking the cards */}
                <Profile />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <style jsx global>{`
        .splide-container {
          padding: 0 2rem; /* Adjusted padding to bring arrows inside */
          position: relative;
        }
        .splide__arrow {
          background: white;
          width: 2.5rem;
          height: 2.5rem;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
          opacity: 1;
          border: none;
          transition: all 0.2s ease;
          pointer-events: auto;
          z-index: 10;
        }
        .splide__arrow--prev {
          left: 0.5rem; /* Adjusted to keep it inside the container */
        }
        .splide__arrow--next {
          right: 0.5rem; /* Adjusted to keep it inside the container */
        }
        .splide__arrow:hover {
          background: #3b82f6;
          transform: scale(1.1);
        }
        .splide__arrow:hover svg {
          fill: white;
        }
        @media (max-width: 768px) {
          .splide__arrow {
            width: 2rem;
            height: 2rem;
          }
          .splide__arrow--prev {
            left: 0.2rem;
          }
          .splide__arrow--next {
            right: 0.2rem;
          }
        }
      `}</style>
    </div>
  );
};
