
$('#productRegister').submit(function (e) {
    alert('data added successfully..');
    location.reload();
});

$getBackLocation = $("#locationBack");

$getBackLocation.click(function(e){
    // location.reload(history.back());
    // history.back();
    // window.location.assign(history.back());
    history.go(-2);
})

// if(window.location.pathname == '/'){
//     location.reload();
// }

// $('#login-submit').submit(function (event) {
//     event.preventDefault();

//     // let loginmail = document.getElementsByClassName('loginMail');
//     // let loginpassword = document.getElementsByClassName('loginPassword');
//     // console.log(loginmail.value, loginpassword.value);
//     // if(loginmail.value == null || loginpassword.value == null) {
//     //     alert('Invalid Credential..!!!');
//     // } else {
//     let unindexed_array = $(this).serializeArray();
//     let data = {}

//     $.map(unindexed_array, function (n, i) {
//         data[n['name']] = n['value'];
//     });

//     let request = {
//         "url": 'http://localhost',
//         "method": "POST",
//         "data": data
//     }

//     $.ajax(request).done(function (res) {
//         // if (res.message != null) {
//         //     alert(`${res.message}`);
//         // }
//         alert("loged in..")
//     });
//     // }
// })

$('#register_form_submit').submit(function (event) {
    event.preventDefault();

    // let usermail = document.getElementsByClassName('usermail');
    // let userpassword = document.getElementsByClassName('userpassword');
    // if (usermail.value == null || userpassword.value == null) {
    //     alert('empty data can not accepted..');
    // } else {
        var unindexed_array = $(this).serializeArray();
        var data = {}

        $.map(unindexed_array, function (n, i) {
            data[n['name']] = n['value'];
        });

        if (data['password'] == data['confirmpassword']) {
            var request = {
                "url": "http://localhost/api/users",
                "method": "POST",
                "data": data
            }

            $.ajax(request).done(function (res) {
                console.log(res);
                // if(res.length == 0){
                //     alert('user already exist...');
                // } else {
                alert(`${res.name.firstName} ${res.name.lastName} registered Successfully `);
                // }
            })
        } else {
            alert("Password not matched...");
        }
    // }

});

$('#update-profile').submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });

    var request = {
        "url": `http://localhost/api/users/${data.id}`,
        "method": "put",
        "data": data
    };

    $.ajax(request).done(function (res) {
        alert("Your data updated successfully..");
        location.reload();
        // window.location.assign(history.back());
    })
});

$('#productUpdate').submit(function (event) {
    event.preventDefault();
    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value'];
    });

    var request = {
        "url": `http://localhost/api/products/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (res) {
        alert("Data Updated Successfully..");
        location.reload();
    })
})

$onDeleteUserProduct = $('table tr td a.delete-user-product');
$onDeleteUserProduct.click(function (event) {
    var productId = $(this).attr('data-id');

    var request = {
        "url": `http://localhost/api/products/${productId}`,
        "method": "DELETE"
    }

    if (confirm("Do you really want to delete this product. ?")) {
        $.ajax(request).done(function (res) {
            alert("product deleted successfully..!!");
            location.reload();
        })
    }
});