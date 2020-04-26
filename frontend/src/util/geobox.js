/**
 * Convert coordinate to GeoJson format
 * @param {Array | Object} loc location coordinate
 */
const convertToGeoJson = function (loc) {
	// Assuming an array is a coordinate in format of [lng, lat]
	if (Array.isArray(loc)) {
		return {
			'type': 'Feature',
			'geometry': {
				'type': 'Point',
				'coordinates': loc
			}
		}
	// eslint-disable-next-line brace-style
	}
	// Assuming an object is a coordinate with name in format of {name: '', coord: [lng, lat]}.
	else if (typeof loc === 'object') {
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

/**
 * Build location source for mapbox
 * @param {Array} locations locations in format of array or object.
 */
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
