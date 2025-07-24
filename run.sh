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

# Start FastAPI server
echo "🚀 Starting FastAPI server on http://0.0.0.0:8080"
uvicorn services.insights.finance_agent.main:app --reload --host 0.0.0.0 --port 8080