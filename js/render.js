/* ============================
   EMAIL
============================ */
function renderEmailSummaryList(data) {
    const list = document.getElementById("email-summary-list");
    if (!list) return;
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item email-summary";
        div.dataset.id = String(item.createdAt); // ★ 文字列化

        div.innerHTML = `
            <div class="summary-left">
                <img src="images/kkrn_icon_mail_6-768x768.png" class="summary-icon">
                <div>
                    <div class="summary-service">${item.name}</div>
                    <div class="summary-hidden">••••••••</div>
                </div>
            </div>

            <button class="delete-btn" data-id="${item.createdAt}">×</button>
        `;

        list.appendChild(div);
    });
}

function renderEmailDetail(id) {
    const container = document.getElementById("email-list");
    if (!container) return;

    const modal = document.getElementById("email-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalValue = document.getElementById("modal-value");

    const data = getItemsByCategory("email");
    container.innerHTML = "";

    const item = data.find(x => String(x.createdAt) === String(id)); // ★ 文字列比較
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="close-btn">×</button>
    `;

    // 詳細カードの × → 閉じる（削除ではない）
    const closeBtn = card.querySelector(".close-btn");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
        document.getElementById("email-summary-list").style.display = "block";
        modal.style.display = "none";
    });

    // カード本体を押すとモーダル表示
    card.addEventListener("click", () => {
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    container.appendChild(card);
}

/* ============================
   一覧側のイベント（削除 & 詳細）
============================ */
const emailSummary = document.getElementById("email-summary-list");
if (emailSummary) {
    emailSummary.addEventListener("click", function(e) {

        // 一覧の × → 完全削除
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation(); // ★ 詳細へ飛ぶのを防止
            const id = String(e.target.dataset.id);

            if (confirm("削除しますか？")) {
                deleteItem(id); // ★ 完全削除
                renderEmailSummaryList(getItemsByCategory("email"));
            }
            return;
        }

        // 一覧カードを押す → 詳細へ
        const item = e.target.closest(".email-summary");
        if (!item) return;

        const id = item.dataset.id;
        emailSummary.style.display = "none";
        document.getElementById("email-list").style.display = "block";

        renderEmailDetail(id);
    });
}

/* ============================
   初期表示
============================ */
document.addEventListener("DOMContentLoaded", () => {

    const modalClose = document.getElementById("modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            const modal = document.getElementById("email-modal");
            modal.style.display = "none";
        });
    }

    if (document.getElementById("email-summary-list")) {
        renderEmailSummaryList(getItemsByCategory("email"));
    }
});


/* ============================
   PERSONAL
============================ */
function renderPersonalSummaryList() {
    const list = document.getElementById("personal-summary-list");
    if (!list) return;

    const data = getItemsByCategory("personal");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item personal-summary";
        div.dataset.id = String(item.createdAt);

        div.innerHTML = `
            <div class="summary-left">
                <img src="${item.icon}" class="summary-icon">
                <div>
                    <div class="summary-service">${item.name}</div>
                    <div class="summary-hidden">••••••••</div>
                </div>
            </div>

            <button class="delete-btn" data-id="${item.createdAt}">×</button>
        `;

        list.appendChild(div);
    });
}

function renderPersonalDetail(id) {
    const container = document.getElementById("personal-list");
    if (!container) return;

    const modal = document.getElementById("personal-modal");
    const modalTitle = document.getElementById("personal-modal-title");
    const modalValue = document.getElementById("personal-modal-value");

    const data = getItemsByCategory("personal");
    container.innerHTML = "";

    const item = data.find(x => String(x.createdAt) === String(id));
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="close-btn">×</button>
    `;

    // 閉じる専用
    const closeBtn = card.querySelector(".close-btn");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
        document.getElementById("personal-summary-list").style.display = "block";
        modal.style.display = "none";
    });

    // モーダル表示
    card.addEventListener("click", () => {
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    container.appendChild(card);
}

/* ============================
   一覧側のイベント（削除 & 詳細）
============================ */
const personalSummary = document.getElementById("personal-summary-list");
if (personalSummary) {
    personalSummary.addEventListener("click", function(e) {

        // 削除
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            const id = String(e.target.dataset.id);

            if (confirm("削除しますか？")) {
                deleteItem(id);
                renderPersonalSummaryList();
            }
            return;
        }

        // 詳細へ
        const item = e.target.closest(".personal-summary");
        if (!item) return;

        const id = item.dataset.id;
        personalSummary.style.display = "none";
        document.getElementById("personal-list").style.display = "block";

        renderPersonalDetail(id);
    });
}

/* ============================
   初期表示
============================ */
document.addEventListener("DOMContentLoaded", () => {

    const modalClose = document.getElementById("personal-modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            const modal = document.getElementById("personal-modal");
            modal.style.display = "none";
        });
    }

    if (document.getElementById("personal-summary-list")) {
        renderPersonalSummaryList();
    }
});

