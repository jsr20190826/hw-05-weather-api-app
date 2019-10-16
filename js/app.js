$(function() {
  $('#submitWeather').click(() => {
    return getWeather()
  })

  function getWeather() {
    let city = $('#city').val()
    let apiKey = '6007f3596d161608560283c909275f3a'

    if (city != '') {

      $.ajax({
        url: `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`,
        type: 'GET',
        dataType: 'jsonp',
        success: function(data) {
          console.log(data);

          let widget = showResults(data)

          $('#showWeather').html(widget)

          $('#city').val('')
        }
      })

    } else {
      $('#error').html('<div class="alert alert-danger" id="errorCity">City field cannot be empty</div>')
    }
  }
})

function showResults(data) {
  let location = data.name
  let temp = data.main.temp.toFixed()
  let desc = data.weather[0].description
  let minTemp = data.main.temp_min.toFixed()
  let maxTemp = data.main.temp_max.toFixed()

  const htmlRow = (
    `<div>
      <strong>Location:</strong>
        <p>${location}</p>
      <strong>Temperature:</strong>
        <p>${temp} &deg;F</p>
      <strong>Weather Description:</strong>
        <p>${desc}</p>
      <strong>Min Temp:</strong>
        <p>${minTemp} &deg;F</p>
      <strong>Max Temp:</strong>
        <p>${maxTemp} &deg;F</p>
    </div>`
  )

  if (temp < 40) {
    return (
      `<div>
        <strong>Location:</strong>
          <p>${location}</p>
        <strong>Temperature:</strong>
          <p style="color:blue;">${temp} &deg;F</p>
        <strong>Weather Description:</strong>
          <p>${desc}</p>
        <strong>Min Temp:</strong>
          <p>${minTemp} &deg;F</p>
        <strong>Max Temp:</strong>
          <p>${maxTemp} &deg;F</p>
      </div>`
    )
  } else if (temp > 90) {
    return (
      `<div>
        <strong>Location:</strong>
          <p>${location}</p>
        <strong>Temperature:</strong>
          <p style="color:red;">${temp} &deg;F</p>
        <strong>Weather Description:</strong>
          <p>${desc}</p>
        <strong>Min Temp:</strong>
          <p>${minTemp} &deg;F</p>
        <strong>Max Temp:</strong>
          <p>${maxTemp} &deg;F</p>
      </div>`
    )
  } else {
    return htmlRow
  }
}
