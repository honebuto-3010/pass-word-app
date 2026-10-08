/* ============================================
   データ構造バージョン管理 ＋ 初回のみ初期化
============================================ */

const CURRENT_VERSION = 1;

const savedVersionRaw = localStorage.getItem("secureNotes_version");
const savedVersion = savedVersionRaw ? Number(savedVersionRaw) : null;

if (savedVersion === null) {
    localStorage.removeItem("secureNotes");
    localStorage.setItem("secureNotes_version", CURRENT_VERSION);
}

/* ============================================
   IndexedDB バックアップ
============================================ */

function openDB() {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open("secureNotesBackup", 1);

        request.onupgradeneeded = function(event) {
            const db = event.target.result;
            db.createObjectStore("notes", { keyPath: "createdAt" });
        };

        request.onsuccess = function(event) {
            resolve(event.target.result);
        };

        request.onerror = function(event) {
            reject(event.target.error);
        };
    });
}

async function backupToIndexedDB() {
    const db = await openDB();
    const tx = db.transaction("notes", "readwrite");
    const store = tx.objectStore("notes");

    const data = getItems();
    data.forEach(item => store.put(item));

    return tx.complete;
}

async function restoreFromIndexedDB() {
    const db = await openDB();
    const tx = db.transaction("notes", "readonly");
    const store = tx.objectStore("notes");

    const request = store.getAll();

    request.onsuccess = function() {
        const backupData = request.result;

        if (backupData.length > 0) {
            localStorage.setItem("secureNotes", JSON.stringify(backupData));
        }
    };
}

/* ============================================
   データ取得
============================================ */

function getItems() {
    return JSON.parse(localStorage.getItem("secureNotes") || "[]");
}

function getItemsByCategory(category) {
    return getItems().filter(item => item.type === category);
}

/* ============================================
   データ追加
============================================ */

function addItem(name, value, icon, type) {
    const data = getItems();

    const newItem = {
        name,
        value,
        icon,
        type,
        createdAt: Date.now().toString() // ★ 文字列で統一
    };

    data.push(newItem);
    localStorage.setItem("secureNotes", JSON.stringify(data));

    backupToIndexedDB(); // ★ 自動バックアップ
}

/* ============================================
   データ削除（完全削除）
============================================ */

function deleteItem(createdAt) {
    const data = getItems();

    const newData = data.filter(item => String(item.createdAt) !== String(createdAt));

    localStorage.setItem("secureNotes", JSON.stringify(newData));

    backupToIndexedDB(); // ★ 自動バックアップ
}

/* ============================================
   起動時に自動復元
============================================ */

document.addEventListener("DOMContentLoaded", () => {
    restoreFromIndexedDB();
});

