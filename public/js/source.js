alert("jquerry start")
$('#cregBtn').click((e) => {
    e.preventDefault()
    let canName = $('#canName').val();
    let canAge = Number($('#canAge').val());
    let party = $('#party').val();
    let canState = $('#canState').val();
    let runMate = $('#runMate').val();
    alert("bela")
    //console.log(e);
    $.ajax({
        url: 'http://localhost:3000/candidates',
        method: 'post',
        data: {
            name: canName,
            age: Number(canAge),
            party,
            home_state: canState,
            running_mate: runMate
        }
    })
    $('#canName').val('');
    $('#canAge').val('');
    $('#party').val('');
    $('#canState').val('');
    $('#runMate').val('');
})

alert("vote ready");
$('#vregBtn').click((e) => {
    e.preventDefault()
    let votName = $('#votName').val();
    let votAge = Number($('#votAge').val());
    let votState = $('#votState').val();
    alert("bela")
    //console.log(e);
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'post',
        data: {
            name: votName,
            age: Number(votAge),
            home_state: votState
            
        }
    });
    $('#votName').val('');
    $('#votAge').val('');
    $('#votState').val('');
})

$.ajax({
    url: 'http://localhost:3000/candidates',
    method: 'get',
}).done((e)=>{
    alert('i can now apend')
    for (let i = 0; i < e.length; i++){
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
    alert('could start delete')
    $('.delete-btn').on('click',(e)=>{
        let id = e.target.id.split('del-').join('')
        alert(id)
        $.ajax({
            url:`http://localhost:3000/Candidates/${id}`,
            method: 'delete'
        }).done((e)=>{

        })
    })
})

    