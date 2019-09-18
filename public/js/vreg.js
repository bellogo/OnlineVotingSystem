$('#vregBtn').click((e) => {
    e.preventDefault()
    let votName = $('#votName').val();
    let votAge = $('#votAge').val();
    let votState = $('#votState').val();
    alert("bela")
    //console.log(e);
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'post',
        data: {
            name: votName,
            age: votAge,
            home_state: votState
            
        }
    });
    $('#votName').val('');
    $('#votAge').val('');
    $('#votState').val('');
}).done(alert('success'))
