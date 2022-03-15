import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css'; 


export default function Mapbox(props){

  const Map = ReactMapboxGl({
    accessToken:
      'pk.eyJ1IjoibG91ZGxpbmsiLCJhIjoiY2wwczA4OHF6MDhwMTNjandpd3R6NjJvZCJ9.Fgni-T1FIx-FRRu2GOtykw'
  });


  return(
    <div>
      <Map
        style='mapbox://styles/mapbox/streets-v11'
        containerStyle={{
        height: '100vh',
        width: '100vw'
        }}>
          <Layer type="symbol" id="marker" layout={{ 'icon-image': 'marker-15' }}>
              <Feature coordinates={[-0.481747846041145, 51.3233379650232]} />
          </Layer>
      </Map>
    </div>
  )
}