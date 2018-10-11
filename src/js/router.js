function Router(e) {
    let menu = document.querySelector('.menu');

    let content = document.querySelector('.item');
    let items = {
        artist: "Artists",
        track: "Track",
        album: "Album"
    };

    function updatePage (data) {
        if (!data) return;
        content.innerHTML = items[data.page]
    }

    this.state = function (e) {
        let state;
        if (e.target.tagName !== 'A') return;
        state = { page: e.target.getAttribute('href') };
        history.pushState(state, '', state.page);
        updatePage(state);
    }
}

export default Router;
