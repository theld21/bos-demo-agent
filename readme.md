# Hướng dẫn cài đặt với Docker

## Bắt đầu nhanh
1. **Cấu hình môi trường**:
   - Copy file `.env.example` thành `.env` nếu chưa có.
   - Cập nhật các thông số `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD` trong file `.env`.

2. **Chuẩn bị Dockerfile**:
   - Mở file `docker/backend/Dockerfile`.
   - Bỏ comment dòng: `COPY --from=composer:latest /usr/bin/composer /usr/bin/composer`.

3. **Khởi chạy container**:
   ```bash
   docker compose up -d --build
   ```

4. **Cài đặt thư viện (Chỉ thực hiện lần đầu)**:
   ```bash
   docker exec -it backend composer install
   ```

## Các lệnh thường dùng
- **Dừng tất cả dịch vụ**: `docker compose down`
- **Xem log**: `docker compose logs -f`
- **Build lại service cụ thể**: `docker compose build [tên_service]`

## Cổng dịch vụ (Ports)
- **Backend (Nginx)**: [http://localhost:8080](http://localhost:8080)
- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **MySQL**: `3306`
