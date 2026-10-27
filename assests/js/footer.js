
document.getElementById("footerSubscribeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();

    const status = document.getElementById(
      "footerSubscribeStatus"
    );

    if (status) {
      status.textContent =
        "Newsletter subscriptions are coming soon.";
    }
  });
