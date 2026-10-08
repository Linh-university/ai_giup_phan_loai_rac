# Bé Phân Loại Rác – Hướng dẫn

## AI trong ứng dụng hoạt động thế nào

- **MobileNet** (mạng nơ-ron đã được Google huấn luyện trên hàng triệu ảnh) "nhìn" mỗi khung hình
  và rút ra đặc trưng: hình dáng, màu sắc, chất liệu.
- **KNN** (k láng giềng gần nhất) ghi nhớ các hình bé dạy. Khi gặp rác mới, máy so với 10 hình giống nhất
  đã học để đoán đó là loại rác gì.
- Việc học diễn ra **ngay trên điện thoại**, tức thì, không gửi ảnh đi đâu.
  Bài học được lưu trong điện thoại, tắt app mở lại vẫn còn.

## Cấu trúc thư mục

```
phan-loai-rac/
├── index.html        ứng dụng
├── manifest.json     để cài như app
├── sw.js             chạy không cần mạng
├── icon-192.png, icon-512.png
├── anh/              ảnh chụp 3 thùng rác thật trên mô hình
│     tai-che.jpg, huu-co.jpg, con-lai.jpg
└── am-thanh/         giọng bé (không bắt buộc)
      tai-che.mp3, huu-co.mp3, con-lai.mp3
```

## Bước 1. Đưa lên GitHub để mọi điện thoại tải về

1. Tạo repo công khai, vd `phan-loai-rac`, tải toàn bộ thư mục lên.
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `root` → Save.
3. Sau 1–2 phút có link: `https://<tên-github>.github.io/phan-loai-rac/`

### Cài trên điện thoại

- **Android (Chrome):** mở link → menu ⋮ → *Cài đặt ứng dụng* / *Thêm vào màn hình chính*.
- **iPhone (Safari):** mở link → nút Chia sẻ → *Thêm vào MH chính*.
- Lần đầu mở **cần có mạng** để tải bộ não AI, và cho phép dùng camera.
  Sau đó chạy được không cần mạng.
- Muốn có file APK: vào https://www.pwabuilder.com → dán link → Android → tải về,
  đưa lên mục Releases của repo. (iPhone không cài APK.)

## Bước 2. Bé dạy máy (trên chính điện thoại đặt trên giá)

1. Đặt điện thoại lên giá, bé đứng đúng chỗ như lúc thi. Mở app, chọn tab **🎓 Bé dạy máy**.
2. Bấm **🙋 Không có rác** trước: bé đứng tay không, giữ nút khoảng 5–10 giây (cười, nghiêng đầu, đưa tay trống).
   Bước này giúp máy không "nhìn mặt bé ra rác".
3. Lần lượt từng thùng: bé cầm một món rác, **giữ nút màu tương ứng** và xoay rác nhiều phía,
   đưa gần đưa xa. Làm với nhiều món khác nhau:
   - Tái chế: chai nhựa, lon, giấy báo, hộp sữa giấy...
   - Hữu cơ: vỏ chuối, vỏ cam, lá cây, rau...
   - Còn lại: túi ni lông bẩn, ống hút, hộp xốp, khẩu trang...
4. Mỗi nút có dấu ✓ khi đủ 30 hình. Nên dạy 60–100 hình mỗi nút để máy đoán chính xác hơn.
5. Bấm **🎮 Chơi** để thử. Máy đoán sai món nào → quay lại dạy thêm món đó.

## Bước 2b. Đóng gói bài học mẫu (cá nhân hóa)

Sau khi bé dạy máy xong và thử thấy đúng:
1. ⚙️ Dành cho ba mẹ → **Lưu bài học ra tệp** → được `bai-hoc-mau.json`.
2. Đặt tệp này cạnh `index.html`, tăng phiên bản trong `sw.js`, đưa lên GitHub.

Từ đó, ai cài app lần đầu sẽ có sẵn bài học của bé, máy nhận diện được ngay.
Mỗi bạn vẫn **tự dạy thêm** rác của mình (hộp sữa trường, bao bì bánh quen thuộc...) —
phần dạy thêm chỉ lưu trên máy của bạn đó. Nút **↩️ Về bài học mẫu** để quay lại bản gốc.

## Bước 3. Ảnh thùng và giọng bé

- Chụp từng thùng rác thật trên mô hình (nền trắng), đặt tên như trên, để vào `anh/`.
- Ảnh của bé: đặt tên `be.jpg` (ảnh vuông, mặt ở giữa) trong `anh/`. App hiện ảnh ở màn hình chào và góc tiêu đề.
- Thu giọng bé 3 câu, lưu mp3 vào `am-thanh/`. Chưa có thì máy tự đọc.
- Đổi màu, tên thùng, câu nói: sửa phần CẤU HÌNH đầu thẻ `<script>` trong `index.html`.
- Sau mỗi lần thay ảnh/âm thanh: mở `sw.js`, tăng `plr-v6` thành `plr-v7`..., rồi đưa lại lên GitHub.

## Dành cho ba mẹ (nút ⚙️ trong tab Bé dạy máy)

- **Lưu bài học ra tệp:** sao lưu những gì bé đã dạy. Nên lưu một bản trước ngày thi.
- **Nạp bài học:** chép bài học sang điện thoại khác, không cần dạy lại.
- **Xóa hết, dạy lại.**

## Mẹo cho ngày thi

- Mở app trước, chạm màn hình 1 lần để bật tiếng. App tự giữ màn hình sáng.
- Ánh sáng phòng thi khác ở nhà → đến nơi cho bé dạy thêm vài giây mỗi nút. Đây cũng là một màn trình diễn hay:
  bé dạy máy ngay trước mặt giám khảo.
