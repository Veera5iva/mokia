/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
   const data = [
      {
         title: "1:1 Sessions",
         content: (
            <div>
               <p
                  className="mb-8 text-base md:text-lg font-normal text-neutral-800  dark:text-neutral-200">
                  Built and launched Aceternity UI and Aceternity UI Pro from scratch
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="https://assets.aceternity.com/templates/startup-1.webp"
                     alt="startup template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/templates/startup-2.webp"
                     alt="startup template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/templates/startup-3.webp"
                     alt="startup template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/templates/startup-4.webp"
                     alt="startup template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
               </div>
            </div>
         ),
      },
      {
         title: "Confidential",
         content: (
            <div>
               <p
                  className="mb-8 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
                  I usually run out of copy, but when I see content this big, I try to
                  integrate lorem ipsum.
               </p>
               <p
                  className="mb-8 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
                  Lorem ipsum is for people who are too lazy to write copy. But we are
                  not. Here are some more example of beautiful designs I built.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="https://assets.aceternity.com/pro/hero-sections.png"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/features-section.png"
                     alt="feature template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/pro/bento-grids.png"
                     alt="bento template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/cards.png"
                     alt="cards template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
               </div>
            </div>
         ),
      },
      {
         title: "Flexible",
         content: (
            <div>
               <p
                  className="mb-8 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
                  Deployed 5 new components on Aceternity today
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="https://assets.aceternity.com/pro/hero-sections.png"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/features-section.png"
                     alt="feature template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/pro/bento-grids.png"
                     alt="bento template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/cards.png"
                     alt="cards template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
               </div>
            </div>
         ),
      },
      {
         title: "Proven",
         content: (
            <div>
               <p
                  className="mb-8 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
                  I usually run out of copy, but when I see content this big, I try to
                  integrate lorem ipsum.
               </p>
               <p
                  className="mb-8 text-base font-normal text-neutral-800 md:text-lg dark:text-neutral-200">
                  Lorem ipsum is for people who are too lazy to write copy. But we are
                  not. Here are some more example of beautiful designs I built.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="https://assets.aceternity.com/pro/hero-sections.png"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/features-section.png"
                     alt="feature template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/pro/bento-grids.png"
                     alt="bento template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="https://assets.aceternity.com/cards.png"
                     alt="cards template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
               </div>
            </div>
         ),
      },
   ];
   return (
      <div className="relative w-full overflow-clip">
         <Timeline data={data} />
      </div>
   );
}
