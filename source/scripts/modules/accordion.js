const faqItems = document.querySelectorAll(".faqs__item");

faqItems.forEach(item => item.addEventListener("click", () => {
    item.classList.toggle('opened');
}));