//----------------validation.js-----------------
var submitform = true;
var is_submit = true;
var is_ajax_return = true;
//alert('hi');

//var myParam = location.search.split('sourcesPath=')[1];
//alert(myParam);

function submitcontactvalidate(form_id, name) {
    if (is_submit) {
        var $inputs = $(
            "#" +
            form_id +
            " textarea, " +
            "#" +
            form_id +
            " :input, " +
            "#" +
            form_id +
            " select"
        ); // alert(is_submit);
        $inputs.each(function () {
            if ($(this).attr("validate") != undefined) {
                var validation = $(this).attr("validate");

                var validation_array = validation.split(",");

                var current_name = $(this).attr("name");
                for (var i = 0; i < validation_array.length; i++) {
                    var validation_inner_array = validation_array[i].split("|");
                    for (var j = 0; j < validation_inner_array.length; j++) {
                        //alert(validation_inner_array);
                        switch (validation_inner_array[j]) {
                            case "Required":
                                if (name == "all" || current_name == name) {
                                    var value = $(this).val();
                                    if (value == "" || value == validation_inner_array[j + 1]) {
                                        $(this).removeClass("valid");
                                        $(this).addClass("error");
                                        submitform = false;
                                    } else {
                                        $(this).removeClass("error");
                                        $(this).addClass("valid");
                                    }
                                }
                                break;
                            case "Email":
                                var isEmail = false;
                                if (
                                    validation_inner_array[j + 1] == "ifEntered" &&
                                    validation_inner_array[j + 2] == $(this).val()
                                ) {
                                    isEmail = false;
                                } else {
                                    isEmail = true;
                                }
                                if (isEmail) {
                                    if (name == "all" || current_name == name) {
                                        var value = $(this).val();
                                        var atpos = value.indexOf("@");
                                        var dotpos = value.lastIndexOf(".");
                                        if (value == "" || value == validation_inner_array[j + 1]) {
                                            $(this).removeClass("valid");
                                            $(this).addClass("error");
                                            submitform = false;
                                        } else if (
                                            atpos < 1 ||
                                            dotpos < atpos + 2 ||
                                            dotpos + 2 >= value.length
                                        ) {
                                            $(this).removeClass("valid");
                                            $(this).addClass("error");
                                            submitform = false;
                                        } else {
                                            $(this).removeClass("error");
                                            $(this).addClass("valid");
                                        }
                                    }
                                }
                                break;
                            case "Phone":
                                if (name == "all" || current_name == name) {
                                    var value = $(this).val();
                                    if (value == "" || value == validation_inner_array[j + 1]) {
                                        $(this).removeClass("valid");
                                        $(this).addClass("error");
                                        submitform = false;
                                    } else if (isNaN(value)) {
                                        $(this).removeClass("valid");
                                        $(this).addClass("error");
                                        submitform = false;
                                    } else {
                                        $(this).removeClass("error");
                                        $(this).addClass("valid");
                                    }
                                }
                                break;
                            case "Number":
                                if (name == "all" || current_name == name) {
                                    var value = $(this).val();
                                    if (value == "" || value == validation_inner_array[j + 1]) {
                                        $(this).removeClass("valid");
                                        $(this).addClass("error");
                                        submitform = false;
                                    } else if (isNaN(value)) {
                                        $(this).removeClass("valid");
                                        $(this).addClass("error");
                                        submitform = false;
                                    } else {
                                        $(this).removeClass("error");
                                        $(this).addClass("valid");
                                    }
                                }
                                break;
                            case "Captcha":
                                if (name == "all" || current_name == name) {
                                    var value = $(this).val();
                                    var region_id = validation_inner_array[j + 2];
                                    is_ajax_return = false;
                                    $.ajax({
                                        type: "POST",
                                        data: "",
                                        url:
                                            SITEROOT +
                                            "admin_contact_us/site_contact_us/checkCaptcha/" +
                                            region_id +
                                            "?captcha" +
                                            region_id +
                                            "=" +
                                            value,
                                        success: function (responseData) {
                                            is_ajax_return = true;
                                            if (responseData == "false") {
                                                $("#captcha" + region_id).removeClass("valid");
                                                $("#captcha" + region_id).addClass("error");
                                                submitform = false;
                                            } else {
                                                $("#captcha" + region_id).removeClass("error");
                                                $("#captcha" + region_id).addClass("valid");
                                            }
                                        },
                                    });
                                }
                                break;
                        }
                    }
                }
            }
        });
    }
}

