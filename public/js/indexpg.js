$('#vregBtn').click((e) => {
    e.preventDefault()
    let votName = $('#votName').val();
    let votAge = $('#votAge').val();
    let votState = $('#votState').val();
    let vemail = $('#vemail').val();
    let vpassword = $('#vpassword').val();
    //alert("saw data")
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'get',
    }).done((e) => {
        //alert(JSON.stringify(e))
        let flag = false;
        for (let i = 0; i < e.length; i++) {
            if (e[i].email === vemail) {
                flag = true;
            }
        }
        //alert(flag)
        if (!votName || !votAge || !votState || !vemail || !vpassword) {
            alert("complete filling your information")
        } else if (!vemail.includes('.') || !vemail.includes('@')) {
            alert("Enter a valid Email address")
        } else if (flag === true) {
            alert("Email already used. try another")
        } else if (votName && votAge && votState && vemail && vpassword && flag === false) {
            $.ajax({
                url: 'http://localhost:3000/voters',
                method: 'post',
                data: {
                    name: votName,
                    age: votAge,
                    home_state: votState,
                    email: vemail,
                    password: vpassword,
                    vote_count: 0

                }
            });
            $('#votName').val('');
            $('#votAge').val('');
            $('#votState').val('');
            $('#vemail').val('');
            $('#vpassword').val('');


        }
    })
})
//alert('try it')
$('#signIn').click((e) => {
    e.preventDefault()
    let vemail = $('#email').val();
    let vpassword = $('#password').val();
    $.ajax({
        url: 'http://localhost:3000/voters',
        method: 'get',
    }).done((e) => {
        let index;
        var id;
        let emailflag = false;
        let passwordflag = false;
        for (let a = 0; a < e.length; a++) {
            if (e[a].email === vemail) {
                emailflag = true;
                //alert('found email')
                //alert(JSON.stringify(e[a].password))
                if (e[a].password === vpassword) {
                    passwordflag = true;
                    //alert('password match')
                    index = a; 
                    id = e[a].id;
                    //alert(id)
                }
            }
        }
        
        // console.log(e[id].vote_count)
        // debugger;
        
        

        if (!vemail.includes('.') || !vemail.includes('@')) {
            alert("Enter a valid Email address")
        } else if (!vemail || !vpassword) {
            alert("complete filling your information")
        } else if (!emailflag || !passwordflag) {
            alert("Email & Password Mismatch")
        }else if (emailflag && passwordflag && e[index].vote_count === "1") {
            
            alert("You have already voted")
            window.location.replace("index.html");
        }else if (emailflag  && passwordflag && e[index].vote_count === "0") {
            $('#email').val('');
            $('#password').val('');
            //patch vote count to 1
            $.ajax({
                url: `http://localhost:3000/voters/${id}`,
                method: 'patch',
                data: {
                    vote_count: "1"
                }
            });
            alert('get ready to vote')
            window.location.replace("vote.html");
        } 



    })
})


//alert('admin ')
$('#adminSign').click((e) => {
    e.preventDefault()
    let aemail = $('#email').val();
    let apassword = $('#password').val();
    $.ajax({
        url: 'http://localhost:3000/admins',
        method: 'get',
    }).done((e) => {
        let emailflag = false;
        let passwordflag = false;
        let count = 0;
        for (let b = 0; b < e.length; b++) {
            if (e[b].email === aemail) {
                emailflag = true;
                //alert('found email')
                //alert(JSON.stringify(e[b].password))
                if (e[b].password === apassword) {
                    passwordflag = true;
                    //alert('password match')
                }
            }
        }
        if (emailflag === true && passwordflag === true) {
            count += 1;
        }
        alert(count)
        if (!aemail.includes('.') || !aemail.includes('@')) {
            alert("Enter a valid Email address")
        } else if (!aemail || !apassword) {
            alert("complete filling your information")
        } else if (!emailflag || !passwordflag) {
            alert("Email & Password Mismatch")
        } else if (count === 1) {
            $('#email').val('');
            $('#password').val('');
            //patch vote count to 1
            window.location.replace("admin.html");
        }
    })
})
//alert("add code")

// Set the date we're counting down to format: "Jan 5, 2021 15:37:25"
var countDownDate = new Date("sept 21, 2019 0:49:59").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Display the result in the element with id="demo"
  document.getElementById("demo").innerHTML = days + "d " + hours + "h "
  + minutes + "m " + seconds + "s ";

  // If the count down is finished, write some text
  if (distance < 0) {
    clearInterval(x);
    let highestVote = 0;
    $.ajax({
        url: 'http://localhost:3000/candidates',
        method: 'get',
    }).done((e) => {
        var winner = [];
        for(var d = 0; d < e.length; d++){
            if(parseInt(e[d].vote_count) > highestVote){
                highestVote =  parseInt(e[d].vote_count); 
            }
        }
        
        for(var f = 0; f < e.length; f++){
            if(highestVote === parseInt(e[f].vote_count)){
                winner.push(e[f].name)
                //
            }
        }
        if(winner.length > 1){
            document.getElementById("demo").innerHTML = `It's a Tie`;
            alert("It is a Tie Between:")
            for(var g = 0; g < winner.length; g++){
                alert(winner[g]);
            }
            
        }else{
            document.getElementById("demo").innerHTML = `The Winner is ${e[f].name}`;
        }
    })
    
  }
}, 1000);