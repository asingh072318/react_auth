import { Actions } from "jumpstate";
import $ from "jquery";
import {BASE_URL} from "./baseURL";

function login(payload){
    var settings = {
        url: BASE_URL + "Login_API/login",
        type: "POST",
        headers: {
          "content-type": "application/json",
          "accept": "application/json, text/javascript, */*; q=0.01",
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