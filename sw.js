// Lưu sẵn mọi tệp vào điện thoại sau lần mở đầu -> lần sau chạy được KHÔNG CẦN MẠNG.
// Mỗi khi thay mô hình/ảnh/âm thanh mới: tăng số phiên bản dưới đây rồi đưa lại lên GitHub.
const PHIEN_BAN = "plr-v16";
const TEP = [
  "./", "./index.html", "./manifest.json", "./bai-hoc-mau.json", "./bai-hoc-mau.txt", "./icon-192.png", "./icon-512.png",
  "./anh/be.jpg", "./anh/tai-che.jpg", "./anh/huu-co.jpg", "./anh/con-lai.jpg",
  "./am-thanh/tai-che.mp3", "./am-thanh/huu-co.mp3", "./am-thanh/con-lai.mp3", "./am-thanh/chao.mp3",
  "./am-thanh/tai-che.m4a", "./am-thanh/huu-co.m4a", "./am-thanh/con-lai.m4a", "./am-thanh/chao.m4a",
  "./am-thanh/tai-che.wav", "./am-thanh/huu-co.wav", "./am-thanh/con-lai.wav", "./am-thanh/chao.wav",
  "https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.22.0/dist/tf.min.js",
  "https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.1.1/dist/mobilenet.min.js",
  "https://cdn.jsdelivr.net/npm/@tensorflow-models/knn-classifier@1.2.6/dist/knn-classifier.min.js"
  // Trọng số MobileNet (tải từ máy chủ Google lần đầu) được lưu tự động khi app chạy
];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(PHIEN_BAN).then(c =>
    // tệp nào chưa có (vd chưa thu âm) thì bỏ qua, không làm hỏng cả bộ
    Promise.all(TEP.map(u => c.add(u).catch(() => {})))
  ));
  self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== PHIEN_BAN).map(k => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(daLuu => daLuu || fetch(e.request).then(r => {
      if (r.ok) { const ban = r.clone(); caches.open(PHIEN_BAN).then(c => c.put(e.request, ban)); }
      return r;
    }))
  );
});
