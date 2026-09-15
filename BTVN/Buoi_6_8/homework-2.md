# Bài Tập Về Nhà (Phần 2\) \- Kết nối MySQL và Query dữ liệu Trên Node.js

> **S-Group Backend Basic 2026**: Database & Backend Integration  
> **Deadline**: Trước buổi học tiếp theo  
> **Hình thức nộp**: Link Github chứa source code của bài tập \+ Ảnh chụp màn hình test Postman.  
>   
> 💡 **Lời khuyên  về việc dùng AI:** Khuyến khích các bạn **hãy tự tay làm và tự gõ code** để thực sự hiểu bản chất và quen thuộc với luồng di chuyển dữ liệu qua các tầng (Layer Flow) — đây là nền tảng cốt lõi cho mọi kiến trúc nâng cao sau này. Chỉ nên dùng AI để hỗ trợ khi bản thân bạn **thực sự đã tự làm và đã hiểu rõ đường đi nước bước** của hệ thống nhé\!

## Mục tiêu bài tập

* Nắm được cách quản lý kết nối Database qua **Connection Pool** (`mysql2/promise`).  
* Tự tay viết các câu truy vấn **Raw SQL** trong Layer Repository.  
* Hiểu được tư duy **Kiến trúc 4 tầng (Route ➔ Controller ➔ Service ➔ Repository)**: Thay đổi nơi lưu trữ dữ liệu (từ Mock sang DB thật) mà không làm vỡ các tầng phía trên.

## Setup ban đầu

1. Đảm bảo MySQL đang chạy và Database đã có đủ bảng `users`, `categories`, `products`.  
2. Đảm bảo file `.env` đã có đầy đủ thông tin cấu hình kết nối:  
     
   PORT=3000  
     
   DB\_HOST=localhost  
     
   DB\_PORT=3306  
     
   DB\_USER=root  
     
   DB\_PASSWORD=mat\_khau\_cua\_ban  
     
   DB\_NAME=sgroup\_db  
     
3. Chạy `npm run dev` để kiểm tra kết nối console hiện thông báo `Database connected successfully!` là được.

## Nội dung bài tập

### PHẦN 1: Hoàn thiện các chức năng CRUD cho `Product`

*Hiện tại đã có chức năng ĐỌC (`GET /api/products` và `GET /api/products/:id`)*

#### 1\. API Tạo sản phẩm mới (`POST /api/products`)

* Body gửi lên (JSON):

{

    "name": "Bàn phím cơ DareU EK87",

    "price": 45.50,

    "stock": 20,

    "category\_id": 4

}

* Yêu cầu các tầng:  
  - Repository (product.repository.js): Viết câu lệnh INSERT INTO products (name, price, stock, category\_id) VALUES (?, ?, ?, ?). Lấy result.insertId vừa tạo để gọi hàm findProductByIdFromDB() trả về thông tin sản phẩm đầy đủ.  
  - Service (product.service.js):  
    - Validate: name không được để trống (tối thiểu 2 ký tự).  
    - Validate: price bắt buộc là số và phải \> 0\.  
    - Validate: stock nếu truyền lên phải \>= 0\.  
  - Controller & Route: Trả về HTTP Status 201 Created kèm dữ liệu sản phẩm vừa tạo.

#### 2\. API Cập Nhật Sản Phẩm (`PUT /api/products/:id`)

* Body gửi lên (JSON): Các trường thông tin cần chỉnh sửa (`name`, `price`, `stock`, `category_id`).  
* **Yêu cầu**:  
  - **Repository:** Viết câu lệnh dùng để UPDATE sản phẩm theo `id`. Sau khi cập nhật, gọi hàm `findProductByIdFromDB()` để trả về thông tin sản phẩm vừa cập nhật.  
  - **Service**: Kiểm tra nếu sản phẩm với id truyền vào không tồn tại trong DB thì throw lỗi 404 Not Found.  
  - **Controller**: Trả về HTTP Status 200 OK kèm thông báo thành công.

#### 3\. API Xoá Sản Phẩm (`DELETE /api/products/:id`)

* **Yêu cầu**:  
  - **Repository:** Viết câu lệnh dùng để DELETE sản phẩm theo `id`.  
  - **Service:** Kiểm tra xem sản phẩm có tồn tại trước khi xoá. Nếu không tồn tại thì throw lỗi 404 Not Found.  
  - **Controller:** Trả về HTTP Status 200 OK kèm thông báo xoá thành công.

### PHẦN 2: Xoá đi Mock Data \- Đưa Module `User` lên Database

*Hiện tại module User vẫn đang dùng file `src/repositories/mock.data.js`. Hãy chuyển đổi hoàn toàn sang MySQL*

