import { Actions } from "jumpstate";
import $ from "jquery";

function login(payload){
    var settings = {
        url: "http://server.home.root:8001/Login_API/login",
        type: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json, text/javascript, */*; q=0.01",
          'Access-Control-Allow-Origin': "*",
        },
        data: JSON.stringify(payload),
        success: function(response) {
          console.log(response);
        },
        error: function(response){
          console.log("error response is ", response);
        }
    };
    $.ajax(settings);
}

export {
    login
};