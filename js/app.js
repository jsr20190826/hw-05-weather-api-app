$(function () {

	$('#user-input').focus()

	//Take users query on submission and returns results
	$('#weather-form').submit((e) => {
		e.preventDefault()

		const userInput = $('#user-input').val()
		console.log(userInput)

		clearResults()
		clearForm()
		findLocation(userInput)
	})

	//Async and Await function that connects to Weather API
	async function findLocation(userInput) {
		try{
			const apiKey = '24167c0c684294d3a58362f61c302697'
			let url = `https://api.openweathermap.org/data/2.5/weather`

			//Making API requests using async/await
			const response = await axios.get(url, {
				params: {
					q: `${userInput},US`,
					url: url,
					APPID: apiKey,
					type: "GET",
					units: 'imperial'
				}
			})

			console.log(response.data)
			displayResults(response.data)

		} catch(error) {
			console.log(error)
			alert('City not found, please try again.')
		}
	}

	//Function to update HTML page
	function displayResults(locations) {

		//Assigning variable to raw weather description
		const currentTemp = locations.main.temp
		const rawDescription = locations.weather[0].description

		//Assigning variable converted weather description to proper case string
		const weatherDescription = rawDescription.toLowerCase().split(' ').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')

		//Updating HTML with city weather information
		const htmlRow = (
			`
			<h3>${locations.name}</h3>
			<p class="current-temp"><img class="weather-icon" src="http://openweathermap.org/img/wn/${locations.weather[0].icon}.png" />Current Temperature: ${Math.floor(locations.main.temp)}&#8457;</p>
			<p>Weather Description: ${weatherDescription}</p>
			<p>Min. Temperature: ${Math.floor(locations.main.temp_min)}&#8457;</p>
			<p>Max. Temperature: ${Math.floor(locations.main.temp_max)}&#8457;</p>
			`
		)

		$('.weather-results').append(htmlRow)

		//Calling temperature color function
		tempColor(currentTemp)
	}

	//Function to update temperature color based on set parameters
	function tempColor(temp) {
		if( temp > 90) {
			$('h1, h3, p').css('color','#FFF')
			bodyBackground('#333333', '#DD1818')
		} else if (temp < 90 && temp > 75) {
			$('h1, h3, p').css('color','#313131')
			bodyBackground('#FFECD2', '#FCB69F')
		} else if (temp < 75 && temp > 40) {
			$('h1, h3, p').css('color','#313131')
			bodyBackground('#A1C4FD', '#C2E9FB')
		} else if ( temp < 40) {
			$('h1, h3, p').css('color','#FFF')
			bodyBackground('#1E3C72', '#2A5298')
		} else {
			console.log('Normal temperature.')
		}
	}

	function bodyBackground(color1, color2) {
		$('body').css({
			background:`${color1}`,
			background:`linear-gradient(to bottom,${color1} 0%,${color2} 100%)`,
			background:`-moz-linear-gradient(top,${color1} 0%,${color2} 100%)`,
			background:`-webkit-linear-gradient(top,${color1} 0%,${color2} 100%)`,
			filter:`progid:DXImageTransform.Microsoft.gradient(startColorstr='${color1}',endColorstr='${color2}',GradientType=0)`
		})
	}

	//Clears results after every submission
	function clearResults() {
		$('.weather-results').html('')
	}

	//Clears form after every submission
	function clearForm() {
		$('#user-input').val('')
	}
})