# Claude Code Capabilities Reference
## What We're Working With — The CEO's Tool Inventory

---

## WHAT CLAUDE CODE ($200/MONTH) CAN DO

This file documents every capability available to us so we design around real constraints, not imagined ones.

---

## CORE CAPABILITIES

### 1. File System (Full Access)
- Read any file on the system
- Write new files
- Edit existing files (precise string replacement)
- Create/manage folder structures
- Search files by pattern (Glob)
- Search file contents by keyword/regex (Grep)

**How we use it:** Agent MD files, research reports, deliverables, templates, knowledge base — all stored as Markdown files. Zero external storage cost.

### 2. Bash Execution
- Run any shell command
- Install packages (pip, npm, apt)
- Run scripts
- Process files (convert, parse, transform)
- Interact with APIs via curl/requests
- Schedule-adjacent logic via scripts

**How we use it:** Data processing, formatting deliverables, running helper scripts, installing tools like `yt-dlp`, `pandoc`, etc.

### 3. Web Search
- Search the internet for current information
- Returns structured results with URLs

**How we use it:** Market research, competitor research, pricing research, trend monitoring, finding potential clients.

### 4. Web Fetch
- Fetch full content of any web page (converts HTML to text)
- Returns readable content for analysis

**How we use it:** Fetching competitor websites, reading industry reports, pulling G2/Clutch reviews, reading LinkedIn pages.

### 5. Subagent Spawning
- Launch specialized subagents mid-task
- Each subagent gets its own context window
- Can run background tasks
- Returns results to parent agent

**How we use it:** Parallel research tasks, protecting main context window from large research dumps, delegating specialized work.

### 6. Skills (Custom Commands)
- Custom slash commands stored in `.claude/commands/`
- Each skill is a Markdown file with instructions
- Triggered by `/skill-name` in conversation
- Provides consistent, repeatable workflows

**How we use it:** `/market-research`, `/persona-map`, `/offer-design`, `/validate-offer`, etc. — the 12 skills built in this system.

### 7. CLAUDE.md Instruction Loading
- Root `CLAUDE.md` shapes all Claude behavior in the project
- Acts as persistent memory for the session context
- Can reference other files
- Can define operating principles, agent rosters, file conventions

**How we use it:** The master CEO instruction file that governs all operations.

### 8. MCP Servers (Model Context Protocol)
- Connectors to external systems
- Can connect to: Slack, GitHub, Google Drive, Notion, databases, APIs, etc.
- Self-configurable by Claude Code

**How we could use it:** Connecting to a CRM, reading client Slack channels, pulling data from Google Analytics — when/if needed.

### 9. Git Operations
- Full git workflow (status, add, commit, push, pull, branch)
- Version control for all agent outputs
- Branch-based development

**How we use it:** Version control for all deliverables, tracking iterations.

### 10. Todo Management
- Structured task tracking within sessions
- Progress visibility
- Multi-step task orchestration

**How we use it:** Tracking workflow progress, managing multi-step research cycles.

### 11. Plan Mode
- Strategic planning before execution
- Reduces mistakes on complex tasks
- Shows thinking before action

**How we use it:** Before starting any major workflow, use plan mode to design the execution sequence.

---

## CAPABILITY GAPS (What Claude Code CANNOT Do Natively)

| Gap | Workaround |
|-----|-----------|
| Persistent memory across sessions | CLAUDE.md + file system as external memory |
| Scheduled/autonomous task running | Not possible — requires human trigger |
| Real-time data ingestion | WebSearch on demand instead |
| Sending emails | Scripts using SendGrid/Mailgun API via Bash |
| CRM updates | MCP connector to HubSpot (if set up) |
| Image/design generation | API calls to Midjourney/DALL-E via Bash |
| Video processing | yt-dlp + whisper for transcript extraction |
| Calendar management | MCP connector to Google Calendar (if set up) |

---

## THE $200/MONTH MATH

Claude Code Pro subscription: $200/month
- Includes generous usage of Claude claude-sonnet-4-6 (current model)
- Multi-agent tasks count against usage
- Complex research tasks use more context

**Usage strategy to stay within limits:**
1. Use subagents for large research tasks (protects main context)
2. Write research to files immediately (don't keep it all in context)
3. Load only relevant files when executing a specific task
4. Use Haiku-class tasks (simple formatting, templates) for simpler agents
5. Reserve main context for strategic thinking and complex synthesis

**Estimated capacity at $200/month:**
- ~50-100 complex research tasks/month
- ~500+ simple tasks (file operations, copy editing, template filling)
- More than sufficient for Phase 0-1

---

## MINIMAL ADDITIONAL TOOLS (if justified)

We run on Claude Code only. The following would only be added if they eliminate a clear bottleneck:

| Tool | Cost | Justification Threshold |
|------|------|------------------------|
| Email sending (Resend.com) | $0-20/mo | When we have email sequences to automate |
| LinkedIn Sales Nav | $99/mo | Only when manual outreach maxes out (>50 clients) |
| Domain + hosting | $20/mo | From day 1 — need a website |
| Notion (client portal) | $0-16/mo | Free tier sufficient for early clients |

**Rule:** No tool gets added unless it directly unlocks revenue that Claude Code alone cannot reach.
