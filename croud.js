btnAction="insert";

load_students();
$("#addform").on("submit", function(event){
    event.preventDefault();

    let full_name=$("#full_name").val();
    let phone=$("#phone").val();
    let address=$("#address").val();
    let id=$("#update_id").val();

    let sendingData={}

    if(btnAction=="insert"){
        sendingData={
            "full_name":full_name,
            "phone":phone,
            "address":address,
            "action":"register_student"
        }
    }else{

        sendingData={
            "id": id,
            "full_name":full_name,
            "phone":phone,
            "address":address,
            "action":"update_students"
        }
    }


    $.ajax({
        "method": "POST",
        "dataTye": "JSON",
        "url": "croud_api.php",
        "data": sendingData,

        success:function(data){
            let status=data.status;
            let response=data.data;

            if(status){
                swal("Good job!", response, "success");
                btnAction="insert";
                load_students();
                $("#addform")[0].reset();
            }else{
                swal("NOW!", response, "error");

            }
        },
        error:function(data){
            swal("error",  data.response.Text);

        }
    })
})



function load_students(){
    $("#Addtable tbody").html('');
    $("#Addtable thead").html('');

    let sendingData={
        "action": "read_students"
    }


   $.ajax({
    "method": "POST",
    "dataTye": "JSON",
    "url": "croud_api.php",
    "data": sendingData,

      success:function(data){
        let status=data.status;
        let response=data.data;
        let html='';
        let th='';
        let tr='';


        if(status){
            response.forEach(res=>{
                th="<tr>";
                for(let r in res){

                    th+=`<th>${r}</th>`;
                }

                th+= "<td>Action</td></tr>";

                tr+="<tr>";

                for(let r in res){
                    tr+=`<td>${res[r]}</td>`;
                }


                tr+=`<td> <a class="btn btn-info update_info" update_id=${res['id']}><i class="fas fa-edit" style="color: #fff"></i></a>&nbsp;&nbsp
                <a class="btn btn-danger delete_info" delete_id=${res['id']}><i class="fas fa-trash" style="color: #fff"></i></a></td>`;

            })




            $("#Addtable thead").append(th);
            $("#Addtable tbody").append(tr);
        }
      }
   })
    
   
}


function get_students(id){
   
    let sendingData={
        "id": id,
        "action": "get_students"
    }


   $.ajax({
    "method": "POST",
    "dataTye": "JSON",
    "url": "croud_api.php",
    "data": sendingData,

      success:function(data){
        let status=data.status;
        let response=data.data;
        let html='';
        let th='';
        let tr='';


        if(status){
            btnAction="update";
            
            $("#update_id").val(response['id']);
            $("#full_name").val(response['full_name']);
            $("#phone").val(response['phone']);
            $("#address").val(response['address']);
            $("#student_modal").modal('show');

        }else{
            swal("NOW", response, "error");
        }
      }
   })
    
   
}

function delete_students(id){
   
    let sendingData={
        "id": id,
        "action": "delete_student"
    }


   $.ajax({
    "method": "POST",
    "dataTye": "JSON",
    "url": "croud_api.php",
    "data": sendingData,

      success:function(data){
        let status=data.status;
        let response=data.data;
        let html='';
        let th='';
        let tr='';


        if(status){
           
            swal("Good job!", response, "success");
            load_students();

        }else{
            swal("NOW", response, "error");
        }
      }
   })
    
   
}



$("#Addtable").on("click", "a.update_info", function(){
    let id=$(this).attr("update_id");
    get_students(id);
})


$("#Addtable").on("click", "a.delete_info", function(){
    let id=$(this).attr("delete_id");
    if(confirm("Are you sure to Delete")){
        delete_students(id);

    }
})
