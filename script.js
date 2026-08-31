/* ============================================
   初期サービス（完全に空で開始）
============================================ */
if (!localStorage.getItem("services")) {
    localStorage.setItem("services", JSON.stringify([]));  // 初回は空
}

let services = JSON.parse(localStorage.getItem("services"));

/* ============================================
   カード描画（カテゴリなし）
============================================ */
function renderCards() {
    const container = document.getElementById("service-container");
    container.innerHTML = "";

    const group = document.createElement("div");
    group.className = "category-group"; // グリッド表示用にそのまま使用

    services.forEach(s => {
        const card = document.createElement("div");
        card.className = "service-card";
        card.dataset.service = s.id;

        card.innerHTML = `
            <img src="${s.icon}" alt="${s.name}">
            <h3>${s.name}</h3>
        `;

        // カードクリック → パスワード表示
        card.addEventListener("click", () => showPassword(s));

        // 削除ボタン
        const delBtn = document.createElement("button");
        delBtn.className = "delete-btn";
        delBtn.textContent = "×";

        delBtn.addEventListener("click", (e) => {
            e.stopPropagation();
            deleteService(s.id);
        });

        card.appendChild(delBtn);
        group.appendChild(card);
    });

    container.appendChild(group);

    toggleDeleteButtons();
}

/* ============================================
   サービス削除
============================================ */
function deleteService(serviceId) {
    if (!confirm("このサービスを削除しますか？")) return;

    services = services.filter(s => s.id !== serviceId);
    localStorage.setItem("services", JSON.stringify(services));
    renderCards();
}

/* ============================================
   編集モード（削除ボタン表示）
============================================ */
let editMode = false;

document.getElementById("edit-mode-btn").addEventListener("click", () => {
    editMode = !editMode;
    toggleDeleteButtons();

    document.getElementById("edit-mode-btn").textContent =
        editMode ? "編集モード終了" : "編集モード";
});

function toggleDeleteButtons() {
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.style.display = editMode ? "block" : "none";
    });
}

/* ============================================
   サービス追加（モーダル）
============================================ */
let selectedIcon = null;

document.getElementById("add-service-btn").addEventListener("click", () => {
    const name = document.getElementById("new-service-name").value.trim();
    const type = document.getElementById("new-service-type").value;
    const value = document.getElementById("new-service-value").value.trim();
    // ★ サービス名に種類を入れてしまった場合の警告
    const invalidNames = ["パスワード", "暗証番号", "メールアドレス", "ID番号", "注文番号"];
    if (invalidNames.includes(name)) {
        alert("サービス名にはサイト名やサービス名を入力してください（例：Amazon / auなど）");
        return;
    }
    if (!name || !value || !selectedIcon) {
        alert("入力が不足しています");
        return;
    }

    const newService = {
        id: "svc-" + Date.now(),
        name,
        icon: selectedIcon,
        type,      // ← 種類
        pass: value      // ← 入力内容
    };

    services.push(newService);
    localStorage.setItem("services", JSON.stringify(services));

    renderCards();
    document.getElementById("add-service-modal").style.display = "none";
});


/* ============================================
   アイコン選択
============================================ */
document.querySelectorAll(".icon-choice").forEach(img => {
    img.addEventListener("click", () => {
        document.querySelectorAll(".icon-choice").forEach(i => i.classList.remove("selected"));
        img.classList.add("selected");
        selectedIcon = img.dataset.icon;
    });
});

/* ============================================
   パスワード表示モーダル
============================================ */
let currentService = null;

function showPassword(service) {
    currentService = service;

    document.getElementById("modal-title").textContent = service.name;
    document.getElementById("modal-pass").textContent =
        service.pass ? `パスワード：${service.pass}` : "パスワードが登録されていません";

    document.getElementById("password-modal").style.display = "block";
}

document.getElementById("modal-close").onclick = () => {
    document.getElementById("password-modal").style.display = "none";
};

/* ============================================
   パスワード編集
============================================ */
document.getElementById("edit-pass-btn").addEventListener("click", () => {
    document.getElementById("edit-form").style.display = "block";
});

document.getElementById("save-pass-btn").addEventListener("click", () => {
    const newPass = document.getElementById("edit-pass-input").value.trim();
    if (!newPass) return;

    currentService.pass = newPass;
    localStorage.setItem("services", JSON.stringify(services));

    document.getElementById("modal-pass").textContent = `パスワード：${newPass}`;
    document.getElementById("edit-form").style.display = "none";
    document.getElementById("edit-pass-input").value = "";
});

const typeSelect = document.getElementById("new-service-type");
const valueInput = document.getElementById("new-service-value");
const nameInput = document.getElementById("new-service-name");
typeSelect.addEventListener("change", () => {
    const type = typeSelect.value;

    const placeholders = {
        "パスワード": "パスワードを入力",
        "メールアドレス": "メールアドレスを入力",
        "ID番号": "ID番号を入力",
        "暗証番号": "暗証番号を入力",
        "注文番号": "注文番号を入力"
    };

    valueInput.placeholder = placeholders[type];
   //サービス名の説明を固定（誤入力防止）
   nameInput.placeholder = "サービス名（例：Amazon / au / mont-bellなど）";

});

/* ============================================
   モーダル開閉（サービス追加）
============================================ */
document.getElementById("add-service-open-btn").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "block";
});

document.getElementById("add-service-close").addEventListener("click", () => {
    document.getElementById("add-service-modal").style.display = "none";
});
document.getElementById("reset-add-form-btn").addEventListener("click", () => {
    const nameInput = document.getElementById("new-service-name");
    const valueInput = document.getElementById("new-service-value");
    const typeSelect = document.getElementById("new-service-type");

    // 入力欄を確実にリセット
    nameInput.value = "";
    valueInput.value = "";
    valueInput.value = ""; // ← スマホ対策（内部値が残るバグ対策）
    typeSelect.selectedIndex = 0;

    // アイコン選択解除
    selectedIcon = null;
    document.querySelectorAll(".icon-choice").forEach(i => i.classList.remove("selected"));

    // スマホでフォーカスが残ると内部値が残るため、強制解除
    document.activeElement.blur();
});

/* ============================================
   初期描画
============================================ */
renderCards();
