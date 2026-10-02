/* ============================
   navigation.js
   下部ナビゲーションバーのページ遷移
============================ */

document.addEventListener("DOMContentLoaded", () => {

    // すべてのナビアイテムを取得
    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            const page = item.getAttribute("data-page");

            if (!page) return;

            // ページ遷移
            window.location.href = page;
        });
    });

    // 現在のページを active 表示にする
    const currentPage = window.location.pathname.split("/").pop();

    navItems.forEach(item => {
        const page = item.getAttribute("data-page");

        if (page === currentPage) {
            item.classList.add("active");
        }
    });

});