function validate(form_id) {
    //alert(form_id+' validation');
    is_submit = true;
    submitform = true;
    submitcontactvalidate(form_id, "all");
    setTimeout(function () {
        do_form_submit(form_id);
    }, 1);
}

function do_form_submit(form_id) {
    if (is_ajax_return) {
        if (submitform) {
            if (form_id == "menuContactform") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtn1").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");

                //   smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Quick Contact', {
                //     'program': {{'PGDM'}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{'Project Management'}}
                // });

                //               let loginForm = document.getElementById("menuContactform");

                // loginForm.addEventListener("submit", (e) => {
                //   e.preventDefault();

                //   let fname = document.getElementById("fname");
                //   let eid = document.getElementById("eid");
                //   let mno = document.getElementById("mno");
                //   let state = document.getElementById("state");
                //   let Textb1 = document.getElementById("Textb1");

                //   if (fname.value == "" || eid.value == "" || mno.value == "" || state.value == "" || Textb1.value == "") {
                //     alert("Ensure you input a value in all fields!");
                //   } else {
                //     // perform operation with form input
                //     alert("This form has been successfully submitted!");
                //     console.log(
                //       `This form has a username of ${eid.value} and password of ${fname.value} Mobile No ${mno.value}`
                //     );

                //       smartech('contact', 10, {
                //     'pk^email': {{${eid.value}}},
                //     'STATE':{{${state.value}}},
                //     'FIRST_NAME': {{${fname.value}}},
                //     'mobile' :{{${mno.value}}},
                //     'HIGHEST_QUALIFICATION' : {{${Textb1.value}}}
                //     });
                // smartech('identify',{{${eid.value}}} );
                // smartech('dispatch', 'Quick Contact', {
                //     'program': {{'PGDM'}},
                //     'email': {{${eid.value}}},
                //     'specialization': {{'Project Management'}}
                // });

                //     eid.value = "";
                //     fname.value = "";
                //     mno.value = "";
                //     state.value = "";
                //     Textb1.value = "";
                //   }
                // });

                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };

                //  alert(leadsmart);

                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                //console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });

                //                             alert('Hi');
                //                               smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Quick Contact', {
                //     'program': {{'PGDM'}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{'Project Management'}}
                // });

                // alert(smartech);


                // smartech("contact", 10, {
                //   "pk^email": $inputs[5].value,
                //   mobile: $inputs[6].value,
                //   FIRST_NAME: $inputs[4].value,
                //   HIGHEST_QUALIFICATION: $inputs[10].value,
                //   STATE: $inputs[9].value,
                // });
                // smartech("identify", $inputs[5].value);
                // smartech("dispatch", "Quick Contact", {
                //   program: "PGDM",
                //   email: $inputs[5].value,
                //   specialization: "Project Management",
                // });


            } else if (form_id == "menuContactformFooter") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtnfooter").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");

                //                              smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Apply Now', {
                //     'program': {{"PGDM"}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{"Project Management"}}
                // });

                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                // console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });




                // smartech("contact", 10, {
                //   "pk^email": $inputs[5].value,
                //   STATE: $inputs[9].value,
                //   FIRST_NAME: $inputs[4].value,
                //   mobile: $inputs[6].value,
                //   HIGHEST_QUALIFICATION: $inputs[10].value,
                // });
                // smartech("identify", $inputs[5].value);
                // smartech("dispatch", "Apply Now", {
                //   program: "PGDM",
                //   email: $inputs[5].value,
                //   specialization: "Project Management",
                // });



            } else if (form_id == "menuContactformHome") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtnhomenew").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");

                //                              smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Apply Now', {
                //     'program': {{"PGDM"}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{"Project Management"}}
                // });




                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                // console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });






                // smartech("contact", 10, {
                //   "pk^email": $inputs[5].value,
                //   STATE: $inputs[9].value,
                //   FIRST_NAME: $inputs[4].value,
                //   mobile: $inputs[6].value,
                //   HIGHEST_QUALIFICATION: $inputs[10].value,
                // });
                // smartech("identify", $inputs[5].value);
                // smartech("dispatch", "Apply Now", {
                //   program: "PGDM",
                //   email: $inputs[5].value,
                //   specialization: "Project Management",
                // });





            } else if (form_id == "menuExpertForm") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtnExpert").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");

                //                              smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Apply Now', {
                //     'program': {{"PGDM"}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{"Project Management"}}
                // });

                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                // console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });











                // smartech("contact", 10, {
                //   "pk^email": $inputs[5].value,
                //   STATE: $inputs[9].value,
                //   FIRST_NAME: $inputs[4].value,
                //   mobile: $inputs[6].value,
                //   HIGHEST_QUALIFICATION: $inputs[10].value,
                // });
                // smartech("identify", $inputs[5].value);
                // smartech("dispatch", "Talk To Our Experts", {
                //   program: "PGDM",
                //   email: $inputs[5].value,
                //   specialization: "Project Management",
                // });
            } else if (form_id == "menuBrochureForm") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtnBrochure").style.visibility =
                    "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");

                //                              smartech('contact', 10, {
                //     'pk^email': {{$inputs[5].value}},
                //     'STATE':{{$inputs[9].value}},
                //     'FIRST_NAME': {{$inputs[4].value}},
                //     'mobile' :{{$inputs[6].value}},
                //     'HIGHEST_QUALIFICATION' : {{$inputs[10].value}}
                //     });
                // smartech('identify',{{$inputs[5].value}} );
                // smartech('dispatch', 'Apply Now', {
                //     'program': {{"PGDM"}},
                //     'email': {{$inputs[5].value}},
                //     'specialization': {{"Project Management"}}
                // });

                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                // console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });

                // smartech("contact", 10, {
                //   "pk^email": $inputs[5].value,
                //   STATE: $inputs[9].value,
                //   FIRST_NAME: $inputs[4].value,
                //   mobile: $inputs[6].value,
                //   HIGHEST_QUALIFICATION: $inputs[10].value,
                // });
                // smartech("identify", $inputs[5].value);
                // smartech("dispatch", "Download Brochure", {
                //   program: "PGDM",
                //   email: $inputs[5].value,
                //   specialization: "Project Management",
                // });
            } else if (form_id == "menuContactformCourse") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtncourse").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");
                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                //console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        //$('#' + form_id).submit();
                        $("#csdownbtn").addClass("d-none");
                        $("#cstucture").removeClass("d-none");
                        $("button.close").click();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });
            } else if (form_id == "menuContactformCoursesecond") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtncoursesecond").style.visibility =
                    "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");
                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //  alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                //console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        // alert(response);
                        //$('#' + form_id).submit();
                        $("#csdownbtnsecond").addClass("d-none");
                        $("#cstucturesecond").removeClass("d-none");
                        $("button.close").click();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });
            } else if (form_id == "menuContactformCourseExe") {
                //alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtncoursesecond").style.visibility =
                    "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");
                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));
                //$("#replyqs").html(JSON.stringify(lead));
                //console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        //alert(response);
                        //$('#' + form_id).submit();
                        $("#csdownbtnExe").addClass("d-none");
                        $("#cStructureExe").removeClass("d-none");
                        $("button.close").click();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });
            } else if (form_id == "menuContactformSticky") {
                // alert("hello");
                //document.getElementsByClassName("submitbtn")[1].disabled=true;
                document.getElementById("submitbtnsticky").style.visibility = "hidden";
                var $inputs = $(
                    "#" +
                    form_id +
                    " textarea, " +
                    "#" +
                    form_id +
                    " :input, " +
                    "#" +
                    form_id +
                    " select"
                );
                //alert("hello");
                var lead = {
                    AuthToken: "MITSDE-11-06-2020",
                    Source: "mitsde",
                    FirstName: $inputs[4].value,
                    // , "LastName": $inputs[5].value
                    MobileNumber: $inputs[6].value,
                    Email: $inputs[5].value,
                    City: "Not Known",
                    //, "State": "Maharashtra"
                    State: $inputs[9].value,
                    Country: "India",
                    Course: "Not Known",
                    Textb1: $inputs[10].value,

                    Center: $inputs[8].value,
                    // , "LeadSource": $inputs[9].value
                    LeadSource: "Paid - Google (DS)",
                    LeadName: "admission-mitsde",
                    LeadType: "Online",
                    Field1: $inputs[15].value,
                    Leadchannel: $inputs[16].value,
                    leadcampaign: $inputs[17].value,

                    //, "Field2": $inputs[16].value
                    //, "Field3": $inputs[17].value
                    //, "leadCampaign": $inputs[18].value
                };
                //alert(JSON.stringify(lead));

                //$("#replyqs").html(JSON.stringify(lead));
                //console.log(JSON.stringify(lead));

                //alert(lead);

                $.ajax({
                    url: "https://thirdpartyapi-extraaedge-com.onrender.com/api/SaveRequest",
                    type: "POST",
                    data: JSON.stringify(lead),
                    dataType: "json",
                    crossDomain: true,
                    contentType: "application/json; charset=utf-8",
                    success: function (response) {
                        $("#" + form_id).submit();
                    },
                    error: function (response) {
                        //alert("You have already submited a form2");
                        //location.reload();
                        window.location = "thankyou.php";
                    },
                });
            } else {
                $("#" + form_id).submit();
            }
        } else {
            return false;
        }
    } else {
        setTimeout(function () {
            do_form_submit(form_id);
        }, 1);
    }
}

