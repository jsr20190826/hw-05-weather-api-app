
$(function () {
  $('#search').submit((event) => {
    event.preventDefault()
    const query = $('#query').val()
    console.log(query)
    // Make the API call and display results
    search(query)
    // Reset the search field
    $('#query').val('')
  })
})

$(function () {
   $('#reset').click((event) => {
   $('#results-table tbody').html('')
   })
 })

function displayResults (result) {
  console.log(result)
  // Temperature results are given in Kelvin!
  // Modify color of current temperature -- translated to Celsius
    let temptext="blacktext"
    if (Math.round(result.main.temp - 273.15) <=4.44) {
      temptext="bluetext"
    } else if (Math.round(result.main.temp - 273.15) >=32.2) {
      temptext="redtext"
    }

    // Output html text .. Results are given in Celsius
    $('#results-table tbody').append(
      `<tr>
        <td class=blacktext>${result.name}  </td>
        <td class=${temptext}>${Math.round(result.main.temp - 273.15)} C </td>
        <td class=blacktext>${result.weather[0].main}</td>
        <td class=blacktext>${Math.round(result.main.temp_min - 273.15)} C</td>
        <td class=blacktext>${Math.round(result.main.temp_max - 273.15)} C</td>
      </tr>`
    )
}

async function search (searchTerm) {
  // ** making API request using async/await and axios **
  try {
    const url = 'https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm
    const apiKey = '15c7d8873a578e9a985d6559114e4603'
    console.log(url)
    const response = await axios.get(url, {
      params: {
        q: searchTerm,
        APPID: apiKey,
      }
    })
    console.log(response)
    displayResults(response.data)

  } catch (error) {
    console.log(error)
    alert('an error occurred with your request')
  }
}




// ### ⚡️ Plan your implementation approach using pseudocode
// If you find the assignment too challenging to complete, you can bet the first place to check is your pseudocode!
//
// #### ⚡️ You need to make the following files to support the app:
// - [ ] `main.js`
// - [ ] `index.html`
// - [ ] `style.css`
//
// Note: The design of the app is totally up to you, we're mainly interested in the functionality
//
// #### ⚡️ Your page should have:
// - [ ] An **input field** for a user to enter a zip code or city name
// - [ ] A **submit button**
// - [ ] When the submit button is clicked:
//     - [ ] A **GET** request should fetch the weather data from the OpenWeather API
//     - [ ] The following data should be rendered to the page:
//         - [ ] City name
//         - [ ] Current temperature (displayed in Fahrenheit)
//         - [ ] Weather description
//         - [ ] Min temp
//         - [ ] Max temp
// - [ ] Have the temperature turn blue if under 40, and red if above 90.
//
// Here are some zip codes / city names to test!
//
// - 99501 (Anchorage)
// - 99723 (Barrow, AK)
// - 60605 (Chicago)
// - 70124 (New Orleans)
// - 77030 (Houston, TX)
// - 00902 (San Juan, Puerto Rico)
// - 46923 (Delphi, IN)
// - 94123 (San Francisco, CA)
