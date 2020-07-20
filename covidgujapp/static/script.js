$(document).ready(function(){
		$(".box").hover(function(){
        var id = $(this).attr("id");
         getTooltip(id);
     });
		getData();
	});
	function getData(){
	    var districts =["Ahmadabad","Amreli","Anand","Aravalli","Banaskantha","Bharuch","Bhavnagar","Botad","Chhota Udaipur","Dahod","Dang","Devbhoomi Dwarka","Gandhinagar","Gir Somnath","Jamnagar","Junagadh","Kheda","Kachchh","Mahisagar","Mahesana","Morbi","Narmada","Navsari","Panch Mahals","Patan","Porbandar","Rajkot","Sabarkantha","Surat","Surendranagar","Tapi","Vadodara","Valsad",""];

		 var dmJSON = "https://api.covid19india.org/raw_data.json";
          $.getJSON(dmJSON, function(data) {
          	var coviddata = '',state,dist,c=1;
          	var totalconfirm  = 0,totalactive  = 0,totalconfirm  = 0,totalrecovered  = 0,totaldeath  = 0;
          	for (i = 0; i < districts.length; i++) 
          	{
          		var confirm  = 0,active  = 0,confirm  = 0,recovered  = 0,death  = 0;

          		for (var j = 0; j < data['raw_data'].length; j++) 
				{
					if (data['raw_data'][j]['detectedstate']=='Gujarat') 
					{
              			if (data['raw_data'][j]['detecteddistrict']==districts[i]) 
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
              	totalconfirm = totalconfirm + confirm;
              	totalactive = totalactive + active;
              	totalrecovered = totalrecovered + recovered;
              	totaldeath = totaldeath + death;
              	if (districts[i]=='') 
              	{
              		districts[i] = 'Unknown';
              	}
              	if (districts[i]=='Gir Somnath') 
              	{
              		districts[i] = 'somnath';
              	}
              	if (districts[i]=='Panch Mahals') 
	            {
	            	districts[i]='panchmahal';
	            }
              	var tblRow = "<tr>" + "<td><a class='a' href='/districtDetail?d="+districts[i]+"''>" + districts[i] + "</a></td>" + "<td class='text-center'>" + confirm + "</td>" + "<td class='text-center'>" + active + "</td>" + "<td class='text-center'>" + recovered + "</td>" + "<td class='text-center'>" + death + "</td>" +"</tr>"
              			$(tblRow).appendTo("#coviddata");

              	
              	if (confirm>0) 
              	{
              		 $("#"+districts[i]).addClass("marker-red");
              	}
          	}
          	$('#TotalConfirmed').html(totalconfirm);
          	$('#Totalrecovered').html(totalrecovered);
          	$('#TotalDeath').html(totaldeath);
			  console.log(c);       
    });
      }
      function getTooltip(id){
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
                var tblRow = "<table><tr><td>District <td> :</td> </td>" + "<td>" + id + "</td></tr>" + "<tr><td>Confirm <td> :</td> </td>" + "<td>" + confirm + "</td></tr>" + "<tr><td>Active <td> :</td> </td>" + "<td>" + active + "</td></tr>"+ "<tr><td>Recovered <td> :</td> </td>" + "<td>" + recovered + "</td></tr>"
                    + "<tr><td>Deceased<td> :</td>" + "<td>" + death + "</td></tr></table>";
                        //$(tblRow).appendTo("#coviddata");
              $('.pin-text').html(tblRow);
  
            
    });
      }
