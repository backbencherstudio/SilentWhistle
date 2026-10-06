const subscriptionPlans = [
  {
    label: "Free Trial",
    price: "First 3 Months",
    detail: "90 days completely free for new users.",
    accent: "border-green-500/30 bg-green-500/10",
  },
  {
    label: "Monthly",
    price: "₦1,500",
    detail: "Billed every month after the trial period ends.",
  },
  {
    label: "Quarterly",
    price: "₦3,500",
    detail: "One payment covers a full 3-month cycle.",
  },
  {
    label: "Semi-Annual",
    price: "₦6,000",
    detail: "A 6-month plan for longer uninterrupted access.",
  },
  {
    label: "Annual",
    price: "₦10,000",
    detail: "12 months of premium access at the best value.",
    accent: "border-green-500/30 bg-gradient-to-br from-green-500/12 to-[#101612]",
  },
];

const quickFacts = [
  {
    label: "Trial Window",
    value: "90 Days",
    detail: "Cancel at least 24 hours before the trial expires to avoid charges.",
  },
  {
    label: "Renewal",
    value: "Automatic",
    detail: "Subscriptions renew unless auto-renew is turned off in your store settings.",
  },
  {
    label: "Refunds",
    value: "Store Managed",
    detail: "Apple and Google handle billing, payments, and refund decisions directly.",
  },
];

const billingSections = [
  {
    title: "1. Subscription Plans & Premium Access",
    paragraphs: [
      "Unlock the full potential of Silent Whistle with flexible subscription plans designed for continued premium access.",
      "New users begin with an exclusive 3-month free trial to experience all premium features before paid billing starts.",
    ],
  },
  {
    title: "2. Automatic Renewal & Billing",
    items: [
      "After your 3-month free trial ends, your chosen subscription plan will automatically begin and payment will be charged to your iTunes or Google Play account.",
      "Subscriptions renew automatically at the end of each billing cycle unless auto-renew is turned off before renewal.",
      "Your account will be charged for renewal within 24 hours before the end of the current billing period.",
      "To avoid being charged after the trial, you must cancel at least 24 hours before the free trial expires.",
    ],
  },
  {
    title: "4. Refunds & Support",
    items: [
      "All billing and transactions are securely managed by Apple App Store or Google Play Store.",
      "Silent Whistle does not have access to your payment details and cannot issue refunds directly.",
      "For refund requests, contact Apple Support or Google Play Support through the platform used for the purchase.",
      "If you cancel a paid subscription, premium access remains active until the end of your current billing period.",
    ],
  },
];

const cancellationGuides = [
  {
    title: "For iOS (Apple) Users",
    steps: [
      "Open the Settings app on your iPhone or iPad.",
      "Tap your Apple ID or name at the top.",
      "Select Subscriptions.",
      "Find and tap Silent Whistle.",
      "Tap Cancel Subscription.",
    ],
  },
  {
    title: "For Android (Google Play) Users",
    steps: [
      "Open the Google Play Store app.",
      "Tap your profile icon at the top right.",
      "Go to Payments & Subscriptions, then Subscriptions.",
      "Select Silent Whistle from the list.",
      "Tap Cancel Subscription.",
    ],
  },
];

export default function EulaPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.17),_transparent_30%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_28%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[28px] border border-zinc-800 bg-[#0D0F10]/95 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
            <div className="border-b border-zinc-800 pb-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex w-fit items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-green-400">
                    Legal
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      EULA
                    </h1>
                    <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                      These Subscription and Billing Terms explain how premium
                      access, free trials, renewals, cancellation, and refund
                      handling work for Silent Whistle.
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-[#101012] p-4 text-sm text-zinc-300 sm:grid-cols-2 lg:min-w-[320px]">
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Effective Date
                    </p>
                    <p className="mt-2 font-medium text-white">May 1, 2026</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Applies To
                    </p>
                    <p className="mt-2 font-medium text-white">
                      App Store and Google Play subscriptions
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {quickFacts.map((fact) => (
                <div
                  key={fact.label}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] p-4"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-base font-semibold text-white">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">
                    {fact.detail}
                  </p>
                </div>
              ))}
            </div>

            <article className="mt-8 rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                1. Subscription Plans & Premium Access
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                Unlock the full potential of Silent Whistle with our flexible
                subscription plans. New users start with an exclusive trial to
                experience all premium features.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.label}
                    className={`rounded-2xl border border-zinc-800 bg-black/30 p-4 ${
                      plan.accent ?? ""
                    }`}
                  >
                    <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      {plan.label}
                    </p>
                    <p className="mt-3 text-xl font-semibold text-white">
                      {plan.price}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-zinc-400">
                      {plan.detail}
                    </p>
                  </div>
                ))}
              </div>
            </article>

            <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.95fr)]">
              <div className="space-y-5">
                {billingSections
                  .filter((section) => section.title !== "1. Subscription Plans & Premium Access")
                  .map((section) => (
                    <article
                      key={section.title}
                      className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6"
                    >
                      <h2 className="text-lg font-semibold text-white sm:text-xl">
                        {section.title}
                      </h2>

                      <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                        {"paragraphs" in section && section.paragraphs
                          ? section.paragraphs.map((paragraph) => (
                              <p key={paragraph}>{paragraph}</p>
                            ))
                          : null}

                        {"items" in section && section.items ? (
                          <ul className="space-y-3">
                            {section.items.map((item) => (
                              <li key={item} className="flex gap-3">
                                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    </article>
                  ))}
              </div>

              <div className="space-y-5">
                <article className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-[#101612] p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-green-400">
                    3. Easy Cancellation Guide
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-white">
                    Cancel directly from your device settings
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-200 sm:text-[15px]">
                    You have full control over your subscription and can cancel
                    at any time through the platform where you subscribed.
                  </p>
                </article>

                {cancellationGuides.map((guide) => (
                  <article
                    key={guide.title}
                    className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6"
                  >
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      {guide.title}
                    </h2>

                    <ol className="mt-4 space-y-3 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                      {guide.steps.map((step, index) => (
                        <li key={step} className="flex gap-3">
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-xs font-semibold text-green-400">
                            {index + 1}
                          </span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </article>
                ))}

                <a
                  href="mailto:support@silentwhistle.app"
                  className="block rounded-2xl border border-zinc-800 bg-[#101012] p-5 transition-colors hover:border-green-500/30 hover:bg-green-500/10 sm:p-6"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Billing Help
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">
                    support@silentwhistle.app
                  </p>
                  <p className="mt-2 text-sm leading-7 text-zinc-400 sm:text-[15px]">
                    For product support questions, contact Silent Whistle
                    directly. Refund decisions still remain with Apple or
                    Google based on the platform used for payment.
                  </p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
