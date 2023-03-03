

$onapproveproduct = $('table tbody tr td p#approve-product');
$onapproveproduct.click(function(event) {
    var bookid = $(this).attr('data-id');

    var request = {
        "url" : `http://localhost/admin/api/approve-product?productId=${bookid}`,
        "method" : "POST"
    }

    if(confirm("Do you want to approve this product")){
        $.ajax(request).done(function(res){
            alert("Product Approved..");
            location.reload();
        })
    }
})


$onNotApproveProduct = $('table tbody tr td p#not-approve-product');
$onNotApproveProduct.click(function(event) {
    var bookid = $(this).attr('data-id');

    var request = {
        "url" : `http://localhost/admin/api/not-approve-product?productId=${bookid}`,
        "method" : "POST"
    }

    if(confirm("Do you want to reject this product")){
        $.ajax(request).done(function(res){
            alert("Product Rejected..");
            location.reload();
        })
    }
});


$onDeleteUser = $('table.admin-all-users tbody tr td a.admin-delete-user');
$onDeleteUser.click(function(event){
    var userid = $(this).attr('user-id');

    var request = {
        "url" : `http://localhost/api/users/${userid}`,
        "method" : "DELETE",
    }

    if(confirm("Do you really want to delete this user ??")){
        $.ajax(request).done(function(res){
            alert("User Removed Successfully...!!");
        })
    }
});


$('#update-admin-profile').submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array , function(n, i){
        data[n['name']] = n['value']
    });

    var request = {
        "url" : 'http://localhost/admin/api/admin-detail',
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(res) {
        alert("Data Updated..");
        location.reload();
    })
})