import { Badge } from '@/components/ui/badge';
import { Star, Play } from 'lucide-react';
import React from 'react';
import { Card, CardHeader } from '../ui/card';

export default function SuccessStories() {
  const testimonials = [
    {
      name: 'Raihan Ahmed Shikder',
      role: 'Senior Officer, BRAC Bank',
      location: 'Dhaka',
      text: 'Private Bank Bootcamp completely transformed my preparation strategy. The mock tests were exactly like the real BRAC Bank exam. I secured my dream job in the first attempt!',
      initials: 'RS',
      badge: 'Hired in 1st Attempt',
    },
    {
      name: 'Tasnim Ferdous',
      role: 'Probationary Officer, Dutch-Bangla Bank',
      location: 'Chattogram',
      text: 'Flexible schedules and Bengali lectures helped me study even with a full-time job. Doubt-clearing sessions were a lifesaver.',
      initials: 'TF',
      badge: 'Top 50 Rank',
    },
    {
      name: 'Mehedi Hasan Khan',
      role: 'Management Trainee, City Bank',
      location: 'Sylhet',
      text: 'The interview prep and case-study system improved my confidence. Scored 92% and got selected as MTO.',
      initials: 'MH',
      badge: '92% Score',
    },
    {
      name: 'Farzana Islam',
      role: 'Trainee Assistant Officer, EBL',
      location: 'Khulna',
      text: 'From average to selected! The mentors guide like family. Practice materials are unmatched.',
      initials: 'FI',
      badge: 'Career Breakthrough',
    },
  ];

  const infiniteTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-10 px-4 sm:px-6 lg:px-8 bg-[#F7F9FA]">
      <div className="mx-auto max-w-[1200px]">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-[#2C3E50]">
            Success Stories from Our Students
          </h2>
          <p className="text-lg text-[#546270] max-w-xl mx-auto">
            Real people. Real results. Transforming careers across Bangladesh.
          </p>
        </div>

        {/* Infinite Horizontal Scroll */}
        <div className="relative overflow-hidden">
          <div
            className="flex gap-6 animate-scroll"
            style={{ animationDuration: '28s' }}
          >
            {infiniteTestimonials.map((testimonial, i) => (
              <Card
                key={i}
                className="bg-white flex-shrink-0 min-w-[300px] max-w-[350px] border border-[#E3E8EF] hover:shadow-md hover:scale-[1.02] transition-all duration-300"
                style={{ borderRadius: '6px' }}
              >
                <CardHeader className="p-5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-[#79CBFA] flex items-center justify-center text-[#1B2A38] font-semibold text-lg">
                      {testimonial.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex gap-1 mb-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            className="h-4 w-4 fill-[#FFD700] text-[#FFD700]"
                          />
                        ))}
                      </div>
                      <Badge className="bg-[#25cd71] text-white text-xs px-2 py-0.5">
                        {testimonial.badge}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-[#5B6571] italic mb-4 break-words">
                    "{testimonial.text}"
                  </p>

                  <div>
                    <p className="font-semibold text-[#2C3E50]">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-[#7B8A97]">{testimonial.role}</p>
                    <p className="text-xs text-[#9CA9B3]">
                      {testimonial.location}
                    </p>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="flex items-center gap-2 mx-auto text-[#79CBFA] hover:text-[#58B1E8] font-medium transition-all">
            <Play className="h-4 w-4" />
            Watch 100+ Real Success Interviews
          </button>
        </div>
      </div>

      <style>
        {`
          .animate-scroll {
            animation: scroll-left linear infinite;
          }
          @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
}