/* ============================
   PASSWORDS
============================ */
function renderPasswordsSummaryList() {
    const list = document.getElementById("passwords-summary-list");
    if (!list) return;

    const data = getItemsByCategory("passwords");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item passwords-summary";
        div.dataset.id = String(item.createdAt);

        div.innerHTML = `
            <div class="summary-left">
                <img src="${item.icon}" class="summary-icon">
                <div>
                    <div class="summary-service">${item.name}</div>
                    <div class="summary-hidden">••••••••</div>
                </div>
            </div>

            <button class="delete-btn" data-id="${item.createdAt}">×</button>
        `;

        list.appendChild(div);
    });
}

function renderPasswordsDetail(id) {
    const container = document.getElementById("passwords-list");
    if (!container) return;

    const modal = document.getElementById("passwords-modal");
    const modalTitle = document.getElementById("passwords-modal-title");
    const modalValue = document.getElementById("passwords-modal-value");

    const data = getItemsByCategory("passwords");
    container.innerHTML = "";

    const item = data.find(x => String(x.createdAt) === String(id));
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="close-btn">×</button>
    `;

    // 閉じる専用
    const closeBtn = card.querySelector(".close-btn");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
        document.getElementById("passwords-summary-list").style.display = "block";
        modal.style.display = "none";
    });

    // モーダル表示
    card.addEventListener("click", () => {
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    container.appendChild(card);
}

/* ============================
   一覧側のイベント（削除 & 詳細）
============================ */
const passwordsSummary = document.getElementById("passwords-summary-list");
if (passwordsSummary) {
    passwordsSummary.addEventListener("click", function(e) {

        // 削除
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            const id = String(e.target.dataset.id);

            if (confirm("削除しますか？")) {
                deleteItem(id);
                renderPasswordsSummaryList();
            }
            return;
        }

        // 詳細へ
        const item = e.target.closest(".passwords-summary");
        if (!item) return;

        const id = item.dataset.id;
        passwordsSummary.style.display = "none";
        document.getElementById("passwords-list").style.display = "block";

        renderPasswordsDetail(id);
    });
}

/* ============================
   初期表示
============================ */
document.addEventListener("DOMContentLoaded", () => {

    const modalClose = document.getElementById("passwords-modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            const modal = document.getElementById("passwords-modal");
            modal.style.display = "none";
        });
    }

    if (document.getElementById("passwords-summary-list")) {
        renderPasswordsSummaryList();
    }
});

/* ============================
   OTHERS
============================ */
function renderOthersSummaryList() {
    const list = document.getElementById("others-summary-list");
    if (!list) return;

    const data = getItemsByCategory("others");
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item others-summary";
        div.dataset.id = String(item.createdAt);

        div.innerHTML = `
            <div class="summary-left">
                <img src="${item.icon}" class="summary-icon">
                <div>
                    <div class="summary-service">${item.name}</div>
                    <div class="summary-hidden">••••••••</div>
                </div>
            </div>

            <button class="delete-btn" data-id="${item.createdAt}">×</button>
        `;

        list.appendChild(div);
    });
}

function renderOthersDetail(id) {
    const container = document.getElementById("others-list");
    if (!container) return;

    const modal = document.getElementById("others-modal");
    const modalTitle = document.getElementById("others-modal-title");
    const modalValue = document.getElementById("others-modal-value");

    const data = getItemsByCategory("others");
    container.innerHTML = "";

    const item = data.find(x => String(x.createdAt) === String(id));
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="close-btn">×</button>
    `;

    // 閉じる専用
    const closeBtn = card.querySelector(".close-btn");
    closeBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        container.style.display = "none";
        document.getElementById("others-summary-list").style.display = "block";
        modal.style.display = "none";
    });

    // モーダル表示
    card.addEventListener("click", () => {
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    container.appendChild(card);
}

/* ============================
   一覧側のイベント（削除 & 詳細）
============================ */
const othersSummary = document.getElementById("others-summary-list");
if (othersSummary) {
    othersSummary.addEventListener("click", function(e) {

        // 削除
        if (e.target.classList.contains("delete-btn")) {
            e.stopPropagation();
            const id = String(e.target.dataset.id);

            if (confirm("削除しますか？")) {
                deleteItem(id);
                renderOthersSummaryList();
            }
            return;
        }

        // 詳細へ
        const item = e.target.closest(".others-summary");
        if (!item) return;

        const id = item.dataset.id;
        othersSummary.style.display = "none";
        document.getElementById("others-list").style.display = "block";

        renderOthersDetail(id);
    });
}

/* ============================
   初期表示
============================ */
document.addEventListener("DOMContentLoaded", () => {

    const modalClose = document.getElementById("others-modal-close");
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            const modal = document.getElementById("others-modal");
            modal.style.display = "none";
        });
    }

    if (document.getElementById("others-summary-list")) {
        renderOthersSummaryList();
    }
});
