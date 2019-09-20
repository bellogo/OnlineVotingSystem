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
})