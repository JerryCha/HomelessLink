const convertToGeoJson = function (loc) {
	if (Array.isArray(loc)) {
		return {
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': loc
			}
		}
	} else if (typeof loc === 'object') {
		return {
			'type': 'Feature',
			'properties': {
				'description': loc.name
			},
			'geometry': {
				'type': 'Point',
				'coordinates': loc.coord
			}
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
