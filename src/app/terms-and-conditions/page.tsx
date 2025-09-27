"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function TermsAndConditionsPage() {
   return (
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
               Terms & Conditions
            </h1>

            {/* Card Container */}
            <Card className="shadow-lg border border-gray-200">
               <CardContent className="p-6 md:p-10 space-y-6 leading-relaxed">
                  <p>
                     For the purpose of these Terms and Conditions, the terms{" "}
                     <strong>&quot;we&quot;, &quot;us&quot;, &quot;our&quot;</strong> shall mean{" "}
                     <strong>PRAGATHEESH KAILASAM</strong>, whose
                     registered/operational office is 1st Cross Paramasivapuram Lalgudi Tiruchirappalli
                     TAMIL NADU 621601.
                  </p>
                  <p>
                     The terms <strong>&quot;you&quot;, &quot;your&quot;, &quot;user&quot;, &quot;visitor&quot;</strong> shall mean any natural or
                     legal person who is visiting our website and/or agreed to purchase from us.
                  </p>
                  <p>
                     Your use of the website and/or purchase from us are governed by the following
                     Terms and Conditions:
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">General Use</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>The content of this website is subject to change without notice.</li>
                     <li>
                        Neither we nor third parties provide any warranty or guarantee as to the
                        accuracy, timeliness, performance, completeness, or suitability of the
                        information and materials on this website for any particular purpose.
                     </li>
                     <li>
                        You acknowledge that such information and materials may contain inaccuracies
                        or errors, and we expressly exclude liability for these to the fullest extent
                        permitted by law.
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Your Responsibility</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>
                        Your use of any information or materials on this website is entirely at your
                        own risk, for which we shall not be liable.
                     </li>
                     <li>
                        It shall be your responsibility to ensure that any products, services, or
                        information available meet your specific requirements.
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Intellectual Property</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>
                        This website contains material owned by or licensed to us, including but not
                        limited to design, layout, appearance, and graphics.
                     </li>
                     <li>
                        Reproduction is prohibited other than in accordance with the copyright
                        notice, which forms part of these terms and conditions.
                     </li>
                     <li>
                        All trademarks reproduced that are not the property of, or licensed to, the
                        operator are acknowledged on the website.
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Unauthorized Use</h2>
                  <p>
                     Unauthorized use of information provided by us may give rise to a claim for
                     damages and/or be a criminal offense.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">External Links</h2>
                  <p>
                     From time to time, our website may include links to other websites. These are
                     provided for your convenience to supply further information. You may not create
                     a link to our website from another website or document without our prior written
                     consent.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Legal Jurisdiction</h2>
                  <p>
                     Any dispute arising out of the use of our website, purchases, or engagement with
                     us is subject to the laws of <strong>India</strong>.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Transactions</h2>
                  <p>
                     We shall not be liable for any loss or damage arising directly or indirectly out
                     of the decline of authorization for any transaction, on account of the cardholder
                     exceeding the preset limit agreed with our acquiring bank.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
