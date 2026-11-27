// ===============================
// ADD モーダルの開閉
// ===============================

// モーダルを開く
document.getElementById("add-service-open-btn").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "block";
});

// モーダルを閉じる
document.getElementById("add-service-close").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "none";
});

// ===============================
// 登録処理（ADD：画像ゼロ仕様）
// ===============================
document.getElementById("add-service-btn").addEventListener("click", () => {

    const name = document.getElementById("new-service-name").value.trim();
    const type = document.getElementById("new-service-type").value;
    const value = document.getElementById("new-service-value").value.trim();

    if (!name || !value) {
        alert("タイトルと内容を入力してください");
        return;
    }

    // 保存するデータ構造（iconは不要に）
    const newItem = {
        name: name,
        value: value,
        type: type,
        createdAt: Date.now() // 削除・識別用のユニークID
    };

    // ローカルストレージに保存
    const data = JSON.parse(localStorage.getItem("secureNotes") || "[]");
    data.push(newItem);
    localStorage.setItem("secureNotes", JSON.stringify(data));

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
}

document.getElementById("reset-add-form-btn").addEventListener("click", resetAddForm);