1. Tạo file mới: `**src/repositories/user.repository.js**`  
2. Viết các hàm truy vấn SQL trong Repository để thao tác trực tiếp với bảng `users`:  
   - `getAllUsersFromDB()`: SELECT \* FROM users ORDER BY id ASC.  
   - `getUserByIdFromDB(id)`: Tìm user theo id (dùng ?).  
   - `getUserByEmailFromDB(email)`: Tìm user theo email (dùng để check trùng email khi đăng ký).  
   - `createUserInDB({ fullName, email, password, role })`  
3. Cập nhật `src/services/user.service.js`:  
   - Đổi từ việc sử dụng `mock data` sang sử dụng các hàm Repository mới viết.

### PHẦN 3: Nâng cao \- Tìm kiếm & Phân trang cho Products (Optional \- Ai muốn làm thêm thì làm nhé)

#### 1\. Tìm kiếm theo tên sản phẩm (`?search=...`)

- **Endpoint:** `GET /api/products?search=...`  
- **Xử lý tại Repository:** Dùng `WHERE LOWER(p.name) LIKE ?` với tham số `[%${search.toLowerCase()}%]`. Tuyệt đối không nối chuỗi.

#### 2\. Phân trang (`?page=...&limit=...`)

- **Endpoint:** `GET /api/products?page=...&limit=...`  
- **Công thức tính:** $$\\text{offset} \= (\\text{page} \- 1\) \\times \\text{limit}$$  
- **Query:** `SELECT ... LIMIT ? OFFSET ?` (truyền `[Number(limit), Number(offset)]`).

---

## 🧪 Checklist Tự Kiểm Tra & Chụp Ảnh Minh Chứng (Làm API nào \- Test & Chụp API đó)

> 📸 **Yêu cầu quan trọng:** Hoàn thành xong API nào, các bạn mở Postman test ngay và **chụp lại ảnh màn hình kết quả của API đó**.  
> Đối với các thao tác GHI (`POST`, `PUT`, `DELETE`), hãy chụp kèm cả **ảnh màn hình Database** (dùng bất kỳ công cụ nào bạn quen thuộc: TablePlus, DBeaver, DataGrip, MySQL Workbench hoặc Terminal... miễn sao chứng minh dữ liệu trong Database đã thực sự được thay đổi)\!

### 1\. Module Product (Phần 1\)

- [ ] `POST /api/products`: Tạo thành công (Status `201`) ➔ *1 ảnh Postman \+ 1 ảnh Database thấy dòng dữ liệu mới.*  
- [ ] `POST /api/products` (Validation): Gửi `price: -50` hoặc để trống tên ➔ *1 ảnh Postman nhận lỗi `400 Bad Request`.*  
- [ ] `PUT /api/products/:id`: Cập nhật thành công ➔ *1 ảnh Postman \+ 1 ảnh Database thấy dữ liệu đã được sửa.*  
- [ ] `PUT /api/products/9999`: Truyền ID không tồn tại ➔ *1 ảnh Postman nhận lỗi `404 Not Found`.*  
- [ ] `DELETE /api/products/:id`: Xoá thành công ➔ *1 ảnh Postman \+ 1 ảnh Database xác nhận đã mất dòng đó trong bảng.*  
- [ ] `DELETE /api/products/9999`: Truyền ID không tồn tại ➔ *1 ảnh Postman nhận lỗi `404 Not Found`.*

### 2\. Module User trên DB thật (Phần 2\)

- [ ] `GET /api/users`: Lấy toàn bộ danh sách users từ MySQL *(Lưu ý truyền Header `token-auth: secrets123`)* ➔ *1 ảnh Postman.*  
- [ ] `GET /api/users/:id`: Lấy thông tin 1 user theo ID từ MySQL ➔ *1 ảnh Postman.*  
- [ ] `POST /api/users`: Tạo user mới vào MySQL thành công ➔ *1 ảnh Postman \+ 1 ảnh Database có user mới.*  
- [ ] `POST /api/users` (Trùng email): Đăng ký lại với email đã có ➔ *1 ảnh Postman nhận lỗi `409 Conflict`.*

### 3\. Tính năng Nâng cao (Phần 3 \- Optional)

- [ ] `GET /api/products?search=...`: Tìm kiếm theo tên ➔ *1 ảnh Postman kết quả tìm kiếm.*  
- [ ] `GET /api/products?page=1&limit=2`: Phân trang ➔ *1 ảnh Postman trang 1 và trang 2\.*

---

### Hướng Dẫn Nộp Bài

1. Commit toàn bộ code lên Github  
   * **Lưu ý:** Tuyệt đối không commit file `.env` lên Github.  
2. Chụp ảnh màn hình Postman test các API đã làm xong.  
3. Nộp link Github kèm các ảnh chụp (đặt tên file ảnh có chú thích rõ ràng).

## Chúc mọi người cuối tuần vui vẻ\!

