/**
 * Ajax
 */

[...document.querySelectorAll(".form")].forEach((form) => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formSubmitButton = form.querySelector("button[type='submit']");
    formSubmitButton.disabled = true;

    const formData = new FormData(form);

    fetch(form.getAttribute("action") ?? "send.php", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          // Что-то должно произойти
          form.reset();
        } else {
          // Что-то должно произойти
        }
      })
      .catch(() => {
        // Что-то должно произойти
      })
      .finally(() => {
        formSubmitButton.disabled = false;
      });
  });
});
