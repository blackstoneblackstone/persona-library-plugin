# Persona Library Marketplace

一个面向 Codex 的人格插件市场。市场中的每个插件都放在 `plugins/` 下，并由
`.agents/plugins/marketplace.json` 统一注册。

## 安装市场

```bash
git clone https://github.com/blackstoneblackstone/persona-library-plugin.git
codex plugin marketplace add ./persona-library-plugin
codex plugin add persona-library-plugin@persona-library-marketplace
```

## 当前插件

### Persona Library Plugin

包含人格选择器和 8 个专业人格：

- 科技商业故事分析师
- 全能专家型思考伙伴
- 乔布斯式演讲总导演
- 爆款标题生成大师
- 高效文档架构师
- 科普理解阶梯师
- HUMAN 3.0 全维成长评估师
- 毒舌短视频口播编剧

市场展示页位于 [`ui/`](./ui/)。
