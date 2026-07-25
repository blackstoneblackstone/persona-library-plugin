const personas = [
  {
    slug: "tech-business-storyteller",
    name: "科技商业故事分析师",
    category: "商业写作",
    image: window.PERSONA_PORTRAITS.businessStoryteller,
    description: "把访谈、财报和产品素材，写成有冲突、有数据、有金句的科技商业故事。",
    tags: ["36氪风格", "商业洞察", "故事叙事"],
  },
  {
    slug: "expert-thinking-partner",
    name: "全能专家型思考伙伴",
    category: "分析决策",
    image: window.PERSONA_PORTRAITS.expertPartner,
    description: "先给结论，再展示依据、替代方案与可以立即执行的行动计划。",
    tags: ["专业解题", "方案比较", "行动计划"],
  },
  {
    slug: "jobs-presentation-director",
    name: "乔布斯式演讲总导演",
    category: "演讲表达",
    image: window.PERSONA_PORTRAITS.jobsDirector,
    description: "用反派、英雄、三法则和惊喜时刻，打造让人相信、感受并记住的演讲。",
    tags: ["Keynote", "发布会", "演讲脚本"],
  },
  {
    slug: "viral-headline-master",
    name: "爆款标题生成大师",
    category: "内容增长",
    image: window.PERSONA_PORTRAITS.headlineMaster,
    description: "运用危险、意外、矛盾、痛点和共情机制，生成并分析十个标题。",
    tags: ["标题优化", "点击率", "传播心理"],
  },
  {
    slug: "document-clarity-architect",
    name: "高效文档架构师",
    category: "文档写作",
    image: window.PERSONA_PORTRAITS.documentArchitect,
    description: "重构信息层级、标题和句子，让复杂文档更容易浏览、理解与执行。",
    tags: ["信息架构", "技术写作", "认知负荷"],
  },
  {
    slug: "science-understanding-builder",
    name: "科普理解阶梯师",
    category: "知识转译",
    image: window.PERSONA_PORTRAITS.scienceBuilder,
    description: "把学术论文重建为普通人能读懂、能共鸣、能记住的科学故事。",
    tags: ["论文解读", "科普写作", "类比解释"],
  },
  {
    slug: "human-3-development-assessor",
    name: "HUMAN 3.0 全维成长评估师",
    category: "成长评估",
    image: window.PERSONA_PORTRAITS.human3Assessor,
    description: "通过四象限自适应访谈，识别成长模式、核心阻塞与阶段性行动路径。",
    tags: ["四象限", "成长访谈", "生活整合"],
  },
  {
    slug: "sharp-short-video-scriptwriter",
    name: "毒舌短视频口播编剧",
    category: "短视频",
    image: window.PERSONA_PORTRAITS.videoScriptwriter,
    description: "把平淡素材改写成前三秒有冲突、全程有反差的 30–60 秒口播稿。",
    tags: ["口播脚本", "反差结构", "短句节奏"],
  },
];

const grid = document.querySelector("#personaGrid");
const filters = document.querySelector("#filters");
const searchInput = document.querySelector("#searchInput");
const emptyState = document.querySelector("#emptyState");
const personaCount = document.querySelector("#personaCount");
const toast = document.querySelector("#toast");
const installMarketButton = document.querySelector("#installMarketButton");

const categories = ["全部", ...new Set(personas.map((persona) => persona.category))];
let activeCategory = "全部";
let toastTimer;

function promptFor(persona) {
  return `使用 Persona Library 的「${persona.name}」（@${persona.slug}）人格处理以下任务：\n\n`;
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("is-visible");
  toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2200);
}

async function copyPrompt(persona) {
  await navigator.clipboard.writeText(promptFor(persona));
  showToast(`已复制「${persona.name}」调用语句`);
}

function usePersona(persona) {
  const prompt = promptFor(persona);
  navigator.clipboard.writeText(prompt).catch(() => {});
  const url = `https://chatgpt.com/?q=${encodeURIComponent(prompt)}`;
  window.open(url, "_blank", "noopener,noreferrer");
  showToast("调用语句已复制，正在打开 ChatGPT");
}

async function copyInstallCommands() {
  const commands = [
    "git clone https://github.com/blackstoneblackstone/persona-library-plugin.git",
    "codex plugin marketplace add ./persona-library-plugin",
    "codex plugin add persona-library-plugin@persona-library-marketplace",
  ].join("\n");
  await navigator.clipboard.writeText(commands);
  showToast("市场安装命令已复制");
}

function renderFilters() {
  filters.replaceChildren(
    ...categories.map((category) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = `filter-button${category === activeCategory ? " is-active" : ""}`;
      button.textContent = category;
      button.addEventListener("click", () => {
        activeCategory = category;
        renderFilters();
        renderCards();
      });
      return button;
    }),
  );
}

function renderCards() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = personas.filter((persona) => {
    const inCategory = activeCategory === "全部" || persona.category === activeCategory;
    const haystack = [
      persona.name,
      persona.slug,
      persona.category,
      persona.description,
      ...persona.tags,
    ]
      .join(" ")
      .toLowerCase();
    return inCategory && haystack.includes(query);
  });

  personaCount.textContent = `${filtered.length} / ${personas.length} PERSONAS`;
  emptyState.hidden = filtered.length > 0;

  grid.replaceChildren(
    ...filtered.map((persona) => {
      const card = document.createElement("article");
      card.className = "persona-card";
      const index = String(personas.indexOf(persona) + 1).padStart(2, "0");
      card.innerHTML = `
        <div class="portrait-wrap">
          <span class="card-index">${index}</span>
          <img class="portrait" src="${persona.image}" alt="${persona.name}形象插画" />
        </div>
        <div class="card-body">
          <p class="category">${persona.category}</p>
          <h2>${persona.name}</h2>
          <p class="slug">@${persona.slug}</p>
          <p class="description">${persona.description}</p>
          <div class="tags">${persona.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}</div>
          <div class="card-actions">
            <button class="use-button" type="button">使用人格 ↗</button>
            <button class="copy-button" type="button" aria-label="复制${persona.name}调用语句">复制</button>
          </div>
        </div>
      `;
      card.querySelector(".use-button").addEventListener("click", () => usePersona(persona));
      card.querySelector(".copy-button").addEventListener("click", () => copyPrompt(persona));
      return card;
    }),
  );
}

searchInput.addEventListener("input", renderCards);
installMarketButton.addEventListener("click", copyInstallCommands);
renderFilters();
renderCards();
