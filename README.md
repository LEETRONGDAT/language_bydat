# 100 Ngày Giao Tiếp — bản sạch cho GitHub Pages + Kokoro

Mục tiêu: chạy trên iPhone như PWA, không cần Mac và không cần API key TTS trả phí.

## 1) Upload

Repository GitHub phải để **Public** để GitHub Actions standard runner được miễn phí theo chính sách của GitHub.

Upload **toàn bộ nội dung của gói ZIP này vào thư mục gốc của repository**. Không tạo thêm thư mục `Language100...` bên ngoài.

Cấu trúc bắt buộc:

```text
index.html
manifest.json
data.js
lessons.json
sw.js
.nojekyll
scripts/generate_audio.py
.github/workflows/generate-audio.yml
```

## 2) GitHub Pages

Settings → Pages → Build and deployment:

- Source: Deploy from a branch
- Branch: `main`
- Folder: `/(root)`

## 3) Tạo audio miễn phí

Vào **Actions** → **Generate free AI audio (Kokoro)** → **Run workflow**.

Lần đầu nên chọn:

- Start day: `1`
- End day: `10`

Workflow sẽ chạy Kokoro TTS trên GitHub Actions, tạo 4 nhóm giọng:

```text
audio-generated/en/male/day-01.mp3
audio-generated/en/female/day-01.mp3
audio-generated/zh/male/day-01.mp3
audio-generated/zh/female/day-01.mp3
```

Mỗi ngày là **một track MP3 dài**; mỗi câu được đọc 2 lần và có khoảng nghỉ giữa các câu. Cách này phù hợp hơn cho phát liên tục khi khóa màn hình iPhone.

## 4) iPhone

Mở URL GitHub Pages bằng Safari → Chia sẻ → **Thêm vào Màn hình chính**.

Khi muốn nghe khi khóa màn hình: mở app, chọn ngày/giọng, bấm **Phát cả ngày** trước, sau đó khóa iPhone. iOS có thể yêu cầu thao tác phát đầu tiên từ người dùng để cấp quyền media.

## 5) Lưu ý về "miễn phí hoàn toàn"

Bản này không sử dụng Azure, Google Cloud, ElevenLabs hay API TTS trả phí. Kokoro là mô hình TTS mã nguồn mở/open-weight; workflow chạy trên GitHub Actions và audio được tạo sẵn.

Tuy nhiên, GitHub vẫn có giới hạn về kích thước repository, dung lượng lưu trữ và băng thông. Vì vậy hãy tạo audio theo từng đợt 10–20 ngày thay vì sinh cả 100 ngày ngay từ đầu.

## 6) Nếu Actions báo thiếu file

Trong tab Code phải thấy trực tiếp:

```text
scripts/
.github/workflows/
```

Không được để:

```text
Language100V10/scripts/
```

vì khi đó workflow sẽ không tìm thấy `scripts/generate_audio.py`.
