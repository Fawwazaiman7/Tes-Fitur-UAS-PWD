$(document).ready(function(){
    $('#bukuTamuForm').on('submit', function(e){
        e.preventDefault();
        const nama = $('#nama').val();
        const email = $('#email').val();
        const pesan = $('#pesan').val();
        const newMessage = `
            <div class="card mt-3" style="opacity: 0; transform: translateY(30px); transition: opacity 0.8s, transform 0.8s;">
                <div class="card-body">
                    <h5 class="card-title">${nama}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${email}</h6>
                    <p class="card-text">${pesan}</p>
                </div>
            </div>
        `;
        $('#messagesContainer').prepend(newMessage);
        $('#messagesContainer .card:first-child').css({opacity: 1, transform: 'translateY(0)'});
        $('#bukuTamuForm')[0].reset();
    });
});