export type EngineId = "vllm" | "sglang";

export interface Engine {
  id: EngineId;
  name: string;
  tagline: string;
  origin: string;
  license: string;
  repo: string;
  docs: string;
  signature: string;
  quickstart: string;
}

export interface Row {
  label: string;
  vllm: string;
  sglang: string;
  /** Which engine has the edge on this row, if either. */
  edge?: EngineId;
}

export interface Section {
  title: string;
  rows: Row[];
}

export const engines: Record<EngineId, Engine> = {
  vllm: {
    id: "vllm",
    name: "vLLM",
    tagline: "High-throughput, memory-efficient LLM inference and serving.",
    origin: "UC Berkeley Sky Computing Lab, now a PyTorch Foundation project",
    license: "Apache 2.0",
    repo: "https://github.com/vllm-project/vllm",
    docs: "https://docs.vllm.ai",
    signature: "PagedAttention",
    quickstart: `pip install vllm
vllm serve meta-llama/Llama-3.1-8B-Instruct`,
  },
  sglang: {
    id: "sglang",
    name: "SGLang",
    tagline: "Fast serving framework for LLMs and structured LM programs.",
    origin: "LMSYS (UC Berkeley, Stanford, and contributors)",
    license: "Apache 2.0",
    repo: "https://github.com/sgl-project/sglang",
    docs: "https://docs.sglang.ai",
    signature: "RadixAttention",
    quickstart: `pip install "sglang[all]"
python -m sglang.launch_server \\
  --model-path meta-llama/Llama-3.1-8B-Instruct`,
  },
};

export const sections: Section[] = [
  {
    title: "Core architecture",
    rows: [
      {
        label: "Key innovation",
        vllm: "PagedAttention: KV cache stored in fixed-size blocks, like virtual memory pages, to nearly eliminate fragmentation.",
        sglang: "RadixAttention: KV cache kept in a radix tree so any shared prefix across requests is reused automatically.",
      },
      {
        label: "Batching",
        vllm: "Continuous batching with chunked prefill.",
        sglang: "Continuous batching with chunked prefill and a low-overhead, overlapped CPU scheduler.",
      },
      {
        label: "Prefix caching",
        vllm: "Automatic prefix caching via block hashing.",
        sglang: "Native and central to the design; excels with multi-turn chat, agents, and few-shot prompts.",
        edge: "sglang",
      },
      {
        label: "Programming model",
        vllm: "Engine + OpenAI-compatible server; offline Python LLM API.",
        sglang: "Server + OpenAI-compatible API, plus a Python frontend DSL for composing multi-call LM programs.",
        edge: "sglang",
      },
    ],
  },
  {
    title: "Performance features",
    rows: [
      {
        label: "Structured output",
        vllm: "Guided decoding via backends like XGrammar and Guidance.",
        sglang: "Compressed finite-state machines and XGrammar for fast JSON / regex-constrained decoding.",
        edge: "sglang",
      },
      {
        label: "Speculative decoding",
        vllm: "Draft models, n-gram, Medusa, EAGLE.",
        sglang: "EAGLE-family and draft-model speculative decoding.",
      },
      {
        label: "Quantization",
        vllm: "Very broad: FP8, INT8/INT4, GPTQ, AWQ, bitsandbytes, GGUF, Marlin kernels, and more.",
        sglang: "FP8, INT4/INT8, GPTQ, AWQ, and other common formats.",
        edge: "vllm",
      },
      {
        label: "Parallelism",
        vllm: "Tensor, pipeline, data, and expert parallelism.",
        sglang: "Tensor, pipeline, data, and expert parallelism, plus DP attention for MoE models like DeepSeek.",
      },
      {
        label: "Disaggregated serving",
        vllm: "Prefill/decode disaggregation via KV connectors.",
        sglang: "Prefill/decode disaggregation with large-scale expert-parallel deployments.",
      },
    ],
  },
  {
    title: "Ecosystem",
    rows: [
      {
        label: "Model coverage",
        vllm: "Very wide: most Hugging Face decoder models, multimodal, embedding, and reward models.",
        sglang: "Wide and growing: major LLMs, VLMs, embedding, and reward models; fast day-0 support for new frontier models.",
        edge: "vllm",
      },
      {
        label: "Hardware",
        vllm: "NVIDIA, AMD, Intel (CPU/GPU/Gaudi), Google TPU, AWS Neuron, and more via plugins.",
        sglang: "NVIDIA, AMD, Intel, Google TPU, and Ascend NPU.",
        edge: "vllm",
      },
      {
        label: "API",
        vllm: "OpenAI-compatible (chat, completions, embeddings), plus offline batch inference.",
        sglang: "OpenAI-compatible, native generate API, plus offline engine.",
      },
      {
        label: "Community",
        vllm: "One of the largest open-source inference projects; broad vendor and cloud adoption.",
        sglang: "Fast-growing; used in production by many AI labs and inference providers.",
      },
    ],
  },
];

export const whenToChoose: Record<EngineId, string[]> = {
  vllm: [
    "You want the broadest model and hardware support.",
    "You need a mature, widely deployed default with lots of integrations.",
    "Your workload is mostly independent, single-shot requests.",
    "You rely on niche quantization formats or accelerator plugins.",
  ],
  sglang: [
    "Your prompts share long prefixes: multi-turn chat, agents, RAG, few-shot.",
    "You lean heavily on JSON or other constrained output.",
    "You're serving large MoE models (e.g. DeepSeek) at scale.",
    "You want to script multi-step LM programs with a Python DSL.",
  ],
};
