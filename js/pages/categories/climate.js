$( document ).ready(function() {
    "use strict";
    // Store currentRegion
    var map;
    var currentRegion = [];
    var enabledRegions = [];
    var codeMap = {
      "Bangladesh": "bd",
      "Belgium": "be",
      "Burkina Faso": "bf",
      "Bulgaria": "bg",
      "Bosnia and Herzegovina": "ba",
      "Brunei": "bn",
      "Bolivia": "bo",
      "Japan": "jp",
      "Burundi": "bi",
      "Benin": "bj",
      "Bhutan": "bt",
      "Jamaica": "jm",
      "Botswana": "bw",
      "Brazil": "br",
      "Bahamas": "bs",
      "Belarus": "by",
      "Belize": "bz",
      "Russia": "ru",
      "Rwanda": "rw",
      "Serbia": "rs",
      "Timor-Leste": "tl",
      "Turkmenistan": "tm",
      "Tajikistan": "tj",
      "Romania": "ro",
      "Guinea-Bissau": "gw",
      "Guatemala": "gt",
      "Greece": "gr",
      "Equitorial Guinea": "gq",
      "Guyana": "gy",
      "Georgia": "ge",
      "United Kingdom": "gb",
      "Gabon": "ga",
      "Guinea": "gn",
      "Gambia": "gm",
      "Greenland": "gl",
      "Ghana": "gh",
      "Oman": "om",
      "Tunisia": "tn",
      "Jordan": "jo",
      "Croatia": "hr",
      "Haiti": "ht",
      "Hungary": "hu",
      "Honduras": "hn",
      "Puerto Rico": "pr",
      "Palestine": "ps",
      "Portugal": "pt",
      "Paraguay": "py",
      "Panama": "pa",
      "Papua New Guinea": "pg",
      "Peru": "pe",
      "Pakistan": "pk",
      "Philippines": "ph",
      "Poland": "pl",
      "Zambia": "zm",
      "W. Sahara": "eh",
      "Estonia": "ee",
      "Egypt": "eg",
      "South Africa": "za",
      "Ecuador": "ec",
      "Italy": "it",
      "Vietnam": "vn",
      "Solomon Is": "sb",
      "Ethiopia": "et",
      "Somalia": "so",
      "Zimbabwe": "zw",
      "Spain": "es",
      "Eritrea": "er",
      "Montenegro": "me",
      "Moldova": "md",
      "Madagascar": "mg",
      "Morocco": "ma",
      "Uzbekistan": "uz",
      "Myanmar": "mm",
      "Mali": "ml",
      "Mongolia": "mn",
      "Macedonia": "mk",
      "Malawi": "mw",
      "Mauritania": "mr",
      "Uganda": "ug",
      "Malaysia": "my",
      "Mexico": "mx",
      "Israel": "il",
      "France": "fr",
      "Somaliland": "xs",
      "Finland": "fi",
      "Fiji": "fj",
      "Falkland": "fk",
      "Nicaragua": "ni",
      "Netherlands": "nl",
      "Norway": "no",
      "Namibia": "na",
      "Vanuatu": "vu",
      "New Caledonia": "nc",
      "Niger": "ne",
      "Nigeria": "ng",
      "New Zealand": "nz",
      "Nepal": "np",
      "Kosovo": "xk",
      "Ivory Coast": "ci",
      "Switzerland": "ch",
      "Colombia": "co",
      "China": "cn",
      "Cameroon": "cm",
      "Chile": "cl",
      "N. Cyprus": "xc",
      "Canada": "ca",
      "Congo": "cg",
      "Central African Republic": "cf",
      "Democratic Republic of Congo": "cd",
      "Czech Republic": "cz",
      "Cyprus": "cy",
      "Costa Rica": "cr",
      "Cuba": "cu",
      "Swaziland": "sz",
      "Syria": "sy",
      "Kyrgyzstan": "kg",
      "Kenya": "ke",
      "South Sudan": "ss",
      "Suriname": "sr",
      "Cambodia": "kh",
      "El": "sv",
      "Slovakia": "sk",
      "Korea": "kr",
      "Slovenia": "si",
      "Kuwait": "kw",
      "Senegal": "sn",
      "Sierra": "sl",
      "Kazakhstan": "kz",
      "Saudi Arabia": "sa",
      "Sweden": "se",
      "Sudan": "sd",
      "Dominican Republic": "do",
      "Djibouti": "dj",
      "Denmark": "dk",
      "Germany": "de",
      "Yemen": "ye",
      "Algeria": "dz",
      "United States": "us",
      "Uruguay": "uy",
      "Lebanon": "lb",
      "Lao PDR": "la",
      "Taiwan": "tw",
      "Trinidad and Tobago": "tt",
      "Turkey": "tr",
      "Sri Lanka": "lk",
      "Latvia": "lv",
      "Lithuania": "lt",
      "Luxembourg": "lu",
      "Liberia": "lr",
      "Lesotho": "ls",
      "Thailand": "th",
      "Fr. S. Antarctic Lands": "tf",
      "Togo": "tg",
      "Chad": "td",
      "Libya": "ly",
      "United Arab Emirates": "ae",
      "Venezuela": "ve",
      "Afghanistan": "af",
      "Iraq": "iq",
      "Iceland": "is",
      "Iran": "ir",
      "Armenia": "am",
      "Albania": "al",
      "Angola": "ao",
      "Argentina": "ar",
      "Australia": "au",
      "Austria": "at",
      "India": "in",
      "Tanzania": "tz",
      "Azerbaijan": "az",
      "Ireland": "ie",
      "Indonesia": "id",
      "Ukraine": "ua",
      "Qatar": "qa",
      "Mozambique": "mz"
  }

  map = jQuery('#vmap').vectorMap({
        map: 'world_en',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderOpacity: 0.3,
        borderWidth: 1,
        color: '#778899',
        colors: colors,
        enableZoom: true,
        hoverColor: null,
        hoverOpacity: null,
        normalizeFunction: 'linear',
        multiSelectRegion: true,
        scaleColors: ['#b6d6ff', '#005ace'],
        selectedColor: '#00FF00',
        selectedRegions: null,
        showTooltip: true,
        onRegionClick: function(element, code, region) {
          // Check if this is an Enabled Region, and not the current selected on
          if(enabledRegions.indexOf(code) === -1 || currentRegion === code){
            // It runs the code below if code is not an Enabled Region
            element.preventDefault();
          } else {
            // Enabled Region. Update Newly Selected Region.
            if (currentRegion.includes(code) === true){
            currentRegion.push(code);
            return currentRegion
            }
          }
        },
        
        onRegionSelect: function(event, code, region){
          console.log(map.selectedRegions);
        },
        onLabelShow: function(event, label, code){
          if(enabledRegions.indexOf(code) === -1){
            event.preventDefault();
          }
        }

    });
    
    // 2. Compare Function - From enabledRegions (countries with data), display only those that have been selected(selectedRegion)
    // Works fine!
    document.getElementById("buttonid").onclick = function () { 
      //This function handles hiding and showing of data for all active and selected countries.

      //1. Get country divs by classname in an array. 
      var className = document.getElementsByClassName('modal-body');
      //contains all Ids for countries with existing data (active countries)
      var allIds = [];
      for(var i=0; i<className.length; i++)
          allIds.push(className[i].getAttribute('id'));
      //toBlock is a subset of countries that are not selected but active (contain data)
      var toBlock = allIds.filter( ( el ) => !map.selectedRegions.includes( el ) );

      //Show data for selected regions
      $.each(map.selectedRegions, function(index, value){
        console.log(value)
        var x = document.getElementById(value);
        x.style.display = "block"; });
       
      //Hide data for unselected but active regions
      $.each(toBlock, function(index, value){
        var y = document.getElementById(value);
        y.style.display = "none";
         })
    }
  
  //1. Asynchronously loading all climate resource data 
  var database = firebase.database();
  var resourcetable = database.ref('users');
  var colors = {}
  var data = []
  var filter = get.filter
  resourcetable.on("child_added", function(snap){
    //push data into array of json objects --> data = [ {country:..., input: ...}, {country2: ..., input2:...}, ... ]
    data.push(snap.val());
    console.log(data)
    // var Johnny = data[2]; // Need a login data.
    //  dynamically update enabled regions and create a list of div objects based on data from the database 
    $.each(Johnny, function(index, category){
      // if (filter == w.e )
      $.each(category, function(index, SDG){
        $.each(SDG, function(index, SDGData){

          if (SDGData.category == "Sustainable Development Goals"){ // Only show the data from SDR.
            let div = document.createElement('div');
            div.className = "modal-body";
            div.id = SDGData.selectedCountry;     //Login logics needed
            $('.modal-body').css('display','none')
            //update enabled regions on data-fetch
            //We need which component we are in, but lets say we are in SDG
            enabledRegions.push(codeMap[SDGData.selectedCountry])
            //end update
  
            //set active region colors
            colors[codeMap[SDGData.selectedCountry]] = '#2E8B57'
            //end update
            
            div.innerHTML = SDGData.input
            var element = document.getElementById('data-list');
            element.appendChild(div)
            // console.log("key: "+SDGData.selectedCountry+" ; Value : "+SDGData.input);
            // console.log(enabledRegions)
          }
        });
      });
    });

  //dynamically update map to show regions with data
  jQuery('#vmap').vectorMap('set', 'colors', colors);
  // console.log(colors)
  });
});
     
//Populate data on map
//document.getElementById("canada-info").innerHTML = input;