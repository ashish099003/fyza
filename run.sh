#!/bin/bash

# Exit if any command fails
set -e

# Activate virtual environment
if [ ! -d "venv" ]; then
    echo "🔹 Creating virtual environment..."
    python3.12 -m venv venv
fi

echo "🔹 Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "🔹 Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "🔹 Installing requirements..."
pip install -r requirements.txt

# Check if en_core_web_sm is installed
echo "🔹 Checking for spaCy model (en_core_web_sm)..."
python -m spacy validate | grep -q "en_core_web_sm" || \
    (echo "⚡ Installing spaCy model en_core_web_sm..." && python -m spacy download en_core_web_sm)

# Start FastAPI server
echo "🚀 Starting FastAPI server on http://0.0.0.0:8080"
uvicorn services.insights.finance_agent.main:app --reload --host 0.0.0.0 --port 8080