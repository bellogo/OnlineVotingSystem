
$.ajax({
    url: 'http://localhost:3000/candidates',
    method: 'get',
}).done((e) => {
    for (let x = 0; x < e.length; x++) {
        $('#voted').append(
            `<div class="input">
    <input type="radio" name="candidate" value="${e[x].name}">${e[x].name} <br>
</div>
    `)
    }
    $("input[type='button']").click(function () {
        var radioValue = $("input[name='candidate']:checked").val();
        //alert(radioValue);
    for(let c = 0; c < e.length; c++){
        if(e[c].name == radioValue){
           alert(e[c].name)
          let id = e[c].id;
          let vote = parseInt(e[c].vote_count) + 1
          //alert(vote)
          $.ajax({
            url: `http://localhost:3000/candidates/${id}`,
            method: 'patch',
            data: {
                vote_count: vote
            }
        });
        alert("You have voted successfully")
        window.location.replace("index.html");
        }
    }
    
    })
});



//;
//