// ===============================
// ADD モーダルの開閉
// ===============================

// モーダルを開く
console.log("app.js loaded");
console.log("app.js 読み込み成功");
document.getElementById("add-service-open-btn").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "block";
});

// モーダルを閉じる
document.getElementById("add-service-close").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "none";
});

// ===============================
// アイコン選択
// ===============================
let selectedIcon = "";

document.querySelectorAll(".icon-choice").forEach(icon => {
    icon.addEventListener("click", () => {
        selectedIcon = icon.dataset.icon;

        // 選択されたアイコンに枠線を付ける
        document.querySelectorAll(".icon-choice").forEach(i => i.classList.remove("selected"));
        icon.classList.add("selected");
    });
});

// ===============================
// 登録処理（ADD）
// ===============================
document.getElementById("add-service-btn").addEventListener("click", () => {
    console.log("登録ボタン押下");
    const name = document.getElementById("new-service-name").value.trim();
    const type = document.getElementById("new-service-type").value;
    const value = document.getElementById("new-service-value").value.trim();
    console.log(name);
    console.log(type);
    console.log(value);
    console.log(selectedIcon);
    if (!name || !value || !selectedIcon) {
        alert("サービス名・内容・アイコンを選択してください");
        return;
    }

  addItem(
     name,
     value,
     selectedIcon,
     type
     );

    // モーダルを閉じる
    document.getElementById("add-service-modal").style.display = "none";

    // 入力をリセット
    resetAddForm();
});

// ===============================
// 入力リセット
// ===============================
function resetAddForm() {
    document.getElementById("new-service-name").value = "";
    document.getElementById("new-service-value").value = "";
    selectedIcon = "";

    document.querySelectorAll(".icon-choice").forEach(i => i.classList.remove("selected"));
}

document.getElementById("reset-add-form-btn").addEventListener("click", resetAddForm);

