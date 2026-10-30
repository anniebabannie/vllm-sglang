import type { Route } from "./+types/home";
import {
  engines,
  sections,
  whenToChoose,
  type Engine,
  type EngineId,
  type Row,
} from "../data/comparison";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "vLLM vs SGLang" },
    {
      name: "description",
      content: "A side-by-side comparison of the vLLM and SGLang LLM inference engines.",
    },
  ];
}

const accent: Record<EngineId, { text: string; bg: string; border: string; dot: string }> = {
  vllm: {
    text: "text-sky-700 dark:text-sky-300",
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-sky-200 dark:border-sky-900",
    dot: "bg-sky-500",
  },
  sglang: {
    text: "text-violet-700 dark:text-violet-300",
    bg: "bg-violet-50 dark:bg-violet-950/40",
    border: "border-violet-200 dark:border-violet-900",
    dot: "bg-violet-500",
  },
};

const ids: EngineId[] = ["vllm", "sglang"];

export default function Home() {
  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 text-center">
          <p className="text-sm font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
            LLM inference engines
          </p>
          <h1 className="mt-3 text-4xl sm:text-5xl font-bold tracking-tight">
            <span className={accent.vllm.text}>vLLM</span>
            <span className="mx-3 text-gray-400">vs</span>
            <span className={accent.sglang.text}>SGLang</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-400">
            Two leading open-source engines for serving large language models. Both are fast,
            OpenAI-compatible, and Apache 2.0 licensed. Here's how they differ.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12 space-y-16">
        <section className="grid gap-6 md:grid-cols-2">
          {ids.map((id) => (
            <EngineCard key={id} engine={engines[id]} />
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Feature comparison</h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            <span className="inline-block size-2 rounded-full bg-emerald-500 align-middle mr-1.5" />
            marks a notable edge for that engine.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
            <div className="hidden md:grid grid-cols-[12rem_1fr_1fr] bg-gray-50 dark:bg-gray-900 text-sm font-semibold">
              <div className="px-4 py-3" />
              {ids.map((id) => (
                <div key={id} className={`px-4 py-3 ${accent[id].text}`}>
                  {engines[id].name}
                </div>
              ))}
            </div>
            {sections.map((section) => (
              <div key={section.title}>
                <div className="border-t border-gray-200 dark:border-gray-800 bg-gray-100/60 dark:bg-gray-900/60 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  {section.title}
                </div>
                {section.rows.map((row) => (
                  <ComparisonRow key={row.label} row={row} />
                ))}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">When to choose which</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ids.map((id) => (
              <div key={id} className={`rounded-xl border p-6 ${accent[id].border} ${accent[id].bg}`}>
                <h3 className={`font-semibold ${accent[id].text}`}>Choose {engines[id].name} if…</h3>
                <ul className="mt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300">
                  {whenToChoose[id].map((reason) => (
                    <li key={reason} className="flex gap-2">
                      <span className={`mt-1.5 size-1.5 shrink-0 rounded-full ${accent[id].dot}`} />
                      {reason}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold tracking-tight">Quick start</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {ids.map((id) => (
              <div key={id}>
                <h3 className={`mb-2 text-sm font-semibold ${accent[id].text}`}>{engines[id].name}</h3>
                <pre className="overflow-x-auto rounded-xl bg-gray-900 p-4 text-sm text-gray-100 dark:bg-gray-900 dark:ring-1 dark:ring-gray-800">
                  <code>{engines[id].quickstart}</code>
                </pre>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
            Both start an OpenAI-compatible server you can hit with any OpenAI client.
          </p>
        </section>
      </main>

      <footer className="border-t border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-500 dark:text-gray-400">
          Both projects move fast. Check each project's docs and run your own benchmarks on your
          workload before deciding.
        </div>
      </footer>
    </div>
  );
}

function EngineCard({ engine }: { engine: Engine }) {
  const a = accent[engine.id];
  return (
    <div className={`rounded-xl border p-6 ${a.border} ${a.bg}`}>
      <h2 className={`text-2xl font-bold ${a.text}`}>{engine.name}</h2>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{engine.tagline}</p>
      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-gray-500 dark:text-gray-400">Signature</dt>
        <dd className="font-medium">{engine.signature}</dd>
        <dt className="text-gray-500 dark:text-gray-400">Origin</dt>
        <dd>{engine.origin}</dd>
        <dt className="text-gray-500 dark:text-gray-400">License</dt>
        <dd>{engine.license}</dd>
      </dl>
      <div className="mt-6 flex gap-4 text-sm font-medium">
        <a href={engine.repo} className={`${a.text} hover:underline`} target="_blank" rel="noreferrer">
          GitHub →
        </a>
        <a href={engine.docs} className={`${a.text} hover:underline`} target="_blank" rel="noreferrer">
          Docs →
        </a>
      </div>
    </div>
  );
}

function ComparisonRow({ row }: { row: Row }) {
  return (
    <div className="grid border-t border-gray-200 dark:border-gray-800 md:grid-cols-[12rem_1fr_1fr]">
      <div className="px-4 pt-4 md:py-4 text-sm font-semibold">{row.label}</div>
      {ids.map((id) => (
        <div key={id} className="px-4 py-2 md:py-4 text-sm text-gray-700 dark:text-gray-300">
          <span className={`md:hidden mr-1 font-semibold ${accent[id].text}`}>{engines[id].name}:</span>
          {row.edge === id && (
            <span
              className="inline-block size-2 rounded-full bg-emerald-500 align-middle mr-1.5"
              title="Notable edge"
            />
          )}
          {row[id]}
        </div>
      ))}
    </div>
  );
}
