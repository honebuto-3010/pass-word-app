// ===============================
// Secure Notes PWA Service Worker
// ===============================

const CACHE_NAME = "secure-notes-cache-v1";

// キャッシュするファイル一覧
const ASSETS_TO_CACHE = [
  "./",
  "./index.html",
  "./personal.html",
  "./email.html",
  "./passwords.html",
  "./others.html",
  "./css/base.css",
  "./css/layout.css",
  "./css/theme-purple.css",
  "./css/components.css",
  "./css/modal.css",
  "./js/navigation.js",
  "./js/modal.js",
  "./js/storage.js",
  "./js/render.js",
  "./images/kkrn_icon_user_1-768x768.png",
  "./images/kkrn_icon_mail_6-768x768.png",
  "./images/kkrn_icon_security_11-768x768.png",
  "./images/kkrn_icon_notepc_1-768x768.png",
  "./images/192-icon.png",
  "./images/512-icon.png"
];

// インストール（初回起動時）
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// アクティベート（古いキャッシュ削除）
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// リクエスト時のキャッシュ制御
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // キャッシュがあればそれを返す
      if (cachedResponse) {
        return cachedResponse;
      }

      // なければネットワークから取得
      return fetch(event.request).catch(() => {
        // オフライン時に index.html を返す（最低限の復旧）
        return caches.match("./index.html");
      });
    })
  );
});
