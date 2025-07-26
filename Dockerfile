# Use official Python 3.12 slim image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    gcc \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Upgrade pip
RUN pip install --upgrade pip

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Install spaCy model
RUN python -m spacy download en_core_web_sm

# Copy the application source code
COPY . .

# Expose FastAPI port
EXPOSE 8080

# Set Python logging behavior
ENV PYTHONUNBUFFERED=1

# Start FastAPI
CMD ["uvicorn", "services.insights.finance_agent.main:app", "--host", "0.0.0.0", "--port", "8080"]