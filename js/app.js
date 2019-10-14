$(function () {

 $('#search').submit((event) => {
   event.preventDefault()
   const query = $('#searchInput').val()
   //console.log(query)
   search(query)
 })



 //make api request using async/await
   async function search (searchTerm) {
     try{
       const url = 'https://api.openweathermap.org/data/2.5/weather?units=imperial'
       const apiKey = '93fc0410c8c8ea01e2835bcca50e4569'


       const response = await axios.get(url, {
         params: {
           appid : apiKey,
           q: searchTerm
         }
     })

     /*const weatherConversion = Math.ceil((parseInt(response.data.main.temp * 9) / 5 + 32) / 10)*/
     function displayResults() {
       const currentTemp = Math.ceil(response.data.main.temp)
       //console.log(response)
         $('#weatherResults ul').html('')

         $('#weatherResults ul').append(
           `<li>City: ${response.data.name}</li>
           <li>Country: ${response.data.sys.country}</li>
           <li>Current Temperature: <span id='currentTemp'>${currentTemp}</span></li>
           <li>Low: ${Math.ceil(response.data.main.temp_min)}</li>
           <li>Hight: ${Math.ceil(response.data.main.temp_max)}</li>
           <li>Weather description: ${response.data.weather[0].description}</li>`
         )

         if(currentTemp < 40 ){
           $('#currentTemp').addClass('lowTemp')
         } else {
           $('#currentTemp').addClass('highTemp')
         }

     }

     /* Testing initial var output
     console.log(response)
     console.log(response.data.name)
     console.log('Current temp ' + Math.ceil(response.data.main.temp))
     console.log('Min temp ' + Math.ceil(response.data.main.temp_min))
     console.log('Max temp ' + Math.ceil(response.data.main.temp_max))
     console.log('Description ' + response.data.weather[0].description)*/

     //displayResults(response.data.data)
     displayResults()

     } catch(error) {
       console.log(error)
     }
   }

})
