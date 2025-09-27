"use client"

import { Card, CardContent } from "@/components/ui/card"

export default function CancellationRefundsPage() {
   return (
      <div className="min-h-screen bg-gray-50 text-gray-800 py-16 px-6">
         <div className="max-w-4xl mx-auto">
            {/* Header */}
            <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-10">
               Cancellations & Refunds
            </h1>

            {/* Card Container */}
            <Card className="shadow-lg border border-gray-200">
               <CardContent className="p-6 md:p-10 space-y-6 leading-relaxed">
                  <p>
                     <strong>PRAGATHEESH KAILASAM</strong> believes in helping its customers as much
                     as possible and therefore has a liberal cancellation policy. Under this policy:
                  </p>

                  <h2 className="text-xl font-semibold text-gray-900">Cancellation Policy</h2>
                  <ul className="list-disc pl-6 space-y-2">
                     <li>
                        Cancellations will be considered only if the request is made within{" "}
                        <strong>1–2 days</strong> of placing the order.
                     </li>
                     <li>
                        Cancellation requests may not be entertained if the orders have already been
                        communicated to vendors/merchants and the shipping process has started.
                     </li>
                     <li>
                        Orders for perishable items such as flowers or eatables cannot be cancelled.
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Refunds & Replacements</h2>
                  <ul className="list-disc pl-6 space-y-2">
                     <li>
                        Refunds or replacements may be made if the customer establishes that the
                        quality of the product delivered is not satisfactory.
                     </li>
                     <li>
                        If you receive a damaged or defective item, report it to our Customer Service
                        team within <strong>1–2 days</strong> of receipt. The request will be
                        processed after verification by the merchant.
                     </li>
                     <li>
                        If you feel that the product received is not as shown on the site or does not
                        meet expectations, notify our Customer Service within <strong>1–2 days</strong>{" "}
                        of delivery. The team will review your complaint and take an appropriate
                        decision.
                     </li>
                     <li>
                        For products covered under manufacturer warranty, please contact the
                        manufacturer directly.
                     </li>
                  </ul>

                  <h2 className="text-xl font-semibold text-gray-900">Refund Timeline</h2>
                  <p>
                     In case a refund is approved by <strong>PRAGATHEESH KAILASAM</strong>, it will be
                     processed within <strong>1–2 days</strong> to the original payment method of the
                     customer.
                  </p>
               </CardContent>
            </Card>
         </div>
      </div>
   )
}
