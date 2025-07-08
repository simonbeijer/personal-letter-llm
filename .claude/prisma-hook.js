#!/usr/bin/env node

// Specialized Prisma hook for schema changes and migrations
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Helper function to run command safely
function runCommand(command, cwd = process.cwd()) {
  try {
    return execSync(command, { cwd, encoding: 'utf8', stdio: 'pipe' });
  } catch (error) {
    return error.toString();
  }
}

// Check if Prisma client is out of sync
function checkPrismaSync() {
  try {
    const result = runCommand('npx prisma generate --dry-run');
    return !result.includes('Error');
  } catch {
    return false;
  }
}

// Get migration status
function getMigrationStatus() {
  try {
    const result = runCommand('npx prisma migrate status');
    return result;
  } catch (error) {
    return `Error checking migration status: ${error.message}`;
  }
}

// Handle Prisma-specific operations
function handlePrismaOperation(command) {
  console.log('🗄️  Prisma operation detected');
  
  // Check for schema modifications
  if (command.includes('prisma/schema.prisma')) {
    console.log('📝 Schema modification detected');
    console.log('🔄 Checking Prisma client sync...');
    
    const isInSync = checkPrismaSync();
    if (!isInSync) {
      console.log('⚠️  Prisma client may be out of sync');
      console.log('💡 Consider running: npm run prisma:generate');
    } else {
      console.log('✅ Prisma client appears to be in sync');
    }
    
    // Check migration status
    console.log('🔍 Migration status:');
    const migrationStatus = getMigrationStatus();
    console.log(migrationStatus);
    
    return true;
  }
  
  // Handle dangerous Prisma operations
  if (command.includes('prisma migrate reset') || command.includes('prisma db push --force-reset')) {
    console.log('🚨 WARNING: Destructive Prisma operation detected');
    console.log('💾 This will reset your database and lose all data');
    console.log('🛡️  Consider backing up your data first');
    
    if (command.includes('--force')) {
      console.log('🛑 BLOCKED: Force reset command blocked by safety hook');
      return false;
    }
  }
  
  // Handle migrations
  if (command.includes('prisma migrate')) {
    console.log('🔄 Migration operation detected');
    console.log('📋 Current migration status:');
    const migrationStatus = getMigrationStatus();
    console.log(migrationStatus);
  }
  
  return true;
}

// Main execution
let input = '';
process.stdin.on('data', chunk => {
  input += chunk.toString();
});

process.stdin.on('end', () => {
  try {
    const toolCall = JSON.parse(input);
    
    if (toolCall.tool === 'Bash') {
      const command = toolCall.parameters.command;
      
      // Check if this is a Prisma-related command
      if (command.includes('prisma') || command.includes('prisma/schema.prisma')) {
        const allowed = handlePrismaOperation(command);
        if (!allowed) {
          console.log('🚫 Prisma operation blocked by safety hook');
          process.exit(1);
        }
      }
    }
    
    // Allow the command to proceed
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error in Prisma hook:', error.message);
    process.exit(0);  // Allow command if hook fails
  }
});