const termsSections = [
  {
    title: "1. Use of the App",
    body: "You agree to use the App only for lawful purposes. You must not use the App to:",
    items: [
      "Post false, misleading, or harmful information",
      "Harass, abuse, or threaten others",
      "Upload illegal, offensive, or inappropriate content",
      "Violate any applicable laws or regulations in Nigeria",
    ],
  },
  {
    title: "2. User Accounts",
    paragraphs: [
      "The App may require you to provide basic information such as your name and email address. You are responsible for maintaining the confidentiality of your account.",
      "Silent Whistle uses system-generated usernames to protect your identity. You agree not to attempt to reveal the identity of other users.",
    ],
  },
  {
    title: "3. Anonymous Reporting",
    paragraphs: [
      "While the App allows anonymous reporting, you agree that all information submitted must be accurate to the best of your knowledge. Misuse of this feature may result in suspension or termination of access.",
    ],
  },
  {
    title: "4. Payments",
    paragraphs: [
      "Some features of the App may require payment. All payments are processed securely through third-party providers. We do not store your card details.",
    ],
  },
  {
    title: "5. Intellectual Property",
    paragraphs: [
      "All content, trademarks, and intellectual property related to the App are owned by Silent Whistle Enterprise. You may not copy, modify, or distribute any part of the App without permission.",
    ],
  },
  {
    title: "6. Privacy",
    paragraphs: [
      "Your use of the App is also governed by our Privacy Policy. We are committed to protecting your privacy and ensuring anonymity where applicable.",
    ],
  },
  {
    title: "7. Limitation of Liability",
    paragraphs: [
      "Silent Whistle Enterprise is not responsible for any damages or losses resulting from the use of the App, including reliance on user-generated content.",
    ],
  },
  {
    title: "8. Termination",
    paragraphs: [
      "We reserve the right to suspend or terminate your access to the App at any time if you violate these Terms.",
    ],
  },
  {
    title: "9. Changes to Terms",
    paragraphs: [
      "We may update these Terms from time to time. Continued use of the App after changes means you accept the revised Terms.",
    ],
  },
  {
    title: "10. Governing Law",
    paragraphs: [
      "These Terms shall be governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.",
    ],
  },
];

export default function TermsAndConditionPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[28px] border border-zinc-800 bg-[#0D0F10]/95 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 border-b border-zinc-800 pb-8">
              <div className="inline-flex w-fit items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-green-400">
                Legal
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Terms and Conditions
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Welcome to Silent Whistle. These Terms and Conditions
                  (&quot;Terms&quot;) govern your use of the Silent Whistle
                  mobile application (the &quot;App&quot;), operated by Silent
                  Whistle Enterprise (&quot;we&quot;, &quot;our&quot;, or
                  &quot;us&quot;). By accessing or using the App, you agree to
                  be bound by these Terms.
                </p>
              </div>

              <div className="grid gap-4 rounded-2xl border border-zinc-800 bg-[#101012] p-4 text-sm text-zinc-300 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Effective Date
                  </p>
                  <p className="mt-2 font-medium text-white">May 1, 2026</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Operator
                  </p>
                  <p className="mt-2 font-medium text-white">
                    Silent Whistle Enterprise
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {termsSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-zinc-800 bg-[#101012] p-5 sm:p-6"
                >
                  <h2 className="text-lg font-semibold text-white sm:text-xl">
                    {section.title}
                  </h2>

                  <div className="mt-4 space-y-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                    {"body" in section && section.body ? <p>{section.body}</p> : null}

                    {"paragraphs" in section && section.paragraphs
                      ? section.paragraphs.map((paragraph) => (
                          <p key={paragraph}>{paragraph}</p>
                        ))
                      : null}

                    {"items" in section && section.items ? (
                      <ul className="space-y-2">
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

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-[#101012] to-[#111813] p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                11. Contact Information
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                If you have any questions about these Terms, please contact us:
              </p>

              <div className="mt-5 grid gap-4 text-sm text-zinc-300 sm:grid-cols-2">
                <div className="rounded-xl border border-zinc-800 bg-black/30 p-4">
                  <p className="font-medium text-white">
                    Silent Whistle Enterprise
                  </p>
                  <p className="mt-2 text-zinc-400">
                    Lekki Phase 2, Lagos, Nigeria
                  </p>
                </div>

                <a
                  href="mailto:support@silentwhistle.app"
                  className="rounded-xl border border-green-500/20 bg-green-500/10 p-4 transition-colors hover:border-green-500/40 hover:bg-green-500/15"
                >
                  <p className="text-xs uppercase tracking-[0.18em] text-green-400">
                    Email
                  </p>
                  <p className="mt-2 font-medium text-white">
                    support@silentwhistle.app
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
