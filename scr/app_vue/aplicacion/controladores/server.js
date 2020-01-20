import axios from "axios"
var DOMINIO="agua.jamrelectronics.com.mx"///configuracion de dominio
//var DOMINIO = "192.168.1.65:1111" ///configuracion de dominio

var Api_url = "https://" + DOMINIO + "/api_v_01/";
export default {

    sendServer(verbo, ruta, data) {

        return new Promise((resolve, reject) => {



            if (verbo == "post") {
                axios
                    .post(Api_url + ruta, data)
                    .then(response => {
                        resolve(response.data)
                    })
                    .catch(error => reject(error));
            }
            
            if (verbo == "get") {
                axios
                    .get(Api_url + ruta+"/?token="+data.token+"&data="+data.data)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error));


            }

            if (verbo == "put") {
                axios
                    .put(Api_url + ruta,data)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error));
            }

            if (verbo == "delete") {
                axios
                    .delete(Api_url + ruta+"/?token="+data.token+"&data="+data.data)
                    .then(response => resolve(response.data))
                    .catch(error => reject(error));
            }



        })




    }

}