"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function PrivacyPolicyPage() {
   return (
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
               Privacy Policy
            </h1>

            {/* Card Container */}
            <Card className="shadow-lg border border-gray-200">
               <CardContent className="p-6 md:p-10 space-y-6 leading-relaxed">
                  <p>
                     This privacy policy sets out how <strong>PRAGATHEESH KAILASAM</strong> uses and
                     protects any information that you give <strong>PRAGATHEESH KAILASAM</strong>{" "}
                     when you visit their website and/or agree to purchase from them.
                  </p>

                  <p>
                     <strong>PRAGATHEESH KAILASAM</strong> is committed to ensuring that your
                     privacy is protected. Should we ask you to provide certain information by which
                     you can be identified when using this website, then you can be assured that it
                     will only be used in accordance with this privacy statement.
                  </p>

                  <p>
                     <strong>PRAGATHEESH KAILASAM</strong> may change this policy from time to time
                     by updating this page. You should check this page from time to time to ensure
                     that you adhere to these changes.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Information We Collect</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>Name</li>
                     <li>Contact information including email address</li>
                     <li>Demographic information such as postcode, preferences and interests</li>
                     <li>Other information relevant to customer surveys and/or offers</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">What We Do With The Information</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>Internal record keeping</li>
                     <li>Improving our products and services</li>
                     <li>Sending promotional emails about new products, special offers or updates</li>
                     <li>Contacting you for market research purposes (via email, phone, or mail)</li>
                     <li>Customizing the website according to your interests</li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Security</h2>
                  <p>
                     We are committed to ensuring that your information is secure. In order to
                     prevent unauthorized access or disclosure, we have put in suitable measures.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Cookies</h2>
                  <p>
                     A cookie is a small file which asks permission to be placed on your computer&apos;s
                     hard drive. Cookies allow web applications to tailor operations to your needs,
                     likes and dislikes by gathering and remembering information about your
                     preferences.
                  </p>
                  <p>
                     We use traffic log cookies to identify which pages are being used. This helps
                     us analyze data and improve our website. You can choose to accept or decline
                     cookies through your browser settings.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Controlling Your Information</h2>
                  <ul className="list-disc pl-6 space-y-1">
                     <li>
                        You may choose to restrict the collection or use of your personal
                        information.
                     </li>
                     <li>
                        If you have previously agreed to direct marketing, you may change your mind
                        anytime by writing to or emailing us at{" "}
                        <a
                           href="mailto:pragatheeshcareer@gmail.com"
                           className="text-yellow-600 hover:underline"
                        >
                           pragatheeshcareer@gmail.com
                        </a>
                        .
                     </li>
                  </ul>

                  <p>
                     We will not sell, distribute or lease your personal information to third
                     parties unless required by law or with your permission.
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Contact Information</h2>
                  <p>
                     If you believe any information we are holding on you is incorrect or
                     incomplete, please contact us as soon as possible:
                  </p>
                  <ul className="list-none space-y-1">
                     <li>
                        <strong>Address:</strong> 1st Cross Paramasivapuram Lalgudi Tiruchirappalli
                        TAMIL NADU 621601
                     </li>
                     <li>
                        <strong>Phone:</strong>{" "}
                        <a href="tel:+918778904546" className="text-yellow-600 hover:underline">
                           +91 87789 04546
                        </a>
                     </li>
                     <li>
                        <strong>Email:</strong>{" "}
                        <a
                           href="mailto:pragatheeshcareer@gmail.com"
                           className="text-yellow-600 hover:underline"
                        >
                           pragatheeshcareer@gmail.com
                        </a>
                     </li>
                  </ul>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
