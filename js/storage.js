/* ============================================
   データ構造バージョン管理 ＋ 初回のみ初期化
============================================ */

const CURRENT_VERSION = 1;

// 保存されているバージョンを取得（null の場合は初回）
const savedVersionRaw = localStorage.getItem("secureNotes_version");
const savedVersion = savedVersionRaw ? Number(savedVersionRaw) : null;

// ★ 初回だけ初期化する（savedVersion が null のとき）
if (savedVersion === null) {
    console.warn("初回起動のため secureNotes を初期化します。");

    localStorage.removeItem("secureNotes");
    localStorage.setItem("secureNotes_version", CURRENT_VERSION);
}

/* ============================================
   データ取得
============================================ */

function getItems() {
    return JSON.parse(localStorage.getItem("secureNotes") || "[]");
}

function getItemsByCategory(category) {
    const data = getItems();
    return data.filter(item => item.type === category);
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
        createdAt: Date.now()
    };

    data.push(newItem);
    localStorage.setItem("secureNotes", JSON.stringify(data));
}

/* ============================================
   データ削除
============================================ */

function deleteItem(createdAt) {
    const data = getItems();
    const newData = data.filter(item => item.createdAt !== createdAt);
    localStorage.setItem("secureNotes", JSON.stringify(newData));
}
