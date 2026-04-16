const supportSteps = [
  {
    title: "1. Initial Setup and Location Access",
    summary:
      "Grant location access the first time you open the app. This permission is required.",
    items: [
      "Silent Whistle uses your real-time location to verify that you are within Nigeria.",
      "The app is built for Nigerian communities, so location access keeps reports relevant to your area.",
      "Without GPS access, the app cannot validate your access or surface local activity correctly.",
    ],
  },
  {
    title: "2. Account Registration and Security",
    summary:
      "Create an account with your basic details, then sign in with your credentials.",
    items: [
      "Use the login screen to access your account once registration is complete.",
      "If you forget your password, use the Forgot Password flow on the login screen.",
      "Follow the reset instructions carefully to restore secure access.",
    ],
  },
  {
    title: "3. Exploring the App",
    summary:
      "After login, the Home dashboard shows live community activity and map-based updates.",
    items: [
      "Browse Shouts shared by other users from your community on the Home page.",
      "Use the live map to monitor localized incidents and real-time updates near you.",
    ],
  },
  {
    title: '4. Creating a "Shout"',
    summary:
      "A Shout is the report you publish to alert or inform the community.",
    items: [
      'Tap the "Create Shout" button to start a new report.',
      "Attach images, voice notes, or videos when you need visual or audio evidence.",
      "Choose the correct category, such as Safety, Infrastructure, or Community Idea.",
      "Submit the report anonymously so the community can view it without revealing your identity.",
    ],
  },
  {
    title: "5. Managing Your Profile",
    summary:
      "Use Settings to keep your personal account details current and control session access.",
    items: [
      "Update your name and location from the Settings menu.",
      "Your email address cannot be changed after account creation for security and verification reasons.",
      "You can log out securely at any time from the same Settings area.",
    ],
  },
];

const quickFacts = [
  {
    label: "Location Access",
    value: "Required",
    detail: "Needed to verify presence in Nigeria and localize reports.",
  },
  {
    label: "Identity Protection",
    value: "Anonymous",
    detail: "Posts remain tied to a system-generated username.",
  },
  {
    label: "Support Response",
    value: "Direct Channels",
    detail: "Reach support by email, phone, or the official website.",
  },
];

const faqs = [
  {
    question: "Can I use the app without enabling GPS?",
    answer:
      "No. GPS is required to verify that you are in Nigeria and to provide accurate community data.",
  },
  {
    question: "Is my voice note or video upload anonymous?",
    answer:
      "Yes. Your identity stays hidden behind a system-generated username, even when media is attached to a Shout.",
  },
];

const bugReportChecklist = [
  "Take a screenshot of the error.",
  "Email support@silentwhistle.app with the screenshot attached.",
  "Include your device type, such as iPhone 13, and a brief description of the issue.",
];

const supportChannels = [
  {
    label: "Email",
    value: "support@silentwhistle.app",
    href: "mailto:support@silentwhistle.app",
  },
  {
    label: "Phone",
    value: "+234 701 326 8743",
    href: "tel:+2347013268743",
  },
  {
    label: "Website",
    value: "www.silentwhistle.app",
    href: "https://www.silentwhistle.app",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.18),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_28%)]" />

        <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[28px] border border-zinc-800 bg-[#0D0F10]/95 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
            <div className="border-b border-zinc-800 pb-8">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-3xl space-y-4">
                  <div className="inline-flex w-fit items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-green-400">
                    Support
                  </div>

                  <div className="space-y-3">
                    <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                      Silent Whistle User Guide and Support
                    </h1>
                    <p className="text-sm leading-7 text-zinc-400 sm:text-base">
                      Set up your account, navigate the app, and share
                      community reports securely. This guide keeps the support
                      flow simple while staying consistent with the product
                      rules around location, identity protection, and verified
                      access.
                    </p>
                  </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-3 lg:max-w-xl">
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
              </div>
            </div>

            <div className="mt-8 grid gap-5 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,0.9fr)]">
              <div className="space-y-5">
                {supportSteps.map((step) => (
                  <article
                    key={step.title}
                    className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6"
                  >
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                      {step.title}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                      {step.summary}
                    </p>

                    <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                      {step.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                ))}

                <article className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    6. Frequently Asked Questions
                  </h2>
                  <div className="mt-5 space-y-4">
                    {faqs.map((faq) => (
                      <div
                        key={faq.question}
                        className="rounded-xl border border-zinc-800 bg-black/30 p-4"
                      >
                        <p className="text-sm font-medium text-white sm:text-[15px]">
                          Q: {faq.question}
                        </p>
                        <p className="mt-2 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                          A: {faq.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="space-y-5">
                <article className="rounded-2xl border border-green-500/20 bg-gradient-to-br from-green-500/10 to-[#101612] p-5 sm:p-6">
                  <p className="text-xs uppercase tracking-[0.18em] text-green-400">
                    Reporting Flow
                  </p>
                  <h2 className="mt-3 text-xl font-semibold text-white">
                    Create a secure community alert
                  </h2>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-zinc-200">
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      Start from the Create Shout action.
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      Add media evidence if needed.
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      Pick the correct category before publishing.
                    </div>
                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      Submit anonymously to protect your identity.
                    </div>
                  </div>
                </article>

                <article className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    7. Bug Reporting and Technical Issues
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                    If you encounter signup issues, upload failures, or any
                    other technical problem, send support enough detail to
                    reproduce the issue quickly.
                  </p>

                  <ul className="mt-4 space-y-3 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                    {bugReportChecklist.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>

                <article className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    8. Contact Information
                  </h2>
                  <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                    For direct assistance, reach the Silent Whistle support
                    team through any of the channels below.
                  </p>

                  <div className="mt-5 space-y-3">
                    {supportChannels.map((channel) => (
                      <a
                        key={channel.label}
                        href={channel.href}
                        className="block rounded-xl border border-zinc-800 bg-black/30 p-4 transition-colors hover:border-green-500/30 hover:bg-green-500/10"
                      >
                        <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                          {channel.label}
                        </p>
                        <p className="mt-2 text-sm font-medium text-white sm:text-[15px]">
                          {channel.value}
                        </p>
                      </a>
                    ))}
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
