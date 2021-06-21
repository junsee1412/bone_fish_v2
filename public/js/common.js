function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function getBrand(token) {
    $.get("http://localhost:3000/api/"+token+"/brand", (data, status) => {
        let list='<option value="0" selected>Brand</option>'
        data.listBrand.forEach(element => {
            list=list+"<option value='"+element.id_br+"'>"+element.name_br+"</option>"
        })
        $('#brand').html(list)
    })
}
function getCategory(token) {
    $.get("http://localhost:3000/api/"+token+"/category", (data, status) => {
        let list='<option value="0" selected>Category</option>'
        data.listCategory.forEach(element => {
            list=list+"<option value='"+element.id_cat+"'>"+element.name_cat+"</option>"
        })
        $('#category').html(list)
    })
}
function getProduct(token) {
    $.get("http://localhost:3000/api/"+token+"/product", (data, status) => {
        let ss=''
        data.listProduct.forEach(element => {
            if (Number(element.instock) < 20) pr_st='table-danger'
            else if (Number(element.instock) < 60) pr_st='table-warning'
            else pr_st='table-primary'
            ss=ss+"<tr class='"+pr_st+"' style='cursor:pointer;' onclick='detailProduct("+element.id_pr+")'><td>"+element.name_pr+"</td><td>"+element.id_category+"</td><td>"+element.id_brand+"</td><td>"+element.price_pr+"</td><td>"+element.instock+"</td></tr>"
        })
        $('#pos').html(ss)
    })
}
function detailProduct(id) {
    $.get("http://localhost:3000/api/product"+id, (data, status) => {
        alert(data.name_pr)
    })
}