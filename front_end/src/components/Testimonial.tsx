"use client";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

const musictestimonial = [
  {
    id:1,
    quote:
      "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    name: "Winston Churchill",
    title: "Former Prime Minister of the United Kingdom",
  },
  {
    id:2,
    quote: "The only way to do great work is to love what you do.",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    id:3,
    quote:
      "In the end, it's not the years in your life that count. It's the life in your years.",
    name: "Abraham Lincoln",
    title: "16th President of the United States",
  },
  {
    id:4,
    quote: "You miss 100% of the shots you don't take.",
    name: "Wayne Gretzky",
    title: "Professional Hockey Player",
  },
  {
    id:5,
    quote: "Believe you can and you're halfway there.",
    name: "Theodore Roosevelt",
    title: "26th President of the United States",
  },
  {
    id:6,
    quote: "It always seems impossible until it's done.",
    name: "Nelson Mandela",
    title: "Former President of South Africa",
  },
  {
    id:7,
    quote: "Stay hungry, stay foolish.",
    name: "Steve Jobs",
    title: "Co-founder of Apple Inc.",
  },
  {
    id:8,
    quote:
      "The only limit to our realization of tomorrow will be our doubts of today.",
    name: "Franklin D. Roosevelt",
    title: "32nd President of the United States",
  },
  {
    id:9,
    quote: "Life is what happens when you're busy making other plans.",
    name: "John Lennon",
    title: "Singer-songwriter",
  },
  {
    id:10,
    quote:
      "The best time to plant a tree was 20 years ago. The second best time is now.",
    name: "Chinese Proverb",
    title: "Unknown",
  },
  {
    id:11,
    quote:
      "The future belongs to those who believe in the beauty of their dreams.",
    name: "Eleanor Roosevelt",
    title: "Former First Lady of the United States",
  },
  {
    id:12,
    quote: "Strive not to be a success, but rather to be of value.",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
  },
  {
    id:13,
    quote:
      "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.",
    name: "Albert Einstein",
    title: "Theoretical Physicist",
  },
  {
    id:14,
    quote: "Don't cry because it's over, smile because it happened.",
    name: "Dr. Seuss",
    title: "Author",
  },
  {
    id:15,
    quote: "Be yourself; everyone else is already taken.",
    name: "Oscar Wilde",
    title: "Writer and Poet",
  },
  {
    id:16,
    quote: "Be the change that you wish to see in the world.",
    name: "Mahatma Gandhi",
    title: "Leader of the Indian independence movement",
  }
];

function Testimonial() {
  return (
    <div className="h-[40rem] w-full dark:bg-black dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h2 className="text-3xl font-bold text-center mb-8 z-10">
        Hear our Harmony : Voices of Success
      </h2>

      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <InfiniteMovingCards
        items={musictestimonial}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

export default Testimonial;
