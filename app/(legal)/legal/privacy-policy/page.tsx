const privacySections = [
  {
    title: "1. Information We Collect",
    body: "We may collect the following information:",
    items: [
      "Personal Information: Name and email address provided during account setup.",
      "Payment Information: Card details for in-app purchases (processed securely by third-party payment providers).",
      "Device Permissions: Location, camera, and microphone access for app functionality.",
    ],
    note: "Note: We do not store user personal details on our servers.",
  },
  {
    title: "2. How We Use Your Information",
    items: [
      "To provide and maintain the App",
      "To process transactions",
      "To enable reporting and community engagement features",
      "To improve user experience",
    ],
  },
  {
    title: "3. Anonymous Usage",
    paragraphs: [
      "Silent Whistle is designed to protect user identity. The App uses system-generated usernames and does not display real names publicly.",
    ],
  },
  {
    title: "4. Data Security",
    paragraphs: [
      "We implement appropriate security measures to protect your information. However, no method of transmission over the internet is 100% secure.",
    ],
  },
  {
    title: "5. Third-Party Services",
    paragraphs: [
      "We may use third-party services for payment processing and analytics. These providers have their own privacy policies governing the use of your data.",
    ],
  },
  {
    title: "6. Cookies",
    paragraphs: [
      "Silent Whistle does not use cookies or tracking technologies.",
    ],
  },
  {
    title: "7. Your Rights",
    paragraphs: [
      "You have the right to access, update, or delete your personal information. You may contact us at any time for assistance.",
    ],
  },
  {
    title: "8. Children's Privacy",
    paragraphs: [
      "Our App is not intended for individuals under the age of 13. We do not knowingly collect data from children.",
    ],
  },
  {
    title: "9. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Changes will be posted within the App.",
    ],
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_32%),radial-gradient(circle_at_bottom_left,_rgba(255,255,255,0.06),_transparent_30%)]" />

        <div className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="rounded-[28px] border border-zinc-800 bg-[#0D0F10]/95 p-6 shadow-2xl shadow-black/40 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-6 border-b border-zinc-800 pb-8">
              <div className="inline-flex w-fit items-center rounded-full border border-green-500/25 bg-green-500/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-green-400">
                Legal
              </div>

              <div className="space-y-3">
                <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                  Privacy Policy
                </h1>
                <p className="max-w-3xl text-sm leading-7 text-zinc-400 sm:text-base">
                  Silent Whistle Enterprise (&quot;we&quot;, &quot;our&quot;,
                  or &quot;us&quot;) operates the Silent Whistle mobile
                  application (the &quot;App&quot;). This Privacy Policy
                  explains how we collect, use, and protect your information
                  when you use our App.
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
              {privacySections.map((section) => (
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

                    {"note" in section && section.note ? (
                      <div className="rounded-xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-100">
                        {section.note}
                      </div>
                    ) : null}
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-gradient-to-br from-[#101012] to-[#111813] p-6">
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                10. Contact Us
              </h2>
              <p className="mt-4 text-sm leading-7 text-zinc-300 sm:text-[15px]">
                If you have any questions, please contact us:
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
