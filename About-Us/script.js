document.addEventListener("DOMContentLoaded", function() {
  // Observer for fade-in animations
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    {
      threshold: 0.1 // Trigger when 10% of the element is visible
    }
  );

  // Select all elements you want to animate
  const hiddenElements = document.querySelectorAll(".hidden");
  hiddenElements.forEach(el => observer.observe(el));
});
