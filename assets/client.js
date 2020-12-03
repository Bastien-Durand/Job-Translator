$( document ).ready(function() {

    let counter = 0;

    const dummyData = "hello i am here"

    $("#translateButton").click( async (event) => {
      const jobDescription = $('#inputField').val().toLowerCase()

      await $.ajax({url: 'https://job-translator.herokuapp.com/results' || "http://localhost:1337/results", success: function(result) {

      const values = Object.values(result)

      const keys = Object.keys(result);

        keys.map((x, index) => {
          counter++
          if(jobDescription.includes(x)) {

            $('#results ul').append(`<li style='text-decoration: none;'><strong>${x}</strong> &rarr; ${values[index]}</li>`)
          }
        }
      )
      if (counter == keys.length) {
        return $('#results ul').append("<strong style='color:teal;'>No more matches</strong>")
      }
      }})
    });

    $('#getDummyDataButton').click( (event) => {
      $('#inputField').val(dummyData)
    })

    $('#getRandomJobButton').click( async (event) => {
      await $.ajax({url: `https://api.adzuna.com/v1/api/jobs/au/search/1?app_id=6969f274&app_key=985462037ccb638ed824f8b40b5b4986&results_per_page=20&what=software%20engineer`,
        contentType: "application/json",
         success: function(result) {
           let stringToFormat = result.results[0].description
           var randomJobResult = result.results[Math.floor(Math.random() * result.results.length)];
           let regex = /(<([^>]+)>)/ig
           let formatted = randomJobResult.description.replaceAll(regex, "")
           $('#inputField').val(formatted)
      }})
    })

});
