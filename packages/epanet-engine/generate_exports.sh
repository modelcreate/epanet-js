#!/bin/bash

# --- Configuration ---
HEADER_FILE="/opt/epanet/src/include/epanet2_2.h"
OUTPUT_JSON="build/epanet_exports.json"

mkdir -p build

# --- Script Logic ---
echo "Scanning '$HEADER_FILE' for DLLEXPORT functions..."

# Check if header file exists
if [ ! -f "$HEADER_FILE" ]; then
  echo "Error: Header file not found at '$HEADER_FILE'"
  echo "Please update the HEADER_FILE variable in this script."
  exit 1
fi

# 1. Run the confirmed working pipeline and store the result in a variable
#    Using the exact grep pattern you confirmed works.
function_list=$(grep 'DLLEXPORT EN' "$HEADER_FILE" | \
                sed -e 's/.*DLLEXPORT //; s/(.*//; s/^/_/' | \
                sort | \
                uniq)

# 2. Check if the function list variable is empty
if [ -z "$function_list" ]; then
  echo "Warning: No functions found matching the pattern 'int  DLLEXPORT ' in '$HEADER_FILE'."
  echo "Creating an empty JSON array: [] in $OUTPUT_JSON"
  echo "[]" > "$OUTPUT_JSON"
  exit 0
fi

# 3. Use awk to format the captured list (passed via echo) as a JSON array
echo "Formatting function list into JSON..."
echo "$function_list" | awk '
  BEGIN { printf "[\"%s\",\"%s\",", "_malloc", "_free" }      # Start with the opening bracket
  NR > 1 { printf "," }     # Add a comma before every line except the first
  { printf "\"%s\"", $0 } # Print the current line (function name) enclosed in quotes
  END { print "]" }         # End with the closing bracket and a newline
' > "$OUTPUT_JSON"


# --- Completion Message ---
# Verify the output file was created and isn't just "[]"
if [ -s "$OUTPUT_JSON" ] && [ "$(cat "$OUTPUT_JSON")" != "[]" ]; then
  # Count lines in the original list variable for accuracy
  func_count=$(echo "$function_list" | wc -l | awk '{print $1}') # Get line count
  echo "Successfully generated export list in $OUTPUT_JSON"
  echo "Found $func_count functions."
else
  echo "Error: Failed to generate $OUTPUT_JSON correctly."
  echo "The script found functions initially, but the final JSON formatting failed."
  echo "Intermediate function list that was processed by awk:"
  echo "---"
  echo "$function_list" # Print the list that awk should have processed
  echo "---"
  exit 1
fi

exit 0
