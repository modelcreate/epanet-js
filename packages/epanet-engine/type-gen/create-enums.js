import fs from 'fs';
import path from 'path';

// Configuration
const HEADER_FILE = './epanet2_enums.h'; // Make sure this path is correct
const OUTPUT_DIR = './type-gen/generated-enums';
const ENUM_PREFIX = 'EN_'; // Assuming EN_ prefix should be removed for TS name

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Read the header file
console.log(`Reading header file: ${HEADER_FILE}`);
let headerContent;
try {
    headerContent = fs.readFileSync(HEADER_FILE, 'utf8');
} catch (err) {
    console.error(`Error reading header file ${HEADER_FILE}:`, err.message);
    process.exit(1); // Exit if file can't be read
}
const lines = headerContent.split('\n');
console.log(`Read ${lines.length} lines from header file`);

// Parse enum definitions
function parseEnums() {
  const enums = [];
  let currentEnum = null;
  let inEnum = false;
  let lineNumber = 0;

  for (let i = 0; i < lines.length; i++) {
    lineNumber++;
    const line = lines[i].trim(); // Trim upfront

    // Skip empty lines early
    if (!line) {
        continue;
    }

    // Start of enum definition
    if (line.startsWith('typedef enum') && line.includes('{')) { // More robust start check
      console.log(`Found enum start at line ${lineNumber}: ${lines[i].trim()}`); // Log original line for context
      // Handle potential single-line start like "typedef enum {"
      inEnum = true;
      currentEnum = {
        name: '',
        entries: []
      };
      // Check if the line *also* contains the end brace
      if (line.includes('}')) {
          // Handle single-line enums or cases where { and } are on the same line as typedef
           console.log(`Potential complex enum definition start/end on line ${lineNumber}. Trying to parse name...`);
           handleEnumEnd(line, lineNumber); // Try to parse name immediately
           // Note: This simple parser might struggle with very complex C layouts.
      }
      continue; // Move to next line after handling start
    }

    // Inside enum definition
    if (inEnum && currentEnum) { // Ensure currentEnum is not null
      // End of enum definition
      if (line.startsWith('}')) {
        console.log(`Found enum end at line ${lineNumber}: ${lines[i].trim()}`); // Log original line
        handleEnumEnd(line, lineNumber); // Use helper function
        continue; // Move to next line after handling end
      }

      // Skip comments inside enums
      if (line.startsWith('//') || line.startsWith('/*')) {
        continue;
      }

      // Parse enum entry - simplified regex allowing optional EN_, handling potential assignment/value variations slightly more flexibly.
      // Assumes structure like `(EN_)NAME = VALUE, // comment` or `(EN_)NAME,` (value assigned implicitly)
      // This regex still makes assumptions but tries to be a bit more general. It won't parse implicit values correctly yet.
      const entryMatch = line.match(/^\s*(?:EN_)?([A-Z0-9_]+)\s*(?:=\s*(-?\d+))?\s*(?:,)?\s*(?:\/\/!?(?:<)?\s*(.*))?/);
      if (entryMatch) {
        // Note: entryMatch[2] (value) might be undefined if not explicitly assigned.
        // A real C parser would track the last assigned value for implicit increments.
        // This simple parser will only capture explicitly assigned values.
        const [, name, valueStr, comment] = entryMatch;
        if (valueStr !== undefined) { // Only add if value is explicit
             const entry = {
               name: name,
               value: parseInt(valueStr), // Use the captured value string
               comment: comment ? comment.trim() : ''
             };
             console.log(`Found enum entry at line ${lineNumber}: ${entry.name} = ${entry.value}`);
             currentEnum.entries.push(entry);
        } else {
             console.log(`Found enum entry without explicit value at line ${lineNumber}: ${name}. Skipping (implicit values not supported).`);
             // To support implicit values, you'd need to track the last value + 1.
        }
      } else {
        console.log(`Warning: Could not parse line ${lineNumber} as enum entry: ${line}`);
      }
    }
  }

  // Helper function to handle extracting name at enum end (without regex)
  function handleEnumEnd(line, lineNumber) {
      const braceIndex = line.indexOf('}');
      const semicolonIndex = line.lastIndexOf(';'); // Use lastIndexOf

      if (braceIndex === -1 || semicolonIndex === -1 || semicolonIndex <= braceIndex) {
          console.log(`Warning: Could not find valid '}' and ';' structure on enum end line ${lineNumber}: ${line}`);
          // Decide how to handle: maybe keep 'inEnum' true if this was unexpected?
          // For now, we still attempt to close the enum state.
      } else {
          // Extract substring between } and ; then trim whitespace
          const extractedName = line.substring(braceIndex + 1, semicolonIndex).trim();

          if (extractedName.length > 0 && currentEnum) {
              // Validate name (optional, e.g., check for valid C identifier chars)
              if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(extractedName)) {
                  currentEnum.name = extractedName;
                  console.log(`Found enum name: ${currentEnum.name} with ${currentEnum.entries.length} entries`);
                  enums.push(currentEnum);
              } else {
                  console.log(`Warning: Extracted name "${extractedName}" seems invalid at line ${lineNumber}. Ignoring enum.`);
              }
          } else if (currentEnum) {
              console.log(`Warning: Could not extract name from enum ending at line ${lineNumber}: ${line}`);
          } else {
             console.log(`Warning: Found enum end at line ${lineNumber} but no current enum context.`);
          }
      }

      // Reset state regardless of successful name extraction to avoid getting stuck
      inEnum = false;
      currentEnum = null;
  }


  return enums;
}

