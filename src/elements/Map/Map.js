/**
 * @jsx React.DOM
 */

var Map = React.createClass({

  // initialize local variables
  getInitialState: function() {
    return {
      map : null,
      markers : []
    };
  },

  // set some default values
  getDefaultProps: function() {
    return {
      latitude: 60.170833,
      longitude: 24.9375,
      zoom: 4,
      width: 500,
      height: 500
    }
  },

  // update geo-encoded markers
  updateMarkers : function(points) {

    var markers = this.state.markers;
    var map = this.state.map;

    // remove everything
    markers.forEach( function(marker) {
      marker.setMap(null);
    } );

    this.state.markers = [];

    // add new markers
    points.forEach( (function( point ) {

      var location = new google.maps.LatLng( point.latitude , point.longitude );

      var marker = new google.maps.Marker({
        position: location,
        map: map,
        title: point.label
      });

      markers.push( marker );

    }) );

    this.setState( { markers : markers });
  },

  render : function() {

    var style = {
      width: this.props.width,
      height: this.props.height
    }

    return (
      <div style={style}></div>
    );
  },

  // when component is included in the dom, load the JS libary spesific things on this element
  componentDidMount : function() {

    var mapOptions = {
      zoom: this.props.zoom,
      center: new google.maps.LatLng( this.props.latitude , this.props.longitude ),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var map = new google.maps.Map( this.getDOMNode(), mapOptions);

    this.setState( { map : map } );
    this.updateMarkers(this.props.points);
  },

  // update markers if needed
  componentWillReceiveProps : function(props) {
    if( props.points ) this.updateMarkers(props.points);
  }

});

var MapsContainer = React.createClass({

  getInitialState: function() {
    return {
      points : [],
      ready : true
    };
  },

  addPoint : function() {
    this.setState( { points : [] } );
  },

  render: function() {
    if( ! this.state.ready ) return(<div>Wait</div>);

    return (
      <div>
        <Map points={this.state.points} zoom={9} />
      </div>
    )
  },

  componentWillMount: function() {
    // todo: add here the stuff for loading library dynamically
  }
});

React.renderComponent(
  <MapsContainer />,
  document.getElementById('container')
);
