// FourSquareAPI using fetch

class FourSquare {
	static bURL() {
		return "https://api.foursquare.com/v2";
	}
	static auth() {
		const keys = {
			client_id: "MFGTJQW54XBIP0TJI0ATZWFWJHJF5AYP3WIMN3HPYAPIS5QA",
			client_secret: "D1QXLPRCS4B4X4VJVWSTGTFO2C3Q0L0R22U2SBVZAKXAPXRL",
			v: "20181029"
		};
		return Object.keys(keys)
			.map(key => `${key}=${keys[key]}`)
			.join("&");
	}
	static urlBuild(url) {
		if (!url) {
			return "";
		} else {
			return Object.keys(url)
				.map(key => `${key}=${url[key]}`)
				.join("&");
		}
	}
	static head() {
		return {
			Accept: "application/json"
		};
	}
	static simFetch(end, method, url, error) {
		let requestData = {
			method,
			headers: FourSquare.head()
		};
		return fetch(`${FourSquare.bURL()}${end}?${FourSquare.auth()}&${FourSquare.urlBuild(url)}`, requestData)
			.then(response => response.json())
			.catch(error => {
				alert("Four Square has failed to load");
				console.log(error);
			});
	}
}

export default class foursquareAPI {
	static search(url) {
		return FourSquare.simFetch("/venues/search", "GET", url);
	}
	static getVenueDetails(VENUE_ID) {
		return FourSquare.simFetch(`/venues/${VENUE_ID}`, "GET");
	}
	static getVenuePhoto(VENUE_ID) {
		return FourSquare.simFetch(`/venues/${VENUE_ID}/photos`, "GET");
	}
}
