function getData(id){
         var dmJSON = "https://api.covid19india.org/raw_data.json";
          $.getJSON(dmJSON, function(data) {
            var coviddata = '',state,dist,c=1;
            if (id=='somnath') 
            {
                id='Gir Somnath';
            }
            if (id=='panchmahal') 
            {
            	id='Panch Mahals';
            }
                var confirm  = 0,active  = 0,confirm  = 0,recovered  = 0,death  = 0;

                for (var j = 0; j < data['raw_data'].length; j++) 
                {
                    if (data['raw_data'][j]['detectedstate']=='Gujarat') 
                    {
                        if (data['raw_data'][j]['detecteddistrict']==id) 
                        {
                            confirm = confirm + 1;
                            if (data['raw_data'][j]['currentstatus']=='Hospitalized')
                            {
                                active = active + 1;
                            }

                            if (data['raw_data'][j]['currentstatus']=='Deceased')
                            {
                                death = death + 1; 
                            }

                            if (data['raw_data'][j]['currentstatus']=='Recovered')
                            {
                                recovered = recovered + 1;
                            }
                        }
                    }

                }
                var tblRow = "<table class='table'><tr><td>District <td> :</td> </td>" + "<td>" + id + "</td></tr>" + "<tr><td>Confirm <td> :</td> </td>" + "<td>" + confirm + "</td></tr>" + "<tr><td>Active <td> :</td> </td>" + "<td>" + active + "</td></tr>"+ "<tr><td>Recovered <td> :</td> </td>" + "<td>" + recovered + "</td></tr>"
                    + "<tr><td>Deceased<td> :</td>" + "<td>" + death + "</td></tr></table>";
                        //$(tblRow).appendTo("#coviddata");
              $('#data').html(tblRow);
              console.log(tblRow);
  
            
    });
      }