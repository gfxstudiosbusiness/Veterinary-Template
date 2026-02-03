"use client";

import { Marquee } from "@/components/ui/marquee";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/components/ui/fade-in";

const reviews = [
  {
    body: "The vet doctor has a very sincere and caring attitude towards pets. She gave us a comprehensive explanation of Boa’s condition.",
    author: "Sherie Lou Fortuno",
  },
  {
    body: "Transparent. That's what I liked most about COS. They will lay out all the potential costs... so you know how much you'll spend.",
    author: "Arnold Glenn Managbanag",
  },
  {
    body: "Best experience in a Vet Clinic! The Vet and staffs are very approachable... they are definitely ANIMAL-LOVERS!",
    author: "Aprille Flores",
  },
  {
    body: "Our go-to vet since we moved here.",
    author: "Stanley Aguda",
  },
  {
    body: "Very approachable and accommodating.",
    author: "Jade Cacho Salazar",
  },
];

export function Testimonials() {
  return (
    <section className="py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
        <FadeIn>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Paw Parents</h2>
          <p className="text-lg text-slate-600">See what our community has to say about the COS experience.</p>
        </FadeIn>
      </div>

      <div className="relative w-full">
         {/* Gradient Masks */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-slate-50 to-transparent z-10 dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-slate-50 to-transparent z-10 dark:from-background"></div>

        <Marquee pauseOnHover className="[--duration:20s]">
          {reviews.map((review, i) => (
            <Card key={i} className="w-[300px] md:w-[400px] shrink-0 mx-4 border-none shadow-md bg-white">
              <CardContent className="p-6">
                <blockquote className="text-lg text-slate-700 font-medium mb-4 italic">"{review.body}"</blockquote>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                    {review.author[0]}
                  </div>
                  <cite className="not-italic text-sm font-semibold text-slate-900">{review.author}</cite>
                </div>
              </CardContent>
            </Card>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