// Generate TypeScript enum file
function generateEnumFile(enumDef) {
  const { name, entries } = enumDef;
  // Simple check if name starts with ENUM_PREFIX before replacing
  const tsName = name.startsWith(ENUM_PREFIX) ? name.substring(ENUM_PREFIX.length) : name;

  if (!tsName) {
      console.warn(`Warning: Generated empty TS name for original name ${name}. Skipping file generation.`);
      return null; // Return null if name is invalid/empty
  }

  if (entries.length === 0) {
      console.warn(`Warning: Enum ${name} has no entries. Generating empty enum ${tsName}.ts`);
  }

  // Filter out entries if needed, or handle directly
  const content = `// Generated from ${HEADER_FILE} - ${new Date().toISOString()}
// Original C enum name: ${name}

enum ${tsName} {
${entries.map(entry => `  /** ${entry.comment || `Original value: ${entry.value}`} */\n  ${entry.name} = ${entry.value},`).join('\n')}
}

export default ${tsName};
`;

  const outputPath = path.join(OUTPUT_DIR, `${tsName}.ts`);
  try {
      fs.writeFileSync(outputPath, content);
      console.log(`Generated enum file: ${outputPath}`);
      return tsName; // Return the generated name for index file
  } catch (err) {
      console.error(`Error writing enum file ${outputPath}:`, err.message);
      return null; // Indicate failure
  }
}

// Generate index file
function generateIndexFile(enumNames) {
  // Filter out any nulls from failed generations
  const validEnumNames = enumNames.filter(name => name !== null);
  if (validEnumNames.length === 0) {
      console.log("No valid enums were generated, skipping index.ts generation.");
      return;
  }

  const content = `// Generated index file - ${new Date().toISOString()}
${validEnumNames.map(name => `export { default as ${name} } from './${name}';`).join('\n')}
`;
  const indexPath = path.join(OUTPUT_DIR, 'index.ts');
  try {
      fs.writeFileSync(indexPath, content);
      console.log(`Generated index file: ${indexPath}`);
  } catch (err) {
      console.error(`Error writing index file ${indexPath}:`, err.message);
  }
}

// Main execution
console.log('Starting enum parsing...');
const enums = parseEnums();
console.log(`Parsing complete. Found ${enums.length} enums.`);

if (enums.length === 0) {
  console.log('No enums parsed successfully.');
  // Optionally show file snippets again or suggest checking warnings
}

console.log('Generating TypeScript files...');
const generatedNames = enums.map(generateEnumFile).filter(name => name !== null); // Get names and filter nulls

generateIndexFile(generatedNames);

console.log(`Generation complete. Generated ${generatedNames.length} enum files in ${OUTPUT_DIR}`);