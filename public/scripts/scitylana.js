document.addEventListener("DOMContentLoaded", function() {
    analytics();
});

function analytics() {
    fetch("/api/v1/scitylana", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: new URLSearchParams({
            "user_agent": navigator.userAgent,
            "url": window.location.href,
            "referrer": document.referrer,
            "screen_width": window.innerWidth
        })
    })
}
