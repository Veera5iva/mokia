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
                  Get personalized guidance tailored to your unique situation, with dedicated attention on your emotions, challenges, and growth journey.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="/images/section-1-1.jpg"
                     alt="startup template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="/images/section-1-2.jpg"
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
                  We provide a secure, judgment-free space where you can speak openly and process your feelings with complete confidentiality.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="/images/section-2-1.jpg"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="/images/section-2-2.jpg"
                     alt="feature template"
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
                  Easily book appointments at times that work best for you, with convenient online scheduling designed to fit your lifestyle.
               </p>
               
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="/images/section-3-1.jpg"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="/images/section-3-2.jpg"
                     alt="feature template"
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
                  Benefit from research-backed techniques and compassionate support to help you heal, rebuild confidence, and move forward stronger.
               </p>
               <div className="grid grid-cols-2 gap-4">
                  <img
                     src="/images/section-4-1.jpg"
                     alt="hero template"
                     width={500}
                     height={500}
                     className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60" />
                  <img
                     src="/images/section-4-2.jpg"
                     alt="feature template"
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
