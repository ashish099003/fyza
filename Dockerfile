# Use an official Python image
FROM python:3.12-slim

# Set working directory
WORKDIR /app

# Copy requirements (create requirements.txt if not present)
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy all source code
COPY . .

# Expose FastAPI default port
EXPOSE 8080

# Start the FastAPI app using Uvicorn
CMD ["uvicorn", "services.insights.finance_agent.main:app", "--host", "0.0.0.0", "--port", "8080"]
