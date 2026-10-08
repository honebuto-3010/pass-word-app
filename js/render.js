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
        div.dataset.id = item.createdAt;

        div.innerHTML = `
            <img src="images/kkrn_icon_mail_6-768x768.png" class="summary-icon">
            <div>
                <div class="summary-service">${item.name}</div>
                <div class="summary-hidden">••••••••</div>
            </div>
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
    const modalClose = document.getElementById("modal-close");

    const data = getItemsByCategory("email");
    container.innerHTML = "";

    const item = data.find(x => x.createdAt == id);
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="delete-btn" data-id="${item.createdAt}">×</button>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        if (confirm("削除しますか？")) {
            deleteItem(item.createdAt);
            container.style.display = "none";
            document.getElementById("email-summary-list").style.display = "block";
            renderEmailSummaryList(getItemsByCategory("email"));
        }
    });

    container.appendChild(card);
    modalClose.addEventListener("click", () => modal.style.display = "none");
}

const emailSummary = document.getElementById("email-summary-list");
if (emailSummary) {
    emailSummary.addEventListener("click", function(e) {
        const item = e.target.closest(".email-summary");
        if (!item) return;

        const id = item.dataset.id;
        emailSummary.style.display = "none";
        document.getElementById("email-list").style.display = "block";
        document.getElementById("email-back-btn").style.display = "block";

        renderEmailDetail(id);
    });
}

const emailBack = document.getElementById("email-back-btn");
if (emailBack) {
    emailBack.addEventListener("click", () => {
        document.getElementById("email-list").style.display = "none";
        document.getElementById("email-summary-list").style.display = "block";
        emailBack.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("email-summary-list")) {
        renderEmailSummaryList(getItemsByCategory("email"));
    }
});


/* ============================
   PERSONAL
============================ */
function renderPersonalSummaryList(data) {
    const list = document.getElementById("personal-summary-list");
    if (!list) return;
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item personal-summary";
        div.dataset.id = item.createdAt;

        div.innerHTML = `
            <img src="images/kkrn_icon_user_1-768x768.png" class="summary-icon">
            <div>
                <div class="summary-service">${item.name}</div>
                <div class="summary-hidden">••••••••</div>
            </div>
        `;
        list.appendChild(div);
    });
}

function renderPersonalDetail(id) {
    const container = document.getElementById("personal-list");
    if (!container) return;

    const modal = document.getElementById("personal-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalValue = document.getElementById("modal-value");
    const modalClose = document.getElementById("modal-close");

    const data = getItemsByCategory("personal");
    container.innerHTML = "";

    const item = data.find(x => x.createdAt == id);
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="delete-btn" data-id="${item.createdAt}">×</button>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        if (confirm("削除しますか？")) {
            deleteItem(item.createdAt);
            container.style.display = "none";
            document.getElementById("personal-summary-list").style.display = "block";
            renderPersonalSummaryList(getItemsByCategory("personal"));
        }
    });

    container.appendChild(card);
    modalClose.addEventListener("click", () => modal.style.display = "none");
}

const personalSummary = document.getElementById("personal-summary-list");
if (personalSummary) {
    personalSummary.addEventListener("click", function(e) {
        const item = e.target.closest(".personal-summary");
        if (!item) return;

        const id = item.dataset.id;
        personalSummary.style.display = "none";
        document.getElementById("personal-list").style.display = "block";
        document.getElementById("personal-back-btn").style.display = "block";

        renderPersonalDetail(id);
    });
}

const personalBack = document.getElementById("personal-back-btn");
if (personalBack) {
    personalBack.addEventListener("click", () => {
        document.getElementById("personal-list").style.display = "none";
        document.getElementById("personal-summary-list").style.display = "block";
        personalBack.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("personal-summary-list")) {
        document.getElementById("personal-list").style.display = "none";
        document.getElementById("personal-back-btn").style.display = "none";
        renderPersonalSummaryList(getItemsByCategory("personal"));
    }
});


/* ============================
   PASSWORDS
============================ */
function renderPasswordsSummaryList(data) {
    const list = document.getElementById("passwords-summary-list");
    if (!list) return;
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item passwords-summary";
        div.dataset.id = item.createdAt;

        div.innerHTML = `
            <img src="images/kkrn_icon_security_11-768x768.png" class="summary-icon">
            <div>
                <div class="summary-service">${item.name}</div>
                <div class="summary-hidden">••••••••</div>
            </div>
        `;
        list.appendChild(div);
    });
}

function renderPasswordsDetail(id) {
    const container = document.getElementById("passwords-list");
    if (!container) return;

    const modal = document.getElementById("passwords-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalValue = document.getElementById("modal-value");
    const modalClose = document.getElementById("modal-close");

    const data = getItemsByCategory("passwords");
    container.innerHTML = "";

    const item = data.find(x => x.createdAt == id);
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="delete-btn" data-id="${item.createdAt}">×</button>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        if (confirm("削除しますか？")) {
            deleteItem(item.createdAt);
            container.style.display = "none";
            document.getElementById("passwords-summary-list").style.display = "block";
            renderPasswordsSummaryList(getItemsByCategory("passwords"));
        }
    });

    container.appendChild(card);
    modalClose.addEventListener("click", () => modal.style.display = "none");
}

const passwordsSummary = document.getElementById("passwords-summary-list");
if (passwordsSummary) {
    passwordsSummary.addEventListener("click", function(e) {
        const item = e.target.closest(".passwords-summary");
        if (!item) return;

        const id = item.dataset.id;
        passwordsSummary.style.display = "none";
        document.getElementById("passwords-list").style.display = "block";
        document.getElementById("passwords-back-btn").style.display = "block";

        renderPasswordsDetail(id);
    });
}

const passwordsBack = document.getElementById("passwords-back-btn");
if (passwordsBack) {
    passwordsBack.addEventListener("click", () => {
        document.getElementById("passwords-list").style.display = "none";
        document.getElementById("passwords-summary-list").style.display = "block";
        passwordsBack.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("passwords-summary-list")) {
        document.getElementById("passwords-list").style.display = "none";
        document.getElementById("passwords-back-btn").style.display = "none";
        renderPasswordsSummaryList(getItemsByCategory("passwords"));
    }
});


/* ============================
   OTHERS
============================ */
function renderOthersSummaryList(data) {
    const list = document.getElementById("others-summary-list");
    if (!list) return;
    list.innerHTML = "";

    data.forEach(item => {
        const div = document.createElement("div");
        div.className = "summary-item others-summary";
        div.dataset.id = item.createdAt;

        div.innerHTML = `
            <img src="images/kkrn_icon_notepc_1-768x768.png" class="summary-icon">
            <div>
                <div class="summary-service">${item.name}</div>
                <div class="summary-hidden">••••••••</div>
            </div>
        `;
        list.appendChild(div);
    });
}

function renderOthersDetail(id) {
    const container = document.getElementById("others-list");
    if (!container) return;

    const modal = document.getElementById("others-modal");
    const modalTitle = document.getElementById("modal-title");
    const modalValue = document.getElementById("modal-value");
    const modalClose = document.getElementById("modal-close");

    const data = getItemsByCategory("others");
    container.innerHTML = "";

    const item = data.find(x => x.createdAt == id);
    if (!item) return;

    const card = document.createElement("div");
    card.className = "service-card";

    card.innerHTML = `
        <img src="${item.icon}" class="service-icon">
        <div class="service-info">
            <h3 class="service-name">${item.name}</h3>
            <p class="service-value">${item.value}</p>
        </div>
        <button class="delete-btn" data-id="${item.createdAt}">×</button>
    `;

    card.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) return;
        modalTitle.textContent = item.name;
        modalValue.textContent = item.value;
        modal.style.display = "block";
    });

    const deleteBtn = card.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
        if (confirm("削除しますか？")) {
            deleteItem(item.createdAt);
            container.style.display = "none";
            document.getElementById("others-summary-list").style.display = "block";
            renderOthersSummaryList(getItemsByCategory("others"));
        }
    });

    container.appendChild(card);
    modalClose.addEventListener("click", () => modal.style.display = "none");
}

const othersSummary = document.getElementById("others-summary-list");
if (othersSummary) {
    othersSummary.addEventListener("click", function(e) {
        const item = e.target.closest(".others-summary");
        if (!item) return;

        const id = item.dataset.id;
        othersSummary.style.display = "none";
        document.getElementById("others-list").style.display = "block";
        document.getElementById("others-back-btn").style.display = "block";

        renderOthersDetail(id);
    });
}

const othersBack = document.getElementById("others-back-btn");
if (othersBack) {
    othersBack.addEventListener("click", () => {
        document.getElementById("others-list").style.display = "none";
        document.getElementById("others-summary-list").style.display = "block";
        othersBack.style.display = "none";
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("others-summary-list")) {
        document.getElementById("others-list").style.display = "none";
        document.getElementById("others-back-btn").style.display = "none";
        renderOthersSummaryList(getItemsByCategory("others"));
    }
});
