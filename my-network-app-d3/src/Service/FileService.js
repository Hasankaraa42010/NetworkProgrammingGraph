import axios from "axios";

export default class FileService{
    async addFile(data) {
        return axios({
          method:'POST',
          url:"http://localhost:8102/api/file/fromPath",
          data:data,
          headers:{
            'Content-Type': 'multipart/form-data'
          }
        }).then(function(response){
          return response.data
        }).catch(function(error){
          
          console.log(error);
        })
      }
      async signInn() {
        return axios({
          method:'GET',
          url:"http://localhost:8102/api/file/asd",
            
          
        }).then(function(response){
          return response.data
        }).catch(function(error){
          
          console.log(error);
        })
      }
      
}