/* global fetch */

class FlickrAPI {
	constructor() {
		this.api_key = '671aab1520e2cb69e08dd36a5f40213b';
		this.user_id = '54614523@N00';
		this.format = '&format=json&nojsoncallback=1';

		this.flickrParams = `&api_key=${this.api_key}${this.format}&user_id=${this.user_id}`;
		this.url = `https://api.flickr.com/services/rest/?method=flickr.people.getPhotos${this.flickrParams}`;
	}

	getPhotos() {
		return fetch(this.url).then(response => response.json());
	}

	static getPhotoSourceURLs(data) {
		const photoSources = [];

		data.photos.photo.forEach((photo) => {
			photoSources.push({
				url: `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`,
				title: photo.title
			});
		});

		return photoSources;
	}
}

export default FlickrAPI;
