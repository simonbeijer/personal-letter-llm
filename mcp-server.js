#!/usr/bin/env node

// Basic MCP server for project structure context
const fs = require('fs');
const path = require('path');

class MCPServer {
  constructor() {
    this.projectRoot = __dirname;
    this.name = 'personal-letter-llm-context';
    this.version = '1.0.0';
  }

  // Get project structure
  getProjectStructure(dir = this.projectRoot, depth = 0, maxDepth = 3) {
    if (depth > maxDepth) return {};
    
    const structure = {};
    try {
      const items = fs.readdirSync(dir);
      
      for (const item of items) {
        // Skip node_modules, .git, and other large directories
        if (['node_modules', '.git', '.next', 'build', 'dist', 'coverage'].includes(item)) {
          continue;
        }
        
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);
        
        if (stats.isDirectory()) {
          structure[item] = this.getProjectStructure(itemPath, depth + 1, maxDepth);
        } else {
          structure[item] = 'file';
        }
      }
    } catch (error) {
      console.error(`Error reading directory ${dir}:`, error.message);
    }
    
    return structure;
  }

  // Get package.json info
  getPackageInfo() {
    try {
      const packagePath = path.join(this.projectRoot, 'package.json');
      const packageContent = fs.readFileSync(packagePath, 'utf8');
      return JSON.parse(packageContent);
    } catch (error) {
      return { error: 'Could not read package.json' };
    }
  }

  // Get Prisma schema info
  getPrismaSchema() {
    try {
      const schemaPath = path.join(this.projectRoot, 'prisma', 'schema.prisma');
      const schemaContent = fs.readFileSync(schemaPath, 'utf8');
      return { content: schemaContent };
    } catch (error) {
      return { error: 'Could not read Prisma schema' };
    }
  }

  // Run health checks
  runHealthChecks() {
    const checks = {
      timestamp: new Date().toISOString(),
      node: process.version,
      platform: process.platform,
      memory: process.memoryUsage(),
      uptime: process.uptime(),
      checks: {}
    };

    // Check package.json
    checks.checks.packageJson = this.fileExists(path.join(this.projectRoot, 'package.json'));
    
    // Check Prisma schema
    checks.checks.prismaSchema = this.fileExists(path.join(this.projectRoot, 'prisma', 'schema.prisma'));
    
    // Check key directories
    checks.checks.srcDirectory = this.fileExists(path.join(this.projectRoot, 'src'));
    checks.checks.nodeModules = this.fileExists(path.join(this.projectRoot, 'node_modules'));
    
    // Check Next.js config
    checks.checks.nextConfig = this.fileExists(path.join(this.projectRoot, 'next.config.js'));
    
    // Check test setup
    checks.checks.jestConfig = this.fileExists(path.join(this.projectRoot, 'jest.config.js'));
    checks.checks.cypressConfig = this.fileExists(path.join(this.projectRoot, 'cypress.config.js'));
    
    // Check Docker setup
    checks.checks.dockerfile = this.fileExists(path.join(this.projectRoot, 'Dockerfile'));
    checks.checks.dockerCompose = this.fileExists(path.join(this.projectRoot, 'docker-compose.yml'));
    
    return checks;
  }

  // Helper method for file existence check
  fileExists(filePath) {
    try {
      return fs.existsSync(filePath);
    } catch {
      return false;
    }
  }

  // Run tests
  runTests(testType = 'unit') {
    const { execSync } = require('child_process');
    
    try {
      let command;
      switch (testType) {
        case 'unit':
          command = 'npm test';
          break;
        case 'e2e':
          command = 'npm run test:e2e';
          break;
        case 'lint':
          command = 'npm run lint';
          break;
        default:
          throw new Error(`Unknown test type: ${testType}`);
      }
      
      const result = execSync(command, { 
        cwd: this.projectRoot, 
        encoding: 'utf8',
        timeout: 60000 // 1 minute timeout
      });
      
      return {
        success: true,
        output: result,
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      return {
        success: false,
        error: error.message,
        output: error.stdout || '',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Get git status
  getGitStatus() {
    const { execSync } = require('child_process');
    
    try {
      const status = execSync('git status --porcelain', { 
        cwd: this.projectRoot, 
        encoding: 'utf8' 
      });
      
      const branch = execSync('git rev-parse --abbrev-ref HEAD', {
        cwd: this.projectRoot,
        encoding: 'utf8'
      }).trim();
      
      return {
        branch,
        hasChanges: status.length > 0,
        changes: status.split('\n').filter(line => line.trim()),
        timestamp: new Date().toISOString()
      };
      
    } catch (error) {
      return {
        error: 'Not a git repository or git command failed',
        timestamp: new Date().toISOString()
      };
    }
  }

  // Handle MCP requests
  handleRequest(method, params = {}) {
    console.error(`📋 MCP Request: ${method}`);
    
    switch (method) {
      case 'initialize':
        return {
          protocolVersion: '2024-11-05',
          capabilities: {
            tools: {},
            resources: {}
          },
          serverInfo: {
            name: this.name,
            version: this.version
          }
        };
        
      case 'tools/list':
        return {
          tools: [
            {
              name: 'get_project_structure',
              description: '📂 Get the project directory structure',
              inputSchema: {
                type: 'object',
                properties: {},
                required: []
              }
            },
            {
              name: 'get_package_info',
              description: '📦 Get package.json information',
              inputSchema: {
                type: 'object',
                properties: {},
                required: []
              }
            },
            {
              name: 'get_prisma_schema',
              description: '🗄️ Get Prisma database schema',
              inputSchema: {
                type: 'object',
                properties: {},
                required: []
              }
            },
            {
              name: 'run_health_checks',
              description: '🏥 Run comprehensive health checks on the project',
              inputSchema: {
                type: 'object',
                properties: {},
                required: []
              }
            },
            {
              name: 'run_tests',
              description: '🧪 Run tests (unit, e2e, or lint)',
              inputSchema: {
                type: 'object',
                properties: {
                  testType: {
                    type: 'string',
                    enum: ['unit', 'e2e', 'lint'],
                    default: 'unit',
                    description: 'Type of test to run'
                  }
                },
                required: []
              }
            },
            {
              name: 'get_git_status',
              description: '🌿 Get current git status and branch information',
              inputSchema: {
                type: 'object',
                properties: {},
                required: []
              }
            }
          ]
        };
        
      case 'tools/call':
        const { name: toolName } = params;
        
        switch (toolName) {
          case 'get_project_structure':
            return {
              content: [{
                type: 'text',
                text: `📂 Project Structure:\n\n${JSON.stringify(this.getProjectStructure(), null, 2)}`
              }]
            };
            
          case 'get_package_info':
            return {
              content: [{
                type: 'text',
                text: `📦 Package Information:\n\n${JSON.stringify(this.getPackageInfo(), null, 2)}`
              }]
            };
            
          case 'get_prisma_schema':
            const schema = this.getPrismaSchema();
            return {
              content: [{
                type: 'text',
                text: schema.error ? `❌ ${schema.error}` : `🗄️ Prisma Schema:\n\n${schema.content}`
              }]
            };
            
          case 'run_health_checks':
            const healthChecks = this.runHealthChecks();
            return {
              content: [{
                type: 'text',
                text: `🏥 Health Check Results:\n\n${JSON.stringify(healthChecks, null, 2)}`
              }]
            };
            
          case 'run_tests':
            const testType = params.testType || 'unit';
            const testResults = this.runTests(testType);
            const resultEmoji = testResults.success ? '✅' : '❌';
            return {
              content: [{
                type: 'text',
                text: `🧪 Test Results (${testType}):\n\n${resultEmoji} ${testResults.success ? 'PASSED' : 'FAILED'}\n\n${testResults.output || testResults.error}`
              }]
            };
            
          case 'get_git_status':
            const gitStatus = this.getGitStatus();
            const statusEmoji = gitStatus.hasChanges ? '📝' : '✅';
            return {
              content: [{
                type: 'text',
                text: gitStatus.error ? `❌ ${gitStatus.error}` : `🌿 Git Status:\n\n${statusEmoji} Branch: ${gitStatus.branch}\n${gitStatus.hasChanges ? `📝 Changes:\n${gitStatus.changes.join('\n')}` : '✅ No changes'}`
              }]
            };
            
          default:
            throw new Error(`Unknown tool: ${toolName}`);
        }
        
      default:
        throw new Error(`Unknown method: ${method}`);
    }
  }

  // Start the server
  start() {
    console.error('🚀 Starting MCP server for personal-letter-llm');
    
    process.stdin.on('data', (data) => {
      try {
        const request = JSON.parse(data.toString());
        const response = this.handleRequest(request.method, request.params);
        
        console.log(JSON.stringify({
          jsonrpc: '2.0',
          id: request.id,
          result: response
        }));
      } catch (error) {
        console.error('❌ Error handling request:', error.message);
        console.log(JSON.stringify({
          jsonrpc: '2.0',
          id: request.id || null,
          error: {
            code: -32603,
            message: error.message
          }
        }));
      }
    });
  }
}

// Start the server
const server = new MCPServer();
server.start();