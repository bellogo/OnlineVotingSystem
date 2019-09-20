alert("jquerry start")
// registration button
$('#cregBtn').click((e) => {
    e.preventDefault()
    let canName = $('#canName').val();
    let canAge = parseInt($('#canAge').val());
    let party = $('#party').val();
    let canState = $('#canState').val();
    let runMate = $('#runMate').val();
    //alert("bela")
    //console.log(e);
    if (!canName || !canAge || !party || !canState || !runMate) {
        alert("complete filling your information")
    } else {
        $.ajax({
            url: 'http://localhost:3000/candidates',
            method: 'post',
            data: {
                name: canName,
                age: parseInt(canAge),
                party,
                home_state: canState,
                running_mate: runMate,
                vote_count: 0
            }
        })
        $('#canName').val('');
        $('#canAge').val('');
        $('#party').val('');
        $('#canState').val('');
        $('#runMate').val('');
    }

})

// load table data in all candidates 

$.ajax({
    url: 'http://localhost:3000/candidates',
    method: 'get',
}).done((e) => {
    //alert("gotten data")
    for (let i = 0; i < e.length; i++) {
        $('#tbody').append(
            `<tr>
                <td>${i + 1}
                </td>
                <td>
                       ${e[i].name} 
                    </td>
                    <td>
                       ${e[i].age} 
                    </td>
                    <td>
                        ${e[i].party}
                    </td>
                    <td>
                        ${e[i].home_state}
                    </td>
                    <td>
                        ${e[i].running_mate}
                    </td>
                    <td>
                            <button id="del-${e[i].id}" class="delete-btn">Delete</button>
                            <button id="edt-${e[i].id}" class="edit-btn">Edit</button>
                        </td>
                </tr>`
        )
    }
    // window.location.replace(allcandidates.html)

    // delete data in all candidates
    $('.delete-btn').on('click', (e) => {
        let id = e.target.id.split('del-').join('')
        
        $.ajax({
            url: `http://localhost:3000/Candidates/${id}`,
            method: 'delete'
        }).done((e) => {
            window.location.replace("allcandidates.html")
        })

        //update information



    })

    $('.edit-btn').on('click', (e) => {
        let id = e.target.id.split('edt-').join('')
        //alert(id)
        localStorage.setItem('id',id)
            window.location.replace("update.html")
        })

   

})