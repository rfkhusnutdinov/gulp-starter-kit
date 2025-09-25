/**
 * Ajax
 */
[...document.querySelectorAll(".ajax-form")].forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const formSubmitButton = event.submitter;
    formSubmitButton.disabled = true;

    const formData = new FormData(form);

    fetch(form.getAttribute("action"), {
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
      .catch((error) => {
        // Что-то должно произойти
      })
      .finally(() => {
        formSubmitButton.disabled = false;
      });
  });
});
