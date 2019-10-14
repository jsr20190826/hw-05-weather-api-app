

/*     ----- pseudocode -----------
Create Form
Create Row
Create API search
Return displayResults
Style Temperture results  based on actual temp  <40 = blue
Check Edge case queries

- 99501 (Anchorage)
- 99723 (Barrow, AK)
- 60605 (Chicago)
- 70124 (New Orleans)
- 77030 (Houston, TX)
- 00902 (San Juan, Puerto Rico)
- 46923 (Delphi, IN)
- 94123 (San Francisco, CA)

*/


$(function () {


  $('#search').submit((event) => {
    event.preventDefault()
    //console.log('form being submitted')

    const query = $('#query').val()
    //console.log(query)

    $('#results-table tbody').html('')
    $('#query').val('')


    if (query.indexOf(',') > -1) {
      mapsearch(query)

    } else {
      search(query)
    }
  })


  function displayResults (city) {

      $('#results-table tbody').append(
        `<tr>
          <td>${city.name}</td>
          <td class='temp red'>${Math.round(Number(city.main.temp))}º F</td>
          <td>${city.weather[0].description}</td>
         <td>${city.main.temp_min}º F</td>
          <td>${city.main.temp_max}º F</td>
        </tr>`
      )

      if (Number(city.main.temp) <=40){
        $(".temp").toggleClass("blue")
      }

  }

  async function search (searchTerm,lat,lon) {
      try {
        const url = 'https://api.openweathermap.org/data/2.5/weather'
        const apiKey = '0724019f4d98f5bc70c1af533998225a'
        const unitFormat = 'imperial'
        const latPosition = lat
        const lonPosition = lon


        if (searchTerm !== "") {

          if(isNaN(searchTerm)){


            const response = await axios.get(url, {
              params: {
                q: searchTerm,
                APPID: apiKey,
                units: unitFormat,
              }

            })

            //console.log (response)
            displayResults(response.data)


          } else {

            const response = await axios.get(url, {
              params: {
                zip: searchTerm,
                APPID: apiKey,
                units: unitFormat,
              }
            })

            //console.log (response)
            displayResults(response.data)

          }

        } else {

          const response = await axios.get(url, {
            params: {
              lat: latPosition,
              lon: lonPosition,
              APPID: apiKey,
              units: unitFormat,
            }

          })

          //console.log (response)
          displayResults(response.data)

        }


      } catch (error) {
      console.log(error)
      }}

      // Openweathermaps doesn't support States, using different API to get coordinates.

      async function mapsearch (mapTerm) {
          try {
            const url = 'http://www.mapquestapi.com/geocoding/v1/address'
            const apiKey = 'am1BU3QUNaeuhkwz9knde0YtIjINA42j'


              const mapresponse = await axios.get(url, {
                params: {
                  location: mapTerm,
                  key: apiKey,
                }

              })

              //console.log ("MAP")
              //console.log (mapresponse)
              //console.log (Number(mapresponse.data.results[0].locations[0].latLng.lat))
              //console.log (Number(mapresponse.data.results[0].locations[0].latLng.lng))

              let lattitude = (Number(mapresponse.data.results[0].locations[0].latLng.lat))
              let longitude = (Number(mapresponse.data.results[0].locations[0].latLng.lng))

              //send positions back for search
              search("",lattitude,longitude)



          } catch (error) {

          console.log(error)

          }
    }


})
