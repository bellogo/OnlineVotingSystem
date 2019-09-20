$('#updBtn').click((e) => {
    e.preventDefault()
    let canName = $('#canName').val();
    let canAge = $('#canAge').val();
    let party = $('#party').val();
    let canState = $('#canState').val();
    let runMate = $('#runMate').val();
    let id = localStorage.getItem('id')
    if (canName) {
        $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                name: canName,
            }
        })
        $('#canName').val('');
    }
    if (canAge) {
        $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                age: canAge,
            }
        })
        $('#canAge').val('');
    }
    if (party) {
        $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                party: party,
            }
        })
        $('#party').val('');
    }
    if (canState) {
        $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                home_state: canState,
            }
        })
        $('#canState').val('');
    }
    if (runMate) {
        $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                running_mate: canName,
            }
        })
        $('#runMate').val('');
    }

})