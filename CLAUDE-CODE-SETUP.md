# Claude Code Setup Guide

This project includes a comprehensive Claude Code setup with safety hooks and MCP server integration.

## 🛡️ Safety Hooks

### Features
- **Destructive command protection** - Blocks dangerous commands like `rm -rf /`, `DROP TABLE`, etc.
- **Auto-linting** - Automatically runs ESLint on JavaScript file edits
- **Prisma safety** - Prevents destructive database operations and provides migration warnings
- **Enhanced feedback** - Command-specific emojis and status indicators

### Configuration
- **Settings**: `.claude/settings.json` - Hook configuration
- **Main hook**: `.claude/safety-hook.js` - Enhanced safety and linting
- **Prisma hook**: `.claude/prisma-hook.js` - Database-specific safety

## 📋 MCP Server

### Available Tools
- 📂 `get_project_structure` - Project directory structure
- 📦 `get_package_info` - Package.json information
- 🗄️ `get_prisma_schema` - Database schema
- 🏥 `run_health_checks` - System health monitoring
- 🧪 `run_tests` - Run unit/e2e/lint tests
- 🌿 `get_git_status` - Git repository status

### Setup
```bash
# Register the MCP server
claude mcp add project-context ./mcp-server.js

# Verify registration
claude mcp list
```

## 🧪 Testing

Run the comprehensive test suite:
```bash
./test-safety.sh
```

This tests:
- Safety hook functionality
- MCP server tools
- Prisma-specific protections
- Enhanced visual feedback

## 🚀 Usage

### Safety Examples
```bash
# ✅ Safe command - shows emoji feedback
ls -la

# 🚨 Blocked - destructive command
rm -rf /

# 🗄️ Prisma warning - suggests next steps
# (when editing prisma/schema.prisma)
```

### MCP Tools
The MCP server provides context about your project structure, health, and status directly to Claude Code during conversations.

## 📁 File Structure

```
.claude/
├── settings.json      # Hook configuration
├── safety-hook.js     # Main safety and linting hook
└── prisma-hook.js     # Prisma-specific safety

mcp-server.js         # MCP server with project tools
test-safety.sh        # Comprehensive test suite
```

## 🔧 Customization

### Adding New Safety Patterns
Edit `.claude/safety-hook.js` and add patterns to the `dangerousPatterns` array:

```javascript
const dangerousPatterns = [
  /your-dangerous-pattern/,
  // ... existing patterns
];
```

### Adding New MCP Tools
Edit `mcp-server.js` and add tools to the `tools/list` handler and corresponding `tools/call` cases.

## 💡 Notes

- File paths are currently hardcoded - adjust for your system
- The setup is specific to Next.js/React/Prisma projects
- All hooks include error handling to avoid blocking legitimate commands
- Visual feedback uses emojis for quick status recognition

## 🎯 Benefits

- **Safety first** - Prevents accidental destructive operations
- **Automation** - Auto-linting keeps code clean
- **Context awareness** - MCP provides project intelligence
- **Developer experience** - Clear visual feedback and warnings
- **Extensible** - Easy to add new hooks and tools