#!/bin/bash

# --- CONFIGURATION ---
# Minimum space required in Kilobytes (1024 = 1MB)
MIN_SPACE=1024 
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

clear
echo -e "${YELLOW}[*] Initializing PIN Generator...${NC}"
sleep 1

# --- STORAGE CHECK ---
# Get available space in the current directory (in KB)
AVAILABLE_SPACE=$(df . | awk 'NR==2 {print $4}')

echo -n "Scanning system storage... "
sleep 1.5

# Check if available space is less than the minimum required
if [ "$AVAILABLE_SPACE" -le "$MIN_SPACE" ]; then
    echo -e "${RED}FAILED${NC}"
    echo "----------------------------------------------------"
    echo -e "${RED}ERROR: No space left on device.${NC}"
    echo -e "Required: ${MIN_SPACE} KB | Available: ${AVAILABLE_SPACE} KB"
    echo "----------------------------------------------------"
    exit 1
else
    echo -e "${GREEN}SUCCESS${NC}"
fi

# --- THINKING PHASE ---
echo -e "\nThinking..."
for i in {1..3}; do
    echo -n "● "
    sleep 0.5
done

# --- GENERATE PIN ---
PIN=$(shuf -i 0-9999 -n 1 | xargs printf "%04d")

echo -e "\n\n[+] Storage Verified: ${AVAILABLE_SPACE} KB free"
echo -e "[+] Access Granted"
echo -e "----------------------------"
echo -e "  GENERATED PIN: ${GREEN}$PIN${NC}"
echo -e "----------------------------"