function validateStep(selection_id, next_id) {
    alert("hi" + next_id);
    is_submit = true;
    submitform = true;
    submitcontactvalidate(selection_id, "all");
    setTimeout(function () {
        goNextStep(selection_id, next_id);
    }, 1);
}

function goNextStep(selection_id, next_id) {
    if (is_ajax_return) {
        if (submitform) {
            $("#" + selection_id).animate(
                {
                    width: "toggle",
                },
                "slow"
            );
        } else {
            return false;
        }
    } else {
        setTimeout(function () {
            do_form_submit(form_id);
        }, 1);
    }
}

function jumpStep(selection_id) {
    $("#" + selection_id).animate(
        {
            width: "toggle",
        },
        "slow"
    );
}

function getFormCaptcha(region_id, captchaLabel) {
    $.ajax({
        type: "POST",
        data: "",
        url:
            SITEROOT + "admin_contact_us/site_contact_us/reloadCaptcha/" + region_id,
        success: function (responseData) {
            $("#capt" + region_id).html(responseData);
            $("#captcha" + region_id).val(captchaLabel);
            $("#captcha" + region_id).removeClass("valid");
            $("#captcha" + region_id).removeClass("error");
        },
    });
}
/*function cf(object){var f=object;if(f.value==f.defaultValue)f.value="";}
function cf(obj){if(obj.value==obj.defaultValue)obj.value='';}
function rf(obj){if(obj.value=='')obj.value=obj.defaultValue; is_submit = true; submitcontactvalidate('leftContactFrm',obj.name);}*/
function removeDefault(obj) {
    if (obj.value == obj.defaultValue) {
        obj.value = "";
    }
}

function addDefault(obj, fromId) {
    if (obj.value == "") {
        obj.value = obj.defaultValue;
    }
    is_submit = true;
    submitcontactvalidate(fromId, obj.name);
}
//----------------------------END---------------------------------------------
