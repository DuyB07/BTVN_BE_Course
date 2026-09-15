# Bài Tập Về Nhà — Buổi 6: Truy vấn SQL

> **SGroup Backend Basic 2026** · Session 06  
> **Deadline:** Trước buổi học tiếp theo  
> **Hình thức nộp:** 1 file `.sql` chứa toàn bộ câu lệnh \+ ảnh chụp màn hình kết quả từng câu chạy.  
>   
> 💡 **Lời khuyên về việc dùng AI:** Khuyến khích mọi người tận dụng AI để hỗ trợ khi **bản thân đã biết mình cần làm gì và nên làm gì** (nhờ giải thích lỗi cú pháp, review câu lệnh hoặc hỏi ý tưởng tiếp cận). Không nên **không nên phó mặc cho AI làm hết từ A-Z.**

---

## Schema Buổi Học (Nhắc lại)

Database: **`sgroup_db`**

users          categories       products

─────────      ──────────       ────────

id (PK)        id (PK)          id (PK)

full\_name      name             name

email          description      price

password\_hash                   stock

role                            category\_id (FK → categories.id)

created\_at                      created\_at

orders                    orders\_items

──────                    ────────────

id (PK)                   id (PK)

user\_id (FK → users.id)   order\_id (FK → orders.id)

total\_amount              product\_id (FK → products.id)

status                    quantity

created\_at                unit\_price

---

## Bước Chuẩn Bị — Chạy Script này TRƯỚC khi làm bài

**Quan trọng — Thực hiện theo đúng thứ tự sau:**

**Bước 1:** Lấy file **`demo_session_6.sql`** (file demo buổi học hôm nay) → mở bằng tool MySQL bạn đang dùng (DataGrip, TablePlus, DBeaver, MySQL Workbench, hoặc terminal `mysql` đều được) → chạy toàn bộ.  
File này sẽ tạo database `sgroup_db`, tạo các bảng, và thêm dữ liệu mẫu của buổi học.

**Bước 2:** Sau khi chạy xong `demo_session_6.sql`, mới chạy tiếp đoạn script bên dưới để thêm dữ liệu bổ sung cho bài tập.

> Mở **bất kỳ MySQL client nào bạn đang dùng**, chọn đúng database `sgroup_db`, copy toàn bộ đoạn SQL bên dưới và chạy một lần. Script này thêm dữ liệu cho `users`, `orders`, `orders_items` — các bảng hiện đang trống sau buổi học.

USE sgroup\_db;

\-- ── Thêm 1 user mới ──────────────────────────────────────────────────────

\-- (Đào sẽ không có đơn hàng nào → phục vụ câu hỏi tìm user chưa đặt hàng)

INSERT INTO users (full\_name, email, password\_hash, role) VALUES

('Phạm Thị Đào', 'dao@gmail.com', 'hashed\_pass\_dao', 'user');

\-- Kết quả: Đào nhận id=4 (id=2 đã bị xoá trong buổi học, AUTO\_INCREMENT tiếp tục từ 4\)

\-- ── Kiểm tra users hiện tại ──────────────────────────────────────────────

SELECT id, full\_name, email, role FROM users;

\-- Kỳ vọng: id=1 Tùng (admin), id=3 Cường (user), id=4 Đào (user)

\-- ── Thêm đơn hàng ────────────────────────────────────────────────────────

INSERT INTO orders (user\_id, total\_amount, status) VALUES

(1, 3750.00, 'completed'),   \-- Tùng: mua iPhone \+ MacBook Pro

(3, 440.00,  'pending'),     \-- Cường: mua Sony \+ Bàn phím

(1, 1550.00, 'completed'),   \-- Tùng: mua iPhone lần 2

(3, 2200.00, 'cancelled');   \-- Cường: đặt MacBook nhưng huỷ

\-- Đào (id=4) không có đơn hàng nào

\-- ── Thêm chi tiết đơn hàng ───────────────────────────────────────────────

INSERT INTO orders\_items (order\_id, product\_id, quantity, unit\_price) VALUES

\-- Order 1 (Tùng): iPhone 15 Pro Max \+ MacBook Pro M5

(1, 1, 1, 1550.00),   \-- iPhone 15 Pro Max

(1, 3, 1, 2200.00),   \-- MacBook Pro M5

\-- Order 2 (Cường): Sony XM5 \+ Bàn phím Aula

(2, 4, 1, 350.00),    \-- Tai nghe Sony XM5

(2, 5, 1, 90.00),     \-- Bàn phím Aula F75

\-- Order 3 (Tùng): iPhone lần 2

(3, 1, 1, 1550.00),   \-- iPhone 15 Pro Max

\-- Order 4 (Cường): MacBook — đơn bị huỷ

(4, 3, 1, 2200.00);   \-- MacBook Pro M5

\-- ── Verify setup ─────────────────────────────────────────────────────────

SELECT \* FROM orders;

