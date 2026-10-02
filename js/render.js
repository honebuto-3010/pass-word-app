function renderCategoryPage(category) {
    const container = document.getElementById(`${category}-list`);
    if (!container) return;

    const modal = document.getElementById(`${category}-modal`);
    const modalTitle = document.getElementById("modal-title");
    const modalValue = document.getElementById("modal-value");
    const modalClose = document.getElementById("modal-close");

    const data = getItemsByCategory(category);
    container.innerHTML = "";

    data.forEach(item => {
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

        // モーダル表示
        card.addEventListener("click", (e) => {
            if (e.target.classList.contains("delete-btn")) return;

            modalTitle.textContent = item.name;
            modalValue.textContent = item.value;
            modal.style.display = "block";
        });

        // 削除ボタン
        const deleteBtn = card.querySelector(".delete-btn");
        deleteBtn.addEventListener("click", () => {
            const confirmDelete = confirm("削除しますか？");

            if (confirmDelete) {
                deleteItem(item.createdAt);
                renderCategoryPage(category);
            }
        });

        container.appendChild(card);
    });

    modalClose.addEventListener("click", () => {
        modal.style.display = "none";
    });
}

renderCategoryPage("personal");
renderCategoryPage("email");
renderCategoryPage("passwords");
renderCategoryPage("others");
