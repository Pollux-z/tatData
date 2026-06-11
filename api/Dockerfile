FROM python:3.9-slim

# ตั้งค่า environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# ตั้งค่า working directory
WORKDIR /app

# ติดตั้ง system dependencies
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        gcc \
        curl \
        default-libmysqlclient-dev \
        pkg-config \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# คัดลอกและติดตั้ง Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# คัดลอกโค้ดแอปพลิเคชัน (เฉพาะ build time)
COPY ./app ./app

# สร้าง logs directory
RUN mkdir -p /app/logs

# ⭐ ไม่สร้าง non-root user สำหรับ development
# เพื่อหลีกเลี่ยงปัญหา permission ใน volume mounting
# RUN useradd -m -u 1000 appuser && chown -R appuser:appuser /app
# USER appuser

# เปิดพอร์ต
EXPOSE 8000

# คำสั่งรันแอปพลิเคชัน (จะถูก override ใน docker-compose.yml)
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]