SELECT \* FROM orders\_items;

### Dữ liệu sẽ có sau khi chạy script

| Bảng | Số bản ghi | Ghi chú |
| :---- | :---- | :---- |
| `users` | 3 | Tùng (id=1), Cường (id=3), Đào (id=4) |
| `categories` | 4 | Máy tính bảng, Điện thoại, Laptop, Phụ kiện |
| `products` | 5 | iPhone (1550), Samsung (1400), MacBook (2200), Sony (350), Bàn phím (90) |
| `orders` | 4 | 2 completed, 1 pending, 1 cancelled |
| `orders_items` | 6 | iPhone xuất hiện 2 lần, MacBook 2 lần |

---

## Bài Tập — 20 Câu Truy vấn SQL

**Câu 1\.** Lấy `name` và `price` của tất cả sản phẩm, sắp xếp theo giá tăng dần.

**Câu 2\.** Lấy tất cả sản phẩm có giá lớn hơn hoặc bằng 1000\. Hiển thị `name`, `price`, `stock`.

**Câu 3\.** Tìm tất cả sản phẩm có tên chứa chữ `"Pro"`.

**Câu 4\.** Lấy tất cả sản phẩm còn hàng (`stock > 0`) và có giá dưới 500\. Sắp xếp theo `stock` giảm dần.

**Câu 5\.** Lấy 3 sản phẩm đắt nhất. Hiển thị `name` và `price`.

**Câu 6\.** Đếm tổng số sản phẩm trong bảng `products`.

**Câu 7\.** Tính giá trung bình của tất cả sản phẩm, làm tròn đến 2 chữ số thập phân. Đặt tên cột kết quả là `avg_price`.

**Câu 8\.** Viết 2 câu query riêng:

- Câu 8a: Lấy tên và giá của sản phẩm đắt nhất.  
- Câu 8b: Lấy tên và giá của sản phẩm rẻ nhất.

**Câu 9\.** Tính tổng giá trị tồn kho (`SUM(price * stock)`) của từng danh mục. Hiển thị `category_id` và `total_stock_value`, sắp xếp theo tổng giá trị giảm dần.

**Câu 10\.** Đếm số đơn hàng theo từng trạng thái (`status`). Hiển thị `status` và `total_orders`.

**Câu 11\.** INNER JOIN: Lấy danh sách sản phẩm kèm tên danh mục. Chỉ lấy sản phẩm đã được gán danh mục. Hiển thị `product_name`, `price`, `category_name`.

**Câu 12\.** LEFT JOIN: Lấy tất cả danh mục, kể cả danh mục chưa có sản phẩm nào. Hiển thị `category_name`, `product_name`. Danh mục không có sản phẩm thì `product_name` hiển thị `NULL`.

**Câu 13\.** JOIN \+ GROUP BY: Đếm số lượng sản phẩm trong mỗi danh mục, hiển thị tên danh mục (không phải ID). Hiển thị `category_name`, `total_products`, sắp xếp theo `total_products` giảm dần.

**Câu 14\.** Từ câu 13, lọc chỉ lấy các danh mục có ít nhất 2 sản phẩm.

**Câu 15\.** Lấy danh sách sản phẩm trang 3, mỗi trang 2 sản phẩm, sắp xếp theo `id` tăng dần.

**Câu 16\.** JOIN 3 bảng: Lấy chi tiết từng dòng trong các đơn hàng. Hiển thị `order_id`, `full_name` người đặt, `product_name`, `quantity`, `unit_price`. Sắp xếp theo `order_id` tăng dần.

**Câu 17\.** Subquery: Tìm tất cả sản phẩm có giá cao hơn giá trung bình của toàn bộ sản phẩm. Hiển thị `name` và `price`.

**Câu 18\.** Tính tổng tiền thực tế của mỗi đơn hàng từ bảng `orders_items` (`SUM(quantity * unit_price)`). Hiển thị `order_id`, `full_name` người đặt, `calculated_total`, `status`. Sắp xếp theo `order_id`.

**Câu 19\.** Tìm tất cả user chưa có đơn hàng nào trong hệ thống. Hiển thị `full_name`, `email`.

**Câu 20\.** Tìm top 3 sản phẩm xuất hiện nhiều lần nhất trong các đơn hàng. Hiển thị `product_name` và số lần được đặt mua (`order_count`), sắp xếp theo `order_count` giảm dần.

---

## Nộp Bài

- Tạo 1 file tên `homework_s6_[TenBan].sql`, ghi comment số câu trước mỗi query:

\-- Câu 1

SELECT ...

\-- Câu 2

SELECT ...

- Chụp ảnh màn hình kết quả của **từng câu query** trên SQL client (dùng tool gì cũng được — DataGrip, TablePlus, DBeaver, MySQL Workbench, terminal...).  
- Nộp file `.sql` \+ toàn bộ ảnh chụp lên Google Classroom **trước buổi học tiếp theo**.

---

