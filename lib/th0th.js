var th0th = {
	dataTable : null
	,
	client : new WebTorrent()
	,
	dirData : null
	,
	i : 0
	,
	files : []
	,
	$body : null
	,
  $progressBar : null
  ,
  $numPeers : null
  ,
  $downloaded : null
  ,
  $total : null
  ,
  $remaining : null
  ,
  $uploadSpeed : null
  ,
  $downloadSpeed : null
  ,
	init : function(){
		var that = this;
			$("#th0th").append('<div id="hero"><div id="output"><div id="progressBar"></div><!-- The video player will be added here --></div><!-- Statistics --><div id="status"><div><span class="show-leech">Downloading </span><span class="show-seed">Seeding </span><code><!-- Informative link to the torrent file --></code><span class="show-leech"> from </span><span class="show-seed"> to </span><code id="numPeers">0 peers</code>.</div><div><code id="downloaded"></code> of <code id="total"></code> — <span id="remaining"></span><br/>&#x2198;<code id="downloadSpeed">0 b/s</code> / &#x2197;<code id="uploadSpeed">0 b/s</code></div></div></div><input type="file" id="th0th_dir" webkitdirectory directory multiple/>')
		$("#th0th").append("<style> #th0th { overflow-x:hidden; } #th0th_table { table-layout : fixed;} #th0th_table td{ white-space: pre-wrap !important; word-wrap:break-word;} #th0th_table { width: 100%;} #output video { width: 100%;} #progressBar {height: 5px; width: 0%; background-color: #35b44f; transition: width .4s ease-in-out; } body.is-seed .show-seed { display: inline; } body.is-seed .show-leech { display: none; } .show-seed { display: none;}#status code {font-size: 90%;font-weight: 700; margin-left: 3px; margin-right: 3px; border-bottom: 1px dashed rgba(255,255,255,0.3); } .is-seed #hero {background-color: #154820; transition: .5s .5s background-color ease-in-out;}#hero {background-color: #2a3749;} #status {color: #fff; font-size: 17px; padding: 5px; } a:link, a:visited { color: #30a247; text-decoration: none; }   </style>")
		var button = document.createElement("button");
		$(button).text("Add");
		var input = document.createElement("input");
		$(input).attr("placeholder", "infoHash")
		$("#th0th").append(input);
		$("#th0th").append(button)
		$("#th0th").append("<br>")
		$("#th0th").append("<span class='th0th_status'></span>")

		this.$body = document.body;
		this.$progressBar = document.querySelector("#progressBar")
		this.$numPeers = document.querySelector("#numPeers");
		this.$downloaded = document.querySelector("#downloaded")
		this.$total = document.querySelector("#total")
		this.$remaining = document.querySelector("#remaining")
		this.$uploadSpeed = document.querySelector("#uploadSpeed")
		this.$downloadSpeed = document.querySelector("#downloadSpeed")

		$(button).click(function(e){
			that.addFile($(input).val())
		})
		dirData = new FormData();
		var dataCount = 0;

		$("#th0th_dir").change(function(event){
		  for (var i = 0, files = event.target.files; i < files.length; i++) {
		  	dataCount++;
		    dirData.append("file-" + [...dirData.keys()].length, files[i], files[i].name)
		  }
		  that.seedFiles();
		})

	console.log("INITIALIZING THOTH CLIENT!")
	var that = this;
	var table = document.createElement("table");
	var thead = document.createElement("thead");
	var tr = document.createElement("tr");
	var tbody = document.createElement("tbody");
	var thStream = document.createElement("th")
	var thSeeders = document.createElement("th")
	var thSize = document.createElement("th")
	var thFile = document.createElement("th")
	var thPeers = document.createElement("th")
	var thInfoHash = document.createElement("th")
	$(thPeers).append("<span>Peers</span>")
	$(thSize).append("<span>Size</span>")
	$(thFile).append("<span>File</span>");
	$(thInfoHash).append("<span>infoHash</span>")
	$(thStream).append("<span>Stream</span>")
	$(table).append(thead);
	$(thead).append(tr);
	$(table).attr("id", "th0th_table")
	$(table).append(tbody);
	$(tr).append(thStream);
	$(tr).append(thFile);
	$(tr).append(thInfoHash);
	$(tr).append(thSize)
	$(tr).append(thPeers);
	

	$("#th0th").append(table);
	$(table).css("width", "100%")
	var that = this;
	this.dataTable = $(table).DataTable({pageLength : 55, "columnDefs": [
		{ "width": "475px", "targets": 0 }
		], autoWidth : false, responsive:true,
		drawCallback: function(settings){
			if(that.files.length > 0 && that.i < files.length){
				that.files[i].appendTo(".th0th_file_" + i)
				that.i++;	
			}
		}})

	console.log("LOOPER!!!1one1")


},
addFile :	function(infoHash){
	  var that = this;
		this.client.add("magnet:?xt=urn:" + infoHash + "&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%"+
			"3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2F"+
			"tracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2"+
			"Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F", function(torrent){
				that.files.push(torrent.files[0]);
				torrent.on('done', that.onDone)
				setInterval(that.onProgress(torrent), 500)
	        	that.onProgress(torrent)
			
				that.addRow(torrent);
		
		})
	}
	,
seedFiles :	function(){
		var that = this;
		dirData.forEach(function(file){
		$(".th0th_status").text(file.name)
		console.log(file)
			that.client.seed(file, function(torrent){
				that.files.push(torrent.files[0])
				torrent.on('done', that.onDone)
				setInterval(that.onProgress(torrent), 500)
        		that.onProgress(torrent)
        		that.addRow(torrent);
				var div = document.createElement("div");
				torrent.files[0].appendTo(div);
				console.log(torrent.files.length);
				if(that.i === dataCount){
					$(".th0th_status").hide();
					console.log("DONE LOADING ALL!")						
					
				}
			})		
		})	
	}
	,
	seed : function(infoHash){
		var that = this;
		this.client.seed("magnet:?xt=urn:" + infoHash + "&tr=udp%3A%2F%2Fexplodie.org%3A6969&tr=udp%3A%2F%2Ftracker.coppersurfer.tk%"+
			"3A6969&tr=udp%3A%2F%2Ftracker.empire-js.us%3A1337&tr=udp%3A%2F%2Ftracker.leechers-paradise.org%3A6969&tr=udp%3A%2F%2F"+
			"tracker.opentrackr.org%3A1337&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2"+
			"Ftracker.openwebtorrent.com&ws=https%3A%2F%2Fwebtorrent.io%2Ftorrents%2F", function(torrent){
				that.files.push(torrent.files[0]);
				torrent.on('done', that.onDone)
				setInterval(that.onProgress(torrent), 500)
	        	that.onProgress(torrent)
			
				that.addRow(torrent);
		})
	}
	,
	addRow : function(torrent){
		this.dataTable.row.add(["<div style='width: 300px; height: 180px;' class='th0th_file_" + this.i + "'></div>",
		 "<a href='#torrent?infoHash=" + torrent.infoHash + "' data-infoHash='" +torrent.infoHash + "' id='th0th_title'>" + torrent.name + "</a>", "<a href='magnet:?xt=urn:btih:" + torrent.infoHash + "'>" + torrent.infoHash + "</a>", 
					humanFileSize(torrent.length), torrent.numPeers]).draw(false);
				
	}
		
	,
onProgress : function(torrent) {
      // Peers
      this.$numPeers.innerHTML = torrent.numPeers + (torrent.numPeers === 1 ? ' peer' : ' peers')

      // Progress
      const percent = Math.round(torrent.progress * 100 * 100) / 100
      this.$progressBar.style.width = percent + '%'
      this.$downloaded.innerHTML = this.prettyBytes(torrent.downloaded)
      this.$total.innerHTML = this.prettyBytes(torrent.length)

      // Remaining time
      let remaining
      if (torrent.done) {
        remaining = 'Done.'
      } else {
        remaining = moment.duration(torrent.timeRemaining / 1000, 'seconds').humanize()
        remaining = remaining[0].toUpperCase() + remaining.substring(1) + ' remaining.'
      }
     this. $remaining.innerHTML = remaining

      // Speed rates
      this.$downloadSpeed.innerHTML = this.prettyBytes(torrent.downloadSpeed) + '/s'
      this.$uploadSpeed.innerHTML = this.prettyBytes(torrent.uploadSpeed) + '/s'
    }
    ,

	onDone : function() {
	  $body.className += ' is-seed'
	  onProgress(torrent)
	}
  ,

  // Human readable bytes util
 prettyBytes : function(num) {
    const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    const neg = num < 0
    if (neg) num = -num
    if (num < 1) return (neg ? '-' : '') + num + ' B'
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1)
    const unit = units[exponent]
    num = Number((num / Math.pow(1000, exponent)).toFixed(2))
    return (neg ? '-' : '') + num + ' ' + unit
  }		
  ,

  humanFileSize : function(bytes, si=false, dp=1) {
	  const thresh = si ? 1000 : 1024;

	  if (Math.abs(bytes) < thresh) {
	    return bytes + ' B';
	  }

	  const units = si 
	    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
	    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
	  let u = -1;
	  const r = 10**dp;

	  do {
	    bytes /= thresh;
	    ++u;
	  } while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);


	  return bytes.toFixed(dp) + ' ' + units[u];
	}
}
