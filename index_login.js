let gagalmasuk = 0;

function validateLogin() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;
    var error = document.getElementById("errorMessage");

    if (username.toUpperCase() == "USER_ADMIN") {
        if (password == "1111") {
            window.location.href = "Backend.html";
            return false;
        } else {
            error.innerHTML = "Password salah, coba lagi!";
            gagalmasuk++;
        }
    } else {
        if (password != "1111") {
            error.innerHTML = "Username dan password salah!";
        } else {
            error.innerHTML = "Username salah!";
        }
    }

    percobaanMasuk.innerHTML = "Sisa Percobaan: " + (5 - gagalmasuk);

    if (gagalmasuk >= 5) {
        window.location.href = "gagalmasuk.html";
        return false;
    }

    return false;
}
