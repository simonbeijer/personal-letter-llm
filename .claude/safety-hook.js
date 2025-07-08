#!/usr/bin/env node

// Enhanced safety hook with auto-linting and Prisma protection
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to check if file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch {
    return false;
  }
}

// Helper function to run command safely
function runCommand(command, cwd = process.cwd()) {
  try {
    return execSync(command, { cwd, encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    return null;
  }
}

// Auto-lint JavaScript files
function autoLintJS(filePath) {
  if (!fileExists('package.json')) return;
  
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  if (!packageJson.scripts || !packageJson.scripts.lint) return;
  
  console.log('🔧 Auto-linting JavaScript file...');
  const result = runCommand(`npm run lint -- --fix ${filePath}`);
  
  if (result !== null) {
    console.log('✨ Auto-lint completed successfully');
  } else {
    console.log('⚠️  Auto-lint encountered issues (check manually)');
  }
}

// Check Prisma schema changes
function checkPrismaSchema(command) {
  if (command.includes('prisma/schema.prisma')) {
    console.log('🗄️  Prisma schema modification detected');
    console.log('💡 Remember to run: npm run prisma:generate');
    return true;
  }
  return false;
}

// Enhanced visual feedback based on command type
function getCommandStatus(command) {
  if (command.includes('git')) return '🌿';
  if (command.includes('npm') || command.includes('yarn')) return '📦';
  if (command.includes('docker')) return '🐳';
  if (command.includes('prisma')) return '🗄️';
  if (command.includes('test')) return '🧪';
  return '⚡';
}

// Read the tool call from stdin
let input = '';
process.stdin.on('data', chunk => {
  input += chunk.toString();
});

process.stdin.on('end', () => {
  try {
    const toolCall = JSON.parse(input);
    
    // Handle different tool types
    if (toolCall.tool === 'Bash') {
      const command = toolCall.parameters.command;
      const emoji = getCommandStatus(command);
      
      // Define dangerous patterns
      const dangerousPatterns = [
        /rm\s+-rf\s+\//,  // rm -rf /
        /rm\s+-rf\s+\*/,  // rm -rf *
        /DROP\s+TABLE/i,  // DROP TABLE
        /DELETE\s+FROM.*WHERE\s+1\s*=\s*1/i,  // DELETE FROM table WHERE 1=1
        /TRUNCATE\s+TABLE/i,  // TRUNCATE TABLE
        /docker\s+system\s+prune\s+-a/i,  // docker system prune -a
        /docker\s+rmi.*-f/i,  // docker rmi with force
        /sudo\s+rm/,  // sudo rm
        /chmod\s+777/,  // chmod 777
        />.*\/dev\/null\s+2>&1/,  // Redirecting to /dev/null
        /prisma\s+db\s+push.*--force-reset/i,  // Prisma force reset
        /prisma\s+migrate\s+reset.*--force/i   // Prisma migrate reset force
      ];
      
      // Check for dangerous patterns
      for (const pattern of dangerousPatterns) {
        if (pattern.test(command)) {
          console.log('🚨 BLOCKED: Potentially destructive command detected');
          console.log(`Command: ${command}`);
          console.log('Reason: Safety hook prevented execution');
          process.exit(1);  // Block the command
        }
      }
      
      // Check for Prisma schema changes
      checkPrismaSchema(command);
      
      // Log safe commands with enhanced feedback
      console.log(`${emoji} Command approved by safety hook`);
      console.log(`Command: ${command}`);
      
    } else if (toolCall.tool === 'Edit' || toolCall.tool === 'MultiEdit') {
      // Handle file edits
      const filePath = toolCall.parameters.file_path;
      if (filePath && filePath.match(/\.(js|jsx|ts|tsx)$/)) {
        console.log('✏️  JavaScript file edit detected');
        // Auto-lint after allowing the edit
        setTimeout(() => autoLintJS(filePath), 100);
      }
      
      console.log('✅ File edit approved by safety hook');
    }
    
    // Allow the command to proceed
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error in safety hook:', error.message);
    process.exit(0);  // Allow command if hook fails
  }
});