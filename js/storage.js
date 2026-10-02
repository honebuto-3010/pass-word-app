/* ============================================
   データ構造バージョン管理 ＋ 自動初期化
============================================ */

const CURRENT_VERSION = 1;

// 保存されているバージョンを取得
const savedVersion = Number(localStorage.getItem("secureNotes_version") || 0);

// バージョンが違う場合は初期化
if (savedVersion !== CURRENT_VERSION) {
    console.warn("データ構造が変更されたため、secureNotes を初期化します。");

    localStorage.removeItem("secureNotes");
    localStorage.setItem("secureNotes_version", CURRENT_VERSION);
}

function getItems() {
    return JSON.parse(localStorage.getItem("secureNotes") || "[]");
}

function getItemsByCategory(category) {
    const data = getItems();
    return data.filter(item => item.type === category);
}

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

function deleteItem(createdAt) {
    const data = getItems();
    const newData = data.filter(item => item.createdAt !== createdAt);
    localStorage.setItem("secureNotes", JSON.stringify(newData));
}
