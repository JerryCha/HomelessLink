const convertToGeoJson = function (coord) {
	return {
		'type': 'Feature',
		'geometry': {
			'type': 'Point',
			'coordinates': coord
		}
	}
}

const buildMapboxSource = function (locations) {
	return {
		'type': 'geojson',
		'data': {
			'type': 'FeatureCollection',
			'features': locations.map(convertToGeoJson)
		}
	}
}

export default {
	convertToGeoJson,
	buildMapboxSource
}
