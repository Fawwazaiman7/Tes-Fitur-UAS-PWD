let gagalmasuk = 0;

function validateLogin(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    let username = document.getElementById("username").value;
    let password = parseInt(document.getElementById("password").value); // Parse password as integer
    let error = document.getElementById("errorMessage");
    let percobaanMasuk = document.getElementById("percobaanMasuk");

    if (username.toUpperCase() === "USER_ADMIN" && password === 111) {
        window.location.href = "Backend.html";
        return true;
    } else {
        error.innerHTML = "Username dan atau Password salah, coba lagi!";
        gagalmasuk++;
        percobaanMasuk.innerHTML = "Sisa Percobaan: " + (5 - gagalmasuk);

        if (gagalmasuk === 5) {
            window.location.href = "gagalmasuk.html";
            return false;
        }
        return false;
    }
}
