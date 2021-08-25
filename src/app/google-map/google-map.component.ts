import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

declare const google: any;
@Component({
  selector: 'app-google-map',
  templateUrl: './google-map.component.html',
  styleUrls: ['./google-map.component.css']
})
export class GoogleMapComponent implements OnInit,AfterViewInit {

 map : any
  constructor() {}
  ngOnInit(): void {
    // this.initMap()
   
  }

  ngAfterViewInit()
  {
    this.initMap()
  }

   initMap() {
   const latlong = { lat: 17.004393, lng: 81.783325 }
    this.map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
      center: latlong,
      zoom: 8,
    });

    console.log(this.map)

// Add Marker on Google Map

    const marker = new google.maps.Marker({
      position : latlong,
      map : this.map
    })

  // Open Info Window on Google Map 

     const coordInfoWindow = new google.maps.InfoWindow();
     
      coordInfoWindow.setContent(this.createInfoWindowContent(latlong,this.map.getZoom()!))
      coordInfoWindow.setPosition(latlong);
  coordInfoWindow.open(this.map);

    this.map.addListener("Zoom_changed",() => {
      coordInfoWindow.setContent(
        this.createInfoWindowContent(latlong, this.map.getZoom()!)
      );
      coordInfoWindow.open(this.map);
    })

    

  }


  //   Showing Pixels and Tile Coordinates

   TILE_SIZE = 300;
   
   createInfoWindowContent(latlag : any , zoom : number)
  {
   console.log(latlag)
  
  
   
    const scale =1 << zoom;
    const worldCoordinate = this.project(latlag);
    const pixelCoordinate = new google.maps.Point(
      Math.floor(worldCoordinate.x*scale),
      Math.floor(worldCoordinate.y*scale),

    );
    console.log(pixelCoordinate)
    const tileCoordinate = new google.maps.Point(
      Math.floor((worldCoordinate.x * scale) / this.TILE_SIZE),
      Math.floor((worldCoordinate.y * scale) / this.TILE_SIZE)
    );
    console.log(tileCoordinate)
    return[
      "Rajahmundry , IL",
      // "LatLng: " + '(' + latlag.lat + ', ' + latlag.lng + ')',
      `LatLong : (${latlag.lat},${latlag.lng})`,

      "Zoom Level: " + zoom,
      "world coordinate: "+ worldCoordinate,
      "pixel Coordinate: "+pixelCoordinate,
      "Tile Coordinate: " + tileCoordinate
    ].join("<br>")
  }
  latitu = new google.maps.LatLng;
   project(latitu = new google.maps.LatLng) {
   console.log(latitu)
    let siny = Math.sin((latitu.lat * Math.PI) / 180);
    console.log(siny)
  
    // Truncating to 0.9999 effectively limits latitude to 89.189. This is
    // about a third of a tile past the edge of the world tile.
    siny = Math.min(Math.max(siny, -0.9999), 0.9999);
  console.log(siny)
    return new google.maps.Point(
      this.TILE_SIZE * (0.5 + latitu.lng / 360),
      this.TILE_SIZE * (0.5 - Math.log((1 + siny) / (1 - siny)) / (4 * Math.PI))
    );
  }

  
  
  

}